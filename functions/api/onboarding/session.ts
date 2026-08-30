import { hashIp } from "../../../server/onboarding/crypto";
import { hasConfig, type OnboardingEnv } from "../../../server/onboarding/env";
import { LIMITS, passesChallenge, withinLimit } from "../../../server/onboarding/guard";
import { clientIp, fail, json, readJson } from "../../../server/onboarding/http";
import { issueSession } from "../../../server/onboarding/session";

/**
 * Opens a submission so a client can start sending materials.
 *
 * Nothing is written to the database here. The response is a submission id that
 * did not exist a moment ago and a signed token that permits writing files
 * under it — the row itself is created when the brief is actually sent. That
 * way an anonymous, public endpoint cannot fill the database with abandoned
 * rows, and a client who uploads nothing never needs to call this at all.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env)) return fail("server");

  const body = await readJson(request, 8 * 1024);
  const challenge =
    body && typeof body === "object" && typeof (body as { challenge?: unknown }).challenge === "string"
      ? ((body as { challenge: string }).challenge)
      : "";

  const ip = clientIp(request);
  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, ip);

  if (!(await withinLimit(env.DB, LIMITS.session, identity, Date.now()))) {
    return fail("rate-limit");
  }
  if (!(await passesChallenge(env, challenge, ip))) {
    return fail("challenge");
  }

  return json(await issueSession(env.ONBOARDING_TOKEN_SECRET, Date.now()));
};
