import type { Dictionary } from "@/i18n";
import { EuroIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { PlanMatrix } from "./PlanMatrix";

/**
 * Real prices, set at package weight. The cards live in PlanMatrix, which has
 * to be interactive for the detail dialog; everything around them stays
 * server-rendered.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-24 border-t border-line bg-paper-warm">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<EuroIcon />} title={dict.pricing.title} />
        <p className="mt-3 max-w-xl text-muted">{dict.pricing.sub}</p>

        <PlanMatrix dict={dict} />

        {/* The one recurring charge, and the only number on the page a visitor
            can be surprised by later — so it is set at package weight under a
            rule of its own instead of hiding in the small print. */}
        <div className="mt-12 border-t-2 border-ink pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="headline text-xl sm:text-2xl">{dict.pricing.maintenance.title}</h3>
            <p className="headline tnum text-2xl sm:text-3xl">{dict.pricing.maintenance.price}</p>
          </div>
          <p className="mt-2 font-semibold text-red sm:text-lg">
            {dict.pricing.maintenance.body}
          </p>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted">{dict.pricing.addons}</p>
      </div>
    </section>
  );
}
