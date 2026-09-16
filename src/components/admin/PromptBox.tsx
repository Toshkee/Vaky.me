"use client";

import { useRef, useState, type ReactNode } from "react";
import type { ApiErrorCode } from "@/lib/onboarding/schema";
import { DataError, EmptyState, Panel, buttonClass, textareaMonoClass } from "./ui";

/**
 * A generated prompt in a panel: one button that writes it fresh, the text
 * read-only underneath, and a copy button that falls back to selecting the
 * text where the clipboard is refused. Both briefs — the concept prompt on
 * an enquiry and the build brief on a project — are this box with different
 * words.
 */
export function PromptBox({
  title,
  intro,
  action,
  busyLabel,
  content,
  stamp,
  empty,
  busy,
  code,
  onGenerate,
}: {
  title: string;
  /** One or two sentences on what the prompt is for and when to press. */
  intro: ReactNode;
  action: string;
  busyLabel: string;
  content: string | null;
  /** Under the eyebrow: when this text was written. */
  stamp: ReactNode;
  empty: string;
  busy: boolean;
  code: ApiErrorCode | null;
  onGenerate: () => void;
}) {
  const [copied, setCopied] = useState<"idle" | "done" | "manual">("idle");
  const box = useRef<HTMLTextAreaElement>(null);
  const id = `prompt-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  async function copy() {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied("done");
    } catch {
      /* Clipboard access is refused on an insecure origin and in some
         browsers without a user-gesture chain. Selecting the text is the
         honest fallback: the copy is then one keystroke away. */
      box.current?.focus();
      box.current?.select();
      setCopied("manual");
    }
  }

  return (
    <Panel title={title}>
      <p className="max-w-prose text-sm leading-relaxed text-muted">{intro}</p>

      <div className="mt-3">
        <button
          type="button"
          disabled={busy}
          aria-busy={busy}
          onClick={() => {
            setCopied("idle");
            onGenerate();
          }}
          className={buttonClass}
        >
          {busy ? busyLabel : action}
        </button>
      </div>

      {code && (
        <div className="mt-3">
          <DataError code={code} />
        </div>
      )}

      {content === null ? (
        <EmptyState>{empty}</EmptyState>
      ) : (
        <div className="mt-4 grid gap-2">
          <p className="text-xs text-muted">{stamp}</p>

          <label htmlFor={id} className="sr-only">
            {title}
          </label>
          <textarea
            id={id}
            ref={box}
            readOnly
            value={content}
            rows={12}
            spellCheck={false}
            className={textareaMonoClass}
          />

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => void copy()} className={buttonClass}>
              Kopiraj prompt
            </button>
            <p role="status" className="text-sm text-muted">
              {copied === "done" && "Kopirano."}
              {copied === "manual" && "Kopiranje nije prošlo — tekst je označen, kopiraj ručno."}
            </p>
          </div>
        </div>
      )}
    </Panel>
  );
}
