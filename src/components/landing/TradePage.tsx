import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { SkipLink } from "@/components/ui/SkipLink";
import { Nav } from "./Nav";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { SectionHead } from "./SectionHead";
import { ProjectCase } from "./ProjectCase";
import { ArrowIcon } from "./icons";
import { heroFacts } from "./facts";

export type TradeKey = keyof Dictionary["trades"]["items"];

/** The path of a trade's page in the dictionary's language. */
export function tradePath(dict: Dictionary, key: TradeKey): string {
  const base = dict.lang === "en" ? "/en/" : "/";
  return `${base}${dict.trades.items[key].slug}/`;
}

/**
 * The landing page answered for one kind of business. Same masthead, same
 * facts, same price and the same form; what changes is the headline, what
 * such a site has to do, and which projects are shown — only the ones made
 * for this trade, all of them, with no tabs to work through.
 */
export function TradePage({ dict, tradeKey }: { dict: Dictionary; tradeKey: TradeKey }) {
  const trade = dict.trades.items[tradeKey];
  const projects = dict.work.items.find((item) => item.key === tradeKey)?.projects ?? [];
  const others = (Object.keys(dict.trades.items) as TradeKey[]).filter((key) => key !== tradeKey);
  const home = dict.lang === "en" ? "/en/" : "/";

  return (
    <>
      <SkipLink>{dict.nav.skip}</SkipLink>
      <Nav dict={dict} />
      {/* See LandingPage: without tabIndex the skip link only scrolls. */}
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section>
          <div className="shell pt-12 pb-16 sm:pt-20 sm:pb-24">
            <p className="eyebrow">{dict.trades.eyebrow}</p>
            <h1 className="headline display mt-6 max-w-4xl text-[clamp(2.6rem,6.4vw,5rem)]">{trade.title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{trade.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href="#kontakt" arrow event="trade_primary_cta">
                {dict.hero.ctaPrimary}
              </Button>
              <a
                href="#primjeri"
                className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red"
              >
                {dict.hero.ctaSecondary}
                <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
              </a>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
              {heroFacts(dict).map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="headline tnum mt-1.5 text-xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="primjeri" className="scroll-mt-24 bg-paper-2">
          <div className="shell py-20 sm:py-28">
            <SectionHead title={dict.trades.examplesTitle} sub={dict.trades.examplesSub} />

            <div className="mt-14 grid gap-16 sm:mt-16">
              {projects.map((item) => (
                <ProjectCase key={item.slug} project={item} dict={dict} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="shell py-20 sm:py-28">
            <SectionHead title={dict.trades.needsTitle} />
            <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {trade.needs.map((need) => (
                <div key={need.title} className="border-t border-line-strong pt-6">
                  <dt className="headline text-2xl">{need.title}</dt>
                  <dd className="mt-3 max-w-md leading-relaxed text-muted">{need.body}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 grid gap-x-10 gap-y-6 rounded-[1.75rem] bg-paper-2 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <h2 className="headline text-3xl">{dict.trades.priceTitle}</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{dict.trades.priceBody}</p>
              </div>
              <Link
                href={`${home}#cijene`}
                className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red lg:justify-self-end"
              >
                {dict.trades.priceLink}
                <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
          </div>
        </section>

        <Contact dict={dict} />

        <section className="on-ink bg-ink text-paper">
          <div className="shell border-t border-ink-2 py-12">
            <p className="eyebrow text-muted-dark">{dict.trades.othersTitle}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((key) => (
                <li key={key}>
                  <Link
                    href={tradePath(dict, key)}
                    className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-paper px-4 font-medium transition-colors hover:border-red hover:bg-red hover:text-ink"
                  >
                    {dict.work.items.find((item) => item.key === key)?.type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer dict={dict} />
    </>
  );
}
