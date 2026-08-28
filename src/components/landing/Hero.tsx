import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { OsBadge } from "@/components/ui/OsBadge";
import { ArrowIcon, SparkleIcon } from "./icons";
import { Workstation } from "./Workstation";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="shell grid gap-12 pt-10 pb-12 sm:pt-14 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <OsBadge>{dict.hero.eyebrow}</OsBadge>

          <h1 className="headline mt-5 text-[clamp(2.3rem,5vw,3.8rem)]">
            {dict.hero.titleA} <span className="text-red">{dict.hero.titleB}</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed">{dict.hero.sub}</p>
          <p className="mt-3 max-w-md leading-relaxed text-muted">{dict.hero.offer}</p>

          {/* One action carries the page. "See our work" is the same journey
              one scroll further down, so it is a link, not a second slab
              competing with the thing we actually want pressed. */}
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href="#kontakt" arrow event="hero_primary_cta">
              {dict.hero.ctaPrimary}
            </Button>
            <a
              href="#radovi"
              className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-red hover:decoration-red"
            >
              {dict.hero.ctaSecondary}
              <ArrowIcon className="w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* The masthead data line: where we are, how long it takes, what it
              starts at, which languages. Set as a table, not as claims. */}
          <dl className="mt-9 grid max-w-lg grid-cols-2 border-t-2 border-ink pt-4 sm:grid-cols-4">
            {dict.hero.facts.map((fact) => (
              <div key={fact.label} className="py-1">
                <dt className="eyebrow text-muted">{fact.label}</dt>
                <dd className="headline tnum mt-1 text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The workstation on its dot-grid patch, with two loose
            decorations pinned to the patch corners. */}
        <div className="px-grid relative px-3 pt-8 pb-0 sm:px-6 sm:pt-10">
          <SparkleIcon className="absolute top-2 left-4 w-4 text-red" />
          <SparkleIcon className="absolute top-8 right-8 w-3 text-ink" />
          <Workstation />
        </div>
      </div>
    </section>
  );
}
