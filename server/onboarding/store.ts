import type { Answers, Language, PackageId, PackageSource } from "../../src/lib/onboarding/schema";

/**
 * Every database statement this feature runs, in one place.
 *
 * The brief itself is stored as JSON in `answers`, because it is a document
 * whose shape follows the package and the client's own choices — forty
 * columns, most of them null for any given client, would describe the schema
 * badly and change every time a question is added. The four things an admin
 * list actually needs to sort and search by are pulled out of that JSON by
 * generated columns in the migration, so they are queryable without being
 * stored twice and without being able to disagree with the brief.
 */

export type FileRow = {
  id: string;
  submission_id: string;
  zone: string;
  folder: string;
  original_name: string;
  storage_key: string;
  content_type: string;
  size_bytes: number;
};

export type SubmissionInput = {
  id: string;
  packageId: PackageId;
  packageSource: PackageSource;
  language: Language;
  answers: Answers;
  /** The private link that produced this brief, and the project it belongs
   *  to — both come off the request row, never from the client. */
  requestId: string;
  projectId: string;
};

export async function fileTotals(
  db: D1Database,
  submissionId: string,
): Promise<{ count: number; bytes: number }> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS count, COALESCE(SUM(size_bytes), 0) AS bytes
       FROM onboarding_files WHERE submission_id = ?1`,
    )
    .bind(submissionId)
    .first<{ count: number; bytes: number }>();
  return { count: row?.count ?? 0, bytes: row?.bytes ?? 0 };
}

export async function recordFile(db: D1Database, row: FileRow): Promise<void> {
  await db
    .prepare(
      `INSERT INTO onboarding_files
         (id, submission_id, zone, folder, original_name, storage_key, content_type, size_bytes)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`,
    )
    .bind(
      row.id,
      row.submission_id,
      row.zone,
      row.folder,
      row.original_name,
      row.storage_key,
      row.content_type,
      row.size_bytes,
    )
    .run();
}

export async function listFiles(db: D1Database, submissionId: string): Promise<FileRow[]> {
  const { results } = await db
    .prepare(
      `SELECT id, submission_id, zone, folder, original_name, storage_key, content_type, size_bytes
       FROM onboarding_files WHERE submission_id = ?1 ORDER BY created_at`,
    )
    .bind(submissionId)
    .all<FileRow>();
  return results ?? [];
}

export async function findFile(db: D1Database, fileId: string): Promise<FileRow | null> {
  return db
    .prepare(
      `SELECT id, submission_id, zone, folder, original_name, storage_key, content_type, size_bytes
       FROM onboarding_files WHERE id = ?1`,
    )
    .bind(fileId)
    .first<FileRow>();
}

/** Scoped to the submission as well as the id, so the check that a caller owns
 *  this file is in the statement itself and not only in the code above it. */
export async function deleteFile(
  db: D1Database,
  fileId: string,
  submissionId: string,
): Promise<void> {
  await db
    .prepare(`DELETE FROM onboarding_files WHERE id = ?1 AND submission_id = ?2`)
    .bind(fileId, submissionId)
    .run();
}

/**
 * Writes the brief.
 *
 * `INSERT OR REPLACE` rather than a plain insert: a client whose connection
 * dropped after the row was written but before the response arrived will press
 * send again, and the second attempt carries the same signed id. Rewriting
 * their own row is the correct outcome; a duplicate-key error shown to them is
 * not.
 */
export async function recordSubmission(db: D1Database, input: SubmissionInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO onboarding_submissions
         (id, package_id, package_source, language, status, answers, request_id, project_id,
          created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, 'new', ?5, ?6, ?7, datetime('now'), datetime('now'))
       ON CONFLICT (id) DO UPDATE SET
         package_id = excluded.package_id,
         package_source = excluded.package_source,
         language = excluded.language,
         answers = excluded.answers,
         request_id = excluded.request_id,
         project_id = excluded.project_id,
         updated_at = datetime('now')`,
    )
    .bind(
      input.id,
      input.packageId,
      input.packageSource,
      input.language,
      JSON.stringify(input.answers),
      input.requestId,
      input.projectId,
    )
    .run();
}

/** Records what happened to the notification email. A failure here is a note on
 *  the row, never a failed submission — the brief is already safe. */
export async function markNotified(
  db: D1Database,
  submissionId: string,
  error: string | null,
): Promise<void> {
  await db
    .prepare(
      `UPDATE onboarding_submissions
       SET notified_at = CASE WHEN ?2 IS NULL THEN datetime('now') ELSE notified_at END,
           notify_error = ?2
       WHERE id = ?1`,
    )
    .bind(submissionId, error)
    .run();
}
