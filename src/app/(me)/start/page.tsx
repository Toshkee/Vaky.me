import type { Metadata } from "next";
import Link from "next/link";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { OsBadge } from "@/components/ui/OsBadge";
import { Tony } from "@/components/mascot/Tony";
import { dictionaries } from "@/i18n";
import { onboardingCopy } from "@/i18n/onboarding";
import { emailLink, site } from "@/config/site";

/**
 * What `/start/` is now: an explanation, not a form.
 *
 * The brief itself lives behind a link Vaky sends once a project is agreed
 * — `/start/{token}/`, answered by `functions/start/[token].ts`. Anyone who
 * arrives at the bare path either mistyped their link or found the URL some
 * other way, and both deserve a sentence telling them what this is instead of
 * an empty form they cannot use.
 *
 * Both languages at once, because nobody has chosen one here and this page is
 * three paragraphs long. `noindex` for the same reason the demo concepts are:
 * the landing page is the front door.
 */

const me = onboardingCopy.me.info;
const en = onboardingCopy.en.info;

export const metadata: Metadata = {
  title: onboardingCopy.me.meta.title,
  description: onboardingCopy.me.meta.description,
  robots: { index: false, follow: false },
};

export default function StartPage() {
  return (
    <main className="shell w-full py-10 sm:py-16">
      <PixelWindow title="VAKY OS">
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <OsBadge tone="red">{onboardingCopy.me.gate.eyebrow}</OsBadge>

            <h1 className="headline mt-4 text-3xl sm:text-4xl">{me.title}</h1>
            <p className="mt-3 max-w-lg leading-relaxed text-muted">{me.body}</p>

            <h2 className="eyebrow mt-8 text-muted">{me.stepsTitle}</h2>
            <ol className="mt-3 max-w-lg space-y-2">
              {me.steps.map((line, index) => (
                <li key={line} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="font-bold text-red">
                    {index + 1}.
                  </span>
                  {line}
                </li>
              ))}
            </ol>

            <p className="mt-6 max-w-lg font-semibold">{me.noLink}</p>

            <p className="mt-3 font-semibold">
              <a
                href={emailLink("Upitnik", "")}
                className="underline decoration-2 underline-offset-4 transition-colors hover:text-red"
              >
                {site.email}
              </a>
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/#kontakt"
                className="px px-btn px-btn--primary inline-flex min-h-12 items-center bg-red px-7 py-3 text-[1.25rem] text-white hover:bg-red-deep"
              >
                {dictionaries.me.contact.lead.submit}
              </Link>
              <Link
                href="/"
                className="px px-btn inline-flex min-h-12 items-center bg-paper px-5 py-3 text-[1.25rem] text-ink transition-colors hover:text-red"
              >
                {me.action}
              </Link>
            </div>

            {/* The English half stays deliberately short: a visitor who reads
                only English needs to know this is not the form and where to
                write, not the whole explanation twice. */}
            <div lang="en" className="mt-9 border-t-2 border-line pt-6">
              <h2 className="text-lg font-bold">{en.title}</h2>
              <p className="mt-2 max-w-lg leading-relaxed text-muted">{en.body}</p>
              <p className="mt-3 font-semibold">{en.noLink}</p>
            </div>
          </div>

          <div aria-hidden="true" className="tony-ground hidden items-end justify-center lg:flex">
            <Tony direction="front" pose="look" scale={0.6} />
          </div>
        </div>
      </PixelWindow>
    </main>
  );
}
