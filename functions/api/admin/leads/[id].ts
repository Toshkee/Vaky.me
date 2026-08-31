import {
  findLead,
  listActivity,
  listNotes,
  logActivity,
  setLeadStatus,
} from "../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../server/onboarding/env";
import { fail, json, readJson } from "../../../../server/onboarding/http";
import { LEAD_STATUS_LABELS, isLeadStatus } from "../../../../src/lib/workflow";

/** One enquiry, with everything written about it. */
export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  const id = String(context.params.id ?? "");
  try {
    const lead = await findLead(context.env.DB, id);
    if (!lead) return fail("bad-request");
    const [notes, activity] = await Promise.all([
      listNotes(context.env.DB, { projectId: null, leadId: id }),
      listActivity(context.env.DB, { projectId: null, leadId: id }),
    ]);
    return json({ lead, notes, activity });
  } catch {
    return fail("server");
  }
};

/** Status changes only. Converting a lead into a project is its own route —
 *  it creates things, and "accepted" is a consequence, not an edit. */
export const onRequestPatch: PagesFunction<OnboardingEnv> = async (context) => {
  const id = String(context.params.id ?? "");
  const raw = await readJson(context.request, 4 * 1024);
  const status =
    raw && typeof raw === "object" ? (raw as { status?: unknown }).status : undefined;
  if (!isLeadStatus(status) || status === "accepted") return fail("bad-request");

  try {
    const lead = await findLead(context.env.DB, id);
    if (!lead) return fail("bad-request");
    await setLeadStatus(context.env.DB, id, status);
    await logActivity(
      context.env.DB,
      { leadId: id },
      "lead_status_changed",
      LEAD_STATUS_LABELS[status],
    );
    return json({ ok: true });
  } catch {
    return fail("server");
  }
};
