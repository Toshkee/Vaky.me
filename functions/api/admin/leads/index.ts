import { listLeads } from "../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../server/onboarding/env";
import { fail, json } from "../../../../server/onboarding/http";
import { isLeadStatus } from "../../../../src/lib/workflow";

/** The enquiry list, newest first, optionally narrowed to one status. */
export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  const status = new URL(context.request.url).searchParams.get("status");
  if (status && !isLeadStatus(status)) return fail("bad-request");
  try {
    return json({ leads: await listLeads(context.env.DB, isLeadStatus(status) ? status : null) });
  } catch {
    return fail("server");
  }
};
