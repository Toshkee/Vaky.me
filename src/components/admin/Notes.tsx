"use client";

import { useState, type FormEvent } from "react";
import type { ApiResult, NoteRow } from "@/lib/admin/client";
import type { ApiErrorCode } from "@/lib/onboarding/schema";
import { DataError, EmptyState, Panel, When, buttonClass, textareaClass } from "./ui";

/**
 * The studio's own margin notes, on a lead or on a project.
 *
 * One component for both, because the only difference is which endpoint the
 * text is posted to — the caller passes that in and refreshes itself when it
 * comes back.
 */
export function Notes({
  notes,
  onAdd,
}: {
  notes: readonly NoteRow[];
  onAdd: (body: string) => Promise<ApiResult<{ id: string }>>;
}) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<ApiErrorCode | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = body.trim();
    if (busy || !text) return;

    setBusy(true);
    setCode(null);
    const result = await onAdd(text);
    setBusy(false);

    if (result.ok) setBody("");
    else setCode(result.code);
  }

  return (
    <Panel title="Bilješke">
      <p className="text-sm leading-relaxed text-muted">
        Interno. Klijent ovo nikad ne vidi — bilješke ulaze samo u build brief.
      </p>

      {notes.length === 0 ? (
        <EmptyState>Nema bilješki.</EmptyState>
      ) : (
        <ul className="mt-3 grid gap-3">
          {notes.map((note) => (
            <li key={note.id} className="border-l-2 border-line pl-3">
              <When value={note.created_at} className="text-xs text-muted" />
              <p className="mt-1 leading-relaxed whitespace-pre-line">{note.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submit} className="mt-4 grid gap-2">
        <label htmlFor="note-body" className="eyebrow text-muted">
          Nova bilješka
        </label>
        <textarea
          id="note-body"
          value={body}
          rows={3}
          maxLength={4000}
          onChange={(event) => setBody(event.target.value)}
          className={textareaClass}
        />
        <button
          type="submit"
          disabled={busy || !body.trim()}
          aria-busy={busy}
          className={`${buttonClass} justify-self-start`}
        >
          {busy ? "Čuvam…" : "Dodaj bilješku"}
        </button>
        {code && <DataError code={code} />}
      </form>
    </Panel>
  );
}
