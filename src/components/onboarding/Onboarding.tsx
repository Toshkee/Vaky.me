"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Tony } from "@/components/mascot/Tony";
import { onboardingCopy } from "@/i18n/onboarding";
import { track } from "@/lib/analytics";
import {
  createSession,
  fetchContext,
  submitBrief,
  type LinkContext,
} from "@/lib/onboarding/client";
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
  stepErrors,
  visibleQuestions,
  visibleSteps,
  type Answers,
  type AnswerValue,
  type ApiErrorCode,
  type FieldErrors,
  type Language,
  type PackageId,
  type QuestionId,
  type StepId,
} from "@/lib/onboarding/schema";
import { LanguageGate, LinkProblem, ResumeCard } from "./Gate";
import { ReviewStep } from "./ReviewStep";
import { Shell } from "./Shell";
import { StepView } from "./StepView";
import { Success } from "./Success";

/**
 * The brief, end to end, behind a private link.
 *
 * This component owns the whole wizard: which screen is showing, what has
 * been answered, which files went up, and the one signed session that
 * authorises them. Everything it renders is derived — the steps come from the
 * package and the answers, the words come from the chosen language — and the
 * package itself is not this component's to decide: it arrives from the
 * server against the link's token, and nothing here can change it.
 *
 * Two things are deliberately kept in refs rather than in state: the session
 * and the in-flight session request. Both are read inside async handlers,
 * where a value captured from a render is the wrong value by the time it is
 * used — and neither is something the screen renders.
 */

/** The same shape `functions/start/[token].ts` and the API accept. */
const TOKEN_SHAPE = /^[A-Za-z0-9_-]{28,40}$/;

type Phase =
  | "loading"
  | "invalid"
  | "completed"
  | "resume"
  | "language"
  | "form"
  | "review"
  | "done";

export function Onboarding({
  token,
  packageNames,
}: {
  /** The path segment of the link Vaky sent — the client's only credential. */
  token: string;
  /** Per-language display names for the package chip in the header. */
  packageNames: Record<Language, Record<PackageId, string>>;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [context, setContext] = useState<LinkContext | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saved, setSaved] = useState<Draft | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<ApiErrorCode | null>(null);
  const [sending, setSending] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [restored, setRestored] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const session = useRef<Session | null>(null);
  const opening = useRef<Promise<Session | null> | null>(null);

  /* `saved` matters here as well as `draft`: on the resume screen the draft has
     not been adopted yet, and a client who left off in English should not be
     greeted by a Montenegrin header and footer. */
  const language: Language = draft.language ?? saved?.language ?? context?.language ?? "me";
  const copy = onboardingCopy[language];
  const packageId: PackageId = context?.packageId ?? "business";

  /* A path that never carried a token — somebody typing `/start/form/`, or a
     link that lost its tail in a chat app. Derived rather than a phase set on
     mount: the answer is known before the first paint, and asking the server
     to say the same thing a round trip later helps nobody. */
  const usableToken = TOKEN_SHAPE.test(token);

  const steps = visibleSteps(packageId, draft.answers);
  const index = Math.min(stepIndex, Math.max(0, steps.length - 1));
  const step = steps[index];

  /* ── Arriving ──────────────────────────────────────────────────────────
     The token is exchanged for its context before anything is shown: which
     package this form asks about, and what Vaky already knows about the
     business — so step one arrives pre-filled instead of asking a client to
     retype what they told us on Instagram last week. A saved draft on this
     device wins over the prefill wherever both have something to say. */
  useEffect(() => {
    if (!usableToken) return;

    let alive = true;
    const stored = readDraft(token);

    void (async () => {
      const result = await fetchContext(token);
      if (!alive) return;

      if (!result.ok) {
        if (result.code === "link") setPhase("invalid");
        else if (result.code === "completed") setPhase("completed");
        else setApiError(result.code); // stays on "loading", which offers retry
        return;
      }

      const prefill: Answers = {};
      const project = result.data.project;
      if (project.businessName) prefill.businessName = project.businessName;
      if (project.contactName) prefill.contactName = project.contactName;
      if (project.email) prefill.email = project.email;
      if (project.phone) prefill.phone = project.phone;
      if (project.instagram) prefill.instagram = project.instagram;
      if (project.existingSite) prefill.existingSite = project.existingSite;

      setContext(result.data);
      setApiError(null);

      if (stored && hasProgress(stored)) {
        setSaved({ ...stored, answers: { ...prefill, ...stored.answers } });
        setPhase("resume");
      } else {
        setDraft({
          ...emptyDraft,
          language: stored?.language ?? result.data.language,
          answers: prefill,
        });
        setPhase("language");
      }

      setRestored(true);
      track("onboarding_opened", { package: result.data.packageId });
    })();

    return () => {
      alive = false;
    };
  }, [token, usableToken, attempt]);

  /* Written on every change rather than on leaving a step: the client who is
     going to be interrupted is the one halfway through typing. */
  useEffect(() => {
    if (restored && phase !== "done") writeDraft(token, draft);
  }, [token, draft, restored, phase]);

  /* The document's language has to follow the client's choice — a screen
     reader given `lang="sr-ME"` will read an English brief in a Montenegrin
     voice. Restored on the way out, because Next navigates away from this
     route without reloading the document. */
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
   * the first file, or nothing at all. Concurrent callers share the same
   * in-flight request rather than opening two. A link that got cancelled or
   * completed under our feet surfaces here as its proper screen, not as a
   * cryptic upload failure.
   */
  const ensureSession = useCallback(async (): Promise<Session | null> => {
    const current = session.current;
    if (current && current.expiresAt > Date.now() + 60_000) return current;
    if (opening.current) return opening.current;

    opening.current = (async () => {
      const result = await createSession(token);
      if (!result.ok) {
        if (result.code === "link") setPhase("invalid");
        else if (result.code === "completed") setPhase("completed");
        else setApiError(result.code);
        return null;
      }
      session.current = result.data;
      setDraft((value) => ({ ...value, session: result.data }));
      return result.data;
    })();

    const created = await opening.current;
    opening.current = null;
    return created;
  }, [token]);

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

    const result = await submitBrief({ token, language, answers: draft.answers });

    if (result.ok) {
      /* Only now. Until the server has said yes, the client's answers stay on
         their device — a submission that failed and a draft that was thrown
         away is the one outcome this form must never produce. */
      setSubmissionId(result.data.submissionId);
      clearDraft(token);
      setPhase("done");
      track("onboarding_submission_success", { package: packageId });
      return;
    }

    setSending(false);
    track("onboarding_submission_error", { reason: result.code });

    if (result.code === "link") {
      setPhase("invalid");
      return;
    }
    if (result.code === "completed") {
      setPhase("completed");
      return;
    }
    setApiError(result.code);

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

  const packageName =
    context && phase !== "loading" ? packageNames[language][context.packageId] : undefined;

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
         saying it is being kept would be a lie on the closing screens. */
      showDraftNote={phase === "form" || phase === "review" || phase === "resume"}
    >
      {children}
    </Shell>
  );

  if (!usableToken) return shell(<LinkProblem copy={copy} kind="invalid" />);

  if (phase === "loading") {
    return shell(
      <PixelWindow title="VAKY OS">
        <div className="p-5 sm:p-8">
          <div className="tony-ground flex items-end gap-3">
            <Tony direction="right" pose="work" scale={0.24} />
            <p role="status" className="mb-2 text-lg font-semibold">
              {apiError ? copy.errors.api[apiError] : copy.privateLink.checking}
            </p>
          </div>
          {apiError && (
            <button
              type="button"
              onClick={() => {
                setApiError(null);
                setAttempt((current) => current + 1);
              }}
              className="px px-btn mt-5 inline-flex min-h-12 items-center bg-paper px-5 py-3 text-[1.25rem] text-ink transition-colors hover:text-red"
            >
              {copy.upload.retry}
            </button>
          )}
        </div>
      </PixelWindow>,
    );
  }

  if (phase === "invalid") return shell(<LinkProblem copy={copy} kind="invalid" />);
  if (phase === "completed") return shell(<LinkProblem copy={copy} kind="completed" />);

  if (phase === "resume" && saved) {
    return shell(
      <ResumeCard
        copy={copy}
        onContinue={() => {
          session.current = saved.session;
          /* Keeps a language switched on the resume screen itself. */
          setDraft({ ...saved, language });
          const restoredSteps = visibleSteps(packageId, saved.answers);
          const at = restoredSteps.findIndex((candidate) => candidate.id === saved.stepId);
          setStepIndex(at < 0 ? 0 : at);
          setPhase(saved.language ? "form" : "language");
          setSaved(null);
        }}
        onRestart={() => {
          clearDraft(token);
          session.current = null;
          /* Starting over keeps what Vaky pre-filled — it was never the
             client's typing to lose. */
          const prefill: Answers = {};
          const project = context?.project;
          if (project?.businessName) prefill.businessName = project.businessName;
          if (project?.contactName) prefill.contactName = project.contactName;
          if (project?.email) prefill.email = project.email;
          if (project?.phone) prefill.phone = project.phone;
          if (project?.instagram) prefill.instagram = project.instagram;
          if (project?.existingSite) prefill.existingSite = project.existingSite;
          setDraft({ ...emptyDraft, language, answers: prefill });
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
          setPhase("form");
          track("onboarding_started", { package: packageId });
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
      <PixelWindow title="VAKY OS">
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
