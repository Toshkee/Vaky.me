import { onboardingCopy } from "../../src/i18n/onboarding/index";
import { PACKAGES, priceLabel } from "../../src/lib/packages";
import {
  answerList,
  answerText,
  type Answers,
  type Language,
  type PackageId,
} from "../../src/lib/onboarding/schema";
import type { ScopeWarning } from "./scope";
import type { NoteRow, ProjectFileRow, ProjectRow } from "./store";

/**
 * The Build Brief: everything VibeLab knows about a project, rewritten as a
 * specification an external coding agent can be handed cold.
 *
 * Deterministic on purpose. No model is called and no key is needed — the
 * brief is a transformation of stored facts, and a fact that was never
 * collected comes out as "Not provided" or "VibeLab to decide", never as
 * something plausible. The one thing this file is allowed to add is VibeLab's
 * own house standards (performance, accessibility, no-slop design), because
 * those are the studio's facts, not the client's.
 *
 * Three modes, one data pass: every section declares which modes want it, so
 * the design brief is the full brief with the engineering pulled out, not a
 * separately maintained document that can drift.
 */

export const BRIEF_MODES = ["full", "design", "technical"] as const;
export type BriefMode = (typeof BRIEF_MODES)[number];

export function isBriefMode(value: unknown): value is BriefMode {
  return typeof value === "string" && (BRIEF_MODES as readonly string[]).includes(value);
}

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
    "The client would like to edit content themselves. No CMS is in scope — content is edited by VibeLab.",
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

/* ── The brief ────────────────────────────────────────────────────────── */

type Section = { title: string; modes: readonly BriefMode[]; body: string[] };

export function generateBrief(mode: BriefMode, data: BriefData): string {
  const { project, packageId, files, notes, warnings } = data;
  const answers = data.answers ?? {};
  const hasAnswers = data.answers !== null;
  const pkg = PACKAGES[packageId];
  const price = priceLabel(packageId, "en");
  const packageName = { start: "Start", business: "Biznis", project: "Projekat" }[packageId];

  const askedShop = hasAnswers && "productCount" in answers;
  const askedBooking = hasAnswers && "bookingServices" in answers;

  const sections: Section[] = [];
  const add = (title: string, modes: readonly BriefMode[], body: string[]) => {
    sections.push({ title, modes, body });
  };

  /* — Overview — */
  add("Project Overview", BRIEF_MODES, [
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
    ...(hasAnswers ? [] : ["", "The client has not completed the onboarding questionnaire yet — every answer-derived field below is missing by definition. Build nothing on assumptions; ask VibeLab."]),
  ]);

  add("Business Context & Target Audience", BRIEF_MODES, [
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
        : [`- ${hasAnswers ? "VibeLab to decide (client left it to us)" : NOT_PROVIDED}`]),
      ...(answerText(answers, "sectionsOther")
        ? [`- Other (client's words): ${answerText(answers, "sectionsOther")}`]
        : []),
      "",
      "Order and exact composition of sections are VibeLab's design decision; the list says what must exist, not the layout.",
    );
  } else if (packageId === "business") {
    scopeBody.push(
      "",
      `A multi-page site of **up to ${pkg.maxPages} separate pages**.`,
      "",
      "**Pages the client chose:**",
      ...(multi(answers, "pages").length
        ? bullets(multi(answers, "pages"))
        : [`- ${hasAnswers ? "VibeLab to decide (client left it to us)" : NOT_PROVIDED}`]),
      ...(answerText(answers, "pagesOther")
        ? [`- Other (client's words): ${answerText(answers, "pagesOther")}`]
        : []),
      "",
      line(
        "Site languages",
        single(answers, "siteLanguages") ||
          "Montenegrin + English supported by the package; confirm with VibeLab",
      ),
      "English content is supplied by the client and edited by VibeLab — do not machine-translate wholesale.",
    );
  } else {
    scopeBody.push(
      "",
      `A custom build — **${price}** is the starting point and the final scope is agreed per project. Build exactly what is listed here; anything more is a question for VibeLab, not an assumption.`,
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
        : [`- ${hasAnswers ? "VibeLab to decide (client left it to us)" : NOT_PROVIDED}`]),
      ...(multi(answers, "languagesNeeded").length
        ? [line("Additional languages", multi(answers, "languagesNeeded").join(", "))]
        : []),
    );
  }
  add("Agreed VibeLab Package & Scope", BRIEF_MODES, scopeBody);

  /* — Functionality — */
  add("Required Functionality", ["full", "technical"], [
    "**Features the client ticked:**",
    ...(multi(answers, "features").length ? bullets(multi(answers, "features")) : [`- ${NOT_PROVIDED}`]),
    ...(answerText(answers, "featuresOther")
      ? [`- Other (client's words): ${answerText(answers, "featuresOther")}`]
      : []),
    "",
    line("Client wants to edit content themselves", single(answers, "selfEditing")),
  ]);

  if (askedShop) {
    add("Ecommerce Requirements", ["full", "technical"], [
      line("Approximate product count", single(answers, "productCount")),
      line("Product groups (client's words)", answerText(answers, "productCategories")),
      line("Materials already prepared", multi(answers, "productReady").join(", ")),
      line("Product variants (sizes/colours)", single(answers, "variants")),
      line("Payment methods wanted", multi(answers, "payment").join(", ")),
      line("Delivery", multi(answers, "delivery").join(", ")),
      line("Stock tracking", single(answers, "stock")),
      line("Order notifications to the owner", single(answers, "orderNotify")),
      "",
      "Note: 'payment methods wanted' describes the CLIENT'S shop checkout. It has nothing to do with paying VibeLab — the VibeLab site itself never processes payments.",
    ]);
  }

  if (askedBooking) {
    const custom = packageId === "project";
    add("Booking Requirements", ["full", "technical"], [
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
  add("Content & Copy", BRIEF_MODES, [
    line("State of the client's texts", single(answers, "textsReady")),
    "Use supplied content; edit and tighten it, but never fabricate services, prices, testimonials, statistics or claims. Where content is missing, use a clearly marked placeholder and flag it to VibeLab.",
  ]);

  const byFolder = new Map<string, ProjectFileRow[]>();
  for (const file of files) {
    const group = byFolder.get(file.folder) ?? [];
    group.push(file);
    byFolder.set(file.folder, group);
  }
  add("Assets Provided", BRIEF_MODES, [
    files.length === 0
      ? "No files have been provided yet."
      : "The files below exist in the project's private storage; VibeLab supplies them alongside this brief. Reference them by name.",
    ...[...byFolder.entries()].flatMap(([folder, group]) => [
      "",
      `**${folder}/**`,
      ...group.map(
        (file) =>
          `- ${file.original_name} (${megabytes(file.size_bytes)}${file.source === "admin" ? ", added by VibeLab" : ""})`,
      ),
    ]),
  ]);

  /* — Design — */
  add("Visual Direction", ["full", "design"], [
    line("Styles the client picked", multi(answers, "style").join(", ")),
    line("Explicitly does NOT want", answerText(answers, "avoid")),
    line("Logo", single(answers, "logoStatus")),
    line("Photography", single(answers, "photosStatus")),
    "",
    "**Inspiration references:**",
    ...(answerList(answers, "inspiration").filter(Boolean).length
      ? bullets(answerList(answers, "inspiration").filter(Boolean))
      : [`- ${NOT_PROVIDED}`]),
    "",
    "Design for THIS brand and industry. Do not reuse a generic template look, and do not default to AI-typical styling (purple gradients, glassmorphism, three-card grids everywhere, decorative blobs). Strong typography, real hierarchy, intentional composition.",
  ]);

  /* — Domain — */
  add("Domain / Existing Website", ["full", "technical"], [
    line("Has a domain", single(answers, "domainStatus")),
    line("Domain", answerText(answers, "domainName")),
    line("Wants help choosing/setting one up", single(answers, "domainHelp")),
    line("Currently paying for a site/hosting", single(answers, "hostingPaying")),
  ]);

  /* — Notes — */
  add("Client Preferences (their own words)", BRIEF_MODES, [
    answerText(answers, "notes") || NOT_PROVIDED,
  ]);

  add("VibeLab Internal Notes", BRIEF_MODES, [
    ...(notes.length
      ? notes.map((note) => `- ${note.body} _(${note.created_at.slice(0, 10)})_`)
      : ["- None."]),
    "",
    "Internal notes are for the builder only — never render their content on the site.",
  ]);

  /* — Constraints — */
  add("Scope / Package Constraints", BRIEF_MODES, [
    ...(warnings.length
      ? ["**Flags raised against this package:**", ...warnings.map((warning) => `- ${WARNING_EN[warning.id] ?? warning.label}`)]
      : ["No scope flags — the request fits the package."]),
    "",
    `- The package includes ${pkg.revisionRounds === null ? "revision rounds as agreed per project" : `${pkg.revisionRounds} revision round${pkg.revisionRounds === 1 ? "" : "s"}`} — build so revisions are cheap (clean structure, no dead ends).`,
    "- No online payments to VibeLab anywhere on the site. No checkout for VibeLab services, no Stripe, no pricing-page purchase flows.",
  ]);

  /* — Standards — */
  add("Technical Expectations", ["full", "technical"], [
    "- Prefer the simplest stack that serves the project; a static or mostly-static build unless the required functionality above demands a backend.",
    "- Responsive from 360px phones to wide desktops; most visitors arrive from Instagram/WhatsApp on a phone.",
    "- Semantic HTML, WCAG AA contrast, keyboard navigable, visible focus states, `prefers-reduced-motion` respected.",
    "- Fast: optimized images with explicit dimensions, no layout shift, minimal JavaScript, system or self-hosted fonts.",
    "- SEO fundamentals: one h1 per page, meta title/description, Open Graph, sitemap and robots where applicable, structured data where it genuinely fits.",
    "- Forms validate on the client for UX and on the server for trust; never expose secrets in frontend code.",
  ]);

  add("Build Quality Requirements", ["full", "design", "technical"], [
    "- The result must look intentionally designed for this specific business — if the branding were removed, it should NOT look like a generic template.",
    "- Test on real phone widths before calling anything done.",
    "- No lorem ipsum, no fake testimonials, no invented statistics, no placeholder stock photos presented as the client's own.",
  ]);

  add("Non-Negotiable Requirements", BRIEF_MODES, [
    ...(packageId === "start"
      ? ["- ONE page. Do not create multiple routes."]
      : packageId === "business"
        ? [`- At most ${pkg.maxPages} separate pages.`]
        : []),
    "- Never fabricate business information: services, prices, addresses, opening hours, reviews, social links. Missing information is flagged, not invented.",
    "- Everything the client uploaded stays private until it is deliberately placed on the site.",
    "- No online payment processing for VibeLab itself anywhere.",
  ]);

  add("Final Build Instructions", BRIEF_MODES, [
    "Work through this brief top to bottom. Where the brief says \"Not provided\" or \"VibeLab to decide\", make no assumption — leave a clearly marked gap and list it in your handover notes. Deliver production-ready code, a short summary of decisions taken, and the list of open questions for VibeLab.",
  ]);

  /* — Assemble — */
  const title = {
    full: "Full Website Build Brief",
    design: "Design / UI Brief",
    technical: "Developer / Technical Brief",
  }[mode];

  const parts: string[] = [
    `# ${title} — ${project.business_name}`,
    "",
    `> Prepared by VibeLab (vibelab.it.com) · package: ${packageName} ${price} · generated from the client's onboarding answers. Do not contact the client directly; every question goes to VibeLab.`,
  ];

  for (const section of sections) {
    if (!section.modes.includes(mode)) continue;
    parts.push("", `## ${section.title}`, "", ...section.body);
  }

  return parts.join("\n");
}
