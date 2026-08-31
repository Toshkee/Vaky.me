import type { ReactNode } from "react";
import Link from "next/link";
import type { OnboardingCopy } from "@/i18n/onboarding";
import { OsBadge } from "@/components/ui/OsBadge";
import { BrandWordmark } from "@/components/BrandWordmark";
import { fill } from "./copy";

/**
 * The chrome around the brief: a masthead, a progress readout, and the footer
 * note that says the answers are being kept.
 *
 * Deliberately not the site's `Nav`. That masthead's links point at sections of
 * the landing page, and its language toggle is a link to `/en/` — on this route
 * both would throw away a half-filled form. What a client filling in a brief
 * needs from a header is three things: that this is Vaky, which package they
 * are answering for, and how to switch language without losing anything.
 */
export function Shell({
  copy,
  packageName,
  onLanguage,
  progress,
  showDraftNote = true,
  children,
}: {
  copy: OnboardingCopy;
  /** The plan name from the pricing table, once one is known. */
  packageName?: string;
  onLanguage: () => void;
  /** Absent on the opening screens and on the success screen, where there is
   *  no progress to report. */
  progress?: { current: number; total: number };
  showDraftNote?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b-2 border-ink bg-paper">
        <div className="shell flex h-14 items-center justify-between gap-3 sm:h-16">
          <Link href="/" className="tap shrink-0">
            <BrandWordmark className="text-[1.7rem] leading-none sm:text-[1.85rem]" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {packageName && (
              <OsBadge>
                {copy.chrome.packageLabel}: {packageName}
              </OsBadge>
            )}
            <button
              type="button"
              onClick={onLanguage}
              aria-label={`${copy.chrome.languageLabel}: ${copy.chrome.otherLanguage}`}
              className="tap px-1 text-sm font-bold transition-colors hover:text-red"
            >
              {copy.chrome.otherLanguage}
            </button>
          </div>
        </div>
      </header>

      <main className="shell w-full flex-1 py-6 sm:py-10">
        {progress && (
          <div className="mb-4">
            <p className="eyebrow text-muted">
              {fill(copy.chrome.step, { n: progress.current, total: progress.total })}
            </p>
            <div
              role="progressbar"
              aria-label={copy.chrome.progressLabel}
              aria-valuenow={progress.current}
              aria-valuemin={1}
              aria-valuemax={progress.total}
              className="os-bar mt-2"
            >
              <div
                className="os-bar-fill"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {children}
      </main>

      <footer className="shell w-full pt-2 pb-8 text-xs leading-relaxed text-muted">
        {showDraftNote && `${copy.chrome.draftNote} `}
        <Link
          href="/"
          className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:text-red"
        >
          {copy.chrome.home}
        </Link>
      </footer>
    </>
  );
}
