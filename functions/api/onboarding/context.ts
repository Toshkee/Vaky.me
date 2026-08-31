import { hashIp } from "../../../server/onboarding/crypto";
import { hasConfig, type OnboardingEnv } from "../../../server/onboarding/env";
import { LIMITS, withinLimit } from "../../../server/onboarding/guard";
import { clientIp, fail, json, readJson } from "../../../server/onboarding/http";
import { findRequestByToken, markOpened, readRequest } from "../../../server/onboarding/request";
import { findProject, logActivity } from "../../../server/admin/store";
import { isLanguage } from "../../../src/lib/onboarding/schema";

/**
 * What a private onboarding link opens onto.
 *
 * The browser holds a token and nothing else; this is where it learns which
 * package the form should ask about and what Vaky already knows about the
 * business, so the first step arrives pre-filled instead of asking a client
 * to retype what they told us on Instagram last week.
 *
 * The token is the only input and the row is the only authority: the package
 * in the response is whatever Vaky put on the request, and nothing a
 * client sends here or later can change it.
 */

type Body = { token?: unknown; language?: unknown };

export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env)) return fail("server");

  const raw = await readJson(request, 4 * 1024);
  const body = (raw ?? {}) as Body;
  const token = typeof body.token === "string" ? body.token : "";
  if (!token) return fail("bad-request");

  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, clientIp(request));
  if (!(await withinLimit(env.DB, LIMITS.context, identity, Date.now()))) {
    return fail("rate-limit");
  }

  const row = await findRequestByToken(env.DB, token);
  const parsed = row ? readRequest(row) : null;
  if (!parsed || parsed.status === "cancelled") return fail("link");
  if (parsed.status === "completed") return fail("completed");

  const firstOpen = parsed.status === "created";
  const language = isLanguage(body.language) ? body.language : null;
  await markOpened(env.DB, parsed.id, language);
  if (firstOpen) {
    await logActivity(env.DB, { projectId: parsed.projectId }, "onboarding_opened");
  }

  const project = await findProject(env.DB, parsed.projectId);
  /* A link whose project was deleted out from under it is a broken link. */
  if (!project) return fail("link");

  return json({
    packageId: parsed.packageId,
    status: firstOpen ? "opened" : parsed.status,
    language: parsed.language,
    project: {
      businessName: project.business_name,
      contactName: project.contact_name ?? "",
      email: project.email ?? "",
      phone: project.phone ?? "",
      instagram: project.instagram ?? "",
      existingSite: project.existing_site ?? "",
    },
  });
};
