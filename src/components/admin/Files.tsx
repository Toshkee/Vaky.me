"use client";

import { useRef, useState, type FormEvent } from "react";
import { formatBytes } from "@/components/onboarding/copy";
import { onboardingCopy } from "@/i18n/onboarding";
import { deleteFile, fileHref, uploadProjectFile, type ProjectFileRow } from "@/lib/admin/client";
import {
  FILE_ZONES,
  acceptFor,
  allowedTypeFor,
  isFileZone,
  maxBytesFor,
  type ApiErrorCode,
  type FileZone,
} from "@/lib/onboarding/schema";
import {
  ConfirmButton,
  DataError,
  EmptyState,
  Panel,
  SelectField,
  When,
  buttonClass,
  inputClass,
} from "./ui";

/**
 * Everything attached to the project, kept in two visibly separate piles.
 *
 * Which side a file came from is the fact that matters when a brief is being
 * written: the client's own logo and photos are material, and what the studio
 * put there is working copy. Anything the store does not mark as the client's
 * counts as the studio's, so a row can never quietly disappear from both.
 */

const ZONE_LABELS: Record<FileZone, string> = {
  logo: "Logo",
  media: "Slike i video",
  documents: "Dokumenti",
};

const ZONE_OPTIONS = FILE_ZONES.map((zone) => ({ value: zone, label: ZONE_LABELS[zone] }));

function zoneText(zone: string): string {
  return isFileZone(zone) ? ZONE_LABELS[zone] : zone;
}

export function Files({
  projectId,
  files,
  onChanged,
}: {
  projectId: string;
  files: readonly ProjectFileRow[];
  onChanged: () => void;
}) {
  const fromClient = files.filter((file) => file.source === "client");
  const fromStudio = files.filter((file) => file.source !== "client");

  return (
    <Panel title="Fajlovi">
      <div className="grid gap-6">
        <FileGroup
          title="Klijent poslao"
          files={fromClient}
          empty="Klijent još nije poslao nijedan fajl."
          onChanged={onChanged}
        />
        <FileGroup
          title="VibeLab dodao"
          files={fromStudio}
          empty="Nema fajlova koje je studio dodao."
          onChanged={onChanged}
        />
        <Upload projectId={projectId} onUploaded={onChanged} />
      </div>
    </Panel>
  );
}

function FileGroup({
  title,
  files,
  empty,
  onChanged,
}: {
  title: string;
  files: readonly ProjectFileRow[];
  empty: string;
  onChanged: () => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [code, setCode] = useState<ApiErrorCode | null>(null);

  async function remove(id: string) {
    setBusy(id);
    setCode(null);
    const answer = await deleteFile(id);
    setBusy(null);
    if (answer.ok) onChanged();
    else setCode(answer.code);
  }

  return (
    <section>
      <h3 className="border-b-2 border-line pb-1 text-base font-bold">{title}</h3>

      {files.length === 0 ? (
        <EmptyState>{empty}</EmptyState>
      ) : (
        <ul className="mt-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="grid items-center gap-x-4 gap-y-2 border-b border-line py-3 md:grid-cols-[minmax(0,1fr)_7rem_5rem_auto]"
            >
              <span className="break-all">
                <a
                  href={fileHref(file.id)}
                  className="font-semibold underline decoration-line underline-offset-4 hover:text-red"
                >
                  {file.original_name}
                </a>
                <span className="block text-xs text-muted">
                  <When value={file.created_at} />
                </span>
              </span>
              <span className="text-sm text-muted">{zoneText(file.zone)}</span>
              <span className="tnum text-sm text-muted">{formatBytes(file.size_bytes)}</span>
              <ConfirmButton
                label="Obriši"
                confirmLabel="Sigurno obriši"
                busy={busy === file.id}
                onConfirm={() => void remove(file.id)}
                className="justify-self-start"
              />
            </li>
          ))}
        </ul>
      )}

      {code && <DataError code={code} />}
    </section>
  );
}

function Upload({ projectId, onUploaded }: { projectId: string; onUploaded: () => void }) {
  const [zone, setZone] = useState<FileZone>("media");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<ApiErrorCode | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !file) return;

    /* The same two gates the endpoint applies, run first so a rejected file
       costs a click instead of an upload. */
    const type = allowedTypeFor(file.name);
    if (!type) {
      setProblem("Ovaj tip fajla ne primamo.");
      return;
    }
    if (file.size > maxBytesFor(type)) {
      setProblem(`Fajl je prevelik — najviše ${formatBytes(maxBytesFor(type))}.`);
      return;
    }

    setBusy(true);
    setCode(null);
    setProblem(null);

    const answer = await uploadProjectFile(projectId, zone, file);
    setBusy(false);

    if (!answer.ok) {
      setCode(answer.code);
      return;
    }

    setFile(null);
    if (input.current) input.current.value = "";
    onUploaded();
  }

  return (
    <form onSubmit={submit} className="grid gap-4 border-2 border-ink p-4 sm:grid-cols-2">
      <SelectField
        id="upload-zone"
        label="Gdje ide"
        value={zone}
        options={ZONE_OPTIONS}
        onChange={(value) => {
          if (isFileZone(value)) setZone(value);
        }}
        hint={onboardingCopy.me.upload.zones[zone].hint}
      />

      <div className="grid content-start gap-1">
        <label htmlFor="upload-file" className="eyebrow text-muted">
          Fajl
        </label>
        <input
          id="upload-file"
          ref={input}
          type="file"
          accept={acceptFor(zone)}
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setProblem(null);
          }}
          className={`${inputClass} file:mr-3 file:border-0 file:bg-transparent file:font-semibold`}
        />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={busy || !file} aria-busy={busy} className={buttonClass}>
          {busy ? "Šaljem…" : "Pošalji fajl"}
        </button>
      </div>

      {problem && (
        <p role="alert" className="text-sm font-semibold text-red sm:col-span-2">
          {problem}
        </p>
      )}
      {code && (
        <div className="sm:col-span-2">
          <DataError code={code} />
        </div>
      )}
    </form>
  );
}
