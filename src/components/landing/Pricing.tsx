import type { Dictionary } from "@/i18n";
import { Tag } from "@/components/ui/Tag";
import { CheckIcon } from "./icons";
import { MobileFold } from "./MobileFold";
import { SectionHead } from "./SectionHead";
import { PlanMatrix } from "./PlanMatrix";

/**
 * Real prices, set at package weight. The cards live in PlanMatrix, which has
 * to be interactive for the detail dialog; everything around them stays
 * server-rendered. The motion design videos are priced in their own section,
 * beside the films, rather than said twice.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-24 bg-paper-2">
      <div className="shell py-20 sm:py-28">
        <SectionHead title={dict.pricing.title} sub={dict.pricing.sub} />

        <PlanMatrix dict={dict} />

        {/* The one recurring charge on the page — and an optional one, which
            is the fact this panel exists to make unmissable. It explains the
            service instead of selling it: the site is the client's either
            way, and the badge says so before the price does. */}
        <AddOn addOn={dict.pricing.maintenance} />

        {/* Not something added to a site but a separate job, so it comes
            after everything that is. No figure: the badge says it is built
            to order, and the price slot says it is agreed, not listed. */}
        <AddOn addOn={dict.pricing.mobileApps} />
      </div>
    </section>
  );
}

/** Something sold beside the packages: what it is, what it costs and how it
    is charged — the badge carries that last part. On a phone that is all it
    shows until opened; the explanation is one tap away. */
function AddOn({ addOn }: { addOn: Dictionary["pricing"]["maintenance"] }) {
  return (
    <div className="mt-14 border-t border-line-strong pt-8">
      <MobileFold
        label={addOn.title}
        head={
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="headline text-2xl sm:text-3xl">{addOn.title}</h3>
              <Tag>{addOn.badge}</Tag>
            </div>
            <p className="headline tnum text-2xl sm:text-3xl">{addOn.price}</p>
          </div>
        }
      >
        <div className="mt-6 grid gap-x-12 gap-y-6 lg:grid-cols-[1.15fr_0.85fr]">
          <p className="max-w-xl text-lg leading-relaxed text-muted">{addOn.intro}</p>
          <ul className="grid content-start gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {addOn.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-sun-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{addOn.note}</p>
      </MobileFold>
    </div>
  );
}
