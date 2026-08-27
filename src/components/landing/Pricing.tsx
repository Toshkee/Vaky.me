import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { PlanMatrix } from "./PlanMatrix";

/**
 * Pricing as a printed table: a heavy rule at the head, hairlines between the
 * rows, prices set in lining tabular figures so the euro amounts line up.
 *
 * The packages themselves live in PlanMatrix, which has to be interactive for
 * the detail dialog; everything around them stays server-rendered.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-28 border-t border-line md:scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">{dict.pricing.title}</h2>
          <p className="mt-3 max-w-xl text-muted">{dict.pricing.sub}</p>
        </Reveal>

        <PlanMatrix dict={dict} />

        {/* The one recurring charge, and the only number on the page a visitor
            can be surprised by later — so it is set at package weight under a
            rule of its own instead of hiding in the small print. */}
        <div className="mt-10 border-t-2 border-ink pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="headline text-xl sm:text-2xl">{dict.pricing.maintenance.title}</h3>
            <p className="headline tnum text-2xl sm:text-3xl">{dict.pricing.maintenance.price}</p>
          </div>
          <p className="mt-2 font-semibold text-red sm:text-lg">
            {dict.pricing.maintenance.body}
          </p>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted">{dict.pricing.addons}</p>

        <PixelWindow className="mt-10">
          <div className="flex flex-col items-start justify-between gap-6 p-5 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="headline text-xl sm:text-2xl">{dict.pricing.cta.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {dict.pricing.cta.body}
              </p>
            </div>
            <Button href="#kontakt" className="w-full shrink-0 sm:w-auto">
              {dict.pricing.cta.action}
            </Button>
          </div>
        </PixelWindow>
      </div>
    </section>
  );
}
