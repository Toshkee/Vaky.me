import { sign, verify } from "./crypto";
import { SESSION_TTL_MS } from "./env";

/**
 * The permission to add files to one submission, and nothing else.
 *
 * The id is minted here and signed into the token, so the only submission a
 * request can touch is the one its own token names. Nothing reads an id out of
 * a request body or a URL — that is the whole class of bug this shape exists to
 * remove.
 *
 * The token is not a login. It proves that whoever holds it passed the bot
 * check once, it expires, and it grants exactly one capability: writing files
 * under one folder that did not exist before it was issued.
 */

const SCOPE = "upload";

export type IssuedSession = {
  submissionId: string;
  token: string;
  expiresAt: number;
};

export async function issueSession(secret: string, now: number): Promise<IssuedSession> {
  const submissionId = crypto.randomUUID();
  const expiresAt = now + SESSION_TTL_MS;
  const signature = await sign(secret, SCOPE, [submissionId, String(expiresAt)]);
  return { submissionId, token: `${submissionId}.${expiresAt}.${signature}`, expiresAt };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export async function readSession(
  secret: string,
  token: string,
  now: number,
): Promise<{ submissionId: string } | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [submissionId, expiryText, signature] = parts;
  if (!UUID.test(submissionId)) return null;

  const expiresAt = Number(expiryText);
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return null;

  const valid = await verify(secret, SCOPE, [submissionId, expiryText], signature);
  return valid ? { submissionId } : null;
}

/* ── Download links ──────────────────────────────────────────────────────
   The notification email is the only place these appear, and the mailbox it
   lands in is the only credential. A different scope from the upload token, so
   neither can ever be presented as the other. */

export async function signDownload(
  secret: string,
  origin: string,
  fileId: string,
  expiresAt: number,
): Promise<string> {
  const signature = await sign(secret, "download", [fileId, String(expiresAt)]);
  const query = new URLSearchParams({ id: fileId, e: String(expiresAt), s: signature });
  return `${origin}/api/onboarding/file?${query}`;
}

export async function checkDownload(
  secret: string,
  fileId: string,
  expiryText: string,
  signature: string,
  now: number,
): Promise<boolean> {
  const expiresAt = Number(expiryText);
  if (!UUID.test(fileId) || !Number.isFinite(expiresAt) || expiresAt <= now) return false;
  return verify(secret, "download", [fileId, expiryText], signature);
}
