import { isValidEmail, isValidPhone } from "../../src/lib/onboarding/schema";
import { isLeadNeed } from "../../src/lib/workflow";
import { hashIp } from "../../server/onboarding/crypto";
import {
  DEFAULT_NOTIFY_FROM,
  DEFAULT_NOTIFY_TO,
  hasConfig,
  type OnboardingEnv,
} from "../../server/onboarding/env";
import { LIMITS, passesChallenge, withinLimit } from "../../server/onboarding/guard";
import { clientIp, fail, json, readJson } from "../../server/onboarding/http";
import { renderLead, sendEmail } from "../../server/onboarding/notify";
import { logActivity, markLeadNotified, recordLead } from "../../server/admin/store";

/**
 * The public "Zatraži ponudu" form — the one thing a stranger can send.
 *
 * A lead is stored first and VibeLab is emailed after, off the request, the
 * same contract the brief endpoint keeps: the database is the record, the
 * inbox is a courtesy, and a mail provider's bad minute never turns into
 * "something went wrong" over an enquiry that was in fact saved.
 *
 * Three layers stand in front of it: the edge rate-limit rule, the honeypot
 * (a hidden field only software fills — a hit is answered with a cheerful 200
 * and stored nowhere, because telling a bot it was caught is telling it what
 * to fix), and Turnstile when configured.
 */

type Body = {
  name?: unknown;
  businessName?: unknown;
  email?: unknown;
  phone?: unknown;
  link?: unknown;
  need?: unknown;
  message?: unknown;
  language?: unknown;
  challenge?: unknown;
  /** The honeypot. Named to look like a real field to a form-filler. */
  website?: unknown;
};

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env, waitUntil } = context;
  if (!hasConfig(env)) return fail("server");

  const raw = await readJson(request, 16 * 1024);
  if (!raw || typeof raw !== "object") return fail("bad-request");
  const body = raw as Body;

  if (text(body.website, 10)) return json({ ok: true });

  const name = text(body.name, 120);
  const email = text(body.email, 160);
  const phone = text(body.phone, 40);
  if (!name || !isValidEmail(email)) return fail("bad-request");
  if (phone && !isValidPhone(phone)) return fail("bad-request");

  const ip = clientIp(request);
  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, ip);
  if (!(await withinLimit(env.DB, LIMITS.lead, identity, Date.now()))) {
    return fail("rate-limit");
  }

  const challenge = typeof body.challenge === "string" ? body.challenge : "";
  if (!(await passesChallenge(env, challenge, ip))) return fail("challenge");

  const lead = {
    id: crypto.randomUUID(),
    name,
    businessName: text(body.businessName, 160),
    email,
    phone,
    link: text(body.link, 300),
    need: isLeadNeed(body.need) ? body.need : "",
    message: text(body.message, 2000),
    language: body.language === "en" ? "en" : "me",
  };

  try {
    await recordLead(env.DB, lead);
  } catch {
    return fail("server");
  }
  await logActivity(env.DB, { leadId: lead.id }, "lead_submitted", lead.businessName || lead.name);

  const origin = env.ONBOARDING_SITE_URL ?? new URL(request.url).origin;
  waitUntil(
    (async () => {
      let problem: string | null = null;
      try {
        problem = env.RESEND_API_KEY
          ? await sendEmail(
              env.RESEND_API_KEY,
              env.ONBOARDING_NOTIFY_FROM ?? DEFAULT_NOTIFY_FROM,
              env.ONBOARDING_NOTIFY_TO ?? DEFAULT_NOTIFY_TO,
              lead.email,
              renderLead({
                leadId: lead.id,
                name: lead.name,
                businessName: lead.businessName,
                email: lead.email,
                phone: lead.phone,
                link: lead.link,
                need: lead.need,
                message: lead.message,
                language: lead.language === "en" ? "en" : "me",
                submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
                dashboardUrl: `${origin}/admin/?v=upiti&id=${lead.id}`,
              }),
            )
          : "no mail provider configured";
      } catch {
        problem = "notification failed";
      }

      try {
        await markLeadNotified(env.DB, lead.id, problem);
      } catch {
        // The lead is stored. Nothing further to salvage.
      }
    })(),
  );

  return json({ ok: true });
};
