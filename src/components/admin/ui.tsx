"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { OsBadge } from "@/components/ui/OsBadge";
import type { ActivityRow, ApiResult } from "@/lib/admin/client";
import { priceLabel } from "@/lib/packages";
import {
  PACKAGE_IDS,
  isPackageId,
  type ApiErrorCode,
  type PackageId,
} from "@/lib/onboarding/schema";
import {
  ACTIVITY_LABELS,
  LEAD_STATUS_LABELS,
  PROJECT_STATUS_LABELS,
  REQUEST_STATUS_LABELS,
  isLeadStatus,
  isProjectStatus,
  isRequestStatus,
} from "@/lib/workflow";

/**
 * The parts every admin screen is built from.
 *
 * The dashboard is one person's working tool, so the bar for a shared piece
 * here is "three screens draw it the same way", not "it could be reused". What
 * lives in this module is the routing link, the load/empty/error triad every
 * async view repeats, and the handful of controls that would otherwise be the
 * same forty characters of Tailwind in nine files.
 */

/* ── Navigation ───────────────────────────────────────────────────────────
   The dashboard is a static export, so there is no router to ask: the query
   string IS the state, pushState writes it and popstate reads it back. The
   navigate function is in context rather than threaded through props because
   a table row five components deep is exactly the thing that links. */

const GoContext = createContext<(query: string) => void>(() => {});

export const GoProvider = GoContext.Provider;

export function useGo(): (query: string) => void {
  return useContext(GoContext);
}

/** A real link that also navigates in place — so middle-click, ctrl-click and
 *  "open in new tab" keep working, which a button pretending to be a link
 *  would take away. */
export function GoLink({
  to,
  className = "",
  children,
}: {
  /** The whole query string, leading `?` included. */
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const go = useGo();
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        go(to);
      }}
    >
      {children}
    </a>
  );
}

/* ── Words for a failure ──────────────────────────────────────────────── */

const API_TEXT: Record<ApiErrorCode, string> = {
  "bad-request": "Zahtjev nije prošao — provjeri unos pa pokušaj ponovo.",
  session: "Sesija je istekla. Prijavi se ponovo.",
  "rate-limit": "Previše pokušaja u kratkom roku. Sačekaj minut.",
  challenge: "Provjera nije završena. Pokušaj ponovo.",
  link: "Onboarding link više ne važi.",
  completed: "Upitnik za ovaj projekat je već popunjen.",
  "file-type": "Ovaj tip fajla ne primamo.",
  "file-size": "Fajl je prevelik.",
  "file-count": "Previše fajlova na ovom projektu.",
  "file-total": "Ukupna veličina fajlova je prevelika.",
  answers: "Odgovori nisu prošli provjeru.",
  /* Covers a dead network, a 500 and unreadable JSON alike — and the everyday
     case, which is `next dev`, where /api/ is not served at all. */
  server:
    "Nema veze sa serverom. Ako je ovo obični next dev, /api/ ne postoji — dashboard radi samo uz npm run pages:dev.",
};

export function apiText(code: ApiErrorCode): string {
  return API_TEXT[code];
}

/* ── Time ─────────────────────────────────────────────────────────────── */

/**
 * D1 stores `datetime('now')`: "2026-08-31 09:14:02", UTC with nothing in the
 * string that says so — and a browser reads that shape as LOCAL time. Left
 * alone, every row in the dashboard would be backdated by Podgorica's offset
 * and "prije 2 h" would be the newest possible timestamp. The marker goes back
 * in before parsing.
 */
function parseStamp(value: string): Date | null {
  const text = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)
    ? `${value.replace(" ", "T")}Z`
    : value;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const pad = (value: number) => String(value).padStart(2, "0");

function dateText(date: Date): string {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}.`;
}

function fullText(date: Date): string {
  return `${dateText(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function agoText(date: Date): string {
  const gap = Date.now() - date.getTime();
  if (gap < 0) return fullText(date);
  if (gap < MINUTE) return "upravo";
  if (gap < HOUR) return `prije ${Math.round(gap / MINUTE)} min`;
  if (gap < DAY) return `prije ${Math.round(gap / HOUR)} h`;
  if (gap < 7 * DAY) return `prije ${Math.round(gap / DAY)} d`;
  return dateText(date);
}

/** How long ago, with the exact stamp one hover away. */
export function When({ value, className = "" }: { value: string | null; className?: string }) {
  const date = value ? parseStamp(value) : null;
  if (!date) return <span className={`text-muted ${className}`}>—</span>;
  return (
    <time dateTime={date.toISOString()} title={fullText(date)} className={`tnum ${className}`}>
      {agoText(date)}
    </time>
  );
}

export function stampText(value: string | null): string {
  const date = value ? parseStamp(value) : null;
  return date ? fullText(date) : "—";
}

/* ── Status ───────────────────────────────────────────────────────────── */

export type StatusKind = "lead" | "project" | "request";

/** The rows carry `status: string`, so an unknown value is shown as it is
 *  stored rather than swallowed — a mislabelled row is a bug worth seeing. */
export function statusLabel(kind: StatusKind, value: string): string {
  if (kind === "lead") return isLeadStatus(value) ? LEAD_STATUS_LABELS[value] : value;
  if (kind === "project") return isProjectStatus(value) ? PROJECT_STATUS_LABELS[value] : value;
  return isRequestStatus(value) ? REQUEST_STATUS_LABELS[value] : value;
}

/* Red is kept for the two states that mean the studio owes somebody something
   today. Colour on every pill would say nothing. */
const NEEDS_ATTENTION = new Set(["lead:new", "project:onboarding_completed"]);

export function StatusPill({ kind, value }: { kind: StatusKind; value: string }) {
  return (
    <OsBadge tone={NEEDS_ATTENTION.has(`${kind}:${value}`) ? "red" : "ink"}>
      {statusLabel(kind, value)}
    </OsBadge>
  );
}

/* ── Packages ─────────────────────────────────────────────────────────── */

/** The plan names exactly as the pricing table sets them. Written out rather
 *  than read from the landing dictionary: three words do not justify shipping
 *  the whole marketing copy to a screen only the studio opens. The prices are
 *  not — those come from `packages.ts`, which is the one place they live. */
export const PACKAGE_NAMES: Record<PackageId, string> = {
  start: "Start",
  business: "Biznis",
  project: "Projekat",
};

export function packageText(id: string): string {
  return isPackageId(id) ? `${PACKAGE_NAMES[id]} · ${priceLabel(id, "me")}` : id;
}

export const PACKAGE_OPTIONS = PACKAGE_IDS.map((id) => ({
  value: id,
  label: packageText(id),
}));

/** An onboarding request the client can still fill in — the same three
 *  statuses the cancel endpoint treats as live. */
const LIVE_REQUEST = new Set(["created", "opened", "in_progress"]);

export function isLiveRequest(status: string | null): boolean {
  return status !== null && LIVE_REQUEST.has(status);
}

/* ── Controls ─────────────────────────────────────────────────────────── */

export const inputClass =
  "min-h-11 w-full border-2 border-ink bg-paper px-3 py-2 text-base text-ink";

export const textareaClass =
  "w-full border-2 border-ink bg-paper px-3 py-2 text-base leading-relaxed text-ink";

export const buttonClass =
  "px px-btn inline-flex min-h-11 items-center justify-center bg-paper px-4 py-2 text-[1.15rem] text-ink transition-colors hover:text-red disabled:opacity-40";

export const primaryButtonClass =
  "px px-btn px-btn--primary inline-flex min-h-11 items-center justify-center bg-red px-4 py-2 text-center text-[1.15rem] text-white hover:bg-red-deep disabled:opacity-60";

export function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  maxLength,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  hint?: string;
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      {hint && <p className="text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

/**
 * Two taps for anything that cannot be undone: the first arms the button and
 * turns it into the confirmation, the second runs it. It disarms itself after
 * a few seconds so a forgotten armed button cannot be hit by accident later.
 * A dialog would cost more attention than the mistake it prevents.
 */
export function ConfirmButton({
  label,
  confirmLabel,
  onConfirm,
  busy = false,
  className = "",
}: {
  label: string;
  confirmLabel: string;
  onConfirm: () => void;
  busy?: boolean;
  className?: string;
}) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = window.setTimeout(() => setArmed(false), 6000);
    return () => window.clearTimeout(timer);
  }, [armed]);

  return (
    <button
      type="button"
      disabled={busy}
      aria-busy={busy}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          return;
        }
        setArmed(false);
        onConfirm();
      }}
      className={`${buttonClass} ${armed ? "text-red" : ""} ${className}`}
    >
      {armed ? confirmLabel : label}
    </button>
  );
}

/* ── Layout ───────────────────────────────────────────────────────────── */

/** One block of the screen: a heading rule, optional controls on the same
 *  line, and the content under it. The dashboard's only container — nothing
 *  nests inside anything else. */
export function Panel({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="border-t-2 border-ink pt-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 id={headingId} className="headline text-lg">
          {title}
        </h2>
        {actions}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function Facts({ children }: { children: ReactNode }) {
  return <dl className="grid gap-2">{children}</dl>;
}

export function Fact({ label, value }: { label: string; value: ReactNode }) {
  const empty = value === null || value === undefined || value === "";
  return (
    <div className="grid gap-0.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={empty ? "text-muted" : "break-words"}>{empty ? "—" : value}</dd>
    </div>
  );
}

/* ── Async states ─────────────────────────────────────────────────────── */

export type Async<T> =
  | { state: "loading" }
  | { state: "ready"; data: T }
  | { state: "error"; code: ApiErrorCode };

/**
 * One request, with its three answers and a way to ask again.
 *
 * A refetch keeps the data already on screen: saving a note and watching the
 * whole project blink out is worse than a stale second. `load` therefore has
 * to be stable — every caller wraps it in `useCallback` keyed by whatever the
 * request depends on.
 */
export function useLoad<T>(load: () => Promise<ApiResult<T>>) {
  const [result, setResult] = useState<Async<T>>({ state: "loading" });
  const [busy, setBusy] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const answer = await load();
      if (!alive) return;
      setBusy(false);
      setResult(
        answer.ok ? { state: "ready", data: answer.data } : { state: "error", code: answer.code },
      );
    })();
    return () => {
      alive = false;
    };
  }, [load, attempt]);

  /* The request is marked in flight here rather than in the effect. Nothing
     else starts one — the first load is what `busy` initialises to — and a
     setState in an effect body is a cascading render for no gain. */
  const reload = useCallback(() => {
    setBusy(true);
    setAttempt((value) => value + 1);
  }, []);
  return { result, busy, reload };
}

export function Loading({ label = "Učitavam…" }: { label?: string }) {
  return (
    <p role="status" className="py-6 text-muted">
      {label}
    </p>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="py-4 text-muted">
      {children}
    </p>
  );
}

export function DataError({ code, onRetry }: { code: ApiErrorCode; onRetry?: () => void }) {
  return (
    <div role="alert" className="border-l-2 border-red bg-paper-2 px-4 py-3">
      <p className="leading-relaxed font-semibold text-red">{apiText(code)}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className={`${buttonClass} mt-3`}>
          Pokušaj ponovo
        </button>
      )}
    </div>
  );
}

export function AsyncView<T>({
  result,
  busy = false,
  onRetry,
  children,
}: {
  result: Async<T>;
  /** A refetch over data that is already on screen. */
  busy?: boolean;
  onRetry: () => void;
  children: (data: T) => ReactNode;
}) {
  if (result.state === "loading") return <Loading />;
  if (result.state === "error") return <DataError code={result.code} onRetry={onRetry} />;

  return (
    <div aria-busy={busy}>
      {/* Nothing moves on screen during a refresh — the rows are still the
          right rows — but a screen reader is owed the news. */}
      <p role="status" className="sr-only">
        {busy ? "Osvježavam…" : ""}
      </p>
      {children(result.data)}
    </div>
  );
}

/* ── Timeline ─────────────────────────────────────────────────────────── */

const ACTIVITY_TEXT: Record<string, string | undefined> = ACTIVITY_LABELS;

export function activityLabel(kind: string): string {
  return ACTIVITY_TEXT[kind] ?? kind;
}

export function Timeline({ rows }: { rows: readonly ActivityRow[] }) {
  if (rows.length === 0) return <EmptyState>Još nema zapisa.</EmptyState>;

  return (
    <ol className="grid gap-2">
      {rows.map((row) => (
        <li
          key={row.id}
          className="grid gap-x-4 border-b border-line pb-2 sm:grid-cols-[9rem_1fr]"
        >
          <When value={row.created_at} className="text-sm text-muted" />
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">{activityLabel(row.kind)}</span>
            {row.detail && <span className="text-muted"> — {row.detail}</span>}
          </p>
        </li>
      ))}
    </ol>
  );
}
