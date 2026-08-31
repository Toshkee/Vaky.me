/**
 * The client brief, as data.
 *
 * Everything about the shape of the onboarding lives here: which packages
 * exist, which steps each one asks for, which questions are in a step, which
 * answers unlock which follow-up, and what counts as a valid answer. The React
 * components render this; the Cloudflare Function validates against this. One
 * description, two consumers, so a question can never be asked by the browser
 * and rejected by the server for a reason the browser did not know about.
 *
 * Two rules keep that possible, and both are load-bearing:
 *
 *   1. This module imports nothing. It is compiled twice — once by Next for the
 *      browser and once by esbuild for the Worker — and the two builds resolve
 *      module paths differently. No `@/` alias, no React, no DOM, no Node.
 *   2. Nothing here is a display string. Every question and every option is a
 *      stable id; the Montenegrin and English words for it live in
 *      `src/i18n/onboarding/`. That is what stops a language from being able to
 *      change what the form actually asks.
 */

export const LANGUAGES = ["me", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

/**
 * The three packages the site sells. These ids are what the database stores,
 * what a private onboarding link resolves to on the server and what the brief
 * is built from — so they are deliberately not the plan *names*, which are
 * marketing copy and differ per language ("Biznis" / "Business").
 *
 * `PACKAGE_PLAN_INDEX` is the join back to that copy: the plans in
 * `dict.pricing.plans` name and describe each package per language. Prices
 * and limits are numbers, not copy, and live in `src/lib/packages.ts`.
 */
export const PACKAGE_IDS = ["start", "business", "project"] as const;
export type PackageId = (typeof PACKAGE_IDS)[number];

export const PACKAGE_PLAN_INDEX: Record<PackageId, number> = {
  start: 0,
  business: 1,
  project: 2,
};

/** The same join read the other way: the package a pricing card at index n is
 *  for, so the cards can price themselves from `packages.ts` instead of
 *  carrying a number in translated copy. */
export const PLAN_PACKAGES: readonly PackageId[] = [...PACKAGE_IDS].sort(
  (a, b) => PACKAGE_PLAN_INDEX[a] - PACKAGE_PLAN_INDEX[b],
);

/** How the package on a submission was arrived at. Since onboarding moved to
 *  private links the package always comes from the link's own record
 *  ("link"); the other two values remain because stored submissions from the
 *  public-form era carry them. */
export const PACKAGE_SOURCES = ["link", "client", "unsure"] as const;
export type PackageSource = (typeof PACKAGE_SOURCES)[number];

/**
 * Bumped whenever a question id or option id changes meaning. A saved draft
 * from an older version is discarded rather than restored into a form that no
 * longer matches it — a half-migrated draft is worse than starting over.
 *
 * 2: Start stopped being asked about pages (it is a one-page site and picks
 *    *sections* instead); Projekat gained the custom-scope step; the shop and
 *    booking batteries stopped being shown to packages that cannot deliver
 *    them.
 */
export const SCHEMA_VERSION = 2;

/* ── Answers ──────────────────────────────────────────────────────────── */

/** A single-value question stores a string; a multi-value one stores a list. */
export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue>;

export function answerText(answers: Answers, id: string): string {
  const value = answers[id];
  return typeof value === "string" ? value : "";
}

export function answerList(answers: Answers, id: string): string[] {
  const value = answers[id];
  return Array.isArray(value) ? value : [];
}

export function answerHas(answers: Answers, id: string, option: string): boolean {
  return answerList(answers, id).includes(option);
}

/* ── Questions ────────────────────────────────────────────────────────── */

export type QuestionKind = "text" | "textarea" | "single" | "multi" | "urls" | "files";

export type Option = {
  value: string;
  /** Packages this option is offered in. Absent means every package. */
  packages?: readonly PackageId[];
  /**
   * "Nisam siguran / neka Vaky predloži". Picking it clears every other
   * selection, and picking anything else clears it — the two are answers to
   * different questions and holding both says nothing.
   */
  exclusive?: boolean;
};

export type FieldFormat = "email" | "url" | "phone";

/** Which folder in storage a zone's files land in. The media zone splits into
 *  images/ and videos/ on the server, by the file's actual type. */
export const FILE_ZONES = ["logo", "media", "documents"] as const;
export type FileZone = (typeof FILE_ZONES)[number];

/**
 * Every question the brief can ask, written out.
 *
 * Spelling the ids as a union rather than letting them widen to `string` is
 * what makes a missing translation a build error instead of a Montenegrin
 * label on an English page: the dictionaries are typed as a complete map over
 * this union, so adding a question here and forgetting the words for it does
 * not compile.
 */
export type QuestionId =
  | "businessName"
  | "contactName"
  | "email"
  | "phone"
  | "instagram"
  | "existingSite"
  | "activity"
  | "customers"
  | "projectType"
  | "projectTypeOther"
  | "integrationsWhat"
  | "goals"
  | "goalsOther"
  | "sections"
  | "sectionsOther"
  | "pages"
  | "pagesOther"
  | "style"
  | "inspiration"
  | "avoid"
  | "features"
  | "featuresOther"
  | "siteLanguages"
  | "languagesNeeded"
  | "languagesOther"
  | "selfEditing"
  | "productCount"
  | "productCategories"
  | "productReady"
  | "variants"
  | "payment"
  | "delivery"
  | "stock"
  | "orderNotify"
  | "bookingServices"
  | "bookingDuration"
  | "bookingHours"
  | "bookingStaff"
  | "bookingAdvance"
  | "bookingCancellation"
  | "bookingCurrent"
  | "bookingCurrentSystem"
  | "bookingConfirmation"
  | "textsReady"
  | "logoStatus"
  | "photosStatus"
  | "uploadLogo"
  | "uploadMedia"
  | "uploadDocuments"
  | "domainStatus"
  | "domainName"
  | "domainHelp"
  | "hostingPaying"
  | "notes";

export type Question = {
  id: QuestionId;
  kind: QuestionKind;
  required?: boolean;
  /** Character cap. Enforced in the browser as a `maxLength`, and again on the
   *  server, where it is the only one that counts. */
  maxLength?: number;
  options?: readonly Option[];
  /** `urls`: how many fields to offer. `multi`: how many may be picked. */
  max?: number;
  /** A package-specific cap that overrides `max` — Biznis covers up to five
   *  pages, Projekat as many as the project needs, and both ask with the same
   *  question. */
  maxByPackage?: Partial<Record<PackageId, number>>;
  zone?: FileZone;
  format?: FieldFormat;
  /** Ask this only once the answers so far make it relevant. */
  visibleWhen?: (answers: Answers) => boolean;
  /** Ask this only in these packages. Absent means every package. */
  packages?: readonly PackageId[];
};

export const STEP_IDS = [
  "business",
  "custom",
  "website",
  "design",
  "features",
  "shop",
  "booking",
  "materials",
  "finish",
] as const;
export type StepId = (typeof STEP_IDS)[number];

export type Step = {
  id: StepId;
  questions: readonly Question[];
  packages?: readonly PackageId[];
  visibleWhen?: (answers: Answers) => boolean;
};

/* Shorthand for the option lists below, which are otherwise a wall of
   `{ value: "x" }`. */
const opts = (...values: string[]): Option[] => values.map((value) => ({ value }));
const unsure: Option = { value: "not-sure", exclusive: true };

const BOOKING_PACKAGES = ["business", "project"] as const;

/**
 * The brief itself.
 *
 * The order is the order a person can actually answer in: who they are, what
 * the site is for, what it should look like, what it should do, then the two
 * that need them to go and find something — materials and the domain. Anything
 * that needs a decision they may not have made yet carries a "not sure" option,
 * because a client who cannot answer question four must still be able to reach
 * question five.
 */
export const STEPS: readonly Step[] = [
  {
    id: "business",
    questions: [
      { id: "businessName", kind: "text", required: true, maxLength: 120 },
      { id: "contactName", kind: "text", required: true, maxLength: 120 },
      { id: "email", kind: "text", required: true, maxLength: 160, format: "email" },
      { id: "phone", kind: "text", required: true, maxLength: 40, format: "phone" },
      { id: "instagram", kind: "text", maxLength: 120 },
      { id: "existingSite", kind: "text", maxLength: 300, format: "url" },
      { id: "activity", kind: "textarea", required: true, maxLength: 600 },
      { id: "customers", kind: "textarea", maxLength: 400 },
    ],
  },

  /* Projekat only, and first after the introductions: what the site has to be
     able to DO decides every question after it. The shop and booking steps
     watch this answer, and the brief is organised around it. */
  {
    id: "custom",
    packages: ["project"],
    questions: [
      {
        id: "projectType",
        kind: "multi",
        required: true,
        options: [
          ...opts(
            "shop",
            "booking",
            "self-editing",
            "integrations",
            "accounts",
            "automation",
            "content-site",
          ),
          { value: "other" },
          unsure,
        ],
      },
      {
        id: "projectTypeOther",
        kind: "text",
        maxLength: 300,
        visibleWhen: (a) => answerHas(a, "projectType", "other"),
      },
      {
        id: "integrationsWhat",
        kind: "textarea",
        maxLength: 400,
        visibleWhen: (a) => answerHas(a, "projectType", "integrations"),
      },
    ],
  },

  {
    id: "website",
    questions: [
      {
        id: "goals",
        kind: "multi",
        required: true,
        options: [
          ...opts(
            "find-us",
            "more-enquiries",
            "present-services",
            "sell-products",
            "take-bookings",
            "look-professional",
          ),
          unsure,
          { value: "other" },
        ],
      },
      {
        id: "goalsOther",
        kind: "text",
        maxLength: 200,
        visibleWhen: (a) => answerHas(a, "goals", "other"),
      },
      /* Start is ONE page, so it picks the sections a visitor scrolls
         through — it is never asked "which pages", because there are none to
         choose. The hero and a call to action are not on the list: every site
         gets those, and asking about them is asking the client to design. */
      {
        id: "sections",
        kind: "multi",
        required: true,
        packages: ["start"],
        options: [
          ...opts(
            "about",
            "services",
            "products",
            "menu",
            "pricing-list",
            "gallery",
            "testimonials",
            "location",
            "contact",
            "social",
            "contact-form",
          ),
          { value: "other" },
          unsure,
        ],
      },
      {
        id: "sectionsOther",
        kind: "text",
        maxLength: 200,
        packages: ["start"],
        visibleWhen: (a) => answerHas(a, "sections", "other"),
      },
      {
        id: "pages",
        kind: "multi",
        required: true,
        packages: ["business", "project"],
        maxByPackage: { business: 5 },
        options: [
          ...opts("home", "about", "services", "gallery", "pricing", "contact", "blog", "faq"),
          { value: "shop", packages: ["project"] },
          { value: "booking", packages: BOOKING_PACKAGES },
          { value: "other" },
          unsure,
        ],
      },
      {
        id: "pagesOther",
        kind: "text",
        maxLength: 200,
        packages: ["business", "project"],
        visibleWhen: (a) => answerHas(a, "pages", "other"),
      },
    ],
  },

  {
    id: "design",
    questions: [
      {
        id: "style",
        kind: "multi",
        required: true,
        max: 3,
        options: [
          ...opts("minimal", "modern", "elegant", "dark", "light", "playful", "corporate"),
          unsure,
        ],
      },
      { id: "inspiration", kind: "urls", max: 3 },
      { id: "avoid", kind: "textarea", maxLength: 400 },
    ],
  },

  {
    id: "features",
    questions: [
      {
        id: "features",
        kind: "multi",
        required: true,
        options: [
          ...opts("contact-form", "whatsapp", "viber", "map", "instagram"),
          { value: "booking", packages: BOOKING_PACKAGES },
          { value: "shop", packages: ["project"] },
          /* A third language and beyond is Projekat territory; Biznis covers
             Montenegrin and English and asks about that with its own question
             below. */
          { value: "multilingual", packages: ["project"] },
          ...opts("newsletter", "reviews", "gallery", "video"),
          unsure,
          { value: "other" },
        ],
      },
      {
        id: "featuresOther",
        kind: "text",
        maxLength: 200,
        visibleWhen: (a) => answerHas(a, "features", "other"),
      },
      {
        id: "siteLanguages",
        kind: "single",
        required: true,
        packages: ["business"],
        options: opts("me-only", "me-en", "not-sure"),
      },
      {
        id: "languagesNeeded",
        kind: "multi",
        required: true,
        packages: ["project"],
        options: opts("english", "russian", "german", "italian", "albanian", "turkish", "other"),
        visibleWhen: (a) => answerHas(a, "features", "multilingual"),
      },
      {
        id: "languagesOther",
        kind: "text",
        maxLength: 160,
        packages: ["project"],
        visibleWhen: (a) => answerHas(a, "languagesNeeded", "other"),
      },
      /* For Projekat the same fact arrives through projectType, where it is a
         scope decision rather than a preference. */
      {
        id: "selfEditing",
        kind: "single",
        required: true,
        packages: ["start", "business"],
        options: opts("yes", "no", "not-sure"),
      },
    ],
  },

  /* Projekat only. A Start or Biznis client whose goal is selling is a
     conversation Vaky wants to have — the dashboard flags it as possibly
     outside the package — but walking them through payment methods and stock
     tracking for a package with no shop would promise what the price does
     not contain. */
  {
    id: "shop",
    packages: ["project"],
    visibleWhen: (a) =>
      answerHas(a, "projectType", "shop") ||
      answerHas(a, "goals", "sell-products") ||
      answerHas(a, "features", "shop"),
    questions: [
      {
        id: "productCount",
        kind: "single",
        required: true,
        options: opts("to-20", "20-100", "100-500", "500-plus", "not-sure"),
      },
      { id: "productCategories", kind: "text", maxLength: 300 },
      {
        id: "productReady",
        kind: "multi",
        required: true,
        options: [...opts("photos", "prices", "descriptions"), { value: "none", exclusive: true }],
      },
      { id: "variants", kind: "single", required: true, options: opts("yes", "no", "not-sure") },
      {
        id: "payment",
        kind: "multi",
        required: true,
        options: [...opts("card", "on-delivery", "bank-transfer", "in-store"), unsure],
      },
      {
        id: "delivery",
        kind: "multi",
        required: true,
        options: [...opts("courier", "own", "pickup"), unsure],
      },
      { id: "stock", kind: "single", required: true, options: opts("yes", "no", "not-sure") },
      {
        id: "orderNotify",
        kind: "single",
        required: true,
        options: opts("email", "phone", "both"),
      },
    ],
  },

  /* One step, two depths. Biznis connects the site to a booking service the
     client already uses (or a simple existing one) — it needs to know what is
     booked and how bookings happen today, nothing more. A custom booking
     system is Projekat work, and only Projekat is asked to describe one. */
  {
    id: "booking",
    packages: BOOKING_PACKAGES,
    visibleWhen: (a) =>
      answerHas(a, "projectType", "booking") ||
      answerHas(a, "goals", "take-bookings") ||
      answerHas(a, "features", "booking"),
    questions: [
      { id: "bookingServices", kind: "textarea", required: true, maxLength: 600 },
      {
        id: "bookingCurrent",
        kind: "single",
        required: true,
        options: opts("phone", "messages", "instagram", "notebook", "system", "not-sure"),
      },
      {
        id: "bookingCurrentSystem",
        kind: "text",
        maxLength: 160,
        visibleWhen: (a) => answerText(a, "bookingCurrent") === "system",
      },
      {
        id: "bookingDuration",
        kind: "single",
        required: true,
        packages: ["project"],
        options: opts("to-30", "30-60", "1-2h", "more", "varies"),
      },
      { id: "bookingHours", kind: "textarea", required: true, maxLength: 300, packages: ["project"] },
      {
        id: "bookingStaff",
        kind: "single",
        required: true,
        packages: ["project"],
        options: opts("one", "several", "not-sure"),
      },
      {
        id: "bookingAdvance",
        kind: "single",
        required: true,
        packages: ["project"],
        options: opts("same-day", "week", "month", "longer", "not-sure"),
      },
      {
        id: "bookingCancellation",
        kind: "single",
        required: true,
        packages: ["project"],
        options: opts("free", "with-notice", "no", "not-sure"),
      },
      {
        id: "bookingConfirmation",
        kind: "single",
        required: true,
        packages: ["project"],
        options: opts("email", "message", "both", "not-needed"),
      },
    ],
  },

  {
    id: "materials",
    questions: [
      {
        id: "textsReady",
        kind: "single",
        required: true,
        options: opts("all", "some", "none", "help"),
      },
      { id: "logoStatus", kind: "single", required: true, options: opts("have", "none", "redo") },
      {
        id: "photosStatus",
        kind: "single",
        required: true,
        options: opts("professional", "basic", "not-enough", "not-sure"),
      },
      { id: "uploadLogo", kind: "files", zone: "logo" },
      { id: "uploadMedia", kind: "files", zone: "media" },
      { id: "uploadDocuments", kind: "files", zone: "documents" },
    ],
  },

  {
    id: "finish",
    questions: [
      {
        id: "domainStatus",
        kind: "single",
        required: true,
        options: opts("yes", "no", "not-sure"),
      },
      {
        id: "domainName",
        kind: "text",
        required: true,
        maxLength: 253,
        visibleWhen: (a) => answerText(a, "domainStatus") === "yes",
      },
      {
        id: "domainHelp",
        kind: "single",
        required: true,
        options: opts("yes", "no"),
        visibleWhen: (a) => {
          const status = answerText(a, "domainStatus");
          return status === "no" || status === "not-sure";
        },
      },
      {
        id: "hostingPaying",
        kind: "single",
        required: true,
        options: opts("yes", "no", "not-sure"),
      },
      { id: "notes", kind: "textarea", maxLength: 1500 },
    ],
  },
];

/* ── What is on screen right now ──────────────────────────────────────── */

export function isPackageId(value: unknown): value is PackageId {
  return typeof value === "string" && (PACKAGE_IDS as readonly string[]).includes(value);
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export function isPackageSource(value: unknown): value is PackageSource {
  return typeof value === "string" && (PACKAGE_SOURCES as readonly string[]).includes(value);
}

function inPackage(packages: readonly PackageId[] | undefined, packageId: PackageId): boolean {
  return !packages || packages.includes(packageId);
}

export function visibleOptions(question: Question, packageId: PackageId): readonly Option[] {
  return (question.options ?? []).filter((option) => inPackage(option.packages, packageId));
}

/** How many options this package may pick — the package cap when one is set,
 *  the general cap otherwise. */
export function questionMax(question: Question, packageId: PackageId): number | undefined {
  return question.maxByPackage?.[packageId] ?? question.max;
}

export function visibleQuestions(
  step: Step,
  packageId: PackageId,
  answers: Answers,
): readonly Question[] {
  return step.questions.filter(
    (question) =>
      inPackage(question.packages, packageId) && (!question.visibleWhen || question.visibleWhen(answers)),
  );
}

export function visibleSteps(packageId: PackageId, answers: Answers): readonly Step[] {
  return STEPS.filter(
    (step) => inPackage(step.packages, packageId) && (!step.visibleWhen || step.visibleWhen(answers)),
  );
}

export function findStep(id: string): Step | undefined {
  return STEPS.find((step) => step.id === id);
}

/* ── Validation ───────────────────────────────────────────────────────── */

/**
 * Why an answer was rejected. These are translation keys, not sentences — the
 * server sends the code and the browser already holds the wording in the
 * client's own language, so an error never arrives in the wrong one.
 */
export type ErrorCode = "required" | "email" | "url" | "phone" | "long" | "option" | "many";

export type FieldErrors = Partial<Record<QuestionId, ErrorCode>>;

/** Why a request failed, in the same spirit: a code the browser turns into a
 *  sentence, so the server never has to know which language it is talking to. */
export type ApiErrorCode =
  | "bad-request"
  | "session"
  | "rate-limit"
  | "challenge"
  /** The onboarding link is not one Vaky issued, or it was withdrawn. */
  | "link"
  /** The brief behind this link was already sent — the form is closed. */
  | "completed"
  | "file-type"
  | "file-size"
  | "file-count"
  | "file-total"
  | "answers"
  | "server";

/* Deliberately permissive. This is a brief, not a signup: the field exists so
   Vaky can write back, and the only failure worth catching in a form is the
   one the client can see and fix — a missing @, a stray space, a typo'd TLD.
   Anything stricter starts rejecting addresses that work. */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/* Digits, and the punctuation people actually type them with. Montenegrin
   mobiles are 9 digits, foreign numbers can be longer; the range is wide on
   purpose. */
const PHONE_DIGITS = /\d/g;

export function isValidEmail(value: string): boolean {
  return EMAIL.test(value.trim()) && value.trim().length <= 160;
}

export function isValidPhone(value: string): boolean {
  const digits = value.match(PHONE_DIGITS)?.length ?? 0;
  return digits >= 6 && digits <= 18 && /^[\d\s+()./-]+$/.test(value.trim());
}

/**
 * A URL a person typed. "vaky.me" is a URL to everyone except a parser,
 * so a missing scheme is not an error here — `normaliseUrl` adds one. What is
 * rejected is anything that is not http(s) once parsed, which is what keeps
 * `javascript:` out of a field that Vaky will later click on.
 */
export function normaliseUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function isValidUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 300) return false;
  // A scheme other than http(s) must fail rather than be silently prefixed.
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) return false;
  try {
    const url = new URL(normaliseUrl(trimmed));
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

function checkText(question: Question, value: string): ErrorCode | null {
  const trimmed = value.trim();
  if (!trimmed) return question.required ? "required" : null;
  if (question.maxLength && trimmed.length > question.maxLength) return "long";
  if (question.format === "email" && !isValidEmail(trimmed)) return "email";
  if (question.format === "phone" && !isValidPhone(trimmed)) return "phone";
  if (question.format === "url" && !isValidUrl(trimmed)) return "url";
  return null;
}

/** Every problem with the answers a step is currently showing, keyed by
 *  question id. An empty object means the step may be left. */
export function stepErrors(step: Step, packageId: PackageId, answers: Answers): FieldErrors {
  const errors: FieldErrors = {};

  for (const question of visibleQuestions(step, packageId, answers)) {
    const allowed = visibleOptions(question, packageId).map((option) => option.value);

    switch (question.kind) {
      case "text":
      case "textarea": {
        const problem = checkText(question, answerText(answers, question.id));
        if (problem) errors[question.id] = problem;
        break;
      }

      case "single": {
        const value = answerText(answers, question.id);
        if (!value) {
          if (question.required) errors[question.id] = "required";
        } else if (!allowed.includes(value)) {
          errors[question.id] = "option";
        }
        break;
      }

      case "multi": {
        const values = answerList(answers, question.id);
        const cap = questionMax(question, packageId);
        if (values.length === 0) {
          if (question.required) errors[question.id] = "required";
        } else if (values.some((value) => !allowed.includes(value))) {
          errors[question.id] = "option";
        } else if (cap && values.length > cap) {
          errors[question.id] = "many";
        }
        break;
      }

      case "urls": {
        const values = answerList(answers, question.id).filter((value) => value.trim());
        if (question.max && values.length > question.max) errors[question.id] = "many";
        else if (values.some((value) => !isValidUrl(value))) errors[question.id] = "url";
        break;
      }

      /* Files are not answers — they are rows in storage, validated when they
         are uploaded and counted against the submission there. */
      case "files":
        break;
    }
  }

  return errors;
}

/** The same check across every step the package and the answers put on screen.
 *  This is what the server runs before it accepts a submission. */
export function briefErrors(packageId: PackageId, answers: Answers): FieldErrors {
  const errors: FieldErrors = {};
  for (const step of visibleSteps(packageId, answers)) {
    Object.assign(errors, stepErrors(step, packageId, answers));
  }
  return errors;
}

/**
 * Drop everything that is not a question this package and these answers
 * actually ask, and every option value that is not on the list.
 *
 * Two jobs, one pass. It is the server's guard against a hand-crafted POST
 * carrying fields nobody was ever shown; and it is what stops a draft saved
 * before the client changed their mind — booking answers from before they
 * unticked "online rezervacije" — from arriving in the brief as facts.
 */
export function pruneAnswers(packageId: PackageId, raw: unknown): Answers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const input = raw as Record<string, unknown>;
  const clean: Answers = {};

  /* Run to a fixed point, not a fixed number of passes.
     Visibility is a chain: the booking *step* appears because of an answer on
     the features step, and "Koji program koristite?" appears because of an
     answer inside the booking step — so that one field needs three rounds
     before it is even considered. A two-pass version of this silently dropped
     it. Repeating until nothing new is accepted has no such edge, and it
     terminates because each round can only add keys, and there are finitely
     many questions. */
  let accepted = -1;
  while (Object.keys(clean).length > accepted) {
    accepted = Object.keys(clean).length;
    for (const step of visibleSteps(packageId, clean)) {
      for (const question of visibleQuestions(step, packageId, clean)) {
        const value = input[question.id];
        if (value === undefined) continue;
        const allowed = visibleOptions(question, packageId).map((option) => option.value);

        if (question.kind === "single") {
          if (typeof value === "string" && allowed.includes(value)) clean[question.id] = value;
        } else if (question.kind === "multi") {
          if (Array.isArray(value)) {
            clean[question.id] = value.filter(
              (item): item is string => typeof item === "string" && allowed.includes(item),
            );
          }
        } else if (question.kind === "urls") {
          if (Array.isArray(value)) {
            clean[question.id] = value
              .filter((item): item is string => typeof item === "string")
              .map((item) => item.trim())
              .filter(Boolean)
              .slice(0, question.max ?? 3);
          }
        } else if (question.kind === "text" || question.kind === "textarea") {
          if (typeof value === "string") {
            clean[question.id] = value.trim().slice(0, question.maxLength ?? 500);
          }
        }
      }
    }
  }

  return clean;
}

/* ── Uploads ──────────────────────────────────────────────────────────── */

/**
 * What a client may send, and how much of it.
 *
 * The ceilings are set where a real business's materials fit and an abusive
 * upload does not: a folder of phone photos and a walkthrough video pass, a
 * 300 MB drone edit does not. They are enforced on the server, which is the
 * only place they mean anything; the browser checks the same numbers first
 * only so the client learns before spending their data on the upload.
 */
export const UPLOAD_LIMITS = {
  maxFiles: 40,
  maxBytesPerFile: 20 * 1024 * 1024,
  maxBytesPerVideo: 30 * 1024 * 1024,
  maxBytesTotal: 150 * 1024 * 1024,
} as const;

export type FileGroup = "image" | "video" | "document";

export type AllowedFileType = {
  /** The MIME type stored with the object. */
  mime: string;
  extensions: readonly string[];
  group: FileGroup;
};

/**
 * The allow-list. Anything not on it is refused — by extension *and* by the
 * bytes at the front of the file, checked on the server. Nothing executable is
 * on it, and nothing here is ever served back to a browser as active content.
 *
 * SVG is deliberately absent. An SVG is a document that can carry script, it
 * cannot be identified by its leading bytes the way every other format here
 * can, and the one thing it would be used for — a logo — arrives just as well
 * as PNG or PDF. A studio this size gains nothing by storing a file format
 * whose only real risk is to the person who opens it.
 */
export const ALLOWED_FILE_TYPES: readonly AllowedFileType[] = [
  { mime: "image/jpeg", extensions: ["jpg", "jpeg"], group: "image" },
  { mime: "image/png", extensions: ["png"], group: "image" },
  { mime: "image/webp", extensions: ["webp"], group: "image" },
  { mime: "image/gif", extensions: ["gif"], group: "image" },
  /* What an iPhone produces by default, and what half of the photos a client
     sends will therefore be. Refusing it means telling people to go and convert
     their own holiday snaps. */
  { mime: "image/heic", extensions: ["heic", "heif"], group: "image" },
  { mime: "application/pdf", extensions: ["pdf"], group: "document" },
  { mime: "application/msword", extensions: ["doc"], group: "document" },
  {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extensions: ["docx"],
    group: "document",
  },
  { mime: "application/vnd.ms-excel", extensions: ["xls"], group: "document" },
  {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extensions: ["xlsx"],
    group: "document",
  },
  { mime: "text/plain", extensions: ["txt"], group: "document" },
  { mime: "text/csv", extensions: ["csv"], group: "document" },
  { mime: "application/rtf", extensions: ["rtf"], group: "document" },
  /* Desktop clients send a folder of photos as one zip. It is never opened
     here — it is stored and handed to a person, like an email attachment. */
  { mime: "application/zip", extensions: ["zip"], group: "document" },
  { mime: "video/mp4", extensions: ["mp4", "m4v"], group: "video" },
  { mime: "video/quicktime", extensions: ["mov"], group: "video" },
  { mime: "video/webm", extensions: ["webm"], group: "video" },
];

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

export function allowedTypeFor(name: string): AllowedFileType | undefined {
  const extension = fileExtension(name);
  if (!extension) return undefined;
  return ALLOWED_FILE_TYPES.find((type) => type.extensions.includes(extension));
}

export function maxBytesFor(type: AllowedFileType): number {
  return type.group === "video" ? UPLOAD_LIMITS.maxBytesPerVideo : UPLOAD_LIMITS.maxBytesPerFile;
}

/** The `accept` attribute for a zone's file input — the same allow-list, in the
 *  form the file picker understands, so a phone offers the right chooser. */
export function acceptFor(zone: FileZone): string {
  const groups: Record<FileZone, readonly FileGroup[]> = {
    logo: ["image", "document"],
    media: ["image", "video"],
    documents: ["document", "image"],
  };
  const wanted = groups[zone];
  const types = ALLOWED_FILE_TYPES.filter((type) => wanted.includes(type.group));
  return [
    ...types.map((type) => type.mime),
    ...types.flatMap((type) => type.extensions.map((extension) => `.${extension}`)),
  ].join(",");
}

/** Where an accepted file is filed. The media zone is split by what the file
 *  turned out to be, so photos and video never land in the same folder. */
export function storageFolder(zone: FileZone, group: FileGroup): string {
  if (zone === "logo") return "logo";
  if (zone === "documents") return "documents";
  return group === "video" ? "videos" : "images";
}

export function isFileZone(value: unknown): value is FileZone {
  return typeof value === "string" && (FILE_ZONES as readonly string[]).includes(value);
}
