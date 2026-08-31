import { findProject, listProjectFiles, logActivity, recordAdminFile } from "../../../../../server/admin/store";
import type { OnboardingEnv } from "../../../../../server/onboarding/env";
import { checkFile, safeName, storageKey, tidyName } from "../../../../../server/onboarding/files";
import { fail, json } from "../../../../../server/onboarding/http";
import {
  allowedTypeFor,
  isFileZone,
  maxBytesFor,
} from "../../../../../src/lib/onboarding/schema";

export const onRequestGet: PagesFunction<OnboardingEnv> = async (context) => {
  const projectId = String(context.params.id ?? "");
  try {
    if (!(await findProject(context.env.DB, projectId))) return fail("bad-request");
    return json({ files: await listProjectFiles(context.env.DB, projectId) });
  } catch {
    return fail("server");
  }
};

/**
 * Adds one file by hand — same raw-body shape and the same four gates as the
 * client's upload endpoint, because the admin cookie changes who may write,
 * not what is safe to store. What it skips is the client-side ceremony: no
 * upload token, no per-submission quota (the studio is trusted not to flood
 * its own bucket), no rate limiter.
 */
export const onRequestPost: PagesFunction<OnboardingEnv> = async (context) => {
  const { request, env } = context;
  const projectId = String(context.params.id ?? "");

  const project = await findProject(env.DB, projectId);
  if (!project) return fail("bad-request");

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

  const blob = await request.blob();
  if (blob.size <= 0 || blob.size > maxBytesFor(type)) return fail("file-size");

  const head = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
  const check = checkFile(name, blob.size, zone, head);
  if (!check.ok) return fail(check.reason);

  const fileId = crypto.randomUUID();
  const key = storageKey(projectId, check.folder, fileId, name);

  try {
    await env.UPLOADS.put(key, blob, {
      httpMetadata: {
        contentType: check.type.mime,
        contentDisposition: `attachment; filename="${safeName(name)}"`,
      },
      customMetadata: { projectId, zone, originalName: name, source: "admin" },
    });
    await recordAdminFile(env.DB, {
      id: fileId,
      projectId,
      zone,
      folder: check.folder,
      originalName: name,
      storageKey: key,
      contentType: check.type.mime,
      sizeBytes: blob.size,
    });
  } catch {
    return fail("server");
  }
  await logActivity(env.DB, { projectId }, "file_added", name);

  return json({ id: fileId, name, size: blob.size, zone });
};
