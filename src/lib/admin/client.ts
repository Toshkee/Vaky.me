import type { Answers, ApiErrorCode, FileZone, PackageId } from "@/lib/onboarding/schema";
import type { LeadStatus, ProjectStatus } from "@/lib/workflow";

/**
 * The dashboard's whole conversation with the server.
 *
 * Same shape as `src/lib/onboarding/client.ts`: every call answers with a
 * result, never a thrown error, and every failure is a code the UI already
 * holds the Montenegrin wording for. A dead network, a 500 and a parse failure
 * all arrive as `server` — the screen must be able to say something either
 * way, including on a plain `next dev` where /api/ does not exist at all.
 *
 * The row types mirror `server/admin/store.ts` column for column. They are
 * written out again rather than imported because that module is compiled
 * against the Workers runtime (`D1Database`, no DOM) and is excluded from this
 * project's tsconfig. If a column changes there, it changes here.
 */

const BASE = "/api/admin";

/** Dispatched on any 401, so the app can drop back to the login screen from
 *  wherever the cookie expired rather than leaving a dead view on screen. */
export const SESSION_LOST = "vaky:admin-session-lost";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; code: ApiErrorCode };

/* ── What the endpoints return ────────────────────────────────────────── */

export type LeadRow = {
  id: string;
  name: string;
  business_name: string | null;
  email: string;
  phone: string | null;
  link: string | null;
  need: string | null;
  message: string | null;
  language: string;
  status: string;
  project_id: string | null;
  created_at: string;
  updated_at: string;
  notified_at: string | null;
  notify_error: string | null;
};

export type ProjectRow = {
  id: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  instagram: string | null;
  existing_site: string | null;
  package_id: string;
  status: string;
  lead_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectListRow = ProjectRow & {
  request_status: string | null;
  last_activity_at: string | null;
};

export type NoteRow = { id: string; body: string; created_at: string };

export type ActivityRow = {
  id: number;
  project_id: string | null;
  lead_id: string | null;
  kind: string;
  detail: string | null;
  created_at: string;
};

export type RecentActivityRow = ActivityRow & {
  project_name: string | null;
  lead_name: string | null;
  lead_business: string | null;
};

export type RequestRow = {
  id: string;
  status: string;
  language: string | null;
  created_at: string;
  first_opened_at: string | null;
  last_activity_at: string | null;
  completed_at: string | null;
};

export type SubmissionView = {
  id: string;
  packageId: string;
  language: string;
  /** Already parsed by the server; `null` when the stored JSON was unreadable. */
  answers: Answers | null;
  createdAt: string;
  updatedAt: string;
  notifyError: string | null;
};

export type ProjectFileRow = {
  id: string;
  zone: string;
  folder: string;
  original_name: string;
  content_type: string;
  size_bytes: number;
  /** "client" for an upload through the onboarding link, "admin" for one the
   *  studio added by hand. */
  source: string;
  created_at: string;
};

export type BriefRow = { id: string; mode: string; content: string; created_at: string };

export type ScopeWarning = { id: string; label: string };

export type Overview = {
  newLeads: number;
  activeProjects: number;
  waitingOnClient: number;
  needsReview: number;
  building: number;
  recent: RecentActivityRow[];
};

export type LeadDetail = { lead: LeadRow; notes: NoteRow[]; activity: ActivityRow[] };

export type ProjectDetail = {
  project: ProjectRow;
  request: RequestRow | null;
  submission: SubmissionView | null;
  files: ProjectFileRow[];
  notes: NoteRow[];
  /** The newest brief per mode. */
  briefs: BriefRow[];
  activity: ActivityRow[];
  warnings: ScopeWarning[];
  lead: LeadRow | null;
};

/** The three briefs `server/admin/brief.ts` can write. */
export const BRIEF_MODES = ["full", "design", "technical"] as const;
export type BriefMode = (typeof BRIEF_MODES)[number];

/** The project's whole editable surface — the endpoint takes the row it should
 *  end up with, not a diff. */
export type ProjectPatch = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  instagram: string;
  existingSite: string;
  packageId: PackageId;
  status: ProjectStatus;
};

export type NewProject = Omit<ProjectPatch, "status">;

/* ── Talking to it ────────────────────────────────────────────────────── */

const API_CODES: readonly ApiErrorCode[] = [
  "bad-request",
  "session",
  "rate-limit",
  "challenge",
  "link",
  "completed",
  "file-type",
  "file-size",
  "file-count",
  "file-total",
  "answers",
  "server",
];

function toCode(value: unknown): ApiErrorCode {
  return typeof value === "string" && (API_CODES as readonly string[]).includes(value)
    ? (value as ApiErrorCode)
    : "server";
}

async function readError(response: Response): Promise<ApiErrorCode> {
  try {
    const body = (await response.json()) as { error?: unknown };
    return toCode(body.error);
  } catch {
    if (response.status === 401) return "session";
    return response.status === 429 ? "rate-limit" : "server";
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(`${BASE}${path}`, init);
  } catch {
    return { ok: false, code: "server" };
  }

  if (response.status === 401) window.dispatchEvent(new Event(SESSION_LOST));
  if (!response.ok) return { ok: false, code: await readError(response) };

  try {
    return { ok: true, data: (await response.json()) as T };
  } catch {
    return { ok: false, code: "server" };
  }
}

function send(method: string, body: unknown): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

const path = (...parts: string[]) => parts.map(encodeURIComponent).join("/");

/* ── Session ──────────────────────────────────────────────────────────── */

export function getMe(): Promise<ApiResult<{ ok: boolean }>> {
  return call("/me");
}

export function login(password: string): Promise<ApiResult<{ ok: boolean }>> {
  return call("/login", send("POST", { password }));
}

export function logout(): Promise<ApiResult<{ ok: boolean }>> {
  return call("/logout", { method: "POST" });
}

/* ── Leads ────────────────────────────────────────────────────────────── */

export function getOverview(): Promise<ApiResult<Overview>> {
  return call("/overview");
}

export function getLeads(status: LeadStatus | null): Promise<ApiResult<{ leads: LeadRow[] }>> {
  return call(status ? `/leads?status=${status}` : "/leads");
}

export function getLead(id: string): Promise<ApiResult<LeadDetail>> {
  return call(`/${path("leads", id)}`);
}

/** Every lead status except "accepted", which only `convertLead` may set. */
export function setLeadStatus(
  id: string,
  status: Exclude<LeadStatus, "accepted">,
): Promise<ApiResult<{ ok: boolean }>> {
  return call(`/${path("leads", id)}`, send("PATCH", { status }));
}

export function addLeadNote(id: string, body: string): Promise<ApiResult<{ id: string }>> {
  return call(`/${path("leads", id, "notes")}`, send("POST", { body }));
}

export function convertLead(
  id: string,
  packageId: PackageId,
): Promise<ApiResult<{ projectId: string }>> {
  return call(`/${path("leads", id, "convert")}`, send("POST", { packageId }));
}

/** Refused for a lead that became a project — see the route. */
export function deleteLead(id: string): Promise<ApiResult<{ ok: boolean }>> {
  return call(`/${path("leads", id)}`, { method: "DELETE" });
}

/* ── Projects ─────────────────────────────────────────────────────────── */

export function getProjects(): Promise<ApiResult<{ projects: ProjectListRow[] }>> {
  return call("/projects");
}

export function createProject(input: NewProject): Promise<ApiResult<{ projectId: string }>> {
  return call("/projects", send("POST", input));
}

export function getProject(id: string): Promise<ApiResult<ProjectDetail>> {
  return call(`/${path("projects", id)}`);
}

export function saveProject(id: string, patch: ProjectPatch): Promise<ApiResult<{ ok: boolean }>> {
  return call(`/${path("projects", id)}`, send("PATCH", patch));
}

export function addProjectNote(id: string, body: string): Promise<ApiResult<{ id: string }>> {
  return call(`/${path("projects", id, "notes")}`, send("POST", { body }));
}

/** Takes the uploads, the brief and the timeline with it. Nothing comes back. */
export function deleteProject(id: string): Promise<ApiResult<{ ok: boolean }>> {
  return call(`/${path("projects", id)}`, { method: "DELETE" });
}

/** The URL comes back once and is never stored in the clear — whatever the
 *  caller does not show, nobody can look up later. */
export function createOnboarding(
  id: string,
): Promise<ApiResult<{ url: string; request: RequestRow }>> {
  return call(`/${path("projects", id, "onboarding")}`, { method: "POST" });
}

export function cancelOnboarding(id: string): Promise<ApiResult<{ ok: boolean }>> {
  return call(`/${path("projects", id, "onboarding")}`, { method: "DELETE" });
}

export function generateBrief(
  id: string,
  mode: BriefMode,
): Promise<ApiResult<{ id: string; mode: string; content: string }>> {
  return call(`/${path("projects", id, "brief")}`, send("POST", { mode }));
}

/* ── Files ────────────────────────────────────────────────────────────── */

/** The file is the request body, not a multipart field — the same shape the
 *  client-side uploader uses, and the reason the server can refuse something
 *  oversized from its Content-Length before reading a byte. */
export function uploadProjectFile(
  id: string,
  zone: FileZone,
  file: File,
): Promise<ApiResult<{ id: string; name: string; size: number; zone: string }>> {
  const query = new URLSearchParams({ zone, name: file.name });
  return call(`/${path("projects", id, "files")}?${query}`, {
    method: "POST",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
}

export function deleteFile(fileId: string): Promise<ApiResult<{ id: string }>> {
  return call(`/file?id=${encodeURIComponent(fileId)}`, { method: "DELETE" });
}

/** A plain download link — the admin cookie is what authorises it, so there is
 *  no token to mint and nothing to keep out of the DOM. */
export function fileHref(fileId: string): string {
  return `${BASE}/file?id=${encodeURIComponent(fileId)}`;
}
