import { hashIp } from "../../../server/onboarding/crypto";
import { hasConfig, type OnboardingEnv } from "../../../server/onboarding/env";
import { LIMITS, withinLimit } from "../../../server/onboarding/guard";
import { clientIp, fail, json, readJson } from "../../../server/onboarding/http";
import { findRequestByToken, markInProgress, readRequest } from "../../../server/onboarding/request";
import { issueSessionFor } from "../../../server/onboarding/session";

/**
 * Trades the onboarding link's token for an upload token.
 *
 * The link itself is the credential — it was handed to one client by a
 * person, which is a stronger claim than any bot check — so there is no
 * Turnstile here. What comes back is a short-lived signed token whose
 * submission id IS the request row's id: uploads and the eventual brief all
 * land under the one record Vaky created, and under nothing else.
 *
 * Nothing is written to the database except the request's activity clock. A
 * client who uploads nothing costs one UPDATE.
 */

type Body = { token?: unknown };

export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env)) return fail("server");

  const raw = await readJson(request, 4 * 1024);
  const body = (raw ?? {}) as Body;
  const token = typeof body.token === "string" ? body.token : "";
  if (!token) return fail("bad-request");

  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, clientIp(request));
  if (!(await withinLimit(env.DB, LIMITS.session, identity, Date.now()))) {
    return fail("rate-limit");
  }

  const row = await findRequestByToken(env.DB, token);
  const parsed = row ? readRequest(row) : null;
  if (!parsed || parsed.status === "cancelled") return fail("link");
  if (parsed.status === "completed") return fail("completed");

  await markInProgress(env.DB, parsed.id);

  return json(await issueSessionFor(env.ONBOARDING_TOKEN_SECRET, parsed.id, Date.now()));
};
