import { CLEAR_ADMIN_COOKIE } from "../../../server/admin/auth";
import type { OnboardingEnv } from "../../../server/onboarding/env";

/** Takes the cookie back. The signature it carried keeps verifying until its
 *  expiry, but no browser holds it any more — and rotating the secret is the
 *  hard revoke if a device is actually lost. */
export const onRequestPost: PagesFunction<OnboardingEnv> = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Set-Cookie": CLEAR_ADMIN_COOKIE,
    },
  });
};
