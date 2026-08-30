import {
  UPLOAD_LIMITS,
  allowedTypeFor,
  isFileZone,
  maxBytesFor,
} from "../../../src/lib/onboarding/schema";
import { hashIp } from "../../../server/onboarding/crypto";
import { hasConfig, type OnboardingEnv } from "../../../server/onboarding/env";
import { LIMITS, withinLimit } from "../../../server/onboarding/guard";
import { checkFile, safeName, storageKey, tidyName } from "../../../server/onboarding/files";
import { bearer, clientIp, fail, json } from "../../../server/onboarding/http";
import { readSession } from "../../../server/onboarding/session";
import { deleteFile, fileTotals, findFile, recordFile } from "../../../server/onboarding/store";

/**
 * Takes one file, as the raw request body.
 *
 * Not a multipart form, deliberately. Parsing multipart is real CPU work
 * against a Worker's budget where copying a body into storage is not, and a
 * raw body carries an honest `Content-Length` — which is what lets an
 * oversized upload be refused before a byte of it has been read. The filename
 * and the zone travel in the query string.
 *
 * Four gates, in the order that costs least: the token, then the declared size,
 * then what the submission already holds, and only then the bytes themselves.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env)) return fail("server");

  const session = await readSession(env.ONBOARDING_TOKEN_SECRET, bearer(request), Date.now());
  if (!session) return fail("session");

  const query = new URL(request.url).searchParams;
  const zone = query.get("zone");
  if (!isFileZone(zone)) return fail("bad-request");

  const name = tidyName(query.get("name") ?? "");
  if (!name) return fail("bad-request");

  const type = allowedTypeFor(name);
  if (!type) return fail("file-type");

  const declared = Number(request.headers.get("Content-Length"));
  if (!Number.isFinite(declared) || declared <= 0) return fail("bad-request");
  if (declared > maxBytesFor(type)) return fail("file-size");

  const identity = await hashIp(env.ONBOARDING_TOKEN_SECRET, clientIp(request));
  if (!(await withinLimit(env.DB, LIMITS.upload, identity, Date.now()))) {
    return fail("rate-limit");
  }

  const totals = await fileTotals(env.DB, session.submissionId);
  if (totals.count >= UPLOAD_LIMITS.maxFiles) return fail("file-count");
  if (totals.bytes + declared > UPLOAD_LIMITS.maxBytesTotal) return fail("file-total");

  const blob = await request.blob();
  if (blob.size <= 0 || blob.size > maxBytesFor(type)) return fail("file-size");

  /* Sixteen bytes, not the whole file: enough to tell a JPEG from something
     that merely ends in .jpg, and it leaves a 30 MB video where it is. */
  const head = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
  const check = checkFile(name, blob.size, zone, head);
  if (!check.ok) return fail(check.reason);

  const fileId = crypto.randomUUID();
  const key = storageKey(session.submissionId, check.folder, fileId, name);

  try {
    await env.UPLOADS.put(key, blob, {
      httpMetadata: {
        contentType: check.type.mime,
        /* Stored on the object, so the file is a download wherever it is
           fetched from — including straight out of the R2 dashboard. */
        contentDisposition: `attachment; filename="${safeName(name)}"`,
      },
      customMetadata: {
        submissionId: session.submissionId,
        zone,
        originalName: name,
      },
    });

    await recordFile(env.DB, {
      id: fileId,
      submission_id: session.submissionId,
      zone,
      folder: check.folder,
      original_name: name,
      storage_key: key,
      content_type: check.type.mime,
      size_bytes: blob.size,
    });
  } catch {
    return fail("server");
  }

  return json({ id: fileId, name, size: blob.size, zone });
};

/**
 * Takes a file back off, when the client removes it from the list.
 *
 * The token decides whose file this is: a row is only deletable if its
 * submission is the one the caller's token names. Storage first, then the row —
 * an object left behind with no row would never be found again, where a row
 * whose object is already gone is merely stale.
 */
export const onRequestDelete: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  if (!hasConfig(env)) return fail("server");

  const session = await readSession(env.ONBOARDING_TOKEN_SECRET, bearer(request), Date.now());
  if (!session) return fail("session");

  const fileId = new URL(request.url).searchParams.get("id") ?? "";
  const row = await findFile(env.DB, fileId);
  if (!row || row.submission_id !== session.submissionId) return fail("bad-request");

  try {
    await env.UPLOADS.delete(row.storage_key);
    await deleteFile(env.DB, fileId, session.submissionId);
  } catch {
    return fail("server");
  }

  return json({ id: fileId });
};
