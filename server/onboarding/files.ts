import {
  allowedTypeFor,
  fileExtension,
  maxBytesFor,
  storageFolder,
  type AllowedFileType,
  type FileZone,
} from "../../src/lib/onboarding/schema";

/**
 * What a file has to survive before it is stored.
 *
 * The extension says what a file claims to be; the first bytes say what it is.
 * Both have to agree, because an extension is chosen by whoever uploads and the
 * browser's `Content-Type` is no better. Nothing here is ever executed, opened
 * or parsed — the file is checked, renamed, and copied into private storage
 * for a person to download later.
 */

/**
 * Leading bytes, by type.
 *
 * `offset` matters: an MP4 or a HEIC image announces itself with `ftyp` at byte
 * four, not byte zero, because the first four bytes are the length of the box
 * that contains it. Reading from zero finds nothing and rejects every video a
 * client sends.
 */
type Signature = { offset: number; bytes: readonly number[] };

const ascii = (text: string): number[] => [...text].map((character) => character.charCodeAt(0));

const SIGNATURES: Record<string, readonly Signature[]> = {
  "image/jpeg": [{ offset: 0, bytes: [0xff, 0xd8, 0xff] }],
  "image/png": [{ offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
  "image/gif": [
    { offset: 0, bytes: ascii("GIF87a") },
    { offset: 0, bytes: ascii("GIF89a") },
  ],
  /* WEBP is a RIFF container: the four bytes between the two markers are the
     file length, so the format is only identified by checking both ends. */
  "image/webp": [{ offset: 0, bytes: ascii("RIFF") }, { offset: 8, bytes: ascii("WEBP") }],
  "image/heic": [{ offset: 4, bytes: ascii("ftyp") }],
  "application/pdf": [{ offset: 0, bytes: ascii("%PDF-") }],
  "video/mp4": [{ offset: 4, bytes: ascii("ftyp") }],
  "video/quicktime": [{ offset: 4, bytes: ascii("ftyp") }],
  "video/webm": [{ offset: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] }],
  /* Every modern Office file is a zip, and so is a zip. They are stored, never
     opened, so telling a .docx from a .xlsx by its bytes would buy nothing. */
  "application/zip": [{ offset: 0, bytes: [0x50, 0x4b] }],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    { offset: 0, bytes: [0x50, 0x4b] },
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    { offset: 0, bytes: [0x50, 0x4b] },
  ],
  /* The old binary Office formats share one container signature. */
  "application/msword": [{ offset: 0, bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1] }],
  "application/vnd.ms-excel": [
    { offset: 0, bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1] },
  ],
  "application/rtf": [{ offset: 0, bytes: ascii("{\\rtf") }],
};

/**
 * Executables, by their first bytes — Windows PE, ELF, Mach-O, shell scripts,
 * Java class files.
 *
 * This is the check for the formats that have no signature of their own. A
 * .txt or a .csv is accepted on its extension alone, so this is what stops
 * `payload.exe` being renamed `notes.txt` and stored as if it were prose.
 */
const EXECUTABLES: readonly Signature[] = [
  { offset: 0, bytes: ascii("MZ") },
  { offset: 0, bytes: [0x7f, 0x45, 0x4c, 0x46] },
  { offset: 0, bytes: [0xca, 0xfe, 0xba, 0xbe] },
  { offset: 0, bytes: [0xcf, 0xfa, 0xed, 0xfe] },
  { offset: 0, bytes: [0xfe, 0xed, 0xfa, 0xce] },
  { offset: 0, bytes: ascii("#!") },
];

function matches(head: Uint8Array, signature: Signature): boolean {
  if (head.length < signature.offset + signature.bytes.length) return false;
  return signature.bytes.every((byte, index) => head[signature.offset + index] === byte);
}

export type FileCheck =
  | { ok: true; type: AllowedFileType; folder: string }
  | { ok: false; reason: "file-type" | "file-size" };

/** `head` only needs the first 16 bytes; the caller reads a slice rather than
 *  the whole file, so a 30 MB video is never pulled into memory to be checked. */
export function checkFile(name: string, size: number, zone: FileZone, head: Uint8Array): FileCheck {
  const type = allowedTypeFor(name);
  if (!type) return { ok: false, reason: "file-type" };
  if (size <= 0 || size > maxBytesFor(type)) return { ok: false, reason: "file-size" };

  const expected = SIGNATURES[type.mime];
  if (expected) {
    if (!expected.every((signature) => matches(head, signature))) {
      return { ok: false, reason: "file-type" };
    }
  } else if (EXECUTABLES.some((signature) => matches(head, signature))) {
    return { ok: false, reason: "file-type" };
  }

  return { ok: true, type, folder: storageFolder(zone, type.group) };
}

/**
 * A filename safe to put in a storage key and, later, in a `filename=` header.
 *
 * Everything outside a small ASCII set goes, which loses the č and ž in a
 * Montenegrin filename — the real name is kept in the database and in the
 * object's metadata, and this is only the part a person sees in a URL.
 */
export function safeName(name: string): string {
  const extension = fileExtension(name);
  const stem = extension ? name.slice(0, -(extension.length + 1)) : name;
  const slug =
    stem
      .normalize("NFKD")
      .replace(/[^\w.-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .toLowerCase() || "file";
  return extension ? `${slug}.${extension}` : slug;
}

/** Where the object lives. The submission id comes from a verified token, never
 *  from the request, so one client cannot write into another's folder. */
export function storageKey(
  submissionId: string,
  folder: string,
  fileId: string,
  name: string,
): string {
  return `client-projects/${submissionId}/${folder}/${fileId}-${safeName(name)}`;
}

/**
 * The name as the client will see it again, kept intact — accents and all.
 *
 * Only two things are taken out: any directory part, so a browser that sends
 * `photos/logo.png` cannot imply a path, and control characters, which have no
 * business in a name that is later written into a header. Written as a filter
 * rather than a regular expression because a character class of escaped
 * control codes is exactly the kind of line that gets mangled by an editor.
 */
export function tidyName(raw: string): string {
  const withoutPath = raw.split(/[\\/]/).pop() ?? raw;
  return [...withoutPath]
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code > 31 && code !== 127;
    })
    .join("")
    .trim()
    .slice(0, 180);
}
