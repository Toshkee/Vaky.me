"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getOverview,
  type AttentionItem,
  type Overview as OverviewData,
  type RecentActivityRow,
} from "@/lib/admin/client";
import {
  AsyncView,
  EmptyState,
  GoLink,
  NewMark,
  Panel,
  When,
  activityLabel,
  stampMs,
  useLoad,
} from "./ui";

/**
 * The opening screen: five numbers, what is waiting on the studio, and what
 * clients have done lately.
 *
 * Every number links into the list it counts, because a count nobody can act
 * on is decoration. The feed is not the activity log — the studio's own
 * doings live in each record's history — only what came in from outside, one
 * line per client, so ten events on one project are one line.
 *
 * "Novo" marks what arrived since the overview was last opened. That moment
 * is kept in localStorage: it is one person on one or two devices, and the
 * marker is a convenience, not a record.
 */

const COUNTS: readonly {
  key: keyof Omit<OverviewData, "recent" | "attention">;
  label: string;
  to: string;
  /** A non-zero here is the studio's move, so the number is red. */
  hot: boolean;
}[] = [
  { key: "newLeads", label: "Novi upiti", to: "?v=upiti&status=new", hot: true },
  { key: "needsReview", label: "Za pregled", to: "?v=projekti&f=onboarding_completed", hot: true },
  { key: "waitingOnClient", label: "Čeka klijenta", to: "?v=projekti&f=ceka-klijenta", hot: false },
  { key: "building", label: "U izradi", to: "?v=projekti&f=building", hot: false },
  { key: "activeProjects", label: "Aktivni projekti", to: "?v=projekti&f=aktivni", hot: false },
];

const ATTENTION_TEXT: Record<AttentionItem["kind"], string> = {
  lead_new: "novi upit",
  review: "upitnik popunjen, za pregled",
  link_unopened: "klijent nije otvorio link",
  link_stalled: "klijent stao usred upitnika",
};

function attentionTo(item: AttentionItem): string {
  return item.kind === "lead_new" ? `?v=upiti&id=${item.id}` : `?v=projekat&id=${item.id}`;
}

/** What a client does, as opposed to what the studio does. */
const FROM_CLIENT = new Set(["lead_submitted", "onboarding_opened", "onboarding_completed"]);

/** The latest client-made event per client, skipping anyone already listed
 *  as waiting — one line per client, no line twice. A lead and the project
 *  it became are the same client. */
function fromClients(
  recent: readonly RecentActivityRow[],
  attention: readonly AttentionItem[],
): RecentActivityRow[] {
  const listed = new Set(attention.map((item) => item.id));
  const shown = new Set<string>();
  const rows: RecentActivityRow[] = [];

  for (const row of recent) {
    const key = row.project_id ?? row.lead_project_id ?? row.lead_id;
    if (!key || !FROM_CLIENT.has(row.kind) || shown.has(key) || listed.has(key)) continue;
    shown.add(key);
    rows.push(row);
    if (rows.length === 8) break;
  }
  return rows;
}

function subject(row: RecentActivityRow): { name: string; to: string } {
  if (row.project_id) {
    return { name: row.project_name ?? "Projekat", to: `?v=projekat&id=${row.project_id}` };
  }
  return {
    name: row.lead_business ?? row.lead_name ?? "Upit",
    to: `?v=upiti&id=${row.lead_id}`,
  };
}

const SEEN_KEY = "vaky:admin-seen";

function readSeen(): number | null {
  try {
    const value = window.localStorage.getItem(SEEN_KEY);
    return value ? Number(value) : null;
  } catch {
    return null;
  }
}

function writeSeen(ms: number): void {
  try {
    window.localStorage.setItem(SEEN_KEY, String(ms));
  } catch {
    /* Private mode or blocked storage: the marker is simply never shown. */
  }
}

export function Overview() {
  const load = useCallback(() => getOverview(), []);
  const { result, busy, reload } = useLoad(load);

  /* Read once, on mount: the marks stay put while this screen is open and a
     refetch does not clear them. The next visit starts from now. */
  const [seen] = useState(readSeen);
  useEffect(() => {
    if (result.state === "ready") writeSeen(Date.now());
  }, [result.state]);

  const fresh = (stamp: string | null) => {
    const ms = stampMs(stamp);
    return seen !== null && ms !== null && ms > seen;
  };

  return (
    <>
      <h1 className="headline text-2xl">Pregled</h1>

      <AsyncView result={result} busy={busy} onRetry={reload}>
        {(data) => (
          <div className="mt-6 grid gap-8">
            {/* gap-px over an ink ground draws the hairlines between cells, so
                the block reads as one table rather than five cards. Five cells
                in two columns leave a hole in the last row, and the hole would
                show that ground — so the last one takes the whole row. */}
            <ul className="grid grid-cols-2 gap-px border-2 border-ink bg-ink sm:grid-cols-5">
              {COUNTS.map((count) => {
                const value = data[count.key];
                const tone = value === 0 ? "text-muted" : count.hot ? "text-red" : "";
                return (
                  <li key={count.key} className="bg-paper last:col-span-2 sm:last:col-span-1">
                    <GoLink to={count.to} className="block px-3 py-3 hover:bg-paper-2">
                      <span className={`tnum block text-3xl leading-none font-bold ${tone}`}>
                        {value}
                      </span>
                      <span className="mt-1.5 block text-sm leading-snug text-muted">
                        {count.label}
                      </span>
                    </GoLink>
                  </li>
                );
              })}
            </ul>

            <Panel title="Čeka tebe">
              {data.attention.length === 0 ? (
                <EmptyState>Ništa. Sve je kod klijenata ili završeno.</EmptyState>
              ) : (
                <ul>
                  {data.attention.map((item) => (
                    <ClientRow
                      key={`${item.kind}:${item.id}`}
                      to={attentionTo(item)}
                      name={item.name}
                      text={ATTENTION_TEXT[item.kind]}
                      since={item.since}
                      fresh={fresh(item.since)}
                    />
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Od klijenata">
              {fromClients(data.recent, data.attention).length === 0 ? (
                <EmptyState>Ništa novo od klijenata.</EmptyState>
              ) : (
                <ul>
                  {fromClients(data.recent, data.attention).map((row) => {
                    const who = subject(row);
                    return (
                      <ClientRow
                        key={row.id}
                        to={who.to}
                        name={who.name}
                        text={activityLabel(row.kind).toLowerCase()}
                        since={row.created_at}
                        fresh={fresh(row.created_at)}
                      />
                    );
                  })}
                </ul>
              )}
            </Panel>
          </div>
        )}
      </AsyncView>
    </>
  );
}

/** One client, one line: who, what, how long ago. The whole row is the link. */
function ClientRow({
  to,
  name,
  text,
  since,
  fresh,
}: {
  to: string;
  name: string;
  text: string;
  since: string;
  fresh: boolean;
}) {
  return (
    <li className="border-b border-line">
      <GoLink
        to={to}
        className="grid gap-x-4 gap-y-1 py-3 hover:bg-paper-2 sm:grid-cols-[minmax(0,1fr)_6rem] sm:items-baseline"
      >
        <span className="leading-relaxed">
          <span className="font-semibold break-words">{name}</span>
          <span className="text-muted"> · {text}</span>
          {fresh && (
            <>
              {" "}
              <NewMark />
            </>
          )}
        </span>
        <When value={since} className="text-sm text-muted sm:text-right" />
      </GoLink>
    </li>
  );
}
