import Link from "next/link";
import type { OnboardingCopy } from "@/i18n/onboarding";
import { Note } from "@/components/ui/Note";
import { Frame } from "@/components/ui/Frame";

/**
 * The end.
 *
 * It carries one piece of information the client should keep — the project
 * number — and one thing to do next, which is nothing. The studio gets its
 * last line here because this is the moment that has earned it.
 */
export function Success({
  copy,
  submissionId,
}: {
  copy: OnboardingCopy;
  submissionId: string;
}) {
  return (
    <Frame>
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          {/* Every screen on this route names its heading the same way, and
              the wizard moves focus to it on each transition — see the focus
              effect in `Onboarding`. */}
          <h1 id="ob-heading" tabIndex={-1} className="headline text-3xl outline-none sm:text-4xl">
            {copy.success.title}
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed">{copy.success.body}</p>

          <div className="mt-7 rounded-2xl bg-paper-2 p-4">
            <p className="eyebrow text-muted">{copy.success.refLabel}</p>
            <p className="tnum mt-1 font-mono text-sm break-all">{submissionId}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{copy.success.note}</p>
          </div>

          <Link
            href="/"
            className="btn mt-7 inline-flex min-h-12 items-center bg-transparent px-7 py-3 text-ink hover:bg-ink hover:text-paper"
          >
            {copy.success.home}
          </Link>
        </div>

        <div className="flex items-end lg:justify-center">
          <Note>{copy.success.vaky}</Note>
        </div>
      </div>
    </Frame>
  );
}
