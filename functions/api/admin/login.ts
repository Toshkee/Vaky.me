import { issueAdminCookie, passwordMatches } from "../../../server/admin/auth";
import { hashIp } from "../../../server/onboarding/crypto";
import { hasConfig, type OnboardingEnv } from "../../../server/onboarding/env";
import { LIMITS, withinLimit } from "../../../server/onboarding/guard";
import { clientIp, fail, readJson } from "../../../server/onboarding/http";

/**
 * Trades the admin password for a session cookie.
 *
 * The limiter here fails CLOSED — five guesses per five minutes per address,
 * and a database hiccup pauses guessing rather than unmetering it. With no
 * `ADMIN_PASSWORD` secret configured there is nothing to trade and the whole
 * admin area simply does not open.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env) || !env.ADMIN_PASSWORD) return fail("server");

  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, clientIp(request));
  if (!(await withinLimit(env.DB, LIMITS.login, identity, Date.now(), false))) {
    return fail("rate-limit");
  }

  const raw = await readJson(request, 4 * 1024);
  const password =
    raw && typeof raw === "object" && typeof (raw as { password?: unknown }).password === "string"
      ? (raw as { password: string }).password
      : "";

  if (!(await passwordMatches(env.ADMIN_PASSWORD, password))) return fail("session");

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Set-Cookie": await issueAdminCookie(env.ONBOARDING_TOKEN_SECRET, Date.now()),
    },
  });
};
