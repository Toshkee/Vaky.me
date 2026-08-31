import type { Language, PackageId } from "../../src/lib/onboarding/schema";
import { isLanguage, isPackageId } from "../../src/lib/onboarding/schema";
import type { RequestStatus } from "../../src/lib/workflow";
import { isRequestStatus } from "../../src/lib/workflow";
import { sha256Hex } from "./crypto";

/**
 * One private onboarding link, from minting to completion.
 *
 * The token in the URL is the credential: 24 random bytes, readable exactly
 * once at creation, stored only as a SHA-256 hash. There is nothing to guess
 * (the space is 2^192), nothing to decode (it carries no data — the row
 * does), and nothing to steal from a database copy (a hash opens no form).
 *
 * The row's id doubles as the id of the submission the link will produce.
 * That is what ties a client's uploads, their answers and the project
 * together without a single client-supplied identifier: the token names the
 * row, the row names the submission, and the submission's package is whatever
 * VibeLab put on the row — a client cannot change it from the URL bar,
 * because the URL never says it.
 */

export type RequestRow = {
  id: string;
  project_id: string;
  package_id: string;
  status: string;
  language: string | null;
  created_at: string;
  first_opened_at: string | null;
  last_activity_at: string | null;
  completed_at: string | null;
};

export type MintedLink = { token: string; row: RequestRow };

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/* The shape a token must have before it is worth hashing — anything else is
   noise from a crawler, not a link VibeLab issued. */
const TOKEN = /^[A-Za-z0-9_-]{28,40}$/;

/**
 * Creates the link for a project and hands the token back — the only time it
 * exists in the clear. Any earlier live link for the same project is
 * cancelled first: one project, one working link, so a client can never be
 * filling in a form VibeLab has already replaced.
 */
export async function createRequest(
  db: D1Database,
  projectId: string,
  packageId: PackageId,
): Promise<MintedLink> {
  await db
    .prepare(
      `UPDATE onboarding_requests SET status = 'cancelled'
       WHERE project_id = ?1 AND status IN ('created', 'opened', 'in_progress')`,
    )
    .bind(projectId)
    .run();

  const token = randomToken();
  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO onboarding_requests (id, project_id, token_hash, package_id)
       VALUES (?1, ?2, ?3, ?4)`,
    )
    .bind(id, projectId, await sha256Hex(token), packageId)
    .run();

  const row = await findRequestById(db, id);
  if (!row) throw new Error("request row vanished between insert and read");
  return { token, row };
}

export async function findRequestByToken(
  db: D1Database,
  token: string,
): Promise<RequestRow | null> {
  if (!TOKEN.test(token)) return null;
  return db
    .prepare(`SELECT * FROM onboarding_requests WHERE token_hash = ?1`)
    .bind(await sha256Hex(token))
    .first<RequestRow>();
}

export async function findRequestById(db: D1Database, id: string): Promise<RequestRow | null> {
  return db.prepare(`SELECT * FROM onboarding_requests WHERE id = ?1`).bind(id).first<RequestRow>();
}

export async function listRequests(db: D1Database, projectId: string): Promise<RequestRow[]> {
  const { results } = await db
    .prepare(`SELECT * FROM onboarding_requests WHERE project_id = ?1 ORDER BY created_at DESC`)
    .bind(projectId)
    .all<RequestRow>();
  return results ?? [];
}

/** The typed view of a row the endpoints work with. A row whose package or
 *  status this build does not know is treated as broken rather than guessed
 *  at — it can only mean the database is newer than the code. */
export function readRequest(row: RequestRow): {
  id: string;
  projectId: string;
  packageId: PackageId;
  status: RequestStatus;
  language: Language | null;
} | null {
  if (!isPackageId(row.package_id) || !isRequestStatus(row.status)) return null;
  return {
    id: row.id,
    projectId: row.project_id,
    packageId: row.package_id,
    status: row.status,
    language: isLanguage(row.language) ? row.language : null,
  };
}

/** First open wins the timestamp; every open moves the status forward from
 *  "created" and refreshes the activity clock. */
export async function markOpened(db: D1Database, id: string, language: Language | null): Promise<void> {
  await db
    .prepare(
      `UPDATE onboarding_requests
       SET status = CASE WHEN status = 'created' THEN 'opened' ELSE status END,
           first_opened_at = COALESCE(first_opened_at, datetime('now')),
           last_activity_at = datetime('now'),
           language = COALESCE(?2, language)
       WHERE id = ?1 AND status IN ('created', 'opened', 'in_progress')`,
    )
    .bind(id, language)
    .run();
}

/** An upload session was opened — the client is actually working on it. */
export async function markInProgress(db: D1Database, id: string): Promise<void> {
  await db
    .prepare(
      `UPDATE onboarding_requests
       SET status = 'in_progress', last_activity_at = datetime('now')
       WHERE id = ?1 AND status IN ('created', 'opened', 'in_progress')`,
    )
    .bind(id)
    .run();
}

export async function markCompleted(db: D1Database, id: string, language: Language): Promise<void> {
  await db
    .prepare(
      `UPDATE onboarding_requests
       SET status = 'completed', language = ?2,
           last_activity_at = datetime('now'), completed_at = datetime('now')
       WHERE id = ?1`,
    )
    .bind(id, language)
    .run();
}

export async function cancelRequest(db: D1Database, id: string): Promise<void> {
  await db
    .prepare(
      `UPDATE onboarding_requests SET status = 'cancelled'
       WHERE id = ?1 AND status IN ('created', 'opened', 'in_progress')`,
    )
    .bind(id)
    .run();
}
