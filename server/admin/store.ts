import type { ActivityKind, LeadStatus, ProjectStatus } from "../../src/lib/workflow";

/**
 * Every statement the admin dashboard runs, in one place — the same contract
 * `server/onboarding/store.ts` keeps for the client-facing endpoints.
 *
 * Row types mirror the tables in `migrations/0002_workflow.sql` column for
 * column. Statuses are typed at the edges (the endpoints validate against
 * `src/lib/workflow.ts` before anything reaches here); inside this module
 * they are the strings the database holds.
 */

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

/** The list view's row: the project plus what its newest onboarding link is
 *  doing, so the table can say "waiting on the client" without a second
 *  query per row. */
export type ProjectListRow = ProjectRow & {
  request_status: string | null;
  last_activity_at: string | null;
};

export type NoteRow = {
  id: string;
  project_id: string | null;
  lead_id: string | null;
  body: string;
  created_at: string;
};

export type BriefRow = {
  id: string;
  project_id: string;
  mode: string;
  content: string;
  created_at: string;
};

export type ActivityRow = {
  id: number;
  project_id: string | null;
  lead_id: string | null;
  kind: string;
  detail: string | null;
  created_at: string;
};

/* ── Leads ────────────────────────────────────────────────────────────── */

export type LeadInput = {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  link: string;
  need: string;
  message: string;
  language: string;
};

export async function recordLead(db: D1Database, input: LeadInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO leads (id, name, business_name, email, phone, link, need, message, language)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`,
    )
    .bind(
      input.id,
      input.name,
      input.businessName || null,
      input.email,
      input.phone || null,
      input.link || null,
      input.need || null,
      input.message || null,
      input.language,
    )
    .run();
}

export async function listLeads(db: D1Database, status: LeadStatus | null): Promise<LeadRow[]> {
  const { results } = status
    ? await db
        .prepare(`SELECT * FROM leads WHERE status = ?1 ORDER BY created_at DESC LIMIT 200`)
        .bind(status)
        .all<LeadRow>()
    : await db.prepare(`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`).all<LeadRow>();
  return results ?? [];
}

export async function findLead(db: D1Database, id: string): Promise<LeadRow | null> {
  return db.prepare(`SELECT * FROM leads WHERE id = ?1`).bind(id).first<LeadRow>();
}

export async function setLeadStatus(db: D1Database, id: string, status: LeadStatus): Promise<void> {
  await db
    .prepare(`UPDATE leads SET status = ?2, updated_at = datetime('now') WHERE id = ?1`)
    .bind(id, status)
    .run();
}

/** Converting is one motion: the lead points at its project and stops being
 *  an open enquiry. */
export async function acceptLead(db: D1Database, leadId: string, projectId: string): Promise<void> {
  await db
    .prepare(
      `UPDATE leads SET status = 'accepted', project_id = ?2, updated_at = datetime('now')
       WHERE id = ?1`,
    )
    .bind(leadId, projectId)
    .run();
}

export async function markLeadNotified(
  db: D1Database,
  leadId: string,
  error: string | null,
): Promise<void> {
  await db
    .prepare(
      `UPDATE leads
       SET notified_at = CASE WHEN ?2 IS NULL THEN datetime('now') ELSE notified_at END,
           notify_error = ?2
       WHERE id = ?1`,
    )
    .bind(leadId, error)
    .run();
}

/* ── Projects ─────────────────────────────────────────────────────────── */

export type ProjectInput = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  instagram: string;
  existingSite: string;
  packageId: string;
  leadId: string | null;
};

export async function createProject(db: D1Database, input: ProjectInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO projects
         (id, business_name, contact_name, email, phone, instagram, existing_site, package_id, lead_id)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`,
    )
    .bind(
      input.id,
      input.businessName,
      input.contactName || null,
      input.email || null,
      input.phone || null,
      input.instagram || null,
      input.existingSite || null,
      input.packageId,
      input.leadId,
    )
    .run();
}

export async function listProjects(db: D1Database): Promise<ProjectListRow[]> {
  const { results } = await db
    .prepare(
      `SELECT p.*, r.status AS request_status, r.last_activity_at
       FROM projects p
       LEFT JOIN onboarding_requests r ON r.id = (
         SELECT id FROM onboarding_requests
         WHERE project_id = p.id ORDER BY created_at DESC LIMIT 1
       )
       ORDER BY p.created_at DESC LIMIT 200`,
    )
    .all<ProjectListRow>();
  return results ?? [];
}

export async function findProject(db: D1Database, id: string): Promise<ProjectRow | null> {
  return db.prepare(`SELECT * FROM projects WHERE id = ?1`).bind(id).first<ProjectRow>();
}

/** The editable fields, updated together. The endpoint sends the row it wants
 *  back rather than a diff — with one admin there is nothing to merge. */
export type ProjectPatch = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  instagram: string;
  existingSite: string;
  packageId: string;
  status: ProjectStatus;
};

export async function updateProject(db: D1Database, id: string, patch: ProjectPatch): Promise<void> {
  await db
    .prepare(
      `UPDATE projects SET
         business_name = ?2, contact_name = ?3, email = ?4, phone = ?5,
         instagram = ?6, existing_site = ?7, package_id = ?8, status = ?9,
         updated_at = datetime('now')
       WHERE id = ?1`,
    )
    .bind(
      id,
      patch.businessName,
      patch.contactName || null,
      patch.email || null,
      patch.phone || null,
      patch.instagram || null,
      patch.existingSite || null,
      patch.packageId,
      patch.status,
    )
    .run();
}

export async function setProjectStatus(
  db: D1Database,
  id: string,
  status: ProjectStatus,
): Promise<void> {
  await db
    .prepare(`UPDATE projects SET status = ?2, updated_at = datetime('now') WHERE id = ?1`)
    .bind(id, status)
    .run();
}

/** The one status transition a client causes: their brief arrived. Guarded so
 *  a late re-submission cannot drag a project that is already being built
 *  back to "onboarding completed". */
export async function markProjectOnboarded(db: D1Database, id: string): Promise<void> {
  await db
    .prepare(
      `UPDATE projects SET status = 'onboarding_completed', updated_at = datetime('now')
       WHERE id = ?1 AND status IN ('created', 'onboarding_sent')`,
    )
    .bind(id)
    .run();
}

/** Keeps a pending link's package honest after an admin changes the
 *  project's — the client's next visit asks the new questions. */
export async function retargetOpenRequests(
  db: D1Database,
  projectId: string,
  packageId: string,
): Promise<void> {
  await db
    .prepare(
      `UPDATE onboarding_requests SET package_id = ?2
       WHERE project_id = ?1 AND status IN ('created', 'opened', 'in_progress')`,
    )
    .bind(projectId, packageId)
    .run();
}

/* ── Submissions, seen from a project ─────────────────────────────────── */

export type SubmissionRow = {
  id: string;
  package_id: string;
  language: string;
  answers: string;
  created_at: string;
  updated_at: string;
  notified_at: string | null;
  notify_error: string | null;
};

export async function findSubmissionForProject(
  db: D1Database,
  projectId: string,
): Promise<SubmissionRow | null> {
  return db
    .prepare(
      `SELECT id, package_id, language, answers, created_at, updated_at, notified_at, notify_error
       FROM onboarding_submissions
       WHERE project_id = ?1 ORDER BY updated_at DESC LIMIT 1`,
    )
    .bind(projectId)
    .first<SubmissionRow>();
}

/* ── Files, seen from a project ───────────────────────────────────────── */

export type ProjectFileRow = {
  id: string;
  zone: string;
  folder: string;
  original_name: string;
  storage_key: string;
  content_type: string;
  size_bytes: number;
  source: string;
  created_at: string;
};

/** Everything the project holds: what the client uploaded through their link
 *  (matched via the link's rows, since uploads can precede the backfill) and
 *  what an admin added by hand. */
export async function listProjectFiles(
  db: D1Database,
  projectId: string,
): Promise<ProjectFileRow[]> {
  const { results } = await db
    .prepare(
      `SELECT id, zone, folder, original_name, storage_key, content_type, size_bytes, source, created_at
       FROM onboarding_files
       WHERE project_id = ?1
          OR submission_id = ?1
          OR submission_id IN (SELECT id FROM onboarding_requests WHERE project_id = ?1)
       ORDER BY created_at`,
    )
    .bind(projectId)
    .all<ProjectFileRow>();
  return results ?? [];
}

/** A file the studio adds by hand — the menu that arrived over WhatsApp. The
 *  owner column carries the project id (there is no submission), and `source`
 *  says a person at VibeLab put it there. */
export async function recordAdminFile(
  db: D1Database,
  row: {
    id: string;
    projectId: string;
    zone: string;
    folder: string;
    originalName: string;
    storageKey: string;
    contentType: string;
    sizeBytes: number;
  },
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO onboarding_files
         (id, submission_id, zone, folder, original_name, storage_key, content_type, size_bytes,
          source, project_id)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, 'admin', ?2)`,
    )
    .bind(
      row.id,
      row.projectId,
      row.zone,
      row.folder,
      row.originalName,
      row.storageKey,
      row.contentType,
      row.sizeBytes,
    )
    .run();
}

/** Stamps a project onto the files a submission brought in, so the common
 *  query above hits the indexed column instead of the subselect. */
export async function linkFilesToProject(
  db: D1Database,
  submissionId: string,
  projectId: string,
): Promise<void> {
  await db
    .prepare(`UPDATE onboarding_files SET project_id = ?2 WHERE submission_id = ?1`)
    .bind(submissionId, projectId)
    .run();
}

/* ── Notes ────────────────────────────────────────────────────────────── */

export async function addNote(
  db: D1Database,
  id: string,
  target: { projectId: string | null; leadId: string | null },
  body: string,
): Promise<void> {
  await db
    .prepare(`INSERT INTO notes (id, project_id, lead_id, body) VALUES (?1, ?2, ?3, ?4)`)
    .bind(id, target.projectId, target.leadId, body)
    .run();
}

export async function listNotes(
  db: D1Database,
  target: { projectId: string | null; leadId: string | null },
): Promise<NoteRow[]> {
  const { results } = target.projectId
    ? await db
        .prepare(`SELECT * FROM notes WHERE project_id = ?1 ORDER BY created_at DESC`)
        .bind(target.projectId)
        .all<NoteRow>()
    : await db
        .prepare(`SELECT * FROM notes WHERE lead_id = ?1 ORDER BY created_at DESC`)
        .bind(target.leadId)
        .all<NoteRow>();
  return results ?? [];
}

/* ── Build briefs ─────────────────────────────────────────────────────── */

export async function addBrief(
  db: D1Database,
  id: string,
  projectId: string,
  mode: string,
  content: string,
): Promise<void> {
  await db
    .prepare(`INSERT INTO build_briefs (id, project_id, mode, content) VALUES (?1, ?2, ?3, ?4)`)
    .bind(id, projectId, mode, content)
    .run();
}

/** The newest brief per mode — the version picker the dashboard offers. */
export async function listLatestBriefs(db: D1Database, projectId: string): Promise<BriefRow[]> {
  const { results } = await db
    .prepare(
      `SELECT b.* FROM build_briefs b
       WHERE b.id = (
         SELECT id FROM build_briefs
         WHERE project_id = b.project_id AND mode = b.mode
         ORDER BY created_at DESC LIMIT 1
       ) AND b.project_id = ?1
       ORDER BY b.created_at DESC`,
    )
    .bind(projectId)
    .all<BriefRow>();
  return results ?? [];
}

/* ── Activity ─────────────────────────────────────────────────────────── */

/**
 * Best effort by design: the timeline is a convenience, and no action should
 * fail because its diary entry did.
 */
export async function logActivity(
  db: D1Database,
  target: { projectId?: string | null; leadId?: string | null },
  kind: ActivityKind,
  detail?: string,
): Promise<void> {
  try {
    await db
      .prepare(`INSERT INTO activity (project_id, lead_id, kind, detail) VALUES (?1, ?2, ?3, ?4)`)
      .bind(target.projectId ?? null, target.leadId ?? null, kind, detail ?? null)
      .run();
  } catch {
    // The action already happened; the diary can miss a line.
  }
}

export async function listActivity(
  db: D1Database,
  target: { projectId: string | null; leadId: string | null },
): Promise<ActivityRow[]> {
  const { results } = target.projectId
    ? await db
        .prepare(`SELECT * FROM activity WHERE project_id = ?1 ORDER BY id DESC LIMIT 50`)
        .bind(target.projectId)
        .all<ActivityRow>()
    : await db
        .prepare(`SELECT * FROM activity WHERE lead_id = ?1 ORDER BY id DESC LIMIT 50`)
        .bind(target.leadId)
        .all<ActivityRow>();
  return results ?? [];
}

/* ── Overview ─────────────────────────────────────────────────────────── */

/** Activity with the names joined in, so the dashboard's timeline can say
 *  who a line is about without a lookup per row. */
export type RecentActivityRow = ActivityRow & {
  project_name: string | null;
  lead_name: string | null;
  lead_business: string | null;
};

export type Overview = {
  newLeads: number;
  activeProjects: number;
  waitingOnClient: number;
  needsReview: number;
  building: number;
  recent: RecentActivityRow[];
};

export async function overview(db: D1Database): Promise<Overview> {
  const [leads, active, waiting, review, building, recent] = await Promise.all([
    db.prepare(`SELECT COUNT(*) AS n FROM leads WHERE status = 'new'`).first<{ n: number }>(),
    db
      .prepare(
        `SELECT COUNT(*) AS n FROM projects
         WHERE status NOT IN ('completed', 'cancelled')`,
      )
      .first<{ n: number }>(),
    db
      .prepare(
        `SELECT COUNT(*) AS n FROM onboarding_requests
         WHERE status IN ('created', 'opened', 'in_progress')`,
      )
      .first<{ n: number }>(),
    db
      .prepare(`SELECT COUNT(*) AS n FROM projects WHERE status = 'onboarding_completed'`)
      .first<{ n: number }>(),
    db.prepare(`SELECT COUNT(*) AS n FROM projects WHERE status = 'building'`).first<{ n: number }>(),
    db
      .prepare(
        `SELECT a.*, p.business_name AS project_name, l.name AS lead_name,
                l.business_name AS lead_business
         FROM activity a
         LEFT JOIN projects p ON p.id = a.project_id
         LEFT JOIN leads l ON l.id = a.lead_id
         ORDER BY a.id DESC LIMIT 15`,
      )
      .all<RecentActivityRow>(),
  ]);

  return {
    newLeads: leads?.n ?? 0,
    activeProjects: active?.n ?? 0,
    waitingOnClient: waiting?.n ?? 0,
    needsReview: review?.n ?? 0,
    building: building?.n ?? 0,
    recent: recent.results ?? [],
  };
}
