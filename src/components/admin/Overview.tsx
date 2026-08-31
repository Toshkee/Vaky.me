"use client";

import { useCallback } from "react";
import { getOverview, type Overview as OverviewData, type RecentActivityRow } from "@/lib/admin/client";
import { AsyncView, EmptyState, GoLink, Panel, When, activityLabel, useLoad } from "./ui";

/**
 * The opening screen: five numbers that each mean "there is work here", and
 * the last fifteen things that happened.
 *
 * Every number is a link into the list it counts, because a count nobody can
 * act on is decoration. There is nothing else on this screen on purpose — a
 * studio with a handful of live projects has no trends to chart.
 */

const COUNTS: readonly {
  key: keyof Omit<OverviewData, "recent">;
  label: string;
  to: string;
}[] = [
  { key: "newLeads", label: "Novi upiti", to: "?v=upiti&status=new" },
  { key: "activeProjects", label: "Aktivni projekti", to: "?v=projekti&f=aktivni" },
  { key: "waitingOnClient", label: "Čeka klijenta", to: "?v=projekti&f=ceka-klijenta" },
  { key: "needsReview", label: "Za pregled", to: "?v=projekti&f=onboarding_completed" },
  { key: "building", label: "U izradi", to: "?v=projekti&f=building" },
];

/** Who a timeline row is about, and where that record lives. */
function subject(row: RecentActivityRow): { name: string; to: string | null } {
  if (row.project_id) {
    return { name: row.project_name ?? "Projekat", to: `?v=projekat&id=${row.project_id}` };
  }
  if (row.lead_id) {
    return {
      name: row.lead_business ?? row.lead_name ?? "Upit",
      to: `?v=upiti&id=${row.lead_id}`,
    };
  }
  return { name: "", to: null };
}

export function Overview() {
  const load = useCallback(() => getOverview(), []);
  const { result, busy, reload } = useLoad(load);

  return (
    <>
      <h1 className="headline text-2xl">Pregled</h1>

      <AsyncView result={result} busy={busy} onRetry={reload}>
        {(data) => (
          <div className="mt-6 grid gap-8">
            {/* gap-px over an ink ground draws the hairlines between cells, so
                the block reads as one table rather than five cards. */}
            <ul className="grid grid-cols-2 gap-px border-2 border-ink bg-ink sm:grid-cols-5">
              {COUNTS.map((count) => (
                <li key={count.key} className="bg-paper">
                  <GoLink to={count.to} className="block px-3 py-3 hover:bg-paper-2">
                    <span className="tnum block text-3xl leading-none font-bold">
                      {data[count.key]}
                    </span>
                    <span className="mt-1.5 block text-sm leading-snug text-muted">
                      {count.label}
                    </span>
                  </GoLink>
                </li>
              ))}
            </ul>

            <Panel title="Skoro">
              {data.recent.length === 0 ? (
                <EmptyState>Još se ništa nije desilo.</EmptyState>
              ) : (
                <ol className="grid gap-2">
                  {data.recent.map((row) => {
                    const who = subject(row);
                    return (
                      <li
                        key={row.id}
                        className="grid gap-x-4 border-b border-line pb-2 sm:grid-cols-[9rem_1fr]"
                      >
                        <When value={row.created_at} className="text-sm text-muted" />
                        <p className="text-sm leading-relaxed">
                          <span className="font-semibold">{activityLabel(row.kind)}</span>
                          {who.name && (
                            <>
                              {" — "}
                              {who.to ? (
                                <GoLink
                                  to={who.to}
                                  className="underline decoration-line underline-offset-4 hover:text-red"
                                >
                                  {who.name}
                                </GoLink>
                              ) : (
                                who.name
                              )}
                            </>
                          )}
                          {row.detail && <span className="text-muted"> · {row.detail}</span>}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              )}
            </Panel>
          </div>
        )}
      </AsyncView>
    </>
  );
}
