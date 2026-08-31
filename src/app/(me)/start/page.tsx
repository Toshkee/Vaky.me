import type { Metadata } from "next";
import Link from "next/link";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { OsBadge } from "@/components/ui/OsBadge";
import { Vaky } from "@/components/mascot/Vaky";
import { onboardingCopy } from "@/i18n/onboarding";
import { emailLink, instagramDmLink, site } from "@/config/site";

/**
 * What `/start/` is: the page that catches a broken onboarding link.
 *
 * Nothing on the site links here, and it is noindex — so almost nobody arrives
 * by browsing. They arrive because `functions/start/[token].ts` sent them:
 * that route accepts only a token of the right shape and redirects everything
 * else here, which in practice means a client whose link was cut in half by
 * the messenger it was sent through.
 *
 * So the page leads with that: what went wrong, how to fix it themselves, and
 * how to reach us if they can't. The rarer visitor — someone who never had a
 * link — gets the short version below the rule, not the top of the page.
 *
 * Both languages at once, because nobody has chosen one here. The English half
 * stays shorter: a visitor who reads only English needs to know their link was
 * cut and where to write, not the whole explanation twice.
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
        <div className="p-5 sm:p-8">
          {/* Only the recovery half is two columns — that is where the mascot
              belongs, beside the thing the visitor came to solve. The blocks
              under it run full width; a column kept open for him alongside
              them would be a tall empty gutter. */}
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <OsBadge tone="red">{me.eyebrow}</OsBadge>

              <h1 className="headline mt-4 text-3xl sm:text-4xl">{me.title}</h1>
              <p className="mt-3 max-w-lg leading-relaxed text-muted">{me.body}</p>

              <h2 className="eyebrow mt-8 text-muted">{me.fixTitle}</h2>
              <ol className="mt-3 max-w-lg space-y-2">
                {me.fix.map((line, index) => (
                  <li key={line} className="flex gap-3 leading-relaxed">
                    {/* Fixed width and tabular figures so the second step's
                        text starts exactly where the first one's does. */}
                    <span aria-hidden="true" className="tnum w-4 shrink-0 font-bold text-red">
                      {index + 1}.
                    </span>
                    {line}
                  </li>
                ))}
              </ol>

              {/* Instagram first: most links go out in a DM, so replying there
                  is one tap and lands in the thread the link came from. */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href={instagramDmLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px px-btn px-btn--primary inline-flex min-h-12 items-center bg-red px-7 py-3 text-[1.25rem] text-white hover:bg-red-deep"
                >
                  {me.dm}
                </a>
                <Link
                  href="/"
                  className="px px-btn inline-flex min-h-12 items-center bg-paper px-5 py-3 text-[1.25rem] text-ink transition-colors hover:text-red"
                >
                  {me.action}
                </Link>
              </div>

              <p className="mt-4 font-semibold">
                <a
                  href={emailLink("Link za upitnik ne radi")}
                  className="underline decoration-2 underline-offset-4 transition-colors hover:text-red"
                >
                  {site.email}
                </a>
              </p>
            </div>

            <div aria-hidden="true" className="vaky-ground hidden items-end justify-center lg:flex">
              <Vaky direction="front" pose="look" scale={0.6} />
            </div>
          </div>

          <div className="mt-9 border-t-2 border-line pt-6">
            <h2 className="text-lg font-bold">{me.strangerTitle}</h2>
            <p className="mt-2 max-w-lg leading-relaxed text-muted">{me.strangerBody}</p>
            <p className="mt-3 font-semibold">
              <Link
                href="/#kontakt"
                className="underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
              >
                {me.strangerAction}
              </Link>
            </p>
          </div>

          <div lang="en" className="mt-9 border-t-2 border-line pt-6">
            <h2 className="text-lg font-bold">{en.title}</h2>
            <p className="mt-2 max-w-lg leading-relaxed text-muted">{en.body}</p>
            <p className="mt-3 max-w-lg font-semibold">{en.fix[1]}</p>
          </div>
        </div>
      </PixelWindow>
    </main>
  );
}
