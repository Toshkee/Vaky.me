"use client";

import type { OnboardingCopy } from "@/i18n/onboarding";
import type { Session, UploadedFile } from "@/lib/onboarding/draft";
import {
  answerList,
  answerText,
  visibleOptions,
  visibleQuestions,
  type AnswerValue,
  type Answers,
  type FieldErrors,
  type PackageId,
  type Question,
  type QuestionId,
  type Step,
} from "@/lib/onboarding/schema";
import { ChoiceGroup } from "./ChoiceGroup";
import { Field, TextArea, TextInput } from "./Field";
import { UploadZone } from "./UploadZone";
import { UrlList } from "./UrlList";
import { errorText, words } from "./copy";

/**
 * One step of the brief, built from the schema rather than written out.
 *
 * Every question in `src/lib/onboarding/schema.ts` names a kind, and this is
 * the only place that turns a kind into a control. Adding a question is
 * therefore a change to the schema and two entries in the dictionaries — never
 * a new component, and never a conditional threaded through the form.
 */

/* Attributes a phone's keyboard needs to be the right keyboard. Keyed by
   question rather than by kind, because only the question knows whether a text
   field is an address, a name, or a sentence. Narrowly typed on purpose: a
   full `InputHTMLAttributes` here would let a hint quietly override the value
   and change handler it is spread beside. */
type InputHint = {
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel" | "url";
  autoComplete?: string;
  autoCapitalize?: "none" | "sentences";
  autoCorrect?: "on" | "off";
  spellCheck?: boolean;
};

const INPUT_HINTS: Partial<Record<QuestionId, InputHint>> = {
  businessName: { autoComplete: "organization" },
  contactName: { autoComplete: "name" },
  email: { type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none" },
  phone: { type: "tel", inputMode: "tel", autoComplete: "tel" },
  instagram: { autoCapitalize: "none", autoCorrect: "off", spellCheck: false },
  existingSite: { inputMode: "url", autoCapitalize: "none", autoCorrect: "off", spellCheck: false },
  domainName: { inputMode: "url", autoCapitalize: "none", autoCorrect: "off", spellCheck: false },
};

export function StepView({
  copy,
  step,
  packageId,
  answers,
  errors,
  files,
  totalBytes,
  getSession,
  onAnswer,
  onUploaded,
  onRemoved,
}: {
  copy: OnboardingCopy;
  step: Step;
  packageId: PackageId;
  answers: Answers;
  /** Only populated once the client has tried to leave the step — nobody wants
   *  to be told a field is required before they have reached it. */
  errors: FieldErrors;
  files: readonly UploadedFile[];
  totalBytes: number;
  getSession: () => Promise<Session | null>;
  onAnswer: (id: QuestionId, value: AnswerValue) => void;
  onUploaded: (file: UploadedFile) => void;
  onRemoved: (id: string) => void;
}) {
  const questions = visibleQuestions(step, packageId, answers);

  return (
    <div className="grid gap-7">
      {/* What the package the client bought means for the question below it.
          Said once, where it changes the answer, instead of in a banner
          nobody reads. */}
      {step.id === "website" && (
        <p className="border-l-2 border-red bg-paper-2 px-4 py-3 text-sm leading-relaxed">
          {copy.chrome.packageNotes[packageId]}
        </p>
      )}

      {questions.map((question) => (
        <QuestionControl
          key={question.id}
          copy={copy}
          question={question}
          packageId={packageId}
          answers={answers}
          error={errorText(copy, errors[question.id])}
          files={files}
          totalBytes={totalBytes}
          getSession={getSession}
          onAnswer={onAnswer}
          onUploaded={onUploaded}
          onRemoved={onRemoved}
        />
      ))}

      {/* Beside the domain and hosting questions on purpose: this is the step
          where somebody would otherwise type a password into a text box. */}
      {step.id === "finish" && (
        <div className="border-2 border-ink bg-paper-2 p-4">
          <p className="eyebrow text-red">{copy.credentials.title}</p>
          <p className="mt-2 text-sm leading-relaxed">{copy.credentials.body}</p>
        </div>
      )}
    </div>
  );
}

function QuestionControl({
  copy,
  question,
  packageId,
  answers,
  error,
  files,
  totalBytes,
  getSession,
  onAnswer,
  onUploaded,
  onRemoved,
}: {
  copy: OnboardingCopy;
  question: Question;
  packageId: PackageId;
  answers: Answers;
  error: string | null;
  files: readonly UploadedFile[];
  totalBytes: number;
  getSession: () => Promise<Session | null>;
  onAnswer: (id: QuestionId, value: AnswerValue) => void;
  onUploaded: (file: UploadedFile) => void;
  onRemoved: (id: string) => void;
}) {
  const text = words(copy, question);
  const id = `q-${question.id}`;
  const describedBy = `${id}-help ${id}-error`;
  const optional = question.required ? undefined : copy.chrome.optional;

  if (question.kind === "files") {
    const zone = question.zone ?? "documents";
    return (
      <UploadZone
        copy={copy}
        zone={zone}
        label={text.label}
        help={text.help}
        uploaded={files.filter((file) => file.zone === zone)}
        totalCount={files.length}
        totalBytes={totalBytes}
        getSession={getSession}
        onUploaded={onUploaded}
        onRemoved={onRemoved}
      />
    );
  }

  if (question.kind === "single" || question.kind === "multi") {
    const multi = question.kind === "multi";
    return (
      <Field id={id} label={text.label} help={text.help} error={error} optional={optional} as="group">
        <ChoiceGroup
          name={id}
          options={visibleOptions(question, packageId)}
          labelFor={(value) => text.options?.[value] ?? value}
          selected={multi ? answerList(answers, question.id) : [answerText(answers, question.id)]}
          multi={multi}
          onChange={(next) => onAnswer(question.id, multi ? next : (next[0] ?? ""))}
        />
      </Field>
    );
  }

  if (question.kind === "urls") {
    return (
      <Field id={id} label={text.label} help={text.help} error={error} optional={optional} as="group">
        <UrlList
          id={id}
          label={text.label}
          max={question.max ?? 3}
          values={answerList(answers, question.id)}
          placeholder={text.placeholder}
          onChange={(next) => onAnswer(question.id, next)}
        />
      </Field>
    );
  }

  const value = answerText(answers, question.id);

  return (
    <Field id={id} label={text.label} help={text.help} error={error} optional={optional}>
      {question.kind === "textarea" ? (
        <TextArea
          id={id}
          value={value}
          onChange={(next) => onAnswer(question.id, next)}
          invalid={Boolean(error)}
          describedBy={describedBy}
          placeholder={text.placeholder}
          maxLength={question.maxLength}
        />
      ) : (
        <TextInput
          id={id}
          value={value}
          onChange={(next) => onAnswer(question.id, next)}
          invalid={Boolean(error)}
          describedBy={describedBy}
          placeholder={text.placeholder}
          maxLength={question.maxLength}
          {...INPUT_HINTS[question.id]}
        />
      )}
    </Field>
  );
}
