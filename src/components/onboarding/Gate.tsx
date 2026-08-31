"use client";

import { useState } from "react";
import type { OnboardingCopy } from "@/i18n/onboarding";
import { Tony } from "@/components/mascot/Tony";
import { OsBadge } from "@/components/ui/OsBadge";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { emailLink, site } from "@/config/site";
import { LANGUAGES, type Language } from "@/lib/onboarding/schema";

/**
 * The screens around the brief itself: pick a language, resume a draft, and
 * the two dead ends a private link can arrive at — not a link Vaky issued,
 * or a brief already sent.
 *
 * They are grouped here because they are the same kind of thing: one decision
 * each (or none), nothing to fill in, and a single way out. None of them
 * counts towards "Korak 1 od 7" — being asked to pick a language should not
 * read as work.
 */

const tile =
  "pick flex min-h-14 cursor-pointer items-center gap-3 border-2 px-4 py-3 text-left transition-colors";

export function LanguageGate({
  copy,
  language,
  onPick,
  onStart,
}: {
  copy: OnboardingCopy;
  language: Language | null;
  onPick: (language: Language) => void;
  onStart: () => void;
}) {
  return (
    <PixelWindow title="VAKY OS">
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <OsBadge tone="red">{copy.gate.eyebrow}</OsBadge>
          <h1 id="ob-heading" tabIndex={-1} className="headline mt-4 text-3xl outline-none sm:text-4xl">
            {copy.gate.title}
          </h1>
          <p className="mt-3 max-w-lg leading-relaxed text-muted">{copy.gate.intro}</p>

          <fieldset className="mt-7 border-0 p-0">
            <legend className="eyebrow text-muted">{copy.gate.languageLabel}</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {LANGUAGES.map((option) => {
                const checked = language === option;
                return (
                  <label
                    key={option}
                    className={`${tile} ${checked ? "border-ink bg-paper-2" : "border-line bg-paper hover:border-muted"}`}
                  >
                    <input
                      type="radio"
                      name="onboarding-language"
                      value={option}
                      checked={checked}
                      onChange={() => onPick(option)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink ${
                        checked ? "bg-red" : "bg-paper"
                      }`}
                    >
                      {checked && <span className="block h-1.5 w-1.5 rounded-full bg-paper" />}
                    </span>
                    <span className="text-lg font-semibold">{copy.gate[option]}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={onStart}
              disabled={!language}
              className="px px-btn px-btn--primary inline-flex min-h-12 items-center bg-red px-7 py-3 text-[1.25rem] text-white hover:bg-red-deep disabled:opacity-50"
            >
              {copy.gate.action}
            </button>
            <p className="text-sm text-muted">{copy.gate.minutes}</p>
          </div>
        </div>

        {/* Tony's one appearance before the form: the line that tells a client
            it is fine not to know an answer. */}
        <div aria-hidden="true" className="tony-ground hidden items-end justify-center lg:flex">
          <div className="relative">
            <span className="px-say absolute bottom-24 left-full ml-3 w-48 px-3 py-2 text-sm leading-snug font-semibold">
              {copy.gate.tony}
            </span>
            <Tony direction="front" pose="look" scale={0.55} />
          </div>
        </div>
      </div>
    </PixelWindow>
  );
}

export function ResumeCard({
  copy,
  onContinue,
  onRestart,
}: {
  copy: OnboardingCopy;
  onContinue: () => void;
  onRestart: () => void;
}) {
  /* Two taps to throw the draft away, the same way the concept form asks twice
     before it hands the visitor off to Instagram. Deleting somebody's
     half-written brief on a mis-tap is not a recoverable mistake. */
  const [confirming, setConfirming] = useState(false);

  return (
    <PixelWindow title="VAKY OS">
      <div className="p-5 sm:p-8">
        <OsBadge tone="red">{copy.gate.eyebrow}</OsBadge>
        <h1 id="ob-heading" tabIndex={-1} className="headline mt-4 text-2xl outline-none sm:text-3xl">
          {copy.resume.title}
        </h1>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">{copy.resume.body}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onContinue}
            className="px px-btn px-btn--primary inline-flex min-h-12 items-center bg-red px-7 py-3 text-[1.25rem] text-white hover:bg-red-deep"
          >
            {copy.resume.action}
          </button>
          <button
            type="button"
            onClick={() => (confirming ? onRestart() : setConfirming(true))}
            className={`tap text-sm font-semibold underline decoration-2 underline-offset-4 transition-colors ${
              confirming ? "text-red" : "text-muted hover:text-red"
            }`}
          >
            {confirming ? copy.resume.restartConfirm : copy.resume.restart}
          </button>
        </div>
      </div>
    </PixelWindow>
  );
}

/**
 * Where an unusable link lands: quietly invalid, or already completed. Both
 * end the same way — the two channels this studio actually answers on — and
 * neither is written as an error, because for the completed case nothing is
 * wrong: their brief arrived, and this screen is merely the second visit.
 */
export function LinkProblem({
  copy,
  kind,
}: {
  copy: OnboardingCopy;
  kind: "invalid" | "completed";
}) {
  const title = kind === "invalid" ? copy.privateLink.invalidTitle : copy.privateLink.completedTitle;
  const body = kind === "invalid" ? copy.privateLink.invalidBody : copy.privateLink.completedBody;

  return (
    <PixelWindow title="VAKY OS">
      <div className="p-5 sm:p-8">
        <OsBadge tone="red">{copy.gate.eyebrow}</OsBadge>
        <h1 id="ob-heading" tabIndex={-1} className="headline mt-4 text-2xl outline-none sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">{body}</p>

        <p className="mt-6 font-semibold">
          <a
            href={emailLink(title, "")}
            className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-4 transition-colors hover:text-red"
          >
            {site.email}
          </a>
        </p>
      </div>
    </PixelWindow>
  );
}
