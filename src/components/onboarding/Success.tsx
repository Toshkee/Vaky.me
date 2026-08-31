import Link from "next/link";
import type { OnboardingCopy } from "@/i18n/onboarding";
import { Tony } from "@/components/mascot/Tony";
import { PixelWindow } from "@/components/ui/PixelWindow";

/**
 * The end.
 *
 * It carries one piece of information the client should keep — the project
 * number — and one thing to do next, which is nothing. Tony gets his last line
 * here because this is the moment that has earned it.
 */
export function Success({
  copy,
  submissionId,
}: {
  copy: OnboardingCopy;
  submissionId: string;
}) {
  return (
    <PixelWindow title="VAKY OS">
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          {/* Every screen on this route names its heading the same way, and
              the wizard moves focus to it on each transition — see the focus
              effect in `Onboarding`. */}
          <h1 id="ob-heading" tabIndex={-1} className="headline text-3xl outline-none sm:text-4xl">
            {copy.success.title}
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed">{copy.success.body}</p>

          <div className="mt-7 border-2 border-ink bg-paper-2 p-4">
            <p className="eyebrow text-muted">{copy.success.refLabel}</p>
            <p className="tnum mt-1 font-mono text-sm break-all">{submissionId}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{copy.success.note}</p>
          </div>

          <Link
            href="/"
            className="px px-btn mt-7 inline-flex min-h-12 items-center bg-paper px-7 py-3 text-[1.25rem] text-ink transition-colors hover:text-red"
          >
            {copy.success.home}
          </Link>
        </div>

        <div aria-hidden="true" className="tony-ground hidden items-end justify-center lg:flex">
          <div className="relative">
            <span className="px-say absolute bottom-24 left-full ml-3 w-44 px-3 py-2 text-sm leading-snug font-semibold">
              {copy.success.tony}
            </span>
            <Tony direction="front" pose="jump" jumps={3} scale={0.55} />
          </div>
        </div>
      </div>
    </PixelWindow>
  );
}
