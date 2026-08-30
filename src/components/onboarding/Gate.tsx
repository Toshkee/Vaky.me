"use client";

import { useState } from "react";
import type { OnboardingCopy } from "@/i18n/onboarding";
import { Tony } from "@/components/mascot/Tony";
import { OsBadge } from "@/components/ui/OsBadge";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { LANGUAGES, type Language, type PackageId } from "@/lib/onboarding/schema";

/**
 * The three screens before the brief starts.
 *
 * They are grouped here because they are the same kind of thing: one decision
 * each, nothing to fill in, and a single button out. None of them counts
 * towards "Korak 1 od 7" — being asked to pick a language should not read as
 * work.
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
    <PixelWindow title="VIBELAB OS">
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
    <PixelWindow title="VIBELAB OS">
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

export type PackageCard = {
  id: PackageId;
  name: string;
  price: string;
  tagline: string;
};

export function PackageGate({
  copy,
  cards,
  chosen,
  onPick,
  onContinue,
}: {
  copy: OnboardingCopy;
  cards: readonly PackageCard[];
  /** `null` means "not sure" has been picked — a real answer, not an absence. */
  chosen: PackageId | null | undefined;
  onPick: (id: PackageId | null) => void;
  onContinue: () => void;
}) {
  const picked = chosen !== undefined;

  return (
    <PixelWindow title="VIBELAB OS">
      <div className="p-5 sm:p-8">
        <h1 id="ob-heading" tabIndex={-1} className="headline text-2xl outline-none sm:text-3xl">
          {copy.packageGate.title}
        </h1>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">{copy.packageGate.intro}</p>

        <fieldset className="mt-6 border-0 p-0">
          <legend className="sr-only">{copy.packageGate.title}</legend>
          <div className="grid gap-2">
            {cards.map((card) => {
              const checked = chosen === card.id;
              return (
                <label
                  key={card.id}
                  className={`${tile} items-start ${checked ? "border-ink bg-paper-2" : "border-line bg-paper hover:border-muted"}`}
                >
                  <input
                    type="radio"
                    name="onboarding-package"
                    value={card.id}
                    checked={checked}
                    onChange={() => onPick(card.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink ${
                      checked ? "bg-red" : "bg-paper"
                    }`}
                  >
                    {checked && <span className="block h-1.5 w-1.5 rounded-full bg-paper" />}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-lg font-semibold">{card.name}</span>
                      <span className="tnum text-base font-semibold text-red">{card.price}</span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {card.tagline}
                    </span>
                  </span>
                </label>
              );
            })}

            <label
              className={`${tile} ${chosen === null ? "border-ink bg-paper-2" : "border-line bg-paper hover:border-muted"}`}
            >
              <input
                type="radio"
                name="onboarding-package"
                value="unsure"
                checked={chosen === null}
                onChange={() => onPick(null)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink ${
                  chosen === null ? "bg-red" : "bg-paper"
                }`}
              >
                {chosen === null && <span className="block h-1.5 w-1.5 rounded-full bg-paper" />}
              </span>
              <span className="min-w-0">
                <span className="text-lg font-semibold">{copy.packageGate.unsure}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  {copy.packageGate.unsureHelp}
                </span>
              </span>
            </label>
          </div>
        </fieldset>

        <button
          type="button"
          onClick={onContinue}
          disabled={!picked}
          className="px px-btn px-btn--primary mt-6 inline-flex min-h-12 items-center bg-red px-7 py-3 text-[1.25rem] text-white hover:bg-red-deep disabled:opacity-50"
        >
          {copy.packageGate.action}
        </button>
      </div>
    </PixelWindow>
  );
}
