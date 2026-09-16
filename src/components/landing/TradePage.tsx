import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { OsBadge } from "@/components/ui/OsBadge";
import { Nav } from "./Nav";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { SectionHead } from "./SectionHead";
import { ProjectCase } from "./ProjectCase";
import { ArrowIcon, CheckIcon, EuroIcon, FolderIcon } from "./icons";

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
      <Nav dict={dict} />
      <main>
        <section>
          <div className="shell pt-10 pb-12 sm:pt-14 sm:pb-16">
            <OsBadge>{dict.trades.eyebrow}</OsBadge>
            <h1 className="headline mt-5 max-w-3xl text-[clamp(2.1rem,4.6vw,3.5rem)]">{trade.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">{trade.intro}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href="#kontakt" arrow event="trade_primary_cta">
                {dict.hero.ctaPrimary}
              </Button>
              <a
                href="#primjeri"
                className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-red hover:decoration-red"
              >
                {dict.hero.ctaSecondary}
                <ArrowIcon className="w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <dl className="mt-9 grid max-w-lg grid-cols-2 border-t-2 border-ink pt-4 sm:grid-cols-4">
              {dict.hero.facts.map((fact) => (
                <div key={fact.label} className="py-1">
                  <dt className="eyebrow text-muted">{fact.label}</dt>
                  <dd className="headline tnum mt-1 text-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="primjeri" className="scroll-mt-24 border-t border-line">
          <div className="shell py-12 sm:py-16">
            <SectionHead icon={<FolderIcon />} title={dict.trades.examplesTitle} />
            <p className="mt-3 max-w-lg text-muted">{dict.trades.examplesSub}</p>

            <div className="mt-8 grid gap-14 sm:mt-10">
              {projects.map((item) => (
                <ProjectCase key={item.slug} project={item} dict={dict} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-paper-warm">
          <div className="shell py-12 sm:py-16">
            <SectionHead icon={<CheckIcon />} title={dict.trades.needsTitle} />
            <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {trade.needs.map((need) => (
                <div key={need.title} className="border-t-2 border-ink pt-4">
                  <dt className="headline text-xl">{need.title}</dt>
                  <dd className="mt-2 max-w-sm leading-relaxed text-muted">{need.body}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 grid gap-x-10 gap-y-5 border-t-2 border-ink pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="w-6 shrink-0 text-ink">
                    <EuroIcon />
                  </span>
                  <h2 className="headline text-2xl">{dict.trades.priceTitle}</h2>
                </div>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{dict.trades.priceBody}</p>
              </div>
              <Link
                href={`${home}#cijene`}
                className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-red hover:decoration-red lg:justify-self-end"
              >
                {dict.trades.priceLink}
                <ArrowIcon className="w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <Contact dict={dict} />

        <section className="border-t border-line">
          <div className="shell py-10 sm:py-12">
            <p className="eyebrow text-muted">{dict.trades.othersTitle}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((key) => (
                <li key={key}>
                  <Link
                    href={tradePath(dict, key)}
                    className="px inline-flex min-h-11 items-center border-2 border-ink bg-paper px-4 text-[1.0625rem] leading-none text-ink uppercase transition-colors hover:text-red"
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
