import { generateBrief } from "../../../../../server/admin/brief";
import { scopeWarnings } from "../../../../../server/admin/scope";
import {
  addBrief,
  findProject,
  findSubmissionForProject,
  listNotes,
  listProjectFiles,
  logActivity,
} from "../../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../../server/onboarding/env";
import { fail, json } from "../../../../../server/onboarding/http";
import {
  isLanguage,
  isPackageId,
  type Answers,
} from "../../../../../src/lib/onboarding/schema";

/**
 * Turns everything stored about a project into a paste-ready Build Brief.
 *
 * Deterministic — no model, no key, no cost. The result is saved (the newest
 * one is the current one) and returned in the same breath, so the copy
 * button and the archive can never disagree. The `mode` column still says
 * "full": the table's CHECK constraint predates the single-brief design, and
 * older rows keep their historical modes.
 */
const MODE = "full";

export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const projectId = String(context.params.id ?? "");

  try {
    const project = await findProject(context.env.DB, projectId);
    if (!project || !isPackageId(project.package_id)) return fail("bad-request");

    const [submission, files, notes] = await Promise.all([
      findSubmissionForProject(context.env.DB, projectId),
      listProjectFiles(context.env.DB, projectId),
      listNotes(context.env.DB, { projectId, leadId: null }),
    ]);

    let answers: Answers | null = null;
    if (submission) {
      try {
        answers = JSON.parse(submission.answers) as Answers;
      } catch {
        answers = null;
      }
    }

    const submissionPackageId =
      submission && isPackageId(submission.package_id) ? submission.package_id : null;

    const content = generateBrief({
      project,
      packageId: project.package_id,
      answers,
      answersLanguage:
        submission && isLanguage(submission.language) ? submission.language : null,
      submissionPackageId,
      files,
      notes,
      warnings: scopeWarnings(project.package_id, answers, submissionPackageId),
    });

    const id = crypto.randomUUID();
    await addBrief(context.env.DB, id, projectId, MODE, content);
    await logActivity(context.env.DB, { projectId }, "brief_generated");

    return json({ id, content });
  } catch {
    return fail("server");
  }
};
