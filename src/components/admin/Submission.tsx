"use client";

import { onboardingCopy } from "@/i18n/onboarding";
import type { SubmissionView } from "@/lib/admin/client";
import {
  answerList,
  answerText,
  isPackageId,
  visibleQuestions,
  visibleSteps,
  type Answers,
  type Question,
} from "@/lib/onboarding/schema";
import { Fact, Facts, Panel, packageName, stampText } from "./ui";

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
 * The labels are Montenegrin regardless of the language the client filled the
 * form in — the ids are the same either way, and this screen is the studio's.
 */

const copy = onboardingCopy.me;

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

export function Submission({ submission }: { submission: SubmissionView }) {
  const { answers } = submission;
  const packageId = isPackageId(submission.packageId) ? submission.packageId : null;

  return (
    <Panel title="Odgovori klijenta">
      <Facts>
        <Fact label="Paket na odgovorima" value={packageName(submission.packageId)} />
        <Fact label="Popunjeno na" value={submission.language === "en" ? "English" : "Crnogorski"} />
        <Fact label="Poslato" value={stampText(submission.createdAt)} />
        {submission.notifyError && (
          <Fact label="Obavještenje" value={`Nije poslato: ${submission.notifyError}`} />
        )}
      </Facts>

      {answers === null || packageId === null ? (
        <p role="alert" className="mt-4 border-l-2 border-red bg-paper-2 px-4 py-3 leading-relaxed">
          Odgovori se ne mogu pročitati.{" "}
          {answers === null
            ? "Sačuvani zapis nije ispravan JSON."
            : `Paket na odgovorima (${submission.packageId}) nije prepoznat, pa se ne mogu grupisati.`}
        </p>
      ) : (
        <div className="mt-6 grid gap-6">
          {visibleSteps(packageId, answers).map((step) => {
            const questions = visibleQuestions(step, packageId, answers).filter(
              (question) => question.kind !== "files",
            );
            if (questions.length === 0) return null;

            return (
              <section key={step.id}>
                <h3 className="border-b-2 border-line pb-1 text-base font-bold">
                  {copy.steps[step.id].title}
                </h3>
                <dl className="mt-3 grid gap-2">
                  {questions.map((question) => {
                    const value = readable(question, answers);
                    return (
                      <Fact
                        key={question.id}
                        label={copy.questions[question.id].label}
                        value={
                          value ? (
                            <span className="leading-relaxed whitespace-pre-line">{value}</span>
                          ) : null
                        }
                      />
                    );
                  })}
                </dl>
              </section>
            );
          })}
        </div>
      )}
    </Panel>
  );
}
