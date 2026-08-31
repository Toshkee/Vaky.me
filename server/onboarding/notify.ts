/* Explicit `/index`, not the directory: esbuild resolves a directory import
   and Node does not, and a path that only one of the two can follow is a
   dependency on the bundler nobody would think to check. */
import { dictionaries } from "../../src/i18n/index";
import { onboardingCopy } from "../../src/i18n/onboarding/index";
import { priceLabel } from "../../src/lib/packages";
import { LEAD_NEED_LABELS, isLeadNeed } from "../../src/lib/workflow";
import {
  PACKAGE_PLAN_INDEX,
  answerList,
  answerText,
  visibleQuestions,
  visibleSteps,
  type Answers,
  type Language,
  type PackageId,
  type PackageSource,
} from "../../src/lib/onboarding/schema";
import type { FileRow } from "./store";

/**
 * The two emails this system sends Vaky — a completed brief and a new
 * lead — in the site's own clothes.
 *
 * A brief is written in the language the client answered in, using the same
 * labels they saw; reading it back in a different language is how a nuance
 * gets lost between "I'm not sure" and "no". A lead email is for the studio
 * and stays Montenegrin.
 *
 * Either email is a copy, not the record. The row in D1 is the record, and it
 * is written and committed before any of this is attempted.
 */

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function megabytes(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

type Line = { label: string; value: string };
type Section = { title: string; lines: Line[] };

/* -- The shared shell ---------------------------------------------------
   A mail client is not a browser: no stylesheet, no web font, no clip-path,
   and Outlook still lays out with tables. So the site's window is rebuilt
   from the parts that survive - the paper ground, the ink rules, the one
   red, the chrome bar with its three lights, and section headings under a
   hard rule. Everything is inline, every colour is a hex, and the whole
   thing still reads as a document if a client strips the styling. */

const PAPER = "#faf8f4";
const PAPER_2 = "#f0ede7";
const GROUND = "#e9e5dd";
const INK = "#101010";
const MUTED = "#5c5c58";
const LINE = "#cfcdc6";
const RED = "#c1121f";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

const rows = (lines: Line[]) =>
  lines
    .map(
      (line) =>
        `<tr>
           <td style="padding:7px 16px 7px 0;vertical-align:top;width:38%;font:400 14px/1.5 ${FONT};color:${MUTED}">${escape(line.label)}</td>
           <td style="padding:7px 0;vertical-align:top;font:400 15px/1.55 ${FONT};color:${INK};white-space:pre-line">${escape(line.value)}</td>
         </tr>`,
    )
    .join("");

const heading = (text: string) =>
  `<tr><td style="padding:26px 0 8px"><div style="font:700 15px/1.3 ${FONT};letter-spacing:-.01em;color:${INK};border-bottom:2px solid ${INK};padding-bottom:6px">${escape(text)}</div></td></tr>`;

/* The window's title bar: three lights and the OS name, the motif the whole
   site is framed in. Squares as table cells, because that is the only shape
   every mail client agrees on. */
const light = (colour: string) =>
  `<td style="width:7px;padding:0 4px 0 0"><div style="width:7px;height:7px;background:${colour};font-size:0;line-height:0">&nbsp;</div></td>`;

function shell(input: {
  lang: string;
  subject: string;
  titleBar: string;
  inner: string;
  footNote: string;
}): string {
  return `<!doctype html>
<html lang="${input.lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(input.subject)}</title></head>
<body style="margin:0;padding:0;background:${GROUND};-webkit-font-smoothing:antialiased">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;background:${GROUND}">
  <tr><td align="center" style="padding:28px 16px">

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;border-collapse:collapse;border:2px solid ${INK};background:${PAPER}">

      <tr><td style="padding:9px 12px;background:${PAPER_2};border-bottom:2px solid ${INK}">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
          <tr>${light(RED)}${light("#d9a441")}${light("#2e7d44")}
            <td style="padding-left:8px;font:700 12px/1 ${FONT};letter-spacing:.16em;text-transform:uppercase;color:${MUTED}">${escape(input.titleBar)}</td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="padding:26px 26px 30px">${input.inner}</td></tr>

      <tr><td style="padding:14px 26px;background:${PAPER_2};border-top:2px solid ${INK}">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">
          <tr>
            <td style="font:700 14px/1.4 ${FONT};color:${INK};letter-spacing:-.01em">Vaky<span style="color:${RED}">.</span></td>
            <td style="text-align:right;font:400 12px/1.4 ${FONT};color:${MUTED}">
              <a href="https://vaky.me" style="color:${MUTED};text-decoration:none">vaky.me</a>
            </td>
          </tr>
        </table>
      </td></tr>

    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;border-collapse:collapse">
      <tr><td style="padding:14px 2px 0;font:400 12px/1.5 ${FONT};color:${MUTED}">
        ${escape(input.footNote)}
      </td></tr>
    </table>

  </td></tr>
</table>
</body></html>`;
}

const contactLine = (name: string, email: string, phone: string) =>
  `<p style="margin:0;font:400 15px/1.6 ${FONT};color:${MUTED}">
     ${escape(name)}${email ? ` &middot; <a href="mailto:${escape(email)}" style="color:${RED};text-decoration:underline">${escape(email)}</a>` : ""}${phone ? ` &middot; <a href="tel:${escape(phone.replace(/[^\d+]/g, ""))}" style="color:${RED};text-decoration:underline">${escape(phone)}</a>` : ""}
   </p>`;

const dashboardLine = (url: string) =>
  `<p style="margin:14px 0 0;font:600 14px/1.5 ${FONT}">
     <a href="${escape(url)}" style="color:${RED};text-decoration:underline">Otvori u dashboardu &rarr;</a>
   </p>`;

/* ── The completed brief ────────────────────────────────────────────── */

export type BriefInput = {
  submissionId: string;
  packageId: PackageId;
  packageSource: PackageSource;
  language: Language;
  answers: Answers;
  files: FileRow[];
  /** Signed, expiring download links, one per file, in the same order. */
  downloadUrls: string[];
  submittedAt: string;
  /** Deep link into /admin for this project; null for briefs with no project
   *  (the public-form era rows). */
  dashboardUrl: string | null;
};

/**
 * Turns the stored answers back into readable lines.
 *
 * Only the questions this package and these answers actually put on screen are
 * walked, so a brief never shows a booking question to a client who does not
 * take bookings — the same rule the form itself used, applied to the output.
 */
function sections(input: BriefInput): Section[] {
  const copy = onboardingCopy[input.language];
  const out: Section[] = [];

  for (const step of visibleSteps(input.packageId, input.answers)) {
    const lines: Line[] = [];

    for (const question of visibleQuestions(step, input.packageId, input.answers)) {
      if (question.kind === "files") continue;
      const words = copy.questions[question.id];

      if (question.kind === "single") {
        const value = answerText(input.answers, question.id);
        if (value) lines.push({ label: words.label, value: words.options?.[value] ?? value });
        continue;
      }

      if (question.kind === "multi") {
        const values = answerList(input.answers, question.id);
        if (values.length) {
          lines.push({
            label: words.label,
            value: values.map((value) => words.options?.[value] ?? value).join(", "),
          });
        }
        continue;
      }

      if (question.kind === "urls") {
        const values = answerList(input.answers, question.id).filter(Boolean);
        if (values.length) lines.push({ label: words.label, value: values.join("\n") });
        continue;
      }

      const value = answerText(input.answers, question.id);
      if (value) lines.push({ label: words.label, value });
    }

    if (lines.length) out.push({ title: copy.steps[step.id].title, lines });
  }

  return out;
}

function header(input: BriefInput): Line[] {
  const plan = dictionaries[input.language].pricing.plans[PACKAGE_PLAN_INDEX[input.packageId]];
  const source = {
    link: "iz linka",
    client: "klijent izabrao",
    unsure: "klijent nije siguran",
  }[input.packageSource];

  return [
    {
      label: "Paket",
      value: `${plan.name} — ${priceLabel(input.packageId, input.language)} (${source})`,
    },
    { label: "Jezik", value: input.language === "me" ? "Crnogorski" : "English" },
    { label: "Poslato", value: input.submittedAt },
    { label: "ID projekta", value: input.submissionId },
  ];
}

export function renderBrief(input: BriefInput): { subject: string; html: string; text: string } {
  const business = answerText(input.answers, "businessName") || "—";
  const contact = answerText(input.answers, "contactName");
  const email = answerText(input.answers, "email");
  const phone = answerText(input.answers, "phone");

  const subject = `New Vaky Client Brief — ${business}`;
  const meta = header(input);
  const body = sections(input);

  const textParts = [
    "Vaky — novi brief",
    "",
    `${business}`,
    `${contact} · ${email} · ${phone}`,
    "",
    ...meta.map((line) => `${line.label}: ${line.value}`),
  ];
  if (input.dashboardUrl) textParts.push(`Dashboard: ${input.dashboardUrl}`);

  for (const section of body) {
    textParts.push("", `— ${section.title} —`);
    for (const line of section.lines) textParts.push(`${line.label}\n  ${line.value}`);
  }

  textParts.push("", `— Poslati fajlovi (${input.files.length}) —`);
  if (input.files.length === 0) {
    textParts.push("Klijent nije poslao nijedan fajl.");
  } else {
    input.files.forEach((file, index) => {
      textParts.push(
        `${file.original_name} · ${megabytes(file.size_bytes)} · ${file.folder}\n  ${input.downloadUrls[index] ?? ""}`,
      );
    });
  }

  const fileRows =
    input.files.length === 0
      ? `<p style="margin:0;font:400 14px/1.55 ${FONT};color:${MUTED}">Klijent nije poslao nijedan fajl.</p>`
      : `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">${input.files
          .map(
            (file, index) =>
              `<tr>
                 <td style="padding:7px 16px 7px 0;vertical-align:top;font:600 15px/1.5 ${FONT}">
                   <a href="${escape(input.downloadUrls[index] ?? "#")}" style="color:${RED};text-decoration:underline">${escape(file.original_name)}</a>
                 </td>
                 <td style="padding:7px 0;vertical-align:top;text-align:right;white-space:nowrap;font:400 13px/1.5 ${FONT};color:${MUTED}">${escape(file.folder)} &middot; ${megabytes(file.size_bytes)}</td>
               </tr>`,
          )
          .join("")}</table>
         <p style="margin:12px 0 0;font:400 12px/1.5 ${FONT};color:${MUTED}">Linkovi va&#382;e 30 dana.</p>`;

  const inner = `
        <div style="font:700 11px/1.4 ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${RED}">Novi brief</div>
        <h1 style="margin:8px 0 6px;font:700 26px/1.15 ${FONT};letter-spacing:-.02em;color:${INK}">${escape(business)}</h1>
        ${contactLine(contact, email, phone)}
        ${input.dashboardUrl ? dashboardLine(input.dashboardUrl) : ""}

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;margin-top:20px;border-top:2px solid ${INK};border-bottom:1px solid ${LINE}">
          ${rows(meta)}
        </table>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">
          ${body
            .map(
              (section) =>
                `${heading(section.title)}<tr><td><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">${rows(section.lines)}</table></td></tr>`,
            )
            .join("")}
          ${heading(`Poslati fajlovi (${input.files.length})`)}
          <tr><td style="padding-top:2px">${fileRows}</td></tr>
        </table>`;

  const html = shell({
    lang: input.language === "en" ? "en" : "sr-ME",
    subject,
    titleBar: "Vaky OS — novi projekat",
    inner,
    footNote: "Stiglo sa privatnog onboarding linka. Odgovor na ovaj mejl ide pravo klijentu.",
  });

  return { subject, html, text: textParts.join("\n") };
}

/* ── A new lead ─────────────────────────────────────────────────────── */

export type LeadInput = {
  leadId: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  link: string;
  need: string;
  message: string;
  language: Language;
  submittedAt: string;
  dashboardUrl: string;
};

export function renderLead(input: LeadInput): { subject: string; html: string; text: string } {
  const who = input.businessName || input.name || "—";
  const subject = `New Vaky Lead — ${who}`;

  const meta: Line[] = [
    { label: "Šta traži", value: isLeadNeed(input.need) ? LEAD_NEED_LABELS[input.need] : "—" },
    { label: "Instagram / sajt", value: input.link || "—" },
    { label: "Jezik forme", value: input.language === "me" ? "Crnogorski" : "English" },
    { label: "Stiglo", value: input.submittedAt },
    { label: "ID upita", value: input.leadId },
  ];

  const textParts = [
    "Vaky — novi upit",
    "",
    who,
    `${input.name} · ${input.email}${input.phone ? ` · ${input.phone}` : ""}`,
    "",
    ...meta.map((line) => `${line.label}: ${line.value}`),
    `Dashboard: ${input.dashboardUrl}`,
  ];
  if (input.message) textParts.push("", "— Poruka —", input.message);

  const inner = `
        <div style="font:700 11px/1.4 ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${RED}">Novi upit</div>
        <h1 style="margin:8px 0 6px;font:700 26px/1.15 ${FONT};letter-spacing:-.02em;color:${INK}">${escape(who)}</h1>
        ${contactLine(input.name, input.email, input.phone)}
        ${dashboardLine(input.dashboardUrl)}

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;margin-top:20px;border-top:2px solid ${INK};border-bottom:1px solid ${LINE}">
          ${rows(meta)}
        </table>

        ${
          input.message
            ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">
                 ${heading("Poruka")}
                 <tr><td style="padding-top:4px;font:400 15px/1.6 ${FONT};color:${INK};white-space:pre-line">${escape(input.message)}</td></tr>
               </table>`
            : ""
        }`;

  const html = shell({
    lang: "sr-ME",
    subject,
    titleBar: "Vaky OS — novi upit",
    inner,
    footNote: "Stiglo sa forme za ponudu na sajtu. Odgovor na ovaj mejl ide pravo osobi koja je pisala.",
  });

  return { subject, html, text: textParts.join("\n") };
}

/**
 * Sends one email, and says whether it worked.
 *
 * Never throws: the caller has already stored the row, and the only useful
 * outcome here is a note on it saying whether Vaky was told.
 */
export async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  replyTo: string,
  mail: { subject: string; html: string; text: string },
): Promise<string | null> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (response.ok) return null;

    /* The status alone sends whoever reads the dashboard to the provider's
       docs; the body says which of a dozen things went wrong — an unverified
       sending domain, a recipient the plan may not write to, a revoked key.
       Trimmed, because this lands in a database column and then on screen. */
    const detail = await response.text().catch(() => "");
    const reason = detail.slice(0, 200).replace(/\s+/g, " ").trim();
    return reason ? `resend ${response.status}: ${reason}` : `resend ${response.status}`;
  } catch {
    return "resend unreachable";
  }
}
