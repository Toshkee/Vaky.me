import { hasConfig, type OnboardingEnv } from "../../../server/onboarding/env";
import { safeName } from "../../../server/onboarding/files";
import { fail } from "../../../server/onboarding/http";
import { checkDownload } from "../../../server/onboarding/session";
import { findFile } from "../../../server/onboarding/store";

/**
 * Hands one uploaded file back, to whoever holds a signed link for it.
 *
 * The bucket is private and there is no admin login on this site, so the link
 * itself is the credential: it names one file, it is signed with the studio's
 * own secret, it expires, and it only ever exists inside the notification email
 * sent to Vaky. That is a smaller thing to get right than an authentication
 * system a studio of this size would have to maintain.
 *
 * Always a download, never a render: `attachment` on the way in and again on
 * the way out, and `nosniff` from the middleware. Nothing a client uploads can
 * become a page on this origin.
 */
export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env)) return fail("server");

  const query = new URL(request.url).searchParams;
  const fileId = query.get("id") ?? "";
  const expiry = query.get("e") ?? "";
  const signature = query.get("s") ?? "";

  const valid = await checkDownload(
    env.ONBOARDING_TOKEN_SECRET,
    fileId,
    expiry,
    signature,
    Date.now(),
  );
  if (!valid) return fail("session");

  const row = await findFile(env.DB, fileId);
  if (!row) return fail("bad-request");

  const object = await env.UPLOADS.get(row.storage_key);
  if (!object) return fail("bad-request");

  return new Response(object.body, {
    headers: {
      "Content-Type": row.content_type,
      "Content-Length": String(row.size_bytes),
      "Content-Disposition": `attachment; filename="${safeName(row.original_name)}"`,
    },
  });
};
