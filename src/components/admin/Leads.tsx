"use client";

import { useCallback } from "react";
import { getLeads, type LeadRow } from "@/lib/admin/client";
import {
  LEAD_NEED_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  isLeadNeed,
  type LeadStatus,
} from "@/lib/workflow";
import { AsyncView, EmptyState, GoLink, SelectField, StatusPill, When, useGo, useLoad } from "./ui";

/**
 * Everything that came in through the public form, newest first.
 *
 * A list rather than a table: on a phone the four facts have to stack, and a
 * table that reflows into stacked rows is a table only in the markup. Each row
 * is one link, so the whole row is the target on a touch screen.
 */

const FILTERS = [
  { value: "sve", label: "Svi upiti" },
  ...LEAD_STATUSES.map((status) => ({ value: status, label: LEAD_STATUS_LABELS[status] })),
];

function needText(lead: LeadRow): string {
  return isLeadNeed(lead.need) ? LEAD_NEED_LABELS[lead.need] : "";
}

export function Leads({ status }: { status: LeadStatus | null }) {
  const go = useGo();
  const load = useCallback(() => getLeads(status), [status]);
  const { result, busy, reload } = useLoad(load);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="headline text-2xl">Upiti</h1>
        <div className="w-full sm:w-56">
          <SelectField
            id="lead-filter"
            label="Status"
            value={status ?? "sve"}
            options={FILTERS}
            onChange={(value) => go(value === "sve" ? "?v=upiti" : `?v=upiti&status=${value}`)}
          />
        </div>
      </div>

      <div className="mt-6">
        <AsyncView result={result} busy={busy} onRetry={reload}>
          {(data) =>
            data.leads.length === 0 ? (
              <EmptyState>Nema upita u ovom statusu.</EmptyState>
            ) : (
              <ul className="border-t-2 border-ink">
                {data.leads.map((lead) => (
                  <li key={lead.id} className="border-b border-line">
                    <GoLink
                      to={`?v=upiti&id=${lead.id}`}
                      className="grid gap-x-4 gap-y-1 py-3 hover:bg-paper-2 md:grid-cols-[minmax(0,1fr)_9rem_11.5rem_6rem] md:items-center"
                    >
                      <span className="font-semibold break-words">
                        {lead.business_name || lead.name}
                      </span>
                      <span className="text-sm text-muted">{needText(lead)}</span>
                      <span>
                        <StatusPill kind="lead" value={lead.status} />
                      </span>
                      <When value={lead.created_at} className="text-sm text-muted md:text-right" />
                    </GoLink>
                  </li>
                ))}
              </ul>
            )
          }
        </AsyncView>
      </div>
    </>
  );
}
