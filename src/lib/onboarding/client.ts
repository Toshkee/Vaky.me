import type {
  Answers,
  ApiErrorCode,
  FieldErrors,
  FileZone,
  Language,
  PackageId,
} from "./schema";
import type { Session, UploadedFile } from "./draft";

/**
 * The calls the browser makes, and nothing else.
 *
 * Every one of them starts from the link token — the only credential a client
 * holds — and every failure comes back as a code rather than a sentence: the
 * server has no idea which language this client chose, and a brief in
 * Montenegrin that fails in English is a bug the client sees. `ApiErrorCode`
 * is the shared vocabulary; the words for it live in `src/i18n/onboarding/`.
 */

const BASE = "/api/onboarding";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: ApiErrorCode; fields?: FieldErrors };

type ErrorBody = { error?: unknown; fields?: unknown };

const API_CODES: readonly ApiErrorCode[] = [
  "bad-request",
  "session",
  "rate-limit",
  "challenge",
  "link",
  "completed",
  "file-type",
  "file-size",
  "file-count",
  "file-total",
  "answers",
  "server",
];

function toCode(value: unknown): ApiErrorCode {
  return typeof value === "string" && (API_CODES as readonly string[]).includes(value)
    ? (value as ApiErrorCode)
    : "server";
}

async function readError(response: Response): Promise<{ code: ApiErrorCode; fields?: FieldErrors }> {
  try {
    const body = (await response.json()) as ErrorBody;
    const code = toCode(body.error);
    const fields =
      body.fields && typeof body.fields === "object" && !Array.isArray(body.fields)
        ? (body.fields as FieldErrors)
        : undefined;
    return { code, fields };
  } catch {
    return { code: response.status === 429 ? "rate-limit" : "server" };
  }
}

/** What a private link resolves to: the package the form should ask about,
 *  and what Vaky already knows, so step one arrives pre-filled. */
export type LinkContext = {
  packageId: PackageId;
  status: string;
  language: Language | null;
  project: {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    instagram: string;
    existingSite: string;
  };
};

export async function fetchContext(token: string): Promise<ApiResult<LinkContext>> {
  try {
    const response = await fetch(`${BASE}/context`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) return { ok: false, ...(await readError(response)) };
    const data = (await response.json()) as LinkContext;
    return { ok: true, data };
  } catch {
    return { ok: false, code: "server" };
  }
}

/**
 * Trades the link token for the token that authorises uploading. The
 * submission id comes back signed rather than chosen, so a client can only
 * ever write files under the one brief their link names. Nothing is stored in
 * the database yet — the row is created when the brief is actually sent.
 */
export async function createSession(token: string): Promise<ApiResult<Session>> {
  try {
    const response = await fetch(`${BASE}/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) return { ok: false, ...(await readError(response)) };
    const data = (await response.json()) as Session;
    return { ok: true, data };
  } catch {
    return { ok: false, code: "server" };
  }
}

export type UploadHandle = {
  done: Promise<ApiResult<UploadedFile>>;
  cancel: () => void;
};

/**
 * Sends one file as the raw request body — not as a multipart form.
 *
 * Two reasons, both of which matter on Cloudflare's free tier. Parsing a
 * multipart body is real CPU work against a 10 ms budget, where copying a body
 * straight into storage is not; and a raw body carries an honest
 * `Content-Length`, which lets the server refuse something oversized before it
 * has read a byte of it.
 *
 * XHR rather than fetch, because fetch still cannot report upload progress, and
 * a client on a phone watching a 20 MB video upload needs to see it move.
 */
export function uploadFile(
  session: Session,
  zone: FileZone,
  file: File,
  onProgress: (fraction: number) => void,
): UploadHandle {
  const xhr = new XMLHttpRequest();

  const done = new Promise<ApiResult<UploadedFile>>((resolve) => {
    const query = new URLSearchParams({ zone, name: file.name });
    xhr.open("POST", `${BASE}/upload?${query}`);
    xhr.setRequestHeader("Authorization", `Bearer ${session.token}`);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.responseType = "json";

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    });

    xhr.addEventListener("load", () => {
      const body: unknown = xhr.response;
      if (xhr.status >= 200 && xhr.status < 300 && body && typeof body === "object") {
        resolve({ ok: true, data: body as UploadedFile });
        return;
      }
      const error = (body ?? {}) as ErrorBody;
      resolve({
        ok: false,
        code: xhr.status === 429 ? "rate-limit" : toCode(error.error),
      });
    });

    xhr.addEventListener("error", () => resolve({ ok: false, code: "server" }));
    xhr.addEventListener("abort", () => resolve({ ok: false, code: "server" }));

    xhr.send(file);
  });

  return { done, cancel: () => xhr.abort() };
}

/** Removes a file the client changed their mind about — from storage and from
 *  the brief, so the email cannot list something that is no longer there. */
export async function removeFile(session: Session, fileId: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE}/upload?id=${encodeURIComponent(fileId)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.token}` },
    });
    return response.ok;
  } catch {
    return false;
  }
}

export type SubmitInput = {
  token: string;
  language: Language;
  answers: Answers;
};

/**
 * Sends the brief. The token is the whole story: the server reads the
 * package, the submission id and the project off the row it names, so the
 * body carries only what the client actually authored.
 */
export async function submitBrief(
  input: SubmitInput,
): Promise<ApiResult<{ submissionId: string }>> {
  try {
    const response = await fetch(`${BASE}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) return { ok: false, ...(await readError(response)) };
    const data = (await response.json()) as { submissionId: string };
    return { ok: true, data };
  } catch {
    return { ok: false, code: "server" };
  }
}
