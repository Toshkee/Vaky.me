"use client";

import { useCallback, useState, type FormEvent } from "react";
import { createProject, getProjects, type ProjectListRow } from "@/lib/admin/client";
import {
  isPackageId,
  isValidEmail,
  type ApiErrorCode,
  type PackageId,
} from "@/lib/onboarding/schema";
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS } from "@/lib/workflow";
import {
  AsyncView,
  DataError,
  EmptyState,
  Field,
  GoLink,
  PACKAGE_OPTIONS,
  SelectField,
  StatusPill,
  When,
  buttonClass,
  isLiveRequest,
  packageText,
  primaryButtonClass,
  useGo,
  useLoad,
} from "./ui";

/**
 * Every engagement, live or finished.
 *
 * The list arrives whole and is narrowed here rather than by the endpoint: at
 * this size the whole table is a few kilobytes, and filtering in the browser
 * keeps the overview's five links working without five more queries. The two
 * named filters are the ones the overview counts — "aktivni" and "čeka
 * klijenta" are not statuses, they are questions about a row.
 */

type Filter = { id: string; label: string; match: (row: ProjectListRow) => boolean };

const FILTERS: readonly Filter[] = [
  { id: "sve", label: "Svi projekti", match: () => true },
  {
    id: "aktivni",
    label: "Aktivni",
    match: (row) => row.status !== "completed" && row.status !== "cancelled",
  },
  {
    id: "ceka-klijenta",
    label: "Čeka klijenta",
    match: (row) => isLiveRequest(row.request_status),
  },
  ...PROJECT_STATUSES.map((status) => ({
    id: status,
    label: PROJECT_STATUS_LABELS[status],
    match: (row: ProjectListRow) => row.status === status,
  })),
];

export function Projects({ filter }: { filter: string }) {
  const go = useGo();
  const load = useCallback(() => getProjects(), []);
  const { result, busy, reload } = useLoad(load);
  const [adding, setAdding] = useState(false);

  const active = FILTERS.find((candidate) => candidate.id === filter) ?? FILTERS[0];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="headline text-2xl">Projekti</h1>
        <div className="w-full sm:w-64">
          <SelectField
            id="project-filter"
            label="Filter"
            value={active.id}
            options={FILTERS.map((candidate) => ({
              value: candidate.id,
              label: candidate.label,
            }))}
            onChange={(value) => go(value === "sve" ? "?v=projekti" : `?v=projekti&f=${value}`)}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          aria-expanded={adding}
          onClick={() => setAdding((open) => !open)}
          className={buttonClass}
        >
          {adding ? "Zatvori formu" : "Novi projekat"}
        </button>

        {adding && (
          <NewProjectForm
            onCreated={(projectId) => {
              setAdding(false);
              go(`?v=projekat&id=${projectId}`);
            }}
          />
        )}
      </div>

      <div className="mt-6">
        <AsyncView result={result} busy={busy} onRetry={reload}>
          {(data) => {
            const rows = data.projects.filter(active.match);
            if (rows.length === 0) return <EmptyState>Nema projekata u ovom filteru.</EmptyState>;

            return (
              <ul className="border-t-2 border-ink">
                {rows.map((row) => (
                  <li key={row.id} className="border-b border-line">
                    <GoLink
                      to={`?v=projekat&id=${row.id}`}
                      className="grid gap-x-4 gap-y-1 py-3 hover:bg-paper-2 lg:grid-cols-[minmax(0,1fr)_8rem_11.5rem_11rem_6rem] lg:items-center"
                    >
                      <span className="font-semibold break-words">{row.business_name}</span>
                      <span className="text-sm text-muted">{packageText(row.package_id)}</span>
                      <span>
                        <StatusPill kind="project" value={row.status} />
                      </span>
                      <span>
                        {row.request_status ? (
                          <StatusPill kind="request" value={row.request_status} />
                        ) : (
                          <span className="text-sm text-muted">bez linka</span>
                        )}
                      </span>
                      <When
                        value={row.last_activity_at}
                        className="text-sm text-muted lg:text-right"
                      />
                    </GoLink>
                  </li>
                ))}
              </ul>
            );
          }}
        </AsyncView>
      </div>
    </>
  );
}

/** For the client who never touched the public form — agreed over Instagram or
 *  a phone call and needs a record to hang an onboarding link on. */
function NewProjectForm({ onCreated }: { onCreated: (projectId: string) => void }) {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [existingSite, setExistingSite] = useState("");
  const [packageId, setPackageId] = useState<PackageId>("start");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<ApiErrorCode | null>(null);
  const [problem, setProblem] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    if (email.trim() && !isValidEmail(email)) {
      setProblem("Provjeri email adresu.");
      return;
    }

    setBusy(true);
    setCode(null);
    setProblem(null);

    const answer = await createProject({
      businessName: businessName.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      instagram: instagram.trim(),
      existingSite: existingSite.trim(),
      packageId,
    });

    setBusy(false);
    if (answer.ok) onCreated(answer.data.projectId);
    else setCode(answer.code);
  }

  return (
    <form onSubmit={submit} className="mt-4 grid gap-4 border-2 border-ink p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="new-business"
          label="Naziv biznisa"
          value={businessName}
          onChange={setBusinessName}
          required
          maxLength={160}
        />
        <Field
          id="new-contact"
          label="Kontakt osoba"
          value={contactName}
          onChange={setContactName}
          maxLength={120}
        />
        <Field
          id="new-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          maxLength={160}
        />
        <Field
          id="new-phone"
          label="Telefon"
          type="tel"
          value={phone}
          onChange={setPhone}
          maxLength={40}
        />
        <Field
          id="new-instagram"
          label="Instagram"
          value={instagram}
          onChange={setInstagram}
          maxLength={120}
        />
        <Field
          id="new-site"
          label="Postojeći sajt"
          value={existingSite}
          onChange={setExistingSite}
          maxLength={300}
        />
        <SelectField
          id="new-package"
          label="Paket"
          value={packageId}
          options={PACKAGE_OPTIONS}
          onChange={(value) => {
            if (isPackageId(value)) setPackageId(value);
          }}
        />
      </div>

      <button
        type="submit"
        disabled={busy || !businessName.trim()}
        aria-busy={busy}
        className={`${primaryButtonClass} justify-self-start`}
      >
        {busy ? "Pravim…" : "Napravi projekat"}
      </button>

      {problem && (
        <p role="alert" className="text-sm font-semibold text-red">
          {problem}
        </p>
      )}
      {code && <DataError code={code} />}
    </form>
  );
}
