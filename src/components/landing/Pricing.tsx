import type { Dictionary } from "@/i18n";
import { Tag } from "@/components/ui/Tag";
import { CheckIcon } from "./icons";
import { MobileFold } from "./MobileFold";
import { SceneLabel, SectionHead } from "./SectionHead";
import { PriceWall } from "./PriceWall";

/**
 * Real prices, written up as a price list. The list lives in PriceWall, which
 * has to be interactive for the detail dialog; everything around it stays
 * server-rendered. Apps and the motion design videos are priced on their own
 * cards in the expertise scene, beside their films, rather than said twice.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-20 bg-paper-2">
      <div className="shell py-16 sm:py-24">
        <SectionHead
          slate={<SceneLabel name={dict.film.scenes.pricing} />}
          title={dict.pricing.title}
          sub={dict.pricing.sub}
        />

        <PriceWall dict={dict} />

        {/* The one recurring charge on the page — and an optional one, which
            is the fact this panel exists to make unmissable. It explains the
            service instead of selling it: the site is the client's either
            way, and the badge says so before the price does. */}
        <AddOn addOn={dict.pricing.maintenance} />
      </div>
    </section>
  );
}

/** Something sold beside the packages: what it is, what it costs and how it
    is charged — the badge carries that last part. On a phone that is all it
    shows until opened; the explanation is one tap away. */
function AddOn({ addOn }: { addOn: Dictionary["pricing"]["maintenance"] }) {
  return (
    <div data-reveal className="mt-12 border-t border-line-strong pt-8">
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
          <p className="max-w-xl leading-relaxed text-muted">{addOn.intro}</p>
          <ul className="grid content-start gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {addOn.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-red" />
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
