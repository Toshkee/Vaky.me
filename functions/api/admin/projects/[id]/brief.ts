import { BRIEF_MODE, briefForProject } from "../../../../../server/admin/brief";
import { addBrief, findProject, logActivity } from "../../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../../server/onboarding/env";
import { fail, json } from "../../../../../server/onboarding/http";

/**
 * Turns everything stored about a project into a paste-ready Build Brief.
 *
 * Deterministic — no model, no key, no cost. The result is saved (the newest
 * one is the current one) and returned in the same breath, so the copy
 * button and the archive can never disagree.
 *
 * The questionnaire's submit already writes one on its own. This is the
 * button for a fresh one after a note, a file or the trade changed.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const projectId = String(context.params.id ?? "");

  try {
    const project = await findProject(context.env.DB, projectId);
    const content = project ? await briefForProject(context.env.DB, project) : null;
    if (!content) return fail("bad-request");

    const id = crypto.randomUUID();
    await addBrief(context.env.DB, id, projectId, BRIEF_MODE, content);
    await logActivity(context.env.DB, { projectId }, "brief_generated");

    return json({ id, content });
  } catch {
    return fail("server");
  }
};
