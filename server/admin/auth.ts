import { sha256Hex, sign, verify } from "../onboarding/crypto";
import { ADMIN_SESSION_TTL_MS } from "../onboarding/env";

/**
 * The lock on /admin: one password, one signed cookie.
 *
 * There is exactly one admin — the studio — so this is deliberately not a
 * user system. The password lives as a Cloudflare secret (`ADMIN_PASSWORD`,
 * write-only, never in the repo or the bundle) and is checked server-side; a
 * correct guess buys a cookie that is nothing but an expiry and an HMAC over
 * it, in the same scoped-signature scheme the upload tokens use. No session
 * table: the signature is the session, and rotating the secret logs
 * everything out.
 *
 * The comparison hashes both sides first. Equality of two SHA-256 digests
 * leaks, at worst, how many leading bytes of the digest match — useless for
 * recovering a password, unlike a timing oracle over the password itself.
 */

const COOKIE = "vibelab_admin";
const SCOPE = "admin";

export async function passwordMatches(expected: string, provided: string): Promise<boolean> {
  if (!expected || !provided) return false;
  return (await sha256Hex(expected)) === (await sha256Hex(provided));
}

export async function issueAdminCookie(secret: string, now: number): Promise<string> {
  const expiresAt = now + ADMIN_SESSION_TTL_MS;
  const signature = await sign(secret, SCOPE, [String(expiresAt)]);
  const maxAge = Math.floor(ADMIN_SESSION_TTL_MS / 1000);
  return `${COOKIE}=${expiresAt}.${signature}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

export const CLEAR_ADMIN_COOKIE = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export async function isAdmin(secret: string, request: Request, now: number): Promise<boolean> {
  const header = request.headers.get("Cookie") ?? "";
  const raw = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (!raw) return false;

  const dot = raw.indexOf(".");
  if (dot <= 0) return false;

  const expiryText = raw.slice(0, dot);
  const signature = raw.slice(dot + 1);
  const expiresAt = Number(expiryText);
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return false;

  return verify(secret, SCOPE, [expiryText], signature);
}

/**
 * For requests that change something. `SameSite=Strict` already keeps the
 * cookie off cross-site requests in every current browser; this is the
 * belt to that suspender, and it costs one header read.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true; // same-origin fetches may omit it; strict cookies still hold
  return origin === new URL(request.url).origin;
}
