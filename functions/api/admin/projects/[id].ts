import { scopeWarnings } from "../../../../server/admin/scope";
import {
  findLead,
  findProject,
  findSubmissionForProject,
  listActivity,
  listLatestBriefs,
  listNotes,
  listProjectFiles,
  logActivity,
  retargetOpenRequests,
  updateProject,
} from "../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../server/onboarding/env";
import { fail, json, readJson } from "../../../../server/onboarding/http";
import { listRequests } from "../../../../server/onboarding/request";
import {
  isPackageId,
  isValidEmail,
  type Answers,
  type PackageId,
} from "../../../../src/lib/onboarding/schema";
import { PROJECT_STATUS_LABELS, isProjectStatus } from "../../../../src/lib/workflow";

/**
 * The project workspace's one read: everything the detail view shows, in a
 * single round trip — the project, its newest onboarding link, the submitted
 * answers, files, notes, briefs, the timeline, and the scope flags computed
 * fresh against the CURRENT package.
 */
export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  const id = String(context.params.id ?? "");
  try {
    const project = await findProject(context.env.DB, id);
    if (!project) return fail("bad-request");

    const [requests, submission, files, notes, briefs, activity] = await Promise.all([
      listRequests(context.env.DB, id),
      findSubmissionForProject(context.env.DB, id),
      listProjectFiles(context.env.DB, id),
      listNotes(context.env.DB, { projectId: id, leadId: null }),
      listLatestBriefs(context.env.DB, id),
      listActivity(context.env.DB, { projectId: id, leadId: null }),
    ]);
    const lead = project.lead_id ? await findLead(context.env.DB, project.lead_id) : null;

    let answers: Answers | null = null;
    if (submission) {
      try {
        answers = JSON.parse(submission.answers) as Answers;
      } catch {
        answers = null;
      }
    }

    const warnings = isPackageId(project.package_id)
      ? scopeWarnings(
          project.package_id,
          answers,
          submission && isPackageId(submission.package_id)
            ? (submission.package_id as PackageId)
            : null,
        )
      : [];

    return json({
      project,
      request: requests[0] ?? null,
      submission: submission
        ? {
            id: submission.id,
            packageId: submission.package_id,
            language: submission.language,
            answers,
            createdAt: submission.created_at,
            updatedAt: submission.updated_at,
            notifyError: submission.notify_error,
          }
        : null,
      files,
      notes,
      briefs,
      activity,
      warnings,
      lead,
    });
  } catch {
    return fail("server");
  }
};

type Patch = {
  businessName?: unknown;
  contactName?: unknown;
  email?: unknown;
  phone?: unknown;
  instagram?: unknown;
  existingSite?: unknown;
  packageId?: unknown;
  status?: unknown;
};

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/**
 * Edits the whole editable surface at once. Changing the package never
 * touches stored answers — they stay exactly as collected, and the detail
 * view surfaces the mismatch as a scope flag instead of quietly rewriting
 * history. A still-open link is retargeted so the client's next visit asks
 * the right questions.
 */
export const onRequestPatch: PagesFunction<OnboardingEnv> = async (context) => {
  const id = String(context.params.id ?? "");
  const raw = await readJson(context.request, 16 * 1024);
  if (!raw || typeof raw !== "object") return fail("bad-request");
  const body = raw as Patch;

  const businessName = text(body.businessName, 160);
  const email = text(body.email, 160);
  if (!businessName) return fail("bad-request");
  if (email && !isValidEmail(email)) return fail("bad-request");
  if (!isPackageId(body.packageId) || !isProjectStatus(body.status)) return fail("bad-request");

  try {
    const project = await findProject(context.env.DB, id);
    if (!project) return fail("bad-request");

    await updateProject(context.env.DB, id, {
      businessName,
      contactName: text(body.contactName, 120),
      email,
      phone: text(body.phone, 40),
      instagram: text(body.instagram, 120),
      existingSite: text(body.existingSite, 300),
      packageId: body.packageId,
      status: body.status,
    });

    if (project.package_id !== body.packageId) {
      await retargetOpenRequests(context.env.DB, id, body.packageId);
      await logActivity(
        context.env.DB,
        { projectId: id },
        "package_changed",
        `${project.package_id} → ${body.packageId}`,
      );
    }
    if (project.status !== body.status) {
      await logActivity(
        context.env.DB,
        { projectId: id },
        "project_status_changed",
        PROJECT_STATUS_LABELS[body.status],
      );
    }

    return json({ ok: true });
  } catch {
    return fail("server");
  }
};
