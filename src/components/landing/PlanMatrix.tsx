"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { Tony } from "@/components/mascot/Tony";
import { CheckIcon, SparkleIcon } from "./icons";
import { emailLink } from "@/config/site";

/**
 * The three packages as three cards, each complete on its own: name, price,
 * what it includes, and one action. The middle one — the one most people
 * pick — wears the red band, sits a step higher from lg up, and has Tony
 * perched on its top edge, concept document in hand.
 *
 * Every card reads `dict.pricing.compare.rows`, and lists only what its
 * package adds over the one to its left — the rest is carried by the
 * "everything in X" line, the way a price list is actually read. The full
 * plain-language explanation of every line, including what a package does
 * not have, lives in the dialog behind "Šta tačno dobijaš?" — the part a
 * café owner needs and the feature names alone do not give.
 */
export function PlanMatrix({ dict }: { dict: Dictionary }) {
  const { plans, compare } = dict.pricing;
  const [openPlan, setOpenPlan] = useState<number | null>(null);

  const enquiryHref = (planName: string) =>
    emailLink(dict.contact.emailSubject, dict.pricing.packagePrefill.replace("{package}", planName));

  return (
    <>
      <div className="mt-9 grid items-start gap-6 lg:mt-12 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const featured = Boolean(plan.badge);
          return (
            <div key={plan.name} className={`relative ${featured ? "lg:-mt-4" : ""}`}>
              {featured && (
                <Tony
                  direction="front"
                  pose="idle"
                  scale={0.28}
                  className="tony-perch right-7 hidden lg:block"
                />
              )}

              <div
                className={`px-card flex h-full flex-col transition-transform duration-100 hover:-translate-y-0.5 motion-reduce:transition-none ${
                  featured ? "shadow-[6px_6px_0_var(--color-ink)]" : ""
                }`}
              >
                {featured && (
                  <p className="px flex items-center justify-center gap-2 border-b-2 border-ink bg-red px-3 py-2 text-center text-[1.2rem] leading-none text-white uppercase">
                    <SparkleIcon aria-hidden="true" className="w-3.5" />
                    {plan.badge}
                  </p>
                )}

                {/* Name, then price on its own line, then who the package is
                    for. Stacked rather than side by side: one plan is quoted on
                    request, and words in the price slot have nowhere to go in a
                    right-aligned column on a 320px screen. */}
                <div className="border-b border-line p-5 sm:p-6">
                  <h3 className="headline text-xl">{plan.name}</h3>
                  <p className="headline tnum mt-2 text-3xl">{plan.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{plan.tagline}</p>
                </div>

                <div className="p-5 sm:p-6">
                  {index > 0 && (
                    <p className="mb-3 text-sm font-semibold">
                      {dict.pricing.inherits.replace("{plan}", plans[index - 1].name)}
                    </p>
                  )}
                  <ul className="grid gap-2.5">
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
                        <li key={row.label} className="flex items-baseline gap-2.5 text-sm">
                          <CheckIcon className="w-4 shrink-0 self-center text-red" />
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

                <div className="mt-auto grid gap-2 border-t border-line p-5 sm:p-6">
                  <a
                    href={enquiryHref(plan.name)}
                    data-umami-event="plan_enquiry"
                    data-umami-event-plan={plan.name}
                    className={`px px-btn tap inline-flex min-h-12 items-center justify-center px-6 text-[1.25rem] ${
                      featured
                        ? "px-btn--primary bg-red text-white hover:bg-red-deep"
                        : "bg-paper text-ink transition-colors hover:text-red"
                    }`}
                  >
                    {dict.pricing.planAction}
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpenPlan(index)}
                    className="tap mx-auto inline-flex min-h-11 items-center justify-center text-sm font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
                  >
                    {dict.pricing.detailsAction}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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

  /* The dialog shell stays transparent and carries only the filter: a filtered
     *opaque* box casts a rectangular shadow instead of the stepped silhouette
     of the pane inside it. The ink ground and both notches live on the
     scroller and its child, so the drop shadow follows the cut corners. */
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
      className="px-frame m-auto w-[min(34rem,calc(100vw-1.5rem))] bg-transparent p-0 text-ink backdrop:bg-ink/60"
    >
      <div className="px-notch max-h-[85vh] overflow-y-auto bg-ink p-[2px]">
        <div className="px-notch bg-paper">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-paper px-5 py-4">
          <div>
            <h3 id="plan-dialog-title" className="headline text-xl">
              {plan.name} — <span className="tnum">{plan.price}</span>
            </h3>
            <p className="mt-1 text-sm text-muted">{dict.pricing.detailsIntro}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.pricing.detailsClose}
            className="tap -mt-1 -mr-2 shrink-0 px-2 py-1 text-2xl leading-none text-muted transition-colors hover:text-red"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="eyebrow text-red">{dict.pricing.detailsIncluded}</p>
          <dl className="mt-3 grid gap-4">
            {included.map((row) => {
              const value = row.values[planIndex];
              return (
                <div key={row.label}>
                  <dt className="flex items-baseline gap-2.5 font-semibold">
                    <CheckIcon className="w-4 shrink-0 self-center text-red" />
                    <span>
                      {row.label}
                      {typeof value === "string" && (
                        <span className="tnum"> — {value}</span>
                      )}
                    </span>
                  </dt>
                  <dd className="mt-1 pl-6 text-sm leading-relaxed text-muted">{row.explain}</dd>
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
              href={emailLink(
                dict.contact.emailSubject,
                dict.pricing.packagePrefill.replace("{package}", plan.name),
              )}
              className="px px-btn px-btn--primary tap inline-flex min-h-12 w-full items-center justify-center bg-red px-6 text-[1.25rem] text-white hover:bg-red-deep"
            >
              {dict.pricing.planAction}
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
