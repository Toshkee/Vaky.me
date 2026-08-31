import type { OnboardingEnv } from "./env";

/**
 * The two things standing between a public endpoint and a bad afternoon.
 *
 * Neither is clever, and that is the point: a Turnstile check the client never
 * sees, and a counter in the database. The heavier gate belongs at the edge — a
 * Cloudflare Rate Limiting Rule on `/api/onboarding/*` blocks a flood before a
 * Worker is ever invoked, which is what actually protects the bill. This is the
 * layer underneath it, and it is what runs when nobody has set that rule up.
 */

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Turnstile token server-side.
 *
 * With no secret configured this returns true — the studio may not have one to
 * hand, and the alternative is an onboarding link that silently rejects every
 * paying client. That trade is deliberate, it is written down in
 * ONBOARDING_SETUP.md, and the rate limiter still applies either way.
 */
export async function passesChallenge(
  env: OnboardingEnv,
  token: string,
  ip: string,
): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const response = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    /* Cloudflare's own verifier being unreachable is not the client's fault,
       and refusing a paying client's brief because of it would lose real work.
       The rate limiter is what holds in that window. */
    return true;
  }
}

export type Limit = { key: string; windowSeconds: number; max: number };

/** Opening a submission is rare per person; sending one, rarer still. Uploads
 *  are the loose one on purpose — forty files in ten minutes is one client
 *  emptying a photo folder, not an attack. `lead` is the only anonymous write
 *  on the site and is held tighter; `login` is tighter still, because the
 *  thing being counted there is password guesses. */
export const LIMITS = {
  session: { key: "session", windowSeconds: 600, max: 10 },
  upload: { key: "upload", windowSeconds: 600, max: 60 },
  submit: { key: "submit", windowSeconds: 3600, max: 10 },
  context: { key: "context", windowSeconds: 600, max: 30 },
  lead: { key: "lead", windowSeconds: 3600, max: 5 },
  login: { key: "login", windowSeconds: 300, max: 5 },
} as const satisfies Record<string, Omit<Limit, "key"> & { key: string }>;

/**
 * A fixed-window counter, in one round trip.
 *
 * The insert-or-increment returns the new count, so there is no read followed
 * by a write and therefore no race between two requests from the same client.
 * Old windows are swept on the first request of a new one, which needs neither
 * a scheduled job nor a cron trigger to keep the table from growing.
 */
export async function withinLimit(
  db: D1Database,
  limit: Limit,
  identity: string,
  now: number,
  /** Almost everything fails open — see the catch below. The login limiter
   *  fails closed instead: what it counts is password guesses, and "the
   *  database had a hiccup" is not a reason to stop counting those. */
  failOpen = true,
): Promise<boolean> {
  const windowStart = Math.floor(now / 1000 / limit.windowSeconds) * limit.windowSeconds;
  const bucket = `${limit.key}:${identity}`;

  try {
    const count = await db
      .prepare(
        `INSERT INTO onboarding_rate_limit (bucket_key, window_start, count)
         VALUES (?1, ?2, 1)
         ON CONFLICT (bucket_key, window_start) DO UPDATE SET count = count + 1
         RETURNING count`,
      )
      .bind(bucket, windowStart)
      .first<number>("count");

    if (count === 1) {
      await db
        .prepare(`DELETE FROM onboarding_rate_limit WHERE window_start < ?1`)
        .bind(windowStart - 3600)
        .run();
    }

    return (count ?? 1) <= limit.max;
  } catch {
    /* A limiter that fails closed turns a database hiccup into an outage for
       the one client who is trying to hand over their project. It fails open,
       and the edge rule is the control that does not. */
    return failOpen;
  }
}
