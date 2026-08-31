import type { OnboardingEnv } from "../../../server/onboarding/env";
import { safeName } from "../../../server/onboarding/files";
import { fail, json } from "../../../server/onboarding/http";
import { deleteFile, findFile } from "../../../server/onboarding/store";

/**
 * One stored file, for the person with the admin cookie.
 *
 * The signed 30-day links in notification emails stay what they are; this
 * route is the dashboard's own door to the same objects — no signature
 * ceremony, because the cookie already answers "who is asking".
 *
 * Same discipline as the public download: always an attachment, never a
 * render. A client's upload must not become a page on this origin just
 * because an admin is the one clicking.
 */
export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  const { env, request } = context;
  const fileId = new URL(request.url).searchParams.get("id") ?? "";

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

/** Removes one file for good — storage first, then the row, same order as the
 *  client's own delete: an object with no row is unfindable, a row with no
 *  object is merely stale. */
export const onRequestDelete: PagesFunction<OnboardingEnv> = async (context) => {
  const { env, request } = context;
  const fileId = new URL(request.url).searchParams.get("id") ?? "";

  const row = await findFile(env.DB, fileId);
  if (!row) return fail("bad-request");

  try {
    await env.UPLOADS.delete(row.storage_key);
    await deleteFile(env.DB, fileId, row.submission_id);
  } catch {
    return fail("server");
  }

  return json({ id: fileId });
};
