import { createProject, listProjects, logActivity } from "../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../server/onboarding/env";
import { fail, json, readJson } from "../../../../server/onboarding/http";
import { isPackageId } from "../../../../src/lib/onboarding/schema";

export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  try {
    return json({ projects: await listProjects(context.env.DB) });
  } catch {
    return fail("server");
  }
};

type Body = {
  businessName?: unknown;
  contactName?: unknown;
  email?: unknown;
  phone?: unknown;
  instagram?: unknown;
  existingSite?: unknown;
  packageId?: unknown;
};

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** A project without a lead — the client who arrived entirely over Instagram
 *  or a phone call and never touched the public form. */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const raw = await readJson(context.request, 16 * 1024);
  if (!raw || typeof raw !== "object") return fail("bad-request");
  const body = raw as Body;

  const businessName = text(body.businessName, 160);
  if (!businessName || !isPackageId(body.packageId)) return fail("bad-request");

  try {
    const id = crypto.randomUUID();
    await createProject(context.env.DB, {
      id,
      businessName,
      contactName: text(body.contactName, 120),
      email: text(body.email, 160),
      phone: text(body.phone, 40),
      instagram: text(body.instagram, 120),
      existingSite: text(body.existingSite, 300),
      packageId: body.packageId,
      leadId: null,
    });
    await logActivity(context.env.DB, { projectId: id }, "project_created", body.packageId);
    return json({ projectId: id });
  } catch {
    return fail("server");
  }
};
