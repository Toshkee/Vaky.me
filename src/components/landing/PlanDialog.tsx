"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { CheckIcon } from "./icons";
import { PLAN_PACKAGES } from "@/lib/onboarding/schema";
import { priceLabel } from "@/lib/packages";

/**
 * A native <dialog>: modal focus trapping, Esc and inertness of the page behind
 * come from the platform, so no focus-management code and no dependency.
 */
export function PlanDialog({
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
      className="m-auto w-[min(34rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl bg-paper p-0 text-ink backdrop:bg-ink/60"
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
