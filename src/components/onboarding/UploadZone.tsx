"use client";

import { useId, useRef, useState } from "react";
import type { OnboardingCopy } from "@/i18n/onboarding";
import { removeFile, uploadFile } from "@/lib/onboarding/client";
import type { Session, UploadedFile } from "@/lib/onboarding/draft";
import {
  UPLOAD_LIMITS,
  acceptFor,
  allowedTypeFor,
  maxBytesFor,
  type ApiErrorCode,
  type FileZone,
} from "@/lib/onboarding/schema";
import { fill, formatBytes } from "./copy";

/**
 * One place to drop files, per kind of material.
 *
 * Uploads happen here and now, not on submit: a client on a phone should see
 * the photo they just picked land, one at a time, with a name and a bar — and
 * should be able to take one back off without starting the brief again. What
 * the parent keeps is only what finished; anything still going, or failed, is
 * this component's business and never reaches the saved draft.
 *
 * Files go up one at a time. Four at once on a phone's uplink makes every
 * progress bar crawl together and nothing finish, which reads as broken.
 */

type Pending = {
  key: number;
  file: File;
  progress: number;
  failed: ApiErrorCode | null;
  cancel?: () => void;
};

export function UploadZone({
  copy,
  zone,
  label,
  help,
  uploaded,
  totalCount,
  totalBytes,
  getSession,
  onUploaded,
  onRemoved,
}: {
  copy: OnboardingCopy;
  zone: FileZone;
  label: string;
  help?: string;
  /** The finished files in this zone, from the draft. */
  uploaded: readonly UploadedFile[];
  /** Across every zone — the limits are per submission, not per box. */
  totalCount: number;
  totalBytes: number;
  getSession: () => Promise<Session | null>;
  onUploaded: (file: UploadedFile) => void;
  onRemoved: (id: string) => void;
}) {
  const inputId = useId();
  const [pending, setPending] = useState<Pending[]>([]);
  const [dragging, setDragging] = useState(false);
  const nextKey = useRef(0);

  const full = totalCount + pending.length >= UPLOAD_LIMITS.maxFiles;

  function update(key: number, change: Partial<Pending>) {
    setPending((items) =>
      items.map((item) => (item.key === key ? { ...item, ...change } : item)),
    );
  }

  async function send(item: Pending) {
    const session = await getSession();
    if (!session) {
      update(item.key, { failed: "challenge" });
      return;
    }

    const handle = uploadFile(session, zone, item.file, (fraction) =>
      update(item.key, { progress: fraction }),
    );
    update(item.key, { cancel: handle.cancel, failed: null });

    const result = await handle.done;
    if (result.ok) {
      onUploaded(result.data);
      setPending((items) => items.filter((entry) => entry.key !== item.key));
    } else {
      update(item.key, { failed: result.code, cancel: undefined });
    }
  }

  async function accept(files: File[]) {
    let room = UPLOAD_LIMITS.maxFiles - totalCount - pending.length;
    let budget = UPLOAD_LIMITS.maxBytesTotal - totalBytes;

    for (const file of files) {
      if (room <= 0) break;

      const key = nextKey.current++;
      const type = allowedTypeFor(file.name);

      /* Checked here as well as on the server, which is the copy that counts.
         The point of this one is that a client learns their .pages file is not
         going to work before spending their data allowance sending it. */
      const rejected: ApiErrorCode | null = !type
        ? "file-type"
        : file.size > maxBytesFor(type)
          ? "file-size"
          : file.size > budget
            ? "file-total"
            : null;

      const item: Pending = { key, file, progress: 0, failed: rejected };
      setPending((items) => [...items, item]);
      room -= 1;

      if (rejected) continue;
      budget -= file.size;
      await send(item);
    }
  }

  async function drop(id: string) {
    const session = await getSession();
    if (session) await removeFile(session, id);
    /* Removed from the list either way. A file the client has said they do not
       want must not still be shown to them as sent, and one left in storage is
       cleaned up with the rest of an abandoned submission. */
    onRemoved(id);
  }

  const limits = fill(copy.upload.limits, {
    file: formatBytes(UPLOAD_LIMITS.maxBytesPerFile),
    video: formatBytes(UPLOAD_LIMITS.maxBytesPerVideo),
    total: formatBytes(UPLOAD_LIMITS.maxBytesTotal),
  });

  return (
    <div className="min-w-0">
      <p className="text-base leading-snug font-semibold">{label}</p>
      {help && <p className="mt-1 text-sm leading-relaxed text-muted">{help}</p>}

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!full) void accept(Array.from(event.dataTransfer.files));
        }}
        className={`mt-3 border-2 border-dashed px-4 py-5 text-center transition-colors ${
          dragging ? "border-red bg-paper-2" : "border-line bg-paper-2/60"
        }`}
      >
        <p className="hidden text-sm text-muted sm:block">{copy.upload.drop}</p>
        <input
          id={inputId}
          type="file"
          multiple
          accept={acceptFor(zone)}
          disabled={full}
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            event.target.value = "";
            void accept(files);
          }}
          className="sr-only"
        />
        <label
          htmlFor={inputId}
          className={`px px-btn tap mt-0 inline-flex min-h-11 cursor-pointer items-center bg-paper px-5 py-2 text-[1.15rem] text-ink transition-colors sm:mt-3 ${
            full ? "pointer-events-none opacity-50" : "hover:text-red"
          }`}
        >
          {copy.upload.browse}
        </label>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {copy.upload.zones[zone].hint} {limits}
        </p>
      </div>

      {full && <p className="mt-2 text-sm font-semibold text-red">{copy.upload.tooMany}</p>}

      <ul role="status" className="mt-3 grid gap-2">
        {uploaded.map((file) => (
          <li
            key={file.id}
            className="flex items-center gap-3 border border-line bg-paper px-3 py-2.5"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{file.name}</span>
              <span className="text-xs text-ok">
                {copy.upload.done} · {formatBytes(file.size)}
              </span>
            </span>
            <button
              type="button"
              onClick={() => void drop(file.id)}
              aria-label={fill(copy.upload.removeLabel, { name: file.name })}
              className="tap shrink-0 px-2 py-1 text-sm font-semibold text-muted underline decoration-2 underline-offset-4 transition-colors hover:text-red"
            >
              {copy.upload.remove}
            </button>
          </li>
        ))}

        {pending.map((item) => (
          <li key={item.key} className="border border-line bg-paper px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{item.file.name}</span>
                <span className={`text-xs ${item.failed ? "text-red" : "text-muted"}`}>
                  {item.failed
                    ? `${copy.upload.failed} — ${copy.errors.api[item.failed]}`
                    : `${copy.upload.uploading} ${Math.round(item.progress * 100)}%`}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  if (item.failed) {
                    update(item.key, { failed: null, progress: 0 });
                    void send(item);
                    return;
                  }
                  item.cancel?.();
                  setPending((items) => items.filter((entry) => entry.key !== item.key));
                }}
                className="tap shrink-0 px-2 py-1 text-sm font-semibold text-muted underline decoration-2 underline-offset-4 transition-colors hover:text-red"
              >
                {item.failed ? copy.upload.retry : copy.upload.remove}
              </button>
            </div>
            {!item.failed && (
              <span className="os-bar mt-2 block">
                <span
                  className="os-bar-fill block"
                  style={{ width: `${Math.round(item.progress * 100)}%` }}
                />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
