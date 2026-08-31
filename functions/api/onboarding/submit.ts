import {
  answerText,
  briefErrors,
  isLanguage,
  pruneAnswers,
} from "../../../src/lib/onboarding/schema";
import { hashIp } from "../../../server/onboarding/crypto";
import {
  DEFAULT_NOTIFY_FROM,
  DEFAULT_NOTIFY_TO,
  DOWNLOAD_TTL_MS,
  hasConfig,
  type OnboardingEnv,
} from "../../../server/onboarding/env";
import { LIMITS, withinLimit } from "../../../server/onboarding/guard";
import { clientIp, fail, json, readJson } from "../../../server/onboarding/http";
import { renderBrief, sendEmail } from "../../../server/onboarding/notify";
import {
  findRequestByToken,
  markCompleted,
  readRequest,
} from "../../../server/onboarding/request";
import { signDownload } from "../../../server/onboarding/session";
import { listFiles, markNotified, recordSubmission } from "../../../server/onboarding/store";
import {
  linkFilesToProject,
  logActivity,
  markProjectOnboarded,
} from "../../../server/admin/store";

/**
 * Accepts the brief behind a private onboarding link.
 *
 * The token decides everything a client is not allowed to: which submission
 * row this is, which project it belongs to, and — above all — which package
 * the answers are validated against. The body carries answers and a language,
 * nothing more; a hand-crafted POST claiming a different package has nowhere
 * to claim it.
 *
 * The order is the promise the form makes: answers are stored first and the
 * response sent as soon as they are safe. The request is then closed — a sent
 * brief is not an anonymous URL that can be rewritten forever — and VibeLab
 * is told about it off the request, where a mail provider's bad minute
 * cannot turn into "something went wrong" over a brief that was saved.
 */

type Body = {
  token?: unknown;
  language?: unknown;
  answers?: unknown;
};

export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env, waitUntil } = context;
  if (!hasConfig(env)) return fail("server");

  const raw = await readJson(request);
  if (!raw || typeof raw !== "object") return fail("bad-request");
  const body = raw as Body;

  const token = typeof body.token === "string" ? body.token : "";
  if (!token) return fail("bad-request");
  if (!isLanguage(body.language)) return fail("bad-request");
  const language = body.language;

  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, clientIp(request));
  if (!(await withinLimit(env.DB, LIMITS.submit, identity, Date.now()))) {
    return fail("rate-limit");
  }

  const row = await findRequestByToken(env.DB, token);
  const parsed = row ? readRequest(row) : null;
  if (!parsed || parsed.status === "cancelled") return fail("link");
  if (parsed.status === "completed") return fail("completed");

  const packageId = parsed.packageId;
  const answers = pruneAnswers(packageId, body.answers);
  const errors = briefErrors(packageId, answers);
  if (Object.keys(errors).length > 0) return fail("answers", errors);

  const submissionId = parsed.id;

  try {
    await recordSubmission(env.DB, {
      id: submissionId,
      packageId,
      packageSource: "link",
      language,
      answers,
      requestId: parsed.id,
      projectId: parsed.projectId,
    });
    await markCompleted(env.DB, parsed.id, language);
    await markProjectOnboarded(env.DB, parsed.projectId);
    await linkFilesToProject(env.DB, submissionId, parsed.projectId);
  } catch {
    return fail("server");
  }
  await logActivity(
    env.DB,
    { projectId: parsed.projectId },
    "onboarding_completed",
    answerText(answers, "businessName"),
  );

  const origin = env.ONBOARDING_SITE_URL ?? new URL(request.url).origin;
  const submittedAt = new Date().toISOString().replace("T", " ").slice(0, 16);
  const projectId = parsed.projectId;

  waitUntil(
    (async () => {
      let problem: string | null = null;
      try {
        const files = await listFiles(env.DB, submissionId);
        const expiresAt = Date.now() + DOWNLOAD_TTL_MS;
        const downloadUrls = await Promise.all(
          files.map((file) =>
            signDownload(env.ONBOARDING_TOKEN_SECRET, origin, file.id, expiresAt),
          ),
        );

        const brief = renderBrief({
          submissionId,
          packageId,
          packageSource: "link",
          language,
          answers,
          files,
          downloadUrls,
          submittedAt,
          dashboardUrl: `${origin}/admin/?v=projekat&id=${projectId}`,
        });

        problem = env.RESEND_API_KEY
          ? await sendEmail(
              env.RESEND_API_KEY,
              env.ONBOARDING_NOTIFY_FROM ?? DEFAULT_NOTIFY_FROM,
              env.ONBOARDING_NOTIFY_TO ?? DEFAULT_NOTIFY_TO,
              answerText(answers, "email"),
              brief,
            )
          : "no mail provider configured";
      } catch {
        problem = "notification failed";
      }

      /* The note goes on the row either way, so a brief nobody was told about
         is visible as such rather than silently unread. */
      try {
        await markNotified(env.DB, submissionId, problem);
      } catch {
        // The brief is stored. There is nothing further to salvage here.
      }
    })(),
  );

  return json({ submissionId });
};
