/* A relative path, not the `@/` alias the rest of `src/` uses. These
   dictionaries are also compiled into the Cloudflare Function that writes the
   notification email, so VibeLab reads a client's answers under the same
   labels the client answered them under — and esbuild does not resolve the
   TypeScript path alias. The same goes for `me.ts` and `en.ts`. */
import type {
  ApiErrorCode,
  ErrorCode,
  FileZone,
  Language,
  PackageId,
  QuestionId,
  StepId,
} from "../../lib/onboarding/schema";

/**
 * The onboarding dictionary, declared rather than inferred.
 *
 * The landing pages derive their dictionary type from the Montenegrin file and
 * make English satisfy it (see `src/i18n/index.ts`). That works there because
 * every string is reached by a literal path — `dict.hero.titleA`. The
 * onboarding reaches its strings by *question id*, computed at runtime from
 * the schema, and an inferred type cannot be indexed that way without casts.
 *
 * So the shape is written out once here and both languages are checked against
 * it. `Record<QuestionId, …>` is what does the real work: adding a question to
 * the schema and forgetting to translate it is a build error, in both files.
 */

export type QuestionCopy = {
  label: string;
  /** One plain sentence under the label, where a question needs explaining. */
  help?: string;
  placeholder?: string;
  /** Choice questions only: the words for each option value in the schema. */
  options?: Record<string, string>;
};

export type StepCopy = {
  title: string;
  intro: string;
  /** A line from the mascot. Only a few steps get one — he is a guide, not a
   *  narrator, and a bubble on every screen stops being friendly. */
  tony?: string;
};

export type OnboardingCopy = {
  lang: Language;
  htmlLang: string;

  meta: {
    title: string;
    description: string;
  };

  /** The opening screen: pick a language, then start. */
  gate: {
    eyebrow: string;
    title: string;
    intro: string;
    languageLabel: string;
    me: string;
    en: string;
    action: string;
    minutes: string;
    tony: string;
  };

  /** Shown instead of the gate when an unfinished draft is on this device. */
  resume: {
    title: string;
    body: string;
    action: string;
    restart: string;
    restartConfirm: string;
  };

  /** The screens a private link can land on instead of the form: still
   *  checking, not a link VibeLab issued, or a brief already sent. */
  privateLink: {
    checking: string;
    invalidTitle: string;
    invalidBody: string;
    completedTitle: string;
    completedBody: string;
  };

  /** The public `/start/` page, which is not the form — the form only exists
   *  behind a link VibeLab sends. Rendered in both languages at once, because
   *  whoever lands here has not chosen one. */
  info: {
    title: string;
    body: string;
    stepsTitle: string;
    steps: [string, string, string];
    noLink: string;
    action: string;
  };

  chrome: {
    /** "Korak {n} od {total}" */
    step: string;
    progressLabel: string;
    back: string;
    next: string;
    toReview: string;
    optional: string;
    packageLabel: string;
    languageLabel: string;
    /** The label on the switch — the name of the *other* language. */
    otherLanguage: string;
    draftNote: string;
    errorSummary: string;
    home: string;
    /** What the chosen package means for the number of pages, said once. */
    packageNotes: Record<PackageId, string>;
  };

  steps: Record<StepId, StepCopy>;
  questions: Record<QuestionId, QuestionCopy>;

  upload: {
    zones: Record<FileZone, { hint: string }>;
    drop: string;
    browse: string;
    limits: string;
    uploading: string;
    done: string;
    failed: string;
    retry: string;
    remove: string;
    /** "Ukloni {name}" — the accessible name of a remove button. */
    removeLabel: string;
    empty: string;
    tooMany: string;
  };

  credentials: {
    title: string;
    body: string;
  };

  review: {
    title: string;
    intro: string;
    edit: string;
    /** "Izmijeni: O vašem biznisu" — the accessible name of an edit button. */
    editLabel: string;
    unanswered: string;
    files: string;
    noFiles: string;
    submit: string;
    sending: string;
  };

  success: {
    title: string;
    body: string;
    refLabel: string;
    note: string;
    home: string;
    tony: string;
  };

  errors: Record<ErrorCode, string> & {
    api: Record<ApiErrorCode, string>;
  };
};
