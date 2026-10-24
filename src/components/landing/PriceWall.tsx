"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { Tag } from "@/components/ui/Tag";
import { gsap, reducedMotion } from "@/components/motion/gsap";
import { PLAN_PACKAGES } from "@/lib/onboarding/schema";
import { priceLabel } from "@/lib/packages";
import { ArrowIcon } from "./icons";
import { PlanDialog } from "./PlanDialog";

/**
 * The packages as a price list on the wall, not three cards: one row each,
 * the name and the price joined by a dotted leader the way a konoba's board
 * is written, who it is for under it, and beside that only what the package
 * adds over the one before. The leaders draw themselves as the rows arrive.
 *
 * The full plain-language explanation of every line, including what a
 * package does not have, lives in the dialog behind "Šta tačno dobijaš?".
 * Asking about a package is a link to the enquiry form, not a checkout:
 * nothing is bought here.
 */
export function PriceWall({ dict }: { dict: Dictionary }) {
  const wall = useRef<HTMLOListElement>(null);
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const { plans, compare } = dict.pricing;
  const lang = dict.lang === "en" ? "en" : "me";

  useEffect(() => {
    if (reducedMotion() || !wall.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-leader]").forEach((leader) => {
        gsap.from(leader, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: leader, start: "top 88%", once: true },
        });
      });
    }, wall.current);
    return () => ctx.revert();
  }, []);

  /* What a package has that the one before it does not; the first lists
     everything it has. A line with a figure carries it. */
  const lines = (index: number) =>
    compare.rows
      .filter((row) => row.values[index] !== false && (index === 0 || row.values[index - 1] !== row.values[index]))
      .map((row) => (typeof row.values[index] === "string" ? `${row.label}: ${row.values[index]}` : row.label));

  return (
    <>
      <ol ref={wall} className="mt-10 border-t-2 border-ink">
        {plans.map((plan, index) => {
          const featured = Boolean(plan.badge);
          return (
            <li
              key={plan.name}
              data-reveal
              className="grid gap-x-12 gap-y-5 border-b border-line-strong py-8 sm:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="display text-poster-md">{plan.name}</h3>
                  <span aria-hidden="true" data-leader className="min-w-6 flex-1 border-b-2 border-dotted border-ink/35" />
                  <p className={`display tnum shrink-0 text-poster-md ${featured ? "text-red" : ""}`}>
                    {priceLabel(PLAN_PACKAGES[index], lang)}
                  </p>
                </div>
                {featured && <Tag tone="red" className="mt-4">{plan.badge}</Tag>}
                <p className="mt-4 max-w-[48ch] leading-relaxed text-muted">{plan.tagline}</p>
              </div>

              <div className="lg:pt-3">
                <p className="text-sm font-semibold">
                  {index === 0 ? compare.featureLabel : dict.pricing.inherits.replace("{plan}", plans[index - 1].name)}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{lines(index).join(" · ")}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-1">
                  <a
                    href="#kontakt"
                    data-umami-event="plan_enquiry"
                    data-umami-event-plan={plan.name}
                    className="group inline-flex min-h-11 items-center gap-2 font-semibold transition-colors hover:text-red"
                  >
                    {dict.pricing.planAction}
                    <ArrowIcon className="size-4 shrink-0 text-red transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpenPlan(index)}
                    className="inline-flex min-h-11 items-center text-sm font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
                  >
                    {dict.pricing.detailsAction}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* The one line that keeps a price list from reading like a checkout. */}
      <p className="mt-6 text-sm text-muted">{dict.pricing.planNote}</p>

      <PlanDialog dict={dict} planIndex={openPlan} onClose={() => setOpenPlan(null)} />
    </>
  );
}
