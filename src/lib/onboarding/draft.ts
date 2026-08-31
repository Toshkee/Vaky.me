import {
  SCHEMA_VERSION,
  isFileZone,
  isLanguage,
  type Answers,
  type FileZone,
  type Language,
} from "./schema";

/**
 * The unfinished brief, kept on the client's own device.
 *
 * A client opens their link from Instagram or WhatsApp, on a phone, and gets
 * interrupted — that is the normal case, not the exception. So everything they
 * have typed is written to localStorage as they go and offered back on the next
 * visit, and it is only cleared once a submission has actually been accepted.
 *
 * The storage key carries the link's token: two different clients' links
 * opened in the same browser get two separate drafts instead of overwriting
 * each other. The package is deliberately NOT in the draft — it lives on the
 * server's request row, and a stale local copy of it could only ever disagree.
 *
 * What is also NOT here is file *contents*. Uploads go straight to storage and
 * only their names, sizes and ids come back — putting a 20 MB photo in
 * localStorage would blow the quota on the first file and lose the whole
 * draft with it.
 */

const key = (token: string) => `vaky:onboarding:${token}`;

export type UploadedFile = {
  /** The server's id for the stored object. */
  id: string;
  name: string;
  size: number;
  zone: FileZone;
};

export type Session = {
  submissionId: string;
  token: string;
  /** Unix milliseconds. The server decides this; we only avoid using a token we
   *  already know is stale. */
  expiresAt: number;
};

export type Draft = {
  language: Language | null;
  /** Which step they were on, so returning puts them back there. */
  stepId: string | null;
  answers: Answers;
  files: UploadedFile[];
  session: Session | null;
};

export const emptyDraft: Draft = {
  language: null,
  stepId: null,
  answers: {},
  files: [],
  session: null,
};

type StoredDraft = Draft & { version: number };

/**
 * Parsed defensively rather than cast. This is data the client's own browser
 * hands back, and it may have been written by an older version of the form, by
 * a different tab, or by hand — none of which should be able to put the wizard
 * into a state its own code does not expect.
 */
export function readDraft(token: string): Draft | null {
  if (typeof window === "undefined") return null;

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(key(token));
  } catch {
    // Private mode, or storage disabled. The form still works; it just forgets.
    return null;
  }
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const draft = parsed as Partial<StoredDraft>;

    /* A draft written against a different set of questions is discarded rather
       than migrated. Half-restoring answers into a form whose questions have
       moved is worse than asking someone to start again. */
    if (draft.version !== SCHEMA_VERSION) return null;

    const answers =
      draft.answers && typeof draft.answers === "object" && !Array.isArray(draft.answers)
        ? (draft.answers as Answers)
        : {};

    const files = Array.isArray(draft.files)
      ? draft.files.filter(
          (file): file is UploadedFile =>
            !!file &&
            typeof file === "object" &&
            typeof (file as UploadedFile).id === "string" &&
            typeof (file as UploadedFile).name === "string" &&
            typeof (file as UploadedFile).size === "number" &&
            isFileZone((file as UploadedFile).zone),
        )
      : [];

    const stored = draft.session;
    const session =
      stored &&
      typeof stored.submissionId === "string" &&
      typeof stored.token === "string" &&
      typeof stored.expiresAt === "number" &&
      stored.expiresAt > Date.now()
        ? stored
        : null;

    return {
      language: isLanguage(draft.language) ? draft.language : null,
      stepId: typeof draft.stepId === "string" ? draft.stepId : null,
      answers,
      /* An expired session cannot be used to upload, and on this route the
         files it uploaded are still safely attached to the same brief — but a
         list the client can no longer add to or remove from would only
         mislead. The server's copy is the one that counts. */
      files: session ? files : [],
      session,
    };
  } catch {
    return null;
  }
}

export function writeDraft(token: string, draft: Draft): void {
  if (typeof window === "undefined") return;
  try {
    const stored: StoredDraft = { ...draft, version: SCHEMA_VERSION };
    window.localStorage.setItem(key(token), JSON.stringify(stored));
  } catch {
    // Quota or private mode. Losing the draft is survivable; throwing here
    // would take the keystroke that triggered the save down with it.
  }
}

export function clearDraft(token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key(token));
  } catch {
    // Nothing to do, and nothing worth failing a submission over.
  }
}

/** Whether a stored draft has enough in it to be worth offering back. A
 *  language alone is not progress; an answer or an uploaded file is. */
export function hasProgress(draft: Draft): boolean {
  return Object.keys(draft.answers).length > 0 || draft.files.length > 0;
}
