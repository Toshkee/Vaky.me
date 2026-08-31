/**
 * Everything the onboarding endpoints are given by Cloudflare.
 *
 * `DB`, `UPLOADS` and `ONBOARDING_TOKEN_SECRET` are required — without them the
 * feature cannot store a brief, and the endpoints say so plainly rather than
 * half-working. Everything else is optional by design, and each one degrades to
 * a stated behaviour rather than to an error:
 *
 *   no TURNSTILE_SECRET_KEY  → the bot check is skipped, rate limiting alone
 *   no RESEND_API_KEY        → the brief is stored, nobody is emailed
 *
 * That is what lets the whole thing be brought up one piece at a time, and it
 * is why the database, never the mailbox, is the record of a submission.
 */
export type OnboardingEnv = {
  DB: D1Database;
  UPLOADS: R2Bucket;
  /** Signs upload tokens, admin session cookies and the download links in the
   *  notification email. */
  ONBOARDING_TOKEN_SECRET: string;
  /** The one password behind /admin. Without it every admin endpoint refuses
   *  to serve — there is no fallback password and no way to log in. */
  ADMIN_PASSWORD?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  /** Where the notification goes. Defaults to the studio address below. */
  ONBOARDING_NOTIFY_TO?: string;
  /** Must be an address on a domain verified with the mail provider. */
  ONBOARDING_NOTIFY_FROM?: string;
  /** Origin used to build download links in the email, e.g. the production
   *  site. Falls back to the origin the request arrived on. */
  ONBOARDING_SITE_URL?: string;
};

export const DEFAULT_NOTIFY_TO = "vakymne@gmail.com";

/** vaky.me is verified in Resend (DKIM, SPF and DMARC live on the zone), so
 *  the studio's own address is the sender rather than the shared
 *  `resend.dev` one — which could only ever deliver to the account owner. */
export const DEFAULT_NOTIFY_FROM = "Vaky <onboarding@vaky.me>";

/** How long an upload token is good for. Long enough that a client can pick
 *  the materials up again tomorrow, short enough that a token left on a shared
 *  phone stops working. */
export const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

/** Download links in the notification email. Long enough for Vaky to get to
 *  a project, short enough that an old forwarded email is not a key. */
export const DOWNLOAD_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** How long an admin stays logged in. A week: long enough that checking leads
 *  from a phone is not a daily password ceremony, short enough that a browser
 *  left logged in somewhere stops being one. */
export const ADMIN_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function hasConfig(env: Partial<OnboardingEnv>): env is OnboardingEnv {
  return Boolean(env.DB && env.UPLOADS && env.ONBOARDING_TOKEN_SECRET);
}
