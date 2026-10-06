import type { Dictionary } from "@/i18n";
import { OsBadge } from "@/components/ui/OsBadge";
import { CheckIcon, EuroIcon } from "./icons";
import { MobileFold } from "./MobileFold";
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

        {/* The one recurring charge on the page — and an optional one, which
            is the fact this panel exists to make unmissable. It explains the
            service instead of selling it: the site is the client's either
            way, and the badge says so before the price does. */}
        <AddOn addOn={dict.pricing.maintenance} />

        {/* Paid once, at launch. It comes second because it is the smaller
            question: nobody decides against a site over three videos, but
            people do over a monthly bill they were not told is optional. */}
        <AddOn addOn={dict.pricing.launchVideos} />
      </div>
    </section>
  );
}

/** Something a client can add to any package: what it is, what it costs and
    how it is charged — the badge carries that last part. On a phone that is
    all it shows until opened; the explanation is one tap away. */
function AddOn({ addOn }: { addOn: Dictionary["pricing"]["maintenance"] }) {
  return (
    <div className="mt-12 border-t-2 border-ink pt-6">
      <MobileFold
        label={addOn.title}
        head={
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
              <h3 className="headline text-xl sm:text-2xl">{addOn.title}</h3>
              <OsBadge tone="red">{addOn.badge}</OsBadge>
            </div>
            <p className="headline tnum text-2xl sm:text-3xl">{addOn.price}</p>
          </div>
        }
      >
        <div className="mt-5 grid gap-x-10 gap-y-5 lg:grid-cols-[1.15fr_0.85fr]">
          <p className="max-w-xl leading-relaxed text-muted">{addOn.intro}</p>
          <ul className="grid content-start gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1">
            {addOn.includes.map((item) => (
              <li key={item} className="flex items-baseline gap-2.5 text-sm">
                <CheckIcon className="w-4 shrink-0 self-center text-red" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">{addOn.note}</p>
      </MobileFold>
    </div>
  );
}
