import { json } from "../../../server/onboarding/http";
import type { OnboardingEnv } from "../../../server/onboarding/env";

/** Reaching this at all means the middleware accepted the cookie — the
 *  dashboard calls it on load to decide between the login screen and the
 *  real thing. */
export const onRequestGet: PagesFunction<OnboardingEnv> = async () => json({ ok: true });
