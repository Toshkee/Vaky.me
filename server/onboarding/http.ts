import type { ApiErrorCode, FieldErrors } from "../../src/lib/onboarding/schema";

/**
 * The shape of every response these endpoints give, and the headers on all of
 * them.
 *
 * The headers matter more than they look. `public/_headers` is a Pages
 * *static asset* mechanism — it does not reach a Function's response — and
 * Pages answers Functions with `Access-Control-Allow-Origin: *` unless told
 * otherwise. Without this, the brief API would be a JSON endpoint any site
 * could call from a visitor's browser, and the route that hands back a client's
 * uploaded file would be served without `nosniff`.
 */

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  /* Nothing here is cacheable: one response carries a signed token, another a
     client's own file. */
  "Cache-Control": "no-store",
};

export function withSecurityHeaders(response: Response, origin: string): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Vary", "Origin");
  return new Response(response.body, { status: response.status, headers });
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

const STATUS: Record<ApiErrorCode, number> = {
  "bad-request": 400,
  session: 401,
  "rate-limit": 429,
  challenge: 403,
  "file-type": 415,
  "file-size": 413,
  "file-count": 409,
  "file-total": 413,
  answers: 422,
  server: 500,
};

/**
 * A failure the browser can act on: a code it already holds the wording for,
 * and — when the brief itself was the problem — which fields to highlight.
 * Never a message, never a stack, never anything the client did not send.
 */
export function fail(code: ApiErrorCode, fields?: FieldErrors): Response {
  return json(fields ? { error: code, fields } : { error: code }, STATUS[code]);
}

export function bearer(request: Request): string {
  const header = request.headers.get("Authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

/** Cloudflare sets this on every request and a client cannot forge it — unlike
 *  `X-Forwarded-For`, which is why that one is not read here. */
export function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "";
}

export async function readJson(request: Request, maxBytes = 128 * 1024): Promise<unknown> {
  const declared = Number(request.headers.get("Content-Length") ?? "0");
  if (declared > maxBytes) return null;
  try {
    const text = await request.text();
    if (text.length > maxBytes) return null;
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}
