import { findProject, logActivity, setProjectStatus } from "../../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../../server/onboarding/env";
import { fail, json } from "../../../../../server/onboarding/http";
import { cancelRequest, createRequest, listRequests } from "../../../../../server/onboarding/request";
import { isPackageId } from "../../../../../src/lib/onboarding/schema";

/**
 * Mints the private onboarding link for a project.
 *
 * The response is the only time the full URL exists in the clear — the
 * database keeps a hash — so the dashboard shows it once with a copy button,
 * and Vaky pastes it into whatever channel the client actually reads.
 * Creating a new link quietly retires any older one; a client can never be
 * filling in a form the studio has already replaced.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { env, request } = context;
  const projectId = String(context.params.id ?? "");

  try {
    const project = await findProject(env.DB, projectId);
    if (!project || !isPackageId(project.package_id)) return fail("bad-request");

    const { token, row } = await createRequest(env.DB, projectId, project.package_id);
    if (project.status === "created") {
      await setProjectStatus(env.DB, projectId, "onboarding_sent");
    }
    await logActivity(env.DB, { projectId }, "onboarding_created");

    const origin = env.ONBOARDING_SITE_URL ?? new URL(request.url).origin;
    return json({ url: `${origin}/start/${token}/`, request: row });
  } catch {
    return fail("server");
  }
};

/** Withdraws the live link. The form behind it stops answering mid-fill too —
 *  every write re-checks the row, not just the next page load. */
export const onRequestDelete: PagesFunction<OnboardingEnv> = async (context) => {
  const projectId = String(context.params.id ?? "");

  try {
    if (!(await findProject(context.env.DB, projectId))) return fail("bad-request");
    const open = (await listRequests(context.env.DB, projectId)).find(
      (row) => row.status === "created" || row.status === "opened" || row.status === "in_progress",
    );
    if (!open) return fail("bad-request");

    await cancelRequest(context.env.DB, open.id);
    await logActivity(context.env.DB, { projectId }, "onboarding_cancelled");
    return json({ ok: true });
  } catch {
    return fail("server");
  }
};
