import { generateConceptBrief } from "../../../../../server/admin/concept";
import { findLead, listNotes, logActivity } from "../../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../../server/onboarding/env";
import { fail, json } from "../../../../../server/onboarding/http";

/**
 * The prompt for the free concept, written fresh from the enquiry and the
 * notes as they stand right now.
 *
 * Not stored: it is deterministic and cheap, and a lead is a moving target —
 * the version worth having is always the one generated after the latest
 * note. The timeline still records that it was asked for.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const leadId = String(context.params.id ?? "");

  try {
    const lead = await findLead(context.env.DB, leadId);
    if (!lead) return fail("bad-request");
    const notes = await listNotes(context.env.DB, { projectId: null, leadId });
    const content = generateConceptBrief({ lead, notes });
    await logActivity(context.env.DB, { leadId }, "concept_generated");
    return json({ content });
  } catch {
    return fail("server");
  }
};
