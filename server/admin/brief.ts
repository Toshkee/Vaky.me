import { onboardingCopy } from "../../src/i18n/onboarding/index";
import {
  ANTI_SLOP,
  DONE,
  STACK,
  STYLE_DIRECTIONS,
  TRADE_PLAYBOOK,
  isStyleId,
  isTrade,
  type StyleId,
} from "../../src/lib/build-playbook";
import { PACKAGES, priceLabel } from "../../src/lib/packages";
import {
  answerList,
  answerText,
  isLanguage,
  isPackageId,
  type Answers,
  type Language,
  type PackageId,
} from "../../src/lib/onboarding/schema";
import { scopeWarnings, type ScopeWarning } from "./scope";
import {
  findSubmissionForProject,
  listNotes,
  listProjectFiles,
  type NoteRow,
  type ProjectFileRow,
  type ProjectRow,
} from "./store";

/**
 * The Build Brief: everything Vaky knows about a project, rewritten as a
 * specification an external coding agent can be handed cold.
 *
 * Deterministic on purpose. No model is called and no key is needed — the
 * brief is a transformation of stored facts, and a fact that was never
 * collected comes out as "Not provided" or "Vaky to decide", never as
 * something plausible. The one thing this file is allowed to add is Vaky's
 * own house standards (performance, accessibility, no-slop design), because
 * those are the studio's facts, not the client's.
 *
 * The studio's side — stack, page structure per trade, what each style
 * option means as a design system, what "done" means — comes from
 * src/lib/build-playbook.ts, shared with the concept brief.
 *
 * One document. It used to come in three flavours — full, design, technical
 * — that differed by a section or two, which made the choice a fake one. The
 * concept-phase prompt is its own thing in ./concept.ts, built from the
 * enquiry rather than the questionnaire.
 */

export type BriefData = {
  project: ProjectRow;
  packageId: PackageId;
  answers: Answers | null;
  answersLanguage: Language | null;
  submissionPackageId: PackageId | null;
  files: ProjectFileRow[];
  notes: NoteRow[];
  warnings: ScopeWarning[];
};

/* English wording for the scope flags the dashboard shows in Montenegrin. */
const WARNING_EN: Record<string, string> = {
  "package-mismatch":
    "The questionnaire was answered under a different package than the one now assigned — treat answers that exceed the current package as context, not scope.",
  "start-shop":
    "The client's goal mentions selling products. This package does NOT include a shop — do not build one; present products without checkout.",
  "start-booking":
    "The client wants to take bookings. This package does NOT include online booking — provide contact buttons (call/WhatsApp/Viber) instead.",
  "business-shop":
    "The client's goal mentions selling products. This package does NOT include a shop — do not build one.",
  "self-editing":
    "The client would like to edit content themselves. No CMS is in scope — content is edited by Vaky.",
  copywriting:
    "The client asked for help with copy. Editing and adapting supplied content is in scope; writing everything from scratch is not — flag missing copy instead of inventing it.",
  "logo-redo":
    "The client wants a new version of their logo. Logo design is NOT part of this build — use the supplied logo as-is.",
};

const NOT_PROVIDED = "Not provided";

/* ── Answer plumbing ──────────────────────────────────────────────────── */

const en = onboardingCopy.en;

/** The English label for one option id, so the brief reads as prose even
 *  though the stored answer is an id. */
function option(questionId: keyof typeof en.questions, value: string): string {
  return en.questions[questionId].options?.[value] ?? value;
}

function single(answers: Answers, id: keyof typeof en.questions): string {
  const value = answerText(answers, id);
  return value ? option(id, value) : "";
}

function multi(answers: Answers, id: keyof typeof en.questions): string[] {
  return answerList(answers, id).map((value) => option(id, value));
}

function line(label: string, value: string): string {
  return `- **${label}:** ${value || NOT_PROVIDED}`;
}

function bullets(values: string[]): string[] {
  return values.map((value) => `- ${value}`);
}

function megabytes(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/* ── Studio sections, from the playbook ───────────────────────────────── */

function pageStructure(project: ProjectRow, packageId: PackageId): string[] {
  const where =
    packageId === "start"
      ? "These are the sections of the one page, in this order."
      : "The home page carries the hero and a short version of each section; the pages the client chose take the full versions. Map each section to one of those pages.";

  if (!isTrade(project.trade)) {
    return [
      "This business is not one of the trades Vaky has a page playbook for, so the structure comes from the scope above.",
      "",
      "For every section or page, write down the question a visitor has that it answers — what do you offer, how much, where, when, how do I book or order, why should I trust you. A section that answers none is cut. The hero answers \"what is this and what do I do next\" and carries the main contact action.",
      "",
      where,
    ];
  }

  const playbook = TRADE_PLAYBOOK[project.trade];
  return [
    `This is a **${playbook.name}** site.`,
    "",
    `**Who arrives:** ${playbook.visitor}`,
    "",
    where,
    "Sections the client chose above must all exist; fit them into this order. A section below that the client supplied nothing for is built with marked placeholders and listed in the handover, not dropped silently.",
    "",
    ...playbook.sections.flatMap((section, index) => [
      `${index + 1}. **${section.name}** — answers: _${section.answers}_`,
      `   ${section.content}`,
    ]),
    "",
    "**Contact actions, most important first.** Use only the channels the client actually has — the contact details above say which. On a phone, the first one is reachable from every screen (a sticky bar or a header button, not a floating bubble).",
    ...bullets(playbook.contact),
    "",
    "**What sites in this trade usually get wrong:**",
    ...bullets(playbook.mistakes),
  ];
}

function designSystem(answers: Answers, hasAnswers: boolean): string[] {
  const picked = answerList(answers, "style").filter(isStyleId);
  const styles: StyleId[] = picked.length ? picked : ["not-sure"];
  const inspiration = answerList(answers, "inspiration").filter(Boolean);

  const body: string[] = [
    line("Styles the client picked", hasAnswers ? multi(answers, "style").join(", ") : ""),
    line("Explicitly does NOT want", answerText(answers, "avoid")),
    line("Logo", single(answers, "logoStatus")),
    line("Photography", single(answers, "photosStatus")),
    "",
    "**Inspiration references** (read them for what the client likes — mood, density, colour — not as layouts to copy):",
    ...(inspiration.length ? bullets(inspiration) : [`- ${NOT_PROVIDED}`]),
    "",
  ];

  if (styles.length > 1) {
    body.push(
      `The client picked ${styles.length} directions. **${STYLE_DIRECTIONS[styles[0]].name}** leads; the others adjust it rather than competing with it. Where they conflict, the lead wins and the handover says what was traded away.`,
      "",
    );
  }

  for (const id of styles) {
    const direction = STYLE_DIRECTIONS[id];
    body.push(
      `**${direction.name}**`,
      `- Typography: ${direction.typography}`,
      `- Palette: ${direction.palette}`,
      `- Hero: ${direction.hero}`,
      `- Section rhythm: ${direction.rhythm}`,
      "",
    );
  }

  body.push(
    "If the client supplied a logo, the palette starts from its colours; the directions above say how to use them, not which ones to invent.",
    "",
    "**Tokens.** Declare once and use everywhere: `background`, `foreground`, `muted`, `border`, `primary`, `primary-foreground`, `accent`; a type scale of at most six steps set with `clamp()`; one spacing scale; one radius. No colour or size outside the tokens.",
    "",
    "**House rules on design:**",
    ...bullets([...ANTI_SLOP]),
  );

  return body;
}

/* ── The brief ────────────────────────────────────────────────────────── */

type Section = { title: string; body: string[] };

export function generateBrief(data: BriefData): string {
  const { project, packageId, files, notes, warnings } = data;
  const answers = data.answers ?? {};
  const hasAnswers = data.answers !== null;
  const pkg = PACKAGES[packageId];
  const price = priceLabel(packageId, "en");
  const packageName = { start: "Start", business: "Biznis", project: "Projekat" }[packageId];

  const askedShop = hasAnswers && "productCount" in answers;
  const askedBooking = hasAnswers && "bookingServices" in answers;

  const sections: Section[] = [];
  const add = (title: string, body: string[]) => {
    sections.push({ title, body });
  };

  /* — Overview — */
  add("Project Overview", [
    `Build a production website for **${project.business_name}**${project.contact_name ? ` (contact: ${project.contact_name})` : ""}.`,
    "",
    line("What the business does", answerText(answers, "activity")),
    line("Existing website", project.existing_site || answerText(answers, "existingSite")),
    line("Instagram / Facebook", project.instagram || answerText(answers, "instagram")),
    line(
      "Public contact details for the site",
      [project.phone || answerText(answers, "phone"), project.email || answerText(answers, "email")]
        .filter(Boolean)
        .join(" · "),
    ),
    ...(data.answersLanguage === "me"
      ? ["", "Client answers quoted below are in Montenegrin — keep site copy in Montenegrin unless a section says otherwise."]
      : []),
    ...(hasAnswers ? [] : ["", "The client has not completed the onboarding questionnaire yet — every answer-derived field below is missing by definition. Build nothing on assumptions; ask Vaky."]),
  ]);

  add("Business Context & Target Audience", [
    line("Typical customers", answerText(answers, "customers")),
    line("Primary goals for the site", multi(answers, "goals").join("; ")),
    line("Other goal (client's words)", answerText(answers, "goalsOther")),
  ]);

  /* — Package & scope — */
  const scopeBody: string[] = [
    line("Agreed package", `${packageName} — ${price}`),
    line(
      "Revision rounds before launch",
      pkg.revisionRounds === null ? "Agreed per project" : String(pkg.revisionRounds),
    ),
  ];

  if (packageId === "start") {
    scopeBody.push(
      "",
      "**This is a ONE-PAGE WEBSITE.** One scrolling page, built from the sections below. Do NOT create separate routes/pages (a legally required page such as a privacy policy is the only exception, and only if genuinely needed).",
      "",
      "**Sections the client chose:**",
      ...(multi(answers, "sections").length
        ? bullets(multi(answers, "sections"))
        : [`- ${hasAnswers ? "Vaky to decide (client left it to us)" : NOT_PROVIDED}`]),
      ...(answerText(answers, "sectionsOther")
        ? [`- Other (client's words): ${answerText(answers, "sectionsOther")}`]
        : []),
      "",
      "Order and exact composition of sections are Vaky's design decision; the list says what must exist, not the layout.",
    );
  } else if (packageId === "business") {
    scopeBody.push(
      "",
      `A multi-page site of **up to ${pkg.maxPages} separate pages**.`,
      "",
      "**Pages the client chose:**",
      ...(multi(answers, "pages").length
        ? bullets(multi(answers, "pages"))
        : [`- ${hasAnswers ? "Vaky to decide (client left it to us)" : NOT_PROVIDED}`]),
      ...(answerText(answers, "pagesOther")
        ? [`- Other (client's words): ${answerText(answers, "pagesOther")}`]
        : []),
      "",
      line(
        "Site languages",
        single(answers, "siteLanguages") ||
          "Montenegrin + English supported by the package; confirm with Vaky",
      ),
      "English content is supplied by the client and edited by Vaky — do not machine-translate wholesale.",
    );
  } else {
    scopeBody.push(
      "",
      `A custom build — **${price}** is the starting point and the final scope is agreed per project. Build exactly what is listed here; anything more is a question for Vaky, not an assumption.`,
      "",
      "**Custom capabilities the client selected:**",
      ...(multi(answers, "projectType").length
        ? bullets(multi(answers, "projectType"))
        : [`- ${NOT_PROVIDED}`]),
      ...(answerText(answers, "projectTypeOther")
        ? [`- Other (client's words): ${answerText(answers, "projectTypeOther")}`]
        : []),
      ...(answerText(answers, "integrationsWhat")
        ? [line("Integrations (client's words)", answerText(answers, "integrationsWhat"))]
        : []),
      "",
      "**Pages the client chose:**",
      ...(multi(answers, "pages").length
        ? bullets(multi(answers, "pages"))
        : [`- ${hasAnswers ? "Vaky to decide (client left it to us)" : NOT_PROVIDED}`]),
      ...(multi(answers, "languagesNeeded").length
        ? [line("Additional languages", multi(answers, "languagesNeeded").join(", "))]
        : []),
    );
  }
  add("Agreed Vaky Package & Scope", scopeBody);

  /* — Functionality — */
  add("Required Functionality", [
    "**Features the client ticked:**",
    ...(multi(answers, "features").length ? bullets(multi(answers, "features")) : [`- ${NOT_PROVIDED}`]),
    ...(answerText(answers, "featuresOther")
      ? [`- Other (client's words): ${answerText(answers, "featuresOther")}`]
      : []),
    "",
    line("Client wants to edit content themselves", single(answers, "selfEditing")),
  ]);

  if (askedShop) {
    add("Ecommerce Requirements", [
      line("Approximate product count", single(answers, "productCount")),
      line("Product groups (client's words)", answerText(answers, "productCategories")),
      line("Materials already prepared", multi(answers, "productReady").join(", ")),
      line("Product variants (sizes/colours)", single(answers, "variants")),
      line("Payment methods wanted", multi(answers, "payment").join(", ")),
      line("Delivery", multi(answers, "delivery").join(", ")),
      line("Stock tracking", single(answers, "stock")),
      line("Order notifications to the owner", single(answers, "orderNotify")),
      "",
      "Note: 'payment methods wanted' describes the CLIENT'S shop checkout. It has nothing to do with paying Vaky — the Vaky site itself never processes payments.",
    ]);
  }

  if (askedBooking) {
    const custom = packageId === "project";
    add("Booking Requirements", [
      custom
        ? "A custom booking flow is in scope. Its rules:"
        : "Booking means CONNECTING to what the client already uses — do NOT build a custom booking engine for this package.",
      "",
      line("What clients book (client's words)", answerText(answers, "bookingServices")),
      line("How bookings happen today", single(answers, "bookingCurrent")),
      line("Software in use", answerText(answers, "bookingCurrentSystem")),
      ...(custom
        ? [
            line("Typical appointment length", single(answers, "bookingDuration")),
            line("Opening hours (client's words)", answerText(answers, "bookingHours")),
            line("Multiple staff take appointments", single(answers, "bookingStaff")),
            line("How far ahead bookings open", single(answers, "bookingAdvance")),
            line("Client-side cancellation", single(answers, "bookingCancellation")),
            line("Confirmation to the customer", single(answers, "bookingConfirmation")),
          ]
        : []),
    ]);
  }

  /* — Content & assets — */
  add("Content & Copy", [
    line("State of the client's texts", single(answers, "textsReady")),
    "Use supplied content; edit and tighten it, but never fabricate services, prices, testimonials, statistics or claims. Where content is missing, use a clearly marked placeholder and flag it to Vaky.",
  ]);

  const byFolder = new Map<string, ProjectFileRow[]>();
  for (const file of files) {
    const group = byFolder.get(file.folder) ?? [];
    group.push(file);
    byFolder.set(file.folder, group);
  }
  add("Assets Provided", [
    files.length === 0
      ? "No files have been provided yet."
      : "The files below exist in the project's private storage; Vaky supplies them alongside this brief. Reference them by name.",
    ...[...byFolder.entries()].flatMap(([folder, group]) => [
      "",
      `**${folder}/**`,
      ...group.map(
        (file) =>
          `- ${file.original_name} (${megabytes(file.size_bytes)}${file.source === "admin" ? ", added by Vaky" : ""})`,
      ),
    ]),
  ]);

  /* — Structure — */
  add("Page Structure", pageStructure(project, packageId));

  /* — Design — */
  add("Design System", designSystem(answers, hasAnswers));

  /* — Domain — */
  add("Domain / Existing Website", [
    line("Has a domain", single(answers, "domainStatus")),
    line("Domain", answerText(answers, "domainName")),
    line("Wants help choosing/setting one up", single(answers, "domainHelp")),
    line("Currently paying for a site/hosting", single(answers, "hostingPaying")),
  ]);

  /* — Notes — */
  add("Client Preferences (their own words)", [
    answerText(answers, "notes") || NOT_PROVIDED,
  ]);

  add("Vaky Internal Notes", [
    ...(notes.length
      ? notes.map((note) => `- ${note.body} _(${note.created_at.slice(0, 10)})_`)
      : ["- None."]),
    "",
    "Internal notes are for the builder only — never render their content on the site.",
  ]);

  /* — Constraints — */
  add("Scope / Package Constraints", [
    ...(warnings.length
      ? ["**Flags raised against this package:**", ...warnings.map((warning) => `- ${WARNING_EN[warning.id] ?? warning.label}`)]
      : ["No scope flags — the request fits the package."]),
    "",
    `- The package includes ${pkg.revisionRounds === null ? "revision rounds as agreed per project" : `${pkg.revisionRounds} revision round${pkg.revisionRounds === 1 ? "" : "s"}`} — build so revisions are cheap (clean structure, no dead ends).`,
    "- No online payments to Vaky anywhere on the site. No checkout for Vaky services, no Stripe, no pricing-page purchase flows.",
  ]);

  /* — Standards — */
  add("Stack & Delivery", [
    ...bullets([...STACK]),
    "- Responsive from 360px phones to wide desktops; most visitors arrive from Instagram or WhatsApp on a phone, so design the 390px layout first.",
    "- SEO: a meta title and description per page, an Open Graph image, `sitemap.xml` and `robots.txt`, and `LocalBusiness` structured data filled only with facts from this brief.",
  ]);

  add("Non-Negotiable Requirements", [
    ...(packageId === "start"
      ? ["- ONE page. Do not create multiple routes."]
      : packageId === "business"
        ? [`- At most ${pkg.maxPages} separate pages.`]
        : []),
    "- Never fabricate business information: services, prices, addresses, opening hours, reviews, social links. Missing information is flagged, not invented.",
    "- Everything the client uploaded stays private until it is deliberately placed on the site.",
    "- No online payment processing for Vaky itself anywhere.",
  ]);

  add("Definition of Done", [
    "The build is not finished until every line below is true. Check each one and report it in the handover.",
    "",
    ...bullets([...DONE]),
  ]);

  add("Final Build Instructions", [
    "Work through this brief top to bottom. Where the brief says \"Not provided\" or \"Vaky to decide\", make no assumption — leave a clearly marked gap and list it in your handover notes. Deliver production-ready code, a short summary of decisions taken, and the list of open questions for Vaky.",
  ]);

  /* — Assemble — */
  const parts: string[] = [
    `# Website Build Brief — ${project.business_name}`,
    "",
    `> Prepared by Vaky (vaky.me) · package: ${packageName} ${price} · generated from the client's onboarding answers. Do not contact the client directly; every question goes to Vaky.`,
  ];

  for (const section of sections) {
    parts.push("", `## ${section.title}`, "", ...section.body);
  }

  return parts.join("\n");
}

/* ── Loading ──────────────────────────────────────────────────────────── */

/** What the `mode` column says for every brief now. The table's CHECK
 *  constraint predates the single-brief design; older rows keep their
 *  historical modes. */
export const BRIEF_MODE = "full";

/**
 * Reads everything a brief is made of for one project and writes it. Shared
 * by the dashboard's button and by the questionnaire's submit, so the brief
 * that arrives by email and one generated later by hand are the same
 * document. Returns null for a project whose package is not one Vaky sells,
 * which the app never writes.
 */
export async function briefForProject(db: D1Database, project: ProjectRow): Promise<string | null> {
  if (!isPackageId(project.package_id)) return null;

  const [submission, files, notes] = await Promise.all([
    findSubmissionForProject(db, project.id),
    listProjectFiles(db, project.id),
    listNotes(db, { projectId: project.id, leadId: null }),
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

  return generateBrief({
    project,
    packageId: project.package_id,
    answers,
    answersLanguage: submission && isLanguage(submission.language) ? submission.language : null,
    submissionPackageId,
    files,
    notes,
    warnings: scopeWarnings(project.package_id, answers, submissionPackageId),
  });
}
