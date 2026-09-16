"use client";

import { onboardingCopy } from "@/i18n/onboarding";
import type { ProjectRow, SubmissionView } from "@/lib/admin/client";
import {
  answerList,
  answerText,
  isPackageId,
  visibleQuestions,
  visibleSteps,
  type Answers,
  type Question,
} from "@/lib/onboarding/schema";
import { Fact, Facts, Panel, mailErrorText, packageName, stampText } from "./ui";

/**
 * What the client actually said, read back the way they answered it.
 *
 * The stored submission is ids all the way down — question ids and option ids
 * — so it is put back through the same schema the form was built from:
 * `visibleSteps` and `visibleQuestions` against the submission's own package
 * and answers give the order and the subset the client really saw, and the
 * dictionary turns both sides of every row into words. Nothing here ever shows
 * an id or a blob of JSON; if the answers cannot be read at all, it says so.
 *
 * Only what was answered is shown. The contact fields are shown only where
 * they differ from the project record, which is where the same facts already
 * live — a phone number that matches is nothing to read twice, one that does
 * not is worth a look.
 *
 * The labels are Montenegrin regardless of the language the client filled the
 * form in — the ids are the same either way, and this screen is the studio's.
 */

const copy = onboardingCopy.me;

/** Answer id → the project column that holds the same fact. */
const CONTACT_FIELDS: Record<string, keyof ProjectRow> = {
  businessName: "business_name",
  contactName: "contact_name",
  email: "email",
  phone: "phone",
  instagram: "instagram",
  existingSite: "existing_site",
};

function same(a: string, b: string | null): boolean {
  return a.trim().toLowerCase() === (b ?? "").trim().toLowerCase();
}

function readable(question: Question, answers: Answers): string {
  const words = copy.questions[question.id];

  if (question.kind === "single") {
    const value = answerText(answers, question.id);
    return value ? (words.options?.[value] ?? value) : "";
  }

  if (question.kind === "multi") {
    return answerList(answers, question.id)
      .map((value) => words.options?.[value] ?? value)
      .join(", ");
  }

  if (question.kind === "urls") {
    return answerList(answers, question.id)
      .map((value) => value.trim())
      .filter(Boolean)
      .join("\n");
  }

  return answerText(answers, question.id);
}

export function Submission({
  submission,
  project,
}: {
  submission: SubmissionView;
  project: ProjectRow;
}) {
  const { answers } = submission;
  const packageId = isPackageId(submission.packageId) ? submission.packageId : null;

  const meta = [
    `poslato ${stampText(submission.createdAt)}`,
    submission.packageId !== project.package_id
      ? `odgovori za paket ${packageName(submission.packageId)}`
      : null,
    submission.language === "en" ? "na engleskom" : null,
  ].filter(Boolean);

  return (
    <Panel title="Odgovori klijenta">
      <p className="text-sm text-muted">{meta.join(" · ")}</p>
      {submission.notifyError && (
        <p className="mt-1 text-sm font-semibold text-red">
          Obavještenje nije stiglo mejlom: {mailErrorText(submission.notifyError)}
        </p>
      )}

      {answers === null || packageId === null ? (
        <p role="alert" className="mt-4 border-l-2 border-red bg-paper-2 px-4 py-3 leading-relaxed">
          Odgovori se ne mogu pročitati.{" "}
          {answers === null
            ? "Sačuvani zapis nije ispravan JSON."
            : `Paket na odgovorima (${submission.packageId}) nije prepoznat, pa se ne mogu grupisati.`}
        </p>
      ) : (
        <div className="mt-4 grid gap-6">
          {visibleSteps(packageId, answers).map((step) => {
            const rows = visibleQuestions(step, packageId, answers)
              .filter((question) => question.kind !== "files")
              .map((question) => ({ question, value: readable(question, answers) }))
              .filter(({ question, value }) => {
                if (!value) return false;
                const column = CONTACT_FIELDS[question.id];
                return column === undefined || !same(value, project[column] as string | null);
              });
            if (rows.length === 0) return null;

            return (
              <section key={step.id}>
                <h3 className="border-b-2 border-line pb-1 text-base font-bold">
                  {copy.steps[step.id].title}
                </h3>
                <div className="mt-3">
                  <Facts>
                    {rows.map(({ question, value }) => (
                      <Fact
                        key={question.id}
                        label={copy.questions[question.id].label}
                        value={
                          <span className="leading-relaxed whitespace-pre-line">{value}</span>
                        }
                      />
                    ))}
                  </Facts>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </Panel>
  );
}
