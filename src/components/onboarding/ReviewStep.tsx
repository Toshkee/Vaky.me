"use client";

import type { OnboardingCopy } from "@/i18n/onboarding";
import type { UploadedFile } from "@/lib/onboarding/draft";
import {
  answerList,
  answerText,
  visibleQuestions,
  visibleSteps,
  type Answers,
  type PackageId,
  type Question,
  type StepId,
} from "@/lib/onboarding/schema";
import { fill, formatBytes, words } from "./copy";

/**
 * Everything the client is about to send, read back to them.
 *
 * Grouped by the same steps they filled in, in their own words rather than the
 * form's — no field names, no ids, nothing that looks like data. Each group has
 * one way back into it, so correcting the phone number does not mean walking
 * the whole brief again.
 */
export function ReviewStep({
  copy,
  packageId,
  answers,
  files,
  onEdit,
}: {
  copy: OnboardingCopy;
  packageId: PackageId;
  answers: Answers;
  files: readonly UploadedFile[];
  onEdit: (stepId: StepId) => void;
}) {
  const steps = visibleSteps(packageId, answers);

  function readable(question: Question): string | null {
    const text = words(copy, question);

    if (question.kind === "single") {
      const value = answerText(answers, question.id);
      return value ? (text.options?.[value] ?? value) : null;
    }

    if (question.kind === "multi") {
      const values = answerList(answers, question.id);
      return values.length
        ? values.map((value) => text.options?.[value] ?? value).join(", ")
        : null;
    }

    if (question.kind === "urls") {
      const values = answerList(answers, question.id).filter((value) => value.trim());
      return values.length ? values.join("\n") : null;
    }

    return answerText(answers, question.id) || null;
  }

  return (
    <div className="grid gap-8">
      {steps.map((step) => {
        const lines = visibleQuestions(step, packageId, answers)
          .filter((question) => question.kind !== "files")
          .map((question) => ({ question, value: readable(question) }));

        return (
          <section key={step.id}>
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2">
              <h2 className="headline text-lg">{copy.steps[step.id].title}</h2>
              <button
                type="button"
                onClick={() => onEdit(step.id)}
                aria-label={fill(copy.review.editLabel, { section: copy.steps[step.id].title })}
                className="tap shrink-0 text-sm font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
              >
                {copy.review.edit}
              </button>
            </div>

            <dl className="mt-3 grid gap-3">
              {lines.map(({ question, value }) => (
                <div key={question.id} className="grid gap-0.5 sm:grid-cols-[14rem_1fr] sm:gap-4">
                  <dt className="text-sm text-muted">{words(copy, question).label}</dt>
                  <dd
                    className={`text-base leading-relaxed break-words whitespace-pre-line ${
                      value ? "" : "text-muted italic"
                    }`}
                  >
                    {value ?? copy.review.unanswered}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}

      <section>
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2">
          <h2 className="headline text-lg">{copy.review.files}</h2>
          <button
            type="button"
            onClick={() => onEdit("materials")}
            aria-label={fill(copy.review.editLabel, { section: copy.review.files })}
            className="tap shrink-0 text-sm font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
          >
            {copy.review.edit}
          </button>
        </div>

        {files.length === 0 ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.review.noFiles}</p>
        ) : (
          <ul className="mt-3 grid gap-1.5">
            {files.map((file) => (
              <li key={file.id} className="flex items-baseline justify-between gap-4 text-base">
                <span className="min-w-0 truncate">{file.name}</span>
                <span className="tnum shrink-0 text-sm text-muted">{formatBytes(file.size)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
