"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { Tag } from "@/components/ui/Tag";
import { CheckIcon } from "./icons";
import { PLAN_PACKAGES } from "@/lib/onboarding/schema";
import { priceLabel } from "@/lib/packages";

/**
 * The three packages as three cards, each complete on its own: name, price,
 * what it includes, and one action. The middle one — the one most people
 * pick — is the dark one, on the ink ground with the sun button, so the eye
 * lands there first without the other two shouting less.
 *
 * Every card reads `dict.pricing.compare.rows`, and lists only what its
 * package adds over the one to its left — the rest is carried by the
 * "everything in X" line, the way a price list is actually read. The full
 * plain-language explanation of every line, including what a package does
 * not have, lives in the dialog behind "Šta tačno dobijaš?" — the part a
 * café owner needs and the feature names alone do not give.
 *
 * The action is a link to the enquiry form, not a checkout. Picking a package
 * here buys nothing and commits nobody: it says which conversation to start,
 * and the price is agreed with a person before any work begins.
 */
export function PlanMatrix({ dict }: { dict: Dictionary }) {
  const { plans, compare } = dict.pricing;
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  /* Below lg the cards would stack, and the third price sat two screens under
     the first. There one card shows at a time, starting on the one most
     people pick, and the row of keys above it carries all three prices. */
  const [shown, setShown] = useState(Math.max(plans.findIndex((plan) => plan.badge), 0));
  const lang = dict.lang === "en" ? "en" : "me";

  return (
    <>
      {/* Real radios, the key is the label — the same construction as the
          "what do you need" chips in the enquiry form. Not rendered from lg
          up, where all three cards are on screen. */}
      <fieldset className="mt-9 min-w-0 border-0 p-0 lg:hidden">
        <legend className="sr-only">{dict.pricing.pickLabel}</legend>
        <div className="grid grid-cols-3 gap-2">
          {plans.map((plan, index) => {
            const checked = index === shown;
            return (
              <label
                key={plan.name}
                className={`pick relative flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-[1.5px] border-ink px-1 py-2 text-center transition-colors ${
                  checked ? "bg-ink text-paper" : "bg-paper text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  checked={checked}
                  onChange={() => setShown(index)}
                  className="sr-only"
                />
                <span className="text-base leading-none font-semibold">{plan.name}</span>
                <span className={`tnum text-sm leading-none ${checked ? "text-paper" : "text-muted"}`}>
                  {priceLabel(PLAN_PACKAGES[index], lang)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:items-stretch">
        {plans.map((plan, index) => {
          const featured = Boolean(plan.badge);
          return (
            <div key={plan.name} className={index === shown ? "" : "hidden lg:block"}>
              <div
                className={`flex h-full flex-col rounded-[1.5rem] border ${
                  featured ? "on-ink border-ink bg-ink text-paper" : "border-line bg-paper"
                }`}
              >
                {/* Name, then price on its own line, then who the package is
                    for. Stacked rather than side by side: one plan is quoted on
                    request, and words in the price slot have nowhere to go in a
                    right-aligned column on a 320px screen. */}
                <div className={`border-b p-6 sm:p-7 ${featured ? "border-ink-2" : "border-line"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="headline text-2xl">{plan.name}</h3>
                    {featured && <Tag tone="red">{plan.badge}</Tag>}
                  </div>
                  <p className="headline display tnum mt-4 text-5xl">
                    {priceLabel(PLAN_PACKAGES[index], lang)}
                  </p>
                  <p className={`mt-4 leading-relaxed ${featured ? "text-muted-dark" : "text-muted"}`}>
                    {plan.tagline}
                  </p>
                </div>

                <div className="p-6 sm:p-7">
                  {index > 0 && (
                    <p className="mb-4 text-sm font-semibold">
                      {dict.pricing.inherits.replace("{plan}", plans[index - 1].name)}
                    </p>
                  )}
                  <ul className="grid gap-3">
                    {compare.rows.map((row, rowIndex) => {
                      const value = row.values[index];
                      if (value === false) return null;
                      /* Only what this package adds over the one before it.
                         The middle card used to repeat eight lines the Start
                         card had already made, and Premium eleven — a wall
                         nobody compares. What the packages share is said once,
                         in the "everything in X" line above. */
                      const previous = index > 0 ? compare.rows[rowIndex].values[index - 1] : null;
                      if (previous === value) return null;
                      return (
                        <li key={row.label} className="flex items-start gap-3 text-[0.9375rem] leading-snug">
                          <CheckIcon className={`mt-px size-[1.1rem] shrink-0 ${featured ? "text-red-bright" : "text-red"}`} />
                          <span>
                            {row.label}
                            {typeof value === "string" && (
                              <span className="tnum font-semibold"> — {value}</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={`mt-auto grid gap-2 border-t p-6 sm:p-7 ${featured ? "border-ink-2" : "border-line"}`}>
                  <a
                    href="#kontakt"
                    data-umami-event="plan_enquiry"
                    data-umami-event-plan={plan.name}
                    className={`btn tap inline-flex min-h-12 items-center justify-center px-6 ${
                      featured
                        ? "btn-primary bg-red text-white hover:bg-red-deep"
                        : "bg-transparent text-ink hover:bg-ink hover:text-paper"
                    }`}
                  >
                    {dict.pricing.planAction}
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpenPlan(index)}
                    className={`tap mx-auto inline-flex min-h-11 items-center justify-center text-sm font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors ${
                      featured ? "hover:text-red-bright" : "hover:text-red"
                    }`}
                  >
                    {dict.pricing.detailsAction}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The one line that keeps a price list from reading like a checkout. */}
      <p className="mt-6 text-sm text-muted">{dict.pricing.planNote}</p>

      <PlanDialog dict={dict} planIndex={openPlan} onClose={() => setOpenPlan(null)} />
    </>
  );
}

/**
 * A native <dialog>: modal focus trapping, Esc and inertness of the page behind
 * come from the platform, so no focus-management code and no dependency.
 */
function PlanDialog({
  dict,
  planIndex,
  onClose,
}: {
  dict: Dictionary;
  planIndex: number | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (planIndex === null) node.close();
    else if (!node.open) node.showModal();
  }, [planIndex]);

  if (planIndex === null) {
    return <dialog ref={ref} onClose={onClose} className="hidden" />;
  }

  const plan = dict.pricing.plans[planIndex];
  const rows = dict.pricing.compare.rows;
  const included = rows.filter((row) => row.values[planIndex] !== false);
  const excluded = rows.filter((row) => row.values[planIndex] === false);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // The backdrop is part of the dialog's own box, so a click that lands on
        // the element itself rather than on the panel inside it is a click outside.
        if (event.target === ref.current) onClose();
      }}
      aria-labelledby="plan-dialog-title"
      className="m-auto w-[min(34rem,calc(100vw-1.5rem))] overflow-hidden rounded-[1.5rem] bg-paper p-0 text-ink backdrop:bg-ink/60"
    >
      <div className="max-h-[85vh] overflow-y-auto">
        <div>
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-paper px-5 py-4">
          <div>
            <h3 id="plan-dialog-title" className="headline text-xl">
              {plan.name} —{" "}
              <span className="tnum">
                {priceLabel(PLAN_PACKAGES[planIndex], dict.lang === "en" ? "en" : "me")}
              </span>
            </h3>
            <p className="mt-1 text-sm text-muted">{dict.pricing.detailsIntro}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.pricing.detailsClose}
            className="tap -mt-1 -mr-1 flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink text-xl leading-none transition-colors hover:bg-ink hover:text-paper"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="eyebrow">{dict.pricing.detailsIncluded}</p>
          <dl className="mt-3 grid gap-4">
            {included.map((row) => {
              const value = row.values[planIndex];
              return (
                <div key={row.label}>
                  <dt className="flex items-start gap-2.5 font-semibold">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-red" />
                    <span>
                      {row.label}
                      {typeof value === "string" && (
                        <span className="tnum"> — {value}</span>
                      )}
                    </span>
                  </dt>
                  <dd className="mt-1 pl-[1.625rem] text-sm leading-relaxed text-muted">{row.explain}</dd>
                </div>
              );
            })}
          </dl>

          {excluded.length > 0 && (
            <>
              <p className="eyebrow mt-7 text-muted">{dict.pricing.detailsExcluded}</p>
              <ul className="mt-3 grid gap-1.5 text-sm text-muted">
                {excluded.map((row) => (
                  <li key={row.label} className="flex items-baseline gap-2.5">
                    <span aria-hidden="true" className="text-line">
                      —
                    </span>
                    {row.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

          <div className="border-t border-line p-5">
            <a
              href="#kontakt"
              onClick={onClose}
              data-umami-event="plan_enquiry"
              data-umami-event-plan={plan.name}
              className="btn btn-primary tap inline-flex min-h-12 w-full items-center justify-center bg-red px-6 text-white hover:bg-red-deep"
            >
              {dict.pricing.planAction}
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
