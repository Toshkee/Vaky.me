import { scopeWarnings } from "../../../../server/admin/scope";
import {
  deleteProject,
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
import { fail, json, readJson, textField } from "../../../../server/onboarding/http";
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

  const businessName = textField(body.businessName, 160);
  const email = textField(body.email, 160);
  if (!businessName) return fail("bad-request");
  if (email && !isValidEmail(email)) return fail("bad-request");
  if (!isPackageId(body.packageId) || !isProjectStatus(body.status)) return fail("bad-request");

  try {
    const project = await findProject(context.env.DB, id);
    if (!project) return fail("bad-request");

    await updateProject(context.env.DB, id, {
      businessName,
      contactName: textField(body.contactName, 120),
      email,
      phone: textField(body.phone, 40),
      instagram: textField(body.instagram, 120),
      existingSite: textField(body.existingSite, 300),
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

/**
 * Removes a project outright — a duplicate, or one created by mistake.
 *
 * The uploads go before the rows: R2 is the only place a client's file exists,
 * and a row deleted first would leave an object nothing can name or reach. If
 * the bucket call fails the rows are still there, so the delete can simply be
 * pressed again.
 *
 * Nothing here is recoverable, which is why the dashboard arms the button
 * before it fires and spells out what goes with it.
 */
export const onRequestDelete: PagesFunction<OnboardingEnv> = async (context) => {
  const { env } = context;
  const id = String(context.params.id ?? "");

  try {
    const project = await findProject(env.DB, id);
    if (!project) return fail("bad-request");

    const files = await listProjectFiles(env.DB, id);
    if (files.length) await env.UPLOADS.delete(files.map((file) => file.storage_key));

    await deleteProject(env.DB, id);
    return json({ ok: true });
  } catch {
    return fail("server");
  }
};
