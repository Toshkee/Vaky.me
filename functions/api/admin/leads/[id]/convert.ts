import {
  acceptLead,
  createProject,
  deleteProject,
  findLead,
  logActivity,
} from "../../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../../server/onboarding/env";
import { fail, json, readJson } from "../../../../../server/onboarding/http";
import { isPackageId } from "../../../../../src/lib/onboarding/schema";

/**
 * Lead becomes project — the moment an agreement made outside the site
 * (Instagram, a call, a coffee) gets a record inside it. The package chosen
 * here is the one that was agreed; nothing is being bought.
 *
 * The lead's details seed the project so nothing is retyped; a lead with no
 * business name seeds it with the person's own, which the project view can
 * edit the moment a real name exists.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const leadId = String(context.params.id ?? "");
  const raw = await readJson(context.request, 4 * 1024);
  const packageId =
    raw && typeof raw === "object" ? (raw as { packageId?: unknown }).packageId : undefined;
  if (!isPackageId(packageId)) return fail("bad-request");

  try {
    const lead = await findLead(context.env.DB, leadId);
    if (!lead) return fail("bad-request");
    /* Converting twice would fork one agreement into two projects. */
    if (lead.project_id) return fail("completed");

    const projectId = crypto.randomUUID();
    await createProject(context.env.DB, {
      id: projectId,
      businessName: lead.business_name || lead.name,
      contactName: lead.name,
      email: lead.email,
      phone: lead.phone ?? "",
      instagram: "",
      existingSite: lead.link ?? "",
      packageId,
      leadId,
    });
    /* The claim is conditional on the lead still being free. Losing it means
       a concurrent convert got there first — that project is the real one,
       this one is an orphan and is removed again. */
    if (!(await acceptLead(context.env.DB, leadId, projectId))) {
      await deleteProject(context.env.DB, projectId);
      return fail("completed");
    }
    await logActivity(context.env.DB, { projectId, leadId }, "project_created", packageId);

    return json({ projectId });
  } catch {
    return fail("server");
  }
};
