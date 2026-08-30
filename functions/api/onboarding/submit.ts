import {
  answerText,
  briefErrors,
  isLanguage,
  isPackageId,
  isPackageSource,
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
import { LIMITS, passesChallenge, withinLimit } from "../../../server/onboarding/guard";
import { bearer, clientIp, fail, json, readJson } from "../../../server/onboarding/http";
import { renderBrief, sendBrief } from "../../../server/onboarding/notify";
import { readSession, signDownload } from "../../../server/onboarding/session";
import { listFiles, markNotified, recordSubmission } from "../../../server/onboarding/store";

/**
 * Accepts the brief.
 *
 * The order here is the promise the form makes to the client: the answers are
 * stored first, and the response is sent as soon as they are safe. Telling
 * VibeLab about it happens afterwards, off the request, because a mail
 * provider having a bad minute must never turn into a paying client seeing
 * "something went wrong" over a brief that was in fact saved.
 *
 * Everything the browser sends is re-checked here against the same schema the
 * form was built from — a submission is not trusted because it looks like one
 * the form could have produced.
 */
type Body = {
  challenge?: unknown;
  packageId?: unknown;
  packageSource?: unknown;
  language?: unknown;
  answers?: unknown;
};

export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env, waitUntil } = context;
  if (!hasConfig(env)) return fail("server");

  const raw = await readJson(request);
  if (!raw || typeof raw !== "object") return fail("bad-request");
  const body = raw as Body;

  if (!isPackageId(body.packageId)) return fail("bad-request");
  if (!isLanguage(body.language)) return fail("bad-request");
  if (!isPackageSource(body.packageSource)) return fail("bad-request");

  const ip = clientIp(request);
  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, ip);
  if (!(await withinLimit(env.DB, LIMITS.submit, identity, Date.now()))) {
    return fail("rate-limit");
  }

  /* A client who uploaded something already passed the bot check when their
     session was opened. One who uploaded nothing has no session, and proves it
     here instead. */
  const session = await readSession(env.ONBOARDING_TOKEN_SECRET, bearer(request), Date.now());
  if (!session) {
    const challenge = typeof body.challenge === "string" ? body.challenge : "";
    if (!(await passesChallenge(env, challenge, ip))) return fail("challenge");
  }

  const answers = pruneAnswers(body.packageId, body.answers);
  const errors = briefErrors(body.packageId, answers);
  if (Object.keys(errors).length > 0) return fail("answers", errors);

  const submissionId = session?.submissionId ?? crypto.randomUUID();

  try {
    await recordSubmission(env.DB, {
      id: submissionId,
      packageId: body.packageId,
      packageSource: body.packageSource,
      language: body.language,
      answers,
    });
  } catch {
    return fail("server");
  }

  const packageId = body.packageId;
  const language = body.language;
  const packageSource = body.packageSource;
  const origin = env.ONBOARDING_SITE_URL ?? new URL(request.url).origin;
  const submittedAt = new Date().toISOString().replace("T", " ").slice(0, 16);

  waitUntil(
    (async () => {
      let problem: string | null = null;
      try {
        const files = session ? await listFiles(env.DB, submissionId) : [];
        const expiresAt = Date.now() + DOWNLOAD_TTL_MS;
        const downloadUrls = await Promise.all(
          files.map((file) =>
            signDownload(env.ONBOARDING_TOKEN_SECRET, origin, file.id, expiresAt),
          ),
        );

        const brief = renderBrief({
          submissionId,
          packageId,
          packageSource,
          language,
          answers,
          files,
          downloadUrls,
          submittedAt,
        });

        problem = env.RESEND_API_KEY
          ? await sendBrief(
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
