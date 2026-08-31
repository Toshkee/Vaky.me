import { overview } from "../../../server/admin/store";
import type { OnboardingEnv } from "../../../server/onboarding/env";
import { fail, json } from "../../../server/onboarding/http";

/** The numbers worth walking in for: what is new, what is waiting on whom,
 *  and what happened lately. Counted live — no cached dashboards to distrust. */
export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  try {
    return json(await overview(context.env.DB));
  } catch {
    return fail("server");
  }
};
