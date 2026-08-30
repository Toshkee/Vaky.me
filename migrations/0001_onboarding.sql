-- VibeLab client onboarding.
--
--   npx wrangler d1 migrations apply vibelab-onboarding --local     (dev)
--   npx wrangler d1 migrations apply vibelab-onboarding --remote    (production)
--
-- Nothing runs this on deploy. Cloudflare Pages builds the site and the
-- Functions; migrations are applied by hand from a machine that has logged in
-- with `wrangler login`. See ONBOARDING_SETUP.md.

-- ── The brief ───────────────────────────────────────────────────────────
--
-- The answers are one JSON document, because that is what they are: a set of
-- questions that changes with the package and with the client's own choices.
-- Forty mostly-null columns would describe that badly and would need a
-- migration every time a question is added.
--
-- The four fields an admin list has to sort and search by are lifted out of
-- that document by generated columns. They are queryable and indexable without
-- being stored twice, and — unlike copies — they cannot drift away from the
-- brief they came from.
--
-- `package_id` is deliberately un-constrained: packages are configuration in
-- the application, and a CHECK here would mean a database migration every time
-- the studio renames or adds one.
CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id              TEXT PRIMARY KEY,
  package_id      TEXT NOT NULL,
  package_source  TEXT NOT NULL,
  language        TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'new'
                    CHECK (status IN ('new', 'in_review', 'in_progress', 'done', 'archived')),
  answers         TEXT NOT NULL,

  business_name   TEXT GENERATED ALWAYS AS (json_extract(answers, '$.businessName')) STORED,
  contact_name    TEXT GENERATED ALWAYS AS (json_extract(answers, '$.contactName'))  STORED,
  contact_email   TEXT GENERATED ALWAYS AS (json_extract(answers, '$.email'))        STORED,
  contact_phone   TEXT GENERATED ALWAYS AS (json_extract(answers, '$.phone'))        STORED,

  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),

  -- Whether VibeLab was told. A brief with a note here is one that arrived but
  -- whose email did not, which is the case a future admin list must surface.
  notified_at     TEXT,
  notify_error    TEXT
);

CREATE INDEX IF NOT EXISTS idx_submissions_created ON onboarding_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status  ON onboarding_submissions (status, created_at DESC);

-- ── Uploaded materials ──────────────────────────────────────────────────
--
-- One row per object in R2. `storage_key` is the full path in the bucket.
--
-- There is deliberately NO foreign key to onboarding_submissions. Files are
-- uploaded while the client is still filling the form in, before the brief is
-- sent, so at insert time the submission row does not exist yet — a foreign key
-- would reject every upload. The id is not client-supplied either way: it comes
-- out of a signed token, so a row can only ever name a submission the uploader
-- was actually issued.
--
-- Materials whose brief was never sent are found with:
--   SELECT * FROM onboarding_files f
--   WHERE NOT EXISTS (SELECT 1 FROM onboarding_submissions s WHERE s.id = f.submission_id)
--     AND f.created_at < datetime('now', '-30 days');
CREATE TABLE IF NOT EXISTS onboarding_files (
  id             TEXT PRIMARY KEY,
  submission_id  TEXT NOT NULL,
  zone           TEXT NOT NULL,
  folder         TEXT NOT NULL,
  original_name  TEXT NOT NULL,
  storage_key    TEXT NOT NULL UNIQUE,
  content_type   TEXT NOT NULL,
  size_bytes     INTEGER NOT NULL,
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_files_submission ON onboarding_files (submission_id);

-- ── Rate limiting ───────────────────────────────────────────────────────
--
-- A fixed window per hashed address. The key is a keyed digest, never an IP:
-- there are only four billion IPv4 addresses, so a plain hash of one is not
-- anonymous, and this table should not be able to say who visited.
--
-- WITHOUT ROWID because every row is its own primary key and is read by it.
-- Old windows are swept by the first request of a new one; no cron trigger.
CREATE TABLE IF NOT EXISTS onboarding_rate_limit (
  bucket_key    TEXT NOT NULL,
  window_start  INTEGER NOT NULL,
  count         INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (bucket_key, window_start)
) WITHOUT ROWID;
