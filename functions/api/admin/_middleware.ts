import { isAdmin, sameOrigin } from "../../../server/admin/auth";
import { hasConfig, type OnboardingEnv } from "../../../server/onboarding/env";
import { fail } from "../../../server/onboarding/http";

/**
 * The door to everything under /api/admin/.
 *
 * Every route in this folder assumes it is talking to the studio; this is the
 * one place that assumption is enforced, so a new admin endpoint cannot be
 * added unauthenticated by forgetting a check. Login is the single exception
 * — it is how the cookie comes to exist — and it defends itself with a
 * fail-closed rate limit instead.
 *
 * Runs inside functions/api/_middleware.ts, so the CORS and security headers
 * are already on everything returned here.
 */
export const onRequest: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env)) return fail("server");

  const path = new URL(request.url).pathname;
  if (path === "/api/admin/login") return context.next();

  if (!(await isAdmin(env.ONBOARDING_TOKEN_SECRET, request, Date.now()))) {
    return fail("session");
  }

  /* SameSite=Strict already keeps the cookie off cross-site requests; this
     refuses the writes even if a browser someday disagrees. */
  if (request.method !== "GET" && request.method !== "HEAD" && !sameOrigin(request)) {
    return fail("challenge");
  }

  return context.next();
};
