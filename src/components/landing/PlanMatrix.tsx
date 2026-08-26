"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { emailLink } from "@/config/site";

/**
 * The packages, twice over.
 *
 * A three-column matrix is how anyone actually compares prices, but it needs a
 * label gutter and four columns of hairlines — which is unreadable on the phone
 * most of this audience is holding. So the same rows render as a real <table>
 * from lg up, and as one block per package below it, where each package spells
 * out its own list instead of asking the reader to track a row across a screen
 * they cannot see all of.
 *
 * Both paths read `dict.pricing.compare.rows`, and both open the same dialog —
 * the plain-language explanation of every line, which is the part a café owner
 * needs and the feature names alone do not give.
 */
export function PlanMatrix({ dict }: { dict: Dictionary }) {
  const { plans, compare } = dict.pricing;
  const [openPlan, setOpenPlan] = useState<number | null>(null);

  const enquiryHref = (planName: string) =>
    emailLink(dict.contact.emailSubject, dict.pricing.packagePrefill.replace("{package}", planName));

  return (
    <>
      {/* Phone and tablet: one block per package, each complete on its own. */}
      <div className="mt-8 grid gap-5 lg:hidden">
        {plans.map((plan, index) => (
          <div key={plan.name} className="border-2 border-ink">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-4">
              <h3 className="headline flex flex-wrap items-center gap-x-3 gap-y-2 text-xl">
                {plan.name}
                {plan.badge && (
                  <span className="eyebrow inline-block bg-red px-2 py-0.5 text-white">
                    {plan.badge}
                  </span>
                )}
              </h3>
              <span className="headline tnum text-2xl">{plan.price}</span>
            </div>

            <p className="px-4 pt-3 text-sm text-muted">{plan.tagline}</p>

            <ul className="grid gap-2 px-4 py-4">
              {compare.rows.map((row) => {
                const value = row.values[index];
                if (value === false) return null;
                return (
                  <li key={row.label} className="flex items-baseline gap-2.5 text-sm">
                    <Tick />
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

            <div className="grid gap-2 border-t border-line p-4">
              <a
                href={enquiryHref(plan.name)}
                className="tap inline-flex min-h-12 items-center justify-center bg-red px-6 font-semibold text-white transition-colors hover:bg-red-deep"
              >
                {dict.pricing.planAction}
              </a>
              <button
                type="button"
                onClick={() => setOpenPlan(index)}
                className="tap inline-flex min-h-12 items-center justify-center border-2 border-ink px-6 font-semibold transition-colors hover:border-red hover:text-red"
              >
                {dict.pricing.detailsAction}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: the comparison proper. */}
      <div className="mt-8 hidden lg:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{compare.title}</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="eyebrow w-[34%] pb-4 align-bottom text-muted">
                {compare.featureLabel}
              </th>
              {plans.map((plan) => (
                <th key={plan.name} scope="col" className="w-[22%] pb-4 pl-6 align-bottom">
                  <span className="headline flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xl">
                    {plan.name}
                    {plan.badge && (
                      <span className="eyebrow inline-block bg-red px-2 py-0.5 text-white">
                        {plan.badge}
                      </span>
                    )}
                  </span>
                  <span className="headline tnum mt-1 block text-3xl">{plan.price}</span>
                  <span className="mt-1 block text-sm font-normal text-muted">{plan.tagline}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {compare.rows.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th scope="row" className="py-3 pr-6 text-sm font-normal">
                  {row.label}
                </th>
                {plans.map((plan, index) => {
                  const value = row.values[index];
                  return (
                    <td key={plan.name} className="py-3 pl-6 text-sm">
                      {typeof value === "string" ? (
                        <span className="tnum font-semibold">{value}</span>
                      ) : value ? (
                        <Tick label={row.label} />
                      ) : (
                        <span className="text-line" aria-label="—">
                          <span aria-hidden="true">—</span>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td />
              {plans.map((plan, index) => (
                <td key={plan.name} className="pl-6 pt-5 align-top">
                  <a
                    href={enquiryHref(plan.name)}
                    className="inline-flex min-h-11 w-full items-center justify-center bg-red px-5 font-semibold text-white transition-colors hover:bg-red-deep"
                  >
                    {dict.pricing.planAction}
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpenPlan(index)}
                    className="mt-2 inline-flex min-h-11 w-full items-center justify-center border-2 border-ink px-5 text-sm font-semibold transition-colors hover:border-red hover:text-red"
                  >
                    {dict.pricing.detailsAction}
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <PlanDialog dict={dict} planIndex={openPlan} onClose={() => setOpenPlan(null)} />
    </>
  );
}

function Tick({ label }: { label?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className="mt-px inline-block w-3.5 shrink-0 fill-none stroke-red stroke-[2.5]"
      role={label ? "img" : "presentation"}
      aria-label={label}
    >
      <path d="M2 7.5 5.5 11 12 3.5" />
    </svg>
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
      className="m-auto w-[min(34rem,calc(100vw-1.5rem))] bg-paper p-0 text-ink backdrop:bg-ink/60"
    >
      <div className="max-h-[85vh] overflow-y-auto border-2 border-ink">
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
            className="tap -mr-2 -mt-1 shrink-0 px-2 py-1 text-2xl leading-none text-muted transition-colors hover:text-red"
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
                    <Tick />
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
            className="tap inline-flex min-h-12 w-full items-center justify-center bg-red px-6 font-semibold text-white transition-colors hover:bg-red-deep"
          >
            {dict.pricing.planAction}
          </a>
        </div>
      </div>
    </dialog>
  );
}
