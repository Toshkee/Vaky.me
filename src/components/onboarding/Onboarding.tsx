"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Turnstile } from "@/components/landing/Turnstile";
import { Tony } from "@/components/mascot/Tony";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { hasTurnstile } from "@/config/services";
import { onboardingCopy } from "@/i18n/onboarding";
import { track } from "@/lib/analytics";
import { createSession, submitBrief } from "@/lib/onboarding/client";
import {
  clearDraft,
  emptyDraft,
  hasProgress,
  readDraft,
  writeDraft,
  type Draft,
  type Session,
  type UploadedFile,
} from "@/lib/onboarding/draft";
import {
  isLanguage,
  isPackageId,
  stepErrors,
  visibleQuestions,
  visibleSteps,
  type AnswerValue,
  type ApiErrorCode,
  type FieldErrors,
  type Language,
  type PackageId,
  type QuestionId,
  type StepId,
} from "@/lib/onboarding/schema";
import { LanguageGate, PackageGate, ResumeCard, type PackageCard } from "./Gate";
import { ReviewStep } from "./ReviewStep";
import { Shell } from "./Shell";
import { StepView } from "./StepView";
import { Success } from "./Success";

/**
 * The brief, end to end.
 *
 * This component owns the whole wizard: which screen is showing, what has been
 * answered, which files went up, and the one signed session that authorises
 * them. Everything it renders is derived — the steps come from the package and
 * the answers, the words come from the chosen language, and neither is
 * duplicated per case.
 *
 * Three things are deliberately kept in refs rather than in state: the session,
 * the bot-check token, and the in-flight session request. All three are read
 * inside async handlers, where a value captured from a render is the wrong
 * value by the time it is used — and none of them is something the screen
 * renders.
 */

type Phase = "language" | "resume" | "package" | "form" | "review" | "done";

export function Onboarding({ cards }: { cards: Record<Language, readonly PackageCard[]> }) {
  const [phase, setPhase] = useState<Phase>("language");
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saved, setSaved] = useState<Draft | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<ApiErrorCode | null>(null);
  const [sending, setSending] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [challengeNonce, setChallengeNonce] = useState(0);
  const [restored, setRestored] = useState(false);

  const challenge = useRef("");
  const session = useRef<Session | null>(null);
  const opening = useRef<Promise<Session | null> | null>(null);

  /* `saved` matters here as well as `draft`: on the resume screen the draft has
     not been adopted yet, and a client who left off in English should not be
     greeted by a Montenegrin header and footer. */
  const language: Language = draft.language ?? saved?.language ?? "me";
  const copy = onboardingCopy[language];
  const packageId: PackageId = draft.packageId ?? "business";

  const steps = visibleSteps(packageId, draft.answers);
  const index = Math.min(stepIndex, Math.max(0, steps.length - 1));
  const step = steps[index];

  /* ── Arriving ──────────────────────────────────────────────────────────
     The package and the language can both come from the link VibeLab sent, so
     a client who was given `/start/?package=business` never sees the package
     question. Neither value is trusted beyond deciding what to show: the
     server re-checks the package before it stores anything.

     This is the one restore-from-storage effect, and it has to be an effect.
     The query string and localStorage do not exist while this page is being
     prerendered, so reading them during render would either crash the build or
     — worse — produce markup that disagrees with what the browser then
     hydrates. It runs once, on mount, and never again. */
  /* eslint-disable react-hooks/set-state-in-effect -- see above: a one-time
     read of two client-only stores, which cannot happen during render. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkPackage = params.get("package");
    const linkLanguage = params.get("lang");

    const fromLink: Draft = {
      ...emptyDraft,
      language: isLanguage(linkLanguage) ? linkLanguage : null,
      packageId: isPackageId(linkPackage) ? linkPackage : null,
      packageSource: isPackageId(linkPackage) ? "link" : null,
    };

    const stored = readDraft();
    if (stored && hasProgress(stored)) {
      setSaved(stored);
      setPhase("resume");
    } else {
      setDraft(fromLink);
      setPhase(fromLink.language ? (fromLink.packageId ? "form" : "package") : "language");
    }

    setRestored(true);
    track("onboarding_opened", {
      package: isPackageId(linkPackage) ? linkPackage : "none",
    });
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* Written on every change rather than on leaving a step: the client who is
     going to be interrupted is the one halfway through typing. */
  useEffect(() => {
    if (restored && phase !== "done") writeDraft(draft);
  }, [draft, restored, phase]);

  /* The document's language has to follow the client's choice — a screen
     reader given `lang="sr-ME"` will read an English brief in a Montenegrin
     voice. Restored on the way out, because Next navigates away from this
     route without reloading the document.

     Only `lang`, not the title: Next's metadata system owns `<title>` and
     rewrites it on every render, so assigning to `document.title` here would
     be undone on the next one. The tab therefore keeps the route's
     Montenegrin name in both languages — a real but small cost on a page that
     is `noindex` and reached by a link, and much smaller than a loop fighting
     the framework for it. */
  useEffect(() => {
    const documentLanguage = document.documentElement.lang;
    return () => {
      document.documentElement.lang = documentLanguage;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
  }, [copy.htmlLang]);

  /* Focus follows the screen. Without this, moving to step three leaves a
     keyboard or screen-reader user at the bottom of step two, listening to a
     button that has silently changed what it does. */
  useEffect(() => {
    if (!restored) return;
    const heading = document.getElementById("ob-heading");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [phase, index, restored]);

  const setAnswer = useCallback((id: QuestionId, value: AnswerValue) => {
    setDraft((current) => ({ ...current, answers: { ...current.answers, [id]: value } }));
    setErrors((current) => {
      if (!(id in current)) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
    setApiError(null);
  }, []);

  const addFile = useCallback((file: UploadedFile) => {
    setDraft((current) => ({ ...current, files: [...current.files, file] }));
    track("onboarding_file_uploaded", { zone: file.zone });
  }, []);

  const dropFile = useCallback((id: string) => {
    setDraft((current) => ({ ...current, files: current.files.filter((file) => file.id !== id) }));
  }, []);

  /**
   * One session per client, created the first time anything actually needs it —
   * the first file, or the submission if they upload nothing. Concurrent
   * callers share the same in-flight request rather than opening two.
   */
  const ensureSession = useCallback(async (): Promise<Session | null> => {
    const current = session.current;
    if (current && current.expiresAt > Date.now() + 60_000) return current;
    if (opening.current) return opening.current;

    opening.current = (async () => {
      const result = await createSession(challenge.current);
      /* A Turnstile token is single-use and short-lived, so the widget is asked
         for a fresh one whether this succeeded or not. */
      challenge.current = "";
      setChallengeNonce((nonce) => nonce + 1);

      if (!result.ok) {
        setApiError(result.code);
        return null;
      }
      session.current = result.data;
      setDraft((value) => ({ ...value, session: result.data }));
      return result.data;
    })();

    const created = await opening.current;
    opening.current = null;
    return created;
  }, []);

  function focusProblem(problems: FieldErrors) {
    const first = Object.keys(problems)[0];
    if (first) document.getElementById(`q-${first}`)?.focus();
  }

  function goNext() {
    const problems = stepErrors(step, packageId, draft.answers);
    if (Object.keys(problems).length > 0) {
      setErrors(problems);
      focusProblem(problems);
      return;
    }

    setErrors({});
    track("onboarding_step_completed", { step: step.id, package: packageId });

    if (index === steps.length - 1) {
      setPhase("review");
      track("onboarding_review_opened", { package: packageId });
      return;
    }

    const next = steps[index + 1];
    setStepIndex(index + 1);
    setDraft((current) => ({ ...current, stepId: next.id }));
  }

  function goBack() {
    if (phase === "review") {
      setPhase("form");
      setStepIndex(steps.length - 1);
      return;
    }
    if (index === 0) return;
    setStepIndex(index - 1);
    setDraft((current) => ({ ...current, stepId: steps[index - 1].id }));
  }

  function editSection(stepId: StepId) {
    const target = steps.findIndex((candidate) => candidate.id === stepId);
    if (target < 0) return;
    setStepIndex(target);
    setDraft((current) => ({ ...current, stepId }));
    setPhase("form");
  }

  function switchLanguage() {
    const next: Language = language === "me" ? "en" : "me";
    setDraft((current) => ({ ...current, language: next }));
    track("onboarding_language_selected", { lang: next });
  }

  async function submit() {
    if (sending) return;
    setSending(true);
    setApiError(null);
    track("onboarding_submission_started", { package: packageId });

    const result = await submitBrief({
      session: session.current,
      challenge: challenge.current,
      packageId,
      packageSource: draft.packageSource ?? "client",
      language,
      answers: draft.answers,
    });

    challenge.current = "";
    setChallengeNonce((nonce) => nonce + 1);

    if (result.ok) {
      /* Only now. Until the server has said yes, the client's answers stay on
         their device — a submission that failed and a draft that was thrown
         away is the one outcome this form must never produce. */
      setSubmissionId(result.data.submissionId);
      clearDraft();
      setPhase("done");
      track("onboarding_submission_success", { package: packageId });
      return;
    }

    setSending(false);
    setApiError(result.code);
    track("onboarding_submission_error", { reason: result.code });

    if (result.fields) {
      const problems = result.fields;
      setErrors(problems);
      const failing = steps.findIndex((candidate) =>
        visibleQuestions(candidate, packageId, draft.answers).some(
          (question) => question.id in problems,
        ),
      );
      if (failing >= 0) {
        setStepIndex(failing);
        setPhase("form");
      }
    }
  }

  /* The bot check is only mounted where a token is about to be spent: the
     materials step, which opens the session, and the review screen, which
     sends the brief. A token is good for five minutes and a brief takes longer
     than that, so mounting it on step one would guarantee an expired one at
     the end. */
  const needsChallenge =
    hasTurnstile && (phase === "review" || (phase === "form" && step?.id === "materials"));

  const packageName =
    draft.packageId && phase !== "language" && phase !== "package"
      ? cards[language].find((card) => card.id === draft.packageId)?.name
      : undefined;

  const progress =
    phase === "form"
      ? { current: index + 1, total: steps.length + 1 }
      : phase === "review"
        ? { current: steps.length + 1, total: steps.length + 1 }
        : undefined;

  const shell = (children: React.ReactNode) => (
    <Shell
      copy={copy}
      packageName={packageName}
      onLanguage={switchLanguage}
      progress={progress}
      /* The draft was cleared the moment the brief was accepted, so the note
         saying it is being kept would be a lie on this one screen. */
      showDraftNote={phase !== "done"}
    >
      {children}
    </Shell>
  );

  if (phase === "resume" && saved) {
    return shell(
      <ResumeCard
        copy={copy}
        onContinue={() => {
          session.current = saved.session;
          /* Keeps a language switched on the resume screen itself. */
          setDraft({ ...saved, language });
          const restoredSteps = visibleSteps(saved.packageId ?? "business", saved.answers);
          const at = restoredSteps.findIndex((candidate) => candidate.id === saved.stepId);
          setStepIndex(at < 0 ? 0 : at);
          setPhase(saved.language ? (saved.packageId ? "form" : "package") : "language");
          setSaved(null);
        }}
        onRestart={() => {
          clearDraft();
          session.current = null;
          setDraft(emptyDraft);
          setStepIndex(0);
          setPhase("language");
          setSaved(null);
        }}
      />,
    );
  }

  if (phase === "language") {
    return shell(
      <LanguageGate
        copy={copy}
        language={draft.language}
        onPick={(picked) => {
          setDraft((current) => ({ ...current, language: picked }));
          track("onboarding_language_selected", { lang: picked });
        }}
        onStart={() => {
          setPhase(draft.packageId ? "form" : "package");
          track("onboarding_started", { package: draft.packageId ?? "unknown" });
        }}
      />,
    );
  }

  if (phase === "package") {
    return shell(
      <PackageGate
        copy={copy}
        cards={cards[language]}
        /* Three states, not two: a package, "nisam siguran" (which is `null`,
           a real answer), and nothing chosen yet (`undefined`). Collapsing the
           last two would show "Nisam siguran" pre-selected to a client who has
           not touched anything. */
        chosen={
          draft.packageSource === "unsure" ? null : (draft.packageId ?? undefined)
        }
        onPick={(picked) =>
          setDraft((current) => ({
            ...current,
            /* "Nisam siguran" is an answer, not an absence: the brief is built
               on the middle package and the row records that the client was
               not certain, so VibeLab reads it as a question to settle. */
            packageId: picked ?? "business",
            packageSource: picked ? "client" : "unsure",
          }))
        }
        onContinue={() => {
          setPhase("form");
          track("onboarding_started", { package: draft.packageId ?? "business" });
        }}
      />,
    );
  }

  if (phase === "done") {
    return shell(<Success copy={copy} submissionId={submissionId} />);
  }

  const stepCopy = step ? copy.steps[step.id] : null;
  const showErrorSummary = Object.keys(errors).length > 0;

  return shell(
    <>
      <PixelWindow title="VIBELAB OS">
        <div className="p-5 sm:p-8">
          {phase === "review" ? (
            <>
              <h1 id="ob-heading" tabIndex={-1} className="headline text-2xl outline-none sm:text-3xl">
                {copy.review.title}
              </h1>
              <p className="mt-2 leading-relaxed text-muted">{copy.review.intro}</p>
              <div className="mt-7">
                <ReviewStep
                  copy={copy}
                  packageId={packageId}
                  answers={draft.answers}
                  files={draft.files}
                  onEdit={editSection}
                />
              </div>
            </>
          ) : (
            step &&
            stepCopy && (
              <>
                <h1
                  id="ob-heading"
                  tabIndex={-1}
                  className="headline text-2xl outline-none sm:text-3xl"
                >
                  {stepCopy.title}
                </h1>
                <p className="mt-2 leading-relaxed text-muted">{stepCopy.intro}</p>

                {stepCopy.tony && (
                  <div className="tony-ground mt-5 flex items-end gap-3">
                    <Tony direction="right" pose="work" scale={0.24} />
                    <p className="px-say mb-2 px-3 py-2 text-sm leading-snug font-semibold">
                      {stepCopy.tony}
                    </p>
                  </div>
                )}

                {showErrorSummary && (
                  <p
                    role="alert"
                    className="mt-6 border-l-2 border-red bg-paper-2 px-4 py-3 text-sm font-semibold text-red"
                  >
                    {copy.chrome.errorSummary}
                  </p>
                )}

                <div className="mt-7">
                  <StepView
                    copy={copy}
                    step={step}
                    packageId={packageId}
                    answers={draft.answers}
                    errors={errors}
                    files={draft.files}
                    totalBytes={draft.files.reduce((sum, file) => sum + file.size, 0)}
                    getSession={ensureSession}
                    onAnswer={setAnswer}
                    onUploaded={addFile}
                    onRemoved={dropFile}
                  />
                </div>
              </>
            )
          )}
        </div>
      </PixelWindow>

      {/* Mounted while empty as well as while set, so the message a client is
          waiting for is announced when it arrives rather than appearing in a
          region a screen reader has never seen. */}
      <p
        role="status"
        className={apiError ? "mt-4 text-sm font-semibold text-red" : undefined}
      >
        {apiError && copy.errors.api[apiError]}
      </p>

      {needsChallenge && (
        <Turnstile
          key={challengeNonce}
          onToken={(token) => {
            challenge.current = token;
          }}
        />
      )}

      {/* Bleeds to the window edges on the way past the shell's gutter, so the
          bar reads as a bar rather than as two buttons floating over the
          content scrolling behind them. */}
      <div className="sticky bottom-0 z-10 -mx-5 mt-6 flex gap-3 border-t-2 border-ink bg-paper px-5 py-3 sm:-mx-8 sm:px-8">
        <button
          type="button"
          onClick={goBack}
          disabled={phase === "form" && index === 0}
          className="px px-btn inline-flex min-h-12 items-center bg-paper px-5 py-3 text-[1.25rem] text-ink transition-colors hover:text-red disabled:opacity-40"
        >
          {copy.chrome.back}
        </button>

        {phase === "review" ? (
          <button
            type="button"
            onClick={() => void submit()}
            disabled={sending}
            aria-busy={sending}
            className="px px-btn px-btn--primary inline-flex min-h-12 flex-1 items-center justify-center bg-red px-5 py-3 text-center text-[1.25rem] text-white hover:bg-red-deep disabled:opacity-70"
          >
            {sending ? copy.review.sending : copy.review.submit}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="px px-btn px-btn--primary inline-flex min-h-12 flex-1 items-center justify-center bg-red px-5 py-3 text-center text-[1.25rem] text-white hover:bg-red-deep"
          >
            {index === steps.length - 1 ? copy.chrome.toReview : copy.chrome.next}
          </button>
        )}
      </div>
    </>,
  );
}
