import { ANTI_SLOP } from "../../src/lib/build-playbook";
import { LEAD_NEED_LABELS, isLeadNeed } from "../../src/lib/workflow";
import { PACKAGES } from "../../src/lib/packages";
import type { LeadRow, NoteRow } from "./store";

/**
 * The Concept Brief: the prompt for step two of "Kako radimo" — the free
 * concept a business gets before it has agreed to anything or paid a cent.
 *
 * Its input is thin on purpose: an enquiry is a name, a link and a sentence,
 * not a questionnaire. So this document does two things the Build Brief
 * never has to. It tells the agent to go and READ the public profile or
 * site behind the link, and it says exactly what a concept is — three
 * directions, one page, a handful of questions back — so the output sells
 * a direction rather than pretending to be the finished site.
 *
 * Deterministic, like the Build Brief: no model is called here, nothing is
 * stored, and every fact in the output is either the client's own words,
 * a Vaky note, or a rule of the house. What the enquiry did not say is a
 * question for the client, never a plausible guess.
 *
 * Contact details are left out deliberately. The agent does not need a
 * phone number to draw a concept, and a brief that gets pasted around
 * should carry nothing that has to be kept private.
 */

export type ConceptData = {
  lead: LeadRow;
  notes: NoteRow[];
};

const NOT_PROVIDED = "Not provided";

function line(label: string, value: string | null): string {
  return `- **${label}:** ${value?.trim() || NOT_PROVIDED}`;
}

/** The English wording of the public form's "what do you need" options. */
const NEED_EN: Record<string, string> = {
  "new-site": "A new website (has none, or nothing worth keeping)",
  redesign: "A redesign of an existing site",
  shop: "An online shop",
  "something-else": "Something else — see their message",
  "not-sure": "Not sure yet — the concept is what helps them decide",
};

export function generateConceptBrief({ lead, notes }: ConceptData): string {
  const business = lead.business_name?.trim() || lead.name.trim();
  const typed = lead.link?.trim() || "";
  /* People type "@handle" as readily as a URL. An agent can open a URL; a
     bare handle it has to guess at, so it is spelled out as the profile. */
  const link = typed.startsWith("@")
    ? `the Instagram profile https://instagram.com/${typed.slice(1)}`
    : typed;
  const language = lead.language === "en" ? "English" : "Montenegrin";
  const need = isLeadNeed(lead.need) ? (NEED_EN[lead.need] ?? LEAD_NEED_LABELS[lead.need]) : null;
  const start = PACKAGES.start;

  const parts: string[] = [
    `# Concept Brief — ${business}`,
    "",
    `> Prepared by Vaky (vaky.me) · pre-sale · generated from a public enquiry. Nothing has been agreed and nothing has been paid: the output is a design concept that helps this business decide, not a site to ship. Do not contact the client; every question goes to Vaky.`,
    "",
    "## What the enquiry says",
    "",
    line("Business", business),
    line("Contact person", lead.name),
    line("What they asked for", need),
    line("Their Instagram or website", typed),
    line("Language they wrote in", language),
    "",
    "**Their message, verbatim:**",
    "",
    lead.message?.trim() ? `> ${lead.message.trim().replace(/\n/g, "\n> ")}` : `> _${NOT_PROVIDED}_`,
    "",
    "## Vaky's notes",
    "",
    ...(notes.length
      ? notes.map((note) => `- ${note.body} _(${note.created_at.slice(0, 10)})_`)
      : ["- None yet."]),
    "",
    "Notes are for you only — never render their content in the concept.",
    "",
    "## Research first",
    "",
    ...(link
      ? [
          `Open ${link} and read everything that is public: what they sell or do, prices if listed, opening hours, location, how they speak to customers, what their photos look like, what people ask in comments. Write down what you found before you design anything — the concept is built on it.`,
        ]
      : [
          "No link was given. You have only the message above. Search for the business by name and city if the message names one; if you find nothing, design from the trade alone and say so in your write-up.",
        ]),
    "",
    "Use only what the business has published itself. A directory listing, a review site or a competitor's page is context, not a source of facts about this business.",
    "",
    "## What a concept is",
    "",
    "Produce these, in this order:",
    "",
    "1. **Three design directions**, each with a name, one paragraph on why it fits this business and its customers, a type pairing, a palette of at most four colours, and a sketch of the hero in words. Recommend one and say why.",
    "2. **The page**, for the recommended direction: one scrolling page, section by section, in order. For every section say what customer question it answers (what do you offer, how much, where, when, how do I book or order, why should I trust you) — a section that answers none is cut.",
    "3. **Tone and three sample headlines**, in the language the client wrote in. Short, specific to this business, no agency phrases.",
    "4. **A working prototype** of that page as a small React project: the latest stable React in TypeScript, Next.js (App Router) with `output: \"export\"`, Tailwind — the same stack every Vaky site is built on, so a concept the client likes becomes the start of the build rather than a throwaway. Server Components by default, `\"use client\"` only where a menu or a gallery needs it. Built for a 390px phone first and presentable on a laptop. Real copy where the research supports it, clearly marked placeholders where it does not.",
    "5. **Questions for the client** — at most five, only the ones whose answer would change the design.",
    "6. **What to ask for** before a build could start: logo, photos, price list, texts — as a short list Vaky can forward.",
    "",
    "## House standards",
    "",
    ...ANTI_SLOP.map((rule) => `- ${rule}`),
    "- Phone first: most visitors arrive from Instagram or WhatsApp. Contact actions — call, WhatsApp, Viber, Instagram DM — are one tap away, and a map or address is on the page.",
    "- Menus and price lists are text, never images.",
    "- Fast, accessible, semantic: real headings, real buttons, WCAG AA contrast, `prefers-reduced-motion` respected.",
    "",
    "## Hard limits",
    "",
    "- Never invent business facts: services, prices, hours, addresses, reviews, staff names, awards. What the research did not confirm is a marked placeholder or a question, never a plausible guess.",
    "- No named people and no customer photos. Nothing that is not on the business's own public channels appears in the prototype; stock imagery, if used at all, is labelled as such.",
    `- The concept assumes the entry package: one page, ${start.languages === "me" ? "one language" : "two languages"}, no shop and no online booking system. Show those as a next step if the business clearly needs them; do not design them in.`,
    "- No online payments to Vaky anywhere.",
    "",
    "## Deliver",
    "",
    "The write-up (directions, page plan, headlines, questions, asset list) as one Markdown document, and the prototype as a runnable React project (`npm run dev` shows it, `npm run build` exports it) with a one-line README on how to start it. Keep the write-up short enough to read on a phone — Vaky will paste parts of it into a chat with the client.",
  ];

  return parts.join("\n");
}
