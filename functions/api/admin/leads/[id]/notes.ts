import { addNote, findLead, logActivity } from "../../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../../server/onboarding/env";
import { fail, json, readJson } from "../../../../../server/onboarding/http";

/** A private line about an enquiry. Clients never see notes, anywhere. */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const leadId = String(context.params.id ?? "");
  const raw = await readJson(context.request, 16 * 1024);
  const body =
    raw && typeof raw === "object" && typeof (raw as { body?: unknown }).body === "string"
      ? (raw as { body: string }).body.trim().slice(0, 4000)
      : "";
  if (!body) return fail("bad-request");

  try {
    if (!(await findLead(context.env.DB, leadId))) return fail("bad-request");
    const id = crypto.randomUUID();
    await addNote(context.env.DB, id, { projectId: null, leadId }, body);
    await logActivity(context.env.DB, { leadId }, "note_added");
    return json({ id });
  } catch {
    return fail("server");
  }
};
