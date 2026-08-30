/**
 * Signing, with the Web Crypto that Workers already has.
 *
 * No dependency and no Node built-in, which is what keeps the compiled Function
 * small and keeps `nodejs_compat` off the compatibility flags.
 */

const encoder = new TextEncoder();

async function key(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toBase64Url(bytes: ArrayBuffer): string {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array | null {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

/**
 * A signed claim, as `scope:part:part.signature`.
 *
 * `scope` is what stops one kind of signature being replayed as another — an
 * upload token cannot be presented as a file download link, because the bytes
 * that were signed say which one it is.
 */
export async function sign(secret: string, scope: string, parts: string[]): Promise<string> {
  const payload = [scope, ...parts].join(":");
  const signature = await crypto.subtle.sign("HMAC", await key(secret), encoder.encode(payload));
  return toBase64Url(signature);
}

/** Verifies through Web Crypto rather than by comparing strings, so the check
 *  itself cannot leak the signature one character at a time. */
export async function verify(
  secret: string,
  scope: string,
  parts: string[],
  signature: string,
): Promise<boolean> {
  const bytes = fromBase64Url(signature);
  if (!bytes) return false;
  const payload = [scope, ...parts].join(":");
  return crypto.subtle.verify(
    "HMAC",
    await key(secret),
    bytes as unknown as ArrayBuffer,
    encoder.encode(payload),
  );
}

/**
 * An IP address, reduced to something that can be counted but not read back.
 *
 * The rate limiter needs to know "this again", not "this is 84.205.x.y". The
 * secret goes into the digest so the table cannot be brute-forced back to
 * addresses by anyone who gets a copy of it — there are only four billion
 * IPv4 addresses, and a bare SHA-256 of one is not anonymous.
 */
export async function hashIp(secret: string, ip: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${secret}:${ip}`));
  return toBase64Url(digest).slice(0, 22);
}
