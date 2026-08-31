/**
 * The pipeline a person moves through, from stranger to launched site, written
 * as data. Every status string the database, the endpoints and the dashboard
 * use comes from this module — nothing renders or stores a raw literal — so a
 * status can be renamed in one place and a typo cannot invent a new one.
 *
 * Three lifecycles, deliberately separate rather than one long enum:
 *
 *   lead     — an enquiry from the public form. Ends at "accepted" (a project
 *              was made from it) or "declined".
 *   project  — the engagement itself, created only after Vaky and the
 *              client have agreed package and price outside the site.
 *   request  — one private onboarding link sent to one client. Tracks whether
 *              the form was opened, worked on, finished or withdrawn.
 *
 * Nothing here is about payment. A project's package records what was agreed
 * over Instagram, WhatsApp or a phone call — assigning it charges nobody.
 *
 * Imported by the browser (admin dashboard) and the Cloudflare Functions
 * build alike, so: relative imports only, no React, no DOM, no Node. The
 * labels are Montenegrin only because the dashboard is — clients never see
 * these words.
 */

export const LEAD_STATUSES = ["new", "contacted", "qualified", "accepted", "declined"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PROJECT_STATUSES = [
  "created",
  "onboarding_sent",
  "onboarding_completed",
  "building",
  "client_review",
  "completed",
  "on_hold",
  "cancelled",
] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const REQUEST_STATUSES = ["created", "opened", "in_progress", "completed", "cancelled"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

/** What the public lead form lets a visitor say they need. */
export const LEAD_NEEDS = ["new-site", "redesign", "shop", "something-else", "not-sure"] as const;
export type LeadNeed = (typeof LEAD_NEEDS)[number];

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}

export function isProjectStatus(value: unknown): value is ProjectStatus {
  return typeof value === "string" && (PROJECT_STATUSES as readonly string[]).includes(value);
}

export function isRequestStatus(value: unknown): value is RequestStatus {
  return typeof value === "string" && (REQUEST_STATUSES as readonly string[]).includes(value);
}

export function isLeadNeed(value: unknown): value is LeadNeed {
  return typeof value === "string" && (LEAD_NEEDS as readonly string[]).includes(value);
}

/* ── Dashboard labels ─────────────────────────────────────────────────── */

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Novo",
  contacted: "Kontaktiran",
  qualified: "Ozbiljan upit",
  accepted: "Prihvaćen",
  declined: "Odbijen",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  created: "Otvoren",
  onboarding_sent: "Poslat upitnik",
  onboarding_completed: "Upitnik popunjen",
  building: "U izradi",
  client_review: "Klijent pregleda",
  completed: "Završen",
  on_hold: "Na čekanju",
  cancelled: "Otkazan",
};

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  created: "Link napravljen",
  opened: "Otvoren",
  in_progress: "U toku",
  completed: "Popunjen",
  cancelled: "Poništen",
};

export const LEAD_NEED_LABELS: Record<LeadNeed, string> = {
  "new-site": "Novi sajt",
  redesign: "Redizajn postojećeg",
  shop: "Online prodavnica",
  "something-else": "Nešto drugo",
  "not-sure": "Nije siguran",
};

/* ── Activity timeline ────────────────────────────────────────────────── */

/** One line per thing that happened, so the project view can answer "what is
 *  the state of this and how did it get there" without archaeology. */
export const ACTIVITY_KINDS = [
  "lead_submitted",
  "lead_status_changed",
  "project_created",
  "project_status_changed",
  "package_changed",
  "onboarding_created",
  "onboarding_opened",
  "onboarding_completed",
  "onboarding_cancelled",
  "note_added",
  "file_added",
  "brief_generated",
] as const;
export type ActivityKind = (typeof ACTIVITY_KINDS)[number];

export const ACTIVITY_LABELS: Record<ActivityKind, string> = {
  lead_submitted: "Upit stigao",
  lead_status_changed: "Status upita promijenjen",
  project_created: "Projekat otvoren",
  project_status_changed: "Status projekta promijenjen",
  package_changed: "Paket promijenjen",
  onboarding_created: "Onboarding link napravljen",
  onboarding_opened: "Klijent otvorio upitnik",
  onboarding_completed: "Klijent popunio upitnik",
  onboarding_cancelled: "Onboarding link poništen",
  note_added: "Bilješka dodata",
  file_added: "Fajl dodat",
  brief_generated: "Build brief generisan",
};
