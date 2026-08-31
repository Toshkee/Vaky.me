-- VibeLab internal workflow: leads, projects, private onboarding links,
-- notes, build briefs, activity.
--
--   npx wrangler d1 migrations apply vibelab-onboarding --local -c wrangler.local.jsonc
--   npx wrangler d1 migrations apply vibelab-onboarding --remote -c wrangler.local.jsonc
--
-- Migrations are applied by hand, never by deploy — see ONBOARDING_SETUP.md.
-- Unlike 0001, this file is NOT idempotent: the ALTER TABLE statements at the
-- bottom fail if run twice. Apply it through wrangler's migration runner,
-- which records what has run, rather than pasting it into a console.

-- ── Leads ───────────────────────────────────────────────────────────────
--
-- One row per enquiry from the public "Zatraži ponudu" form. A lead is not a
-- client: it becomes one only when VibeLab and the person agree a package and
-- a price outside the site, at which point a project is created and
-- `project_id` points at it.
--
-- Status values mirror src/lib/workflow.ts LEAD_STATUSES. The CHECK is cheap
-- insurance against a typo'd literal reaching the database; renaming a status
-- is an application change first and a migration second.
CREATE TABLE IF NOT EXISTS leads (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  business_name  TEXT,
  email          TEXT NOT NULL,
  phone          TEXT,
  link           TEXT,             -- Instagram or existing site, as typed
  need           TEXT,             -- what they said they need (LEAD_NEEDS id)
  message        TEXT,
  language       TEXT NOT NULL DEFAULT 'me',
  status         TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'contacted', 'qualified', 'accepted', 'declined')),
  project_id     TEXT,

  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now')),

  -- Whether VibeLab was told, same contract as on submissions: the database
  -- is the record, the email is a courtesy, and a lead whose email failed is
  -- visible as such instead of silently unread.
  notified_at    TEXT,
  notify_error   TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status  ON leads (status, created_at DESC);

-- ── Projects ────────────────────────────────────────────────────────────
--
-- The engagement itself. Created by an admin — either from a lead or by
-- hand — only after package and price are agreed outside the site. The
-- package here is what was agreed, not what anyone bought through a checkout;
-- there is no checkout.
CREATE TABLE IF NOT EXISTS projects (
  id             TEXT PRIMARY KEY,
  business_name  TEXT NOT NULL,
  contact_name   TEXT,
  email          TEXT,
  phone          TEXT,
  instagram      TEXT,
  existing_site  TEXT,
  package_id     TEXT NOT NULL,    -- packages are app config; deliberately no CHECK
  status         TEXT NOT NULL DEFAULT 'created'
                   CHECK (status IN ('created', 'onboarding_sent', 'onboarding_completed',
                                     'building', 'client_review', 'completed', 'on_hold', 'cancelled')),
  lead_id        TEXT,

  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_created ON projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status  ON projects (status, created_at DESC);

-- ── Private onboarding links ────────────────────────────────────────────
--
-- One row per link sent to one client. The row's id doubles as the id of the
-- submission the link will eventually produce — one link, one brief.
--
-- `token_hash` is SHA-256 of the URL token, never the token itself: the only
-- copy of a live link is the one in the client's hands, and a copy of this
-- database cannot mint working links from it. The token itself is 24 random
-- bytes, shown to the admin exactly once, at creation.
CREATE TABLE IF NOT EXISTS onboarding_requests (
  id                TEXT PRIMARY KEY,
  project_id        TEXT NOT NULL,
  token_hash        TEXT NOT NULL UNIQUE,
  package_id        TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'created'
                      CHECK (status IN ('created', 'opened', 'in_progress', 'completed', 'cancelled')),
  language          TEXT,

  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  first_opened_at   TEXT,
  last_activity_at  TEXT,
  completed_at      TEXT
);

CREATE INDEX IF NOT EXISTS idx_requests_project ON onboarding_requests (project_id, created_at DESC);

-- ── Internal notes ──────────────────────────────────────────────────────
--
-- Admin-only, never shown to a client and never emailed to one. Attached to a
-- lead or to a project — exactly one of the two ids is set.
CREATE TABLE IF NOT EXISTS notes (
  id          TEXT PRIMARY KEY,
  project_id  TEXT,
  lead_id     TEXT,
  body        TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK ((project_id IS NULL) <> (lead_id IS NULL))
);

CREATE INDEX IF NOT EXISTS idx_notes_project ON notes (project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_lead    ON notes (lead_id, created_at DESC);

-- ── Build briefs ────────────────────────────────────────────────────────
--
-- Every generated brief is kept — they are cheap text, and "what did I paste
-- into the agent last week" is a question worth answering. The newest row per
-- (project, mode) is the current one; there is no versioning beyond that.
CREATE TABLE IF NOT EXISTS build_briefs (
  id          TEXT PRIMARY KEY,
  project_id  TEXT NOT NULL,
  mode        TEXT NOT NULL CHECK (mode IN ('full', 'design', 'technical')),
  content     TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_briefs_project ON build_briefs (project_id, created_at DESC);

-- ── Activity ────────────────────────────────────────────────────────────
--
-- A plain timeline, one row per thing that happened, so the dashboard can say
-- how a project got to where it is. Not an audit system: no actor column
-- (there is one admin), no payloads, and nothing depends on it being complete.
CREATE TABLE IF NOT EXISTS activity (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id  TEXT,
  lead_id     TEXT,
  kind        TEXT NOT NULL,
  detail      TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_activity_project ON activity (project_id, id DESC);
CREATE INDEX IF NOT EXISTS idx_activity_lead    ON activity (lead_id, id DESC);

-- ── Existing tables, extended ───────────────────────────────────────────
--
-- Files: `submission_id` becomes "owner id" — the submission for a client's
-- uploads, the project for files an admin adds by hand (a menu that arrived
-- over WhatsApp). `source` says which, `project_id` is backfilled when a
-- brief is submitted so a project's files are one indexed query.
ALTER TABLE onboarding_files ADD COLUMN source TEXT NOT NULL DEFAULT 'client';
ALTER TABLE onboarding_files ADD COLUMN project_id TEXT;
CREATE INDEX IF NOT EXISTS idx_files_project ON onboarding_files (project_id);

-- Submissions: which link produced them and which project they belong to.
-- Rows from the public-form era keep NULL in both.
ALTER TABLE onboarding_submissions ADD COLUMN request_id TEXT;
ALTER TABLE onboarding_submissions ADD COLUMN project_id TEXT;
CREATE INDEX IF NOT EXISTS idx_submissions_project ON onboarding_submissions (project_id);
