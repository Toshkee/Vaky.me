"use client";

import { useRef, useState } from "react";
import { BRIEF_MODES, generateBrief, type BriefMode, type BriefRow } from "@/lib/admin/client";
import type { ApiErrorCode } from "@/lib/onboarding/schema";
import { DataError, EmptyState, Panel, When, buttonClass, textareaClass } from "./ui";

/**
 * The prompt that gets pasted into a coding session to build the site.
 *
 * Each button asks the server to write its brief fresh from the answers, the
 * notes and the files as they stand right now — which is why a mode with a
 * saved brief still regenerates rather than reopening it. What was saved
 * earlier is shown until something newer is asked for, so opening the panel
 * always has something to read.
 */

const MODE_LABELS: Record<BriefMode, string> = {
  full: "Pun brief",
  design: "Dizajn",
  technical: "Tehnički",
};

export function Briefs({ projectId, briefs }: { projectId: string; briefs: readonly BriefRow[] }) {
  const saved = (mode: BriefMode) => briefs.find((brief) => brief.mode === mode);

  const [mode, setMode] = useState<BriefMode | null>(
    () => BRIEF_MODES.find((candidate) => saved(candidate) !== undefined) ?? null,
  );
  const [fresh, setFresh] = useState<Partial<Record<BriefMode, string>>>({});
  const [busy, setBusy] = useState<BriefMode | null>(null);
  const [code, setCode] = useState<ApiErrorCode | null>(null);
  const [copied, setCopied] = useState<"idle" | "done" | "manual">("idle");
  const box = useRef<HTMLTextAreaElement>(null);

  const shown = mode ? (fresh[mode] ?? saved(mode)?.content ?? null) : null;

  async function generate(next: BriefMode) {
    setBusy(next);
    setCode(null);
    setCopied("idle");

    const answer = await generateBrief(projectId, next);
    setBusy(null);

    if (!answer.ok) {
      setCode(answer.code);
      return;
    }
    setFresh((current) => ({ ...current, [next]: answer.data.content }));
    setMode(next);
  }

  async function copy() {
    if (!shown) return;
    try {
      await navigator.clipboard.writeText(shown);
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
    <Panel title="Build brief">
      <div className="flex flex-wrap gap-2">
        {BRIEF_MODES.map((candidate) => (
          <button
            key={candidate}
            type="button"
            disabled={busy !== null}
            aria-busy={busy === candidate}
            onClick={() => void generate(candidate)}
            className={buttonClass}
          >
            {busy === candidate ? "Pišem…" : MODE_LABELS[candidate]}
          </button>
        ))}
      </div>

      {code && (
        <div className="mt-3">
          <DataError code={code} />
        </div>
      )}

      {shown === null || mode === null ? (
        <EmptyState>Nijedan brief još nije generisan.</EmptyState>
      ) : (
        <div className="mt-4 grid gap-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="eyebrow text-muted">{MODE_LABELS[mode]}</span>
            {fresh[mode] === undefined ? (
              <span className="text-xs text-muted">
                sačuvan <When value={saved(mode)?.created_at ?? null} />
              </span>
            ) : (
              <span className="text-xs text-muted">upravo generisan</span>
            )}
          </div>

          <label htmlFor="brief-text" className="sr-only">
            Tekst brief-a
          </label>
          <textarea
            id="brief-text"
            ref={box}
            readOnly
            value={shown}
            rows={16}
            spellCheck={false}
            className={`${textareaClass} font-mono text-sm`}
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
