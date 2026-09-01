"use client";

import { useCallback, useState } from "react";
import { addLeadNote, convertLead, deleteLead, getLead, setLeadStatus } from "@/lib/admin/client";
import {
  PACKAGE_IDS,
  isValidUrl,
  normaliseUrl,
  type ApiErrorCode,
  type PackageId,
} from "@/lib/onboarding/schema";
import {
  LEAD_NEED_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  isLeadNeed,
  type LeadStatus,
} from "@/lib/workflow";
import { Notes } from "./Notes";
import {
  AsyncView,
  ConfirmButton,
  DataError,
  Fact,
  Facts,
  GoLink,
  Panel,
  StatusPill,
  Timeline,
  buttonClass,
  packageText,
  primaryButtonClass,
  stampText,
  useGo,
  useLoad,
} from "./ui";

/**
 * One enquiry, and the two decisions that can be made about it: what its
 * status is, and whether it becomes a project.
 *
 * "Prihvaćen" is deliberately not among the status buttons — a lead becomes
 * accepted by being converted, which also creates the project record, and a
 * button that set the status alone would leave the two out of step.
 */

const SETTABLE: readonly Exclude<LeadStatus, "accepted">[] = LEAD_STATUSES.filter(
  (status): status is Exclude<LeadStatus, "accepted"> => status !== "accepted",
);

export function LeadDetail({ id }: { id: string }) {
  const go = useGo();
  const load = useCallback(() => getLead(id), [id]);
  const { result, busy: refreshing, reload } = useLoad(load);

  const [busy, setBusy] = useState<string | null>(null);
  const [problem, setProblem] = useState<ApiErrorCode | null>(null);
  const [packageId, setPackageId] = useState<PackageId>("start");

  async function changeStatus(status: Exclude<LeadStatus, "accepted">) {
    setBusy(status);
    setProblem(null);
    const answer = await setLeadStatus(id, status);
    setBusy(null);
    if (answer.ok) reload();
    else setProblem(answer.code);
  }

  async function convert() {
    setBusy("convert");
    setProblem(null);
    const answer = await convertLead(id, packageId);
    setBusy(null);
    if (answer.ok) go(`?v=projekat&id=${answer.data.projectId}`);
    else setProblem(answer.code);
  }

  async function remove() {
    setBusy("delete");
    setProblem(null);
    const answer = await deleteLead(id);
    /* No `setBusy(null)` on success — the view is leaving, and re-enabling a
       button on a lead that no longer exists only invites a second press. */
    if (answer.ok) go("?v=upiti");
    else {
      setBusy(null);
      setProblem(answer.code);
    }
  }

  return (
    <>
      <p className="text-sm">
        <GoLink to="?v=upiti" className="underline decoration-line underline-offset-4 hover:text-red">
          Nazad na upite
        </GoLink>
      </p>

      <AsyncView result={result} busy={refreshing} onRetry={reload}>
        {(data) => (
          <div className="mt-4 grid gap-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="headline text-2xl break-words">
                {data.lead.business_name || data.lead.name}
              </h1>
              <StatusPill kind="lead" value={data.lead.status} />
            </div>

            <Panel title="Kontakt">
              <Facts>
                <Fact label="Osoba" value={data.lead.name} />
                <Fact
                  label="Email"
                  value={
                    <a
                      href={`mailto:${data.lead.email}`}
                      className="underline decoration-line underline-offset-4 hover:text-red"
                    >
                      {data.lead.email}
                    </a>
                  }
                />
                <Fact
                  label="Telefon"
                  value={
                    data.lead.phone ? (
                      <a
                        href={`tel:${data.lead.phone.replace(/\s/g, "")}`}
                        className="underline decoration-line underline-offset-4 hover:text-red"
                      >
                        {data.lead.phone}
                      </a>
                    ) : null
                  }
                />
                {/* Free text on the public form — people type "@handle" as
                    readily as a URL, so it is stored as typed. It becomes a
                    link here only if it parses as http(s); anything else is
                    shown as text, never as an href Vaky would click. */}
                <Fact
                  label="Instagram ili sajt"
                  value={
                    data.lead.link ? (
                      isValidUrl(data.lead.link) ? (
                        <a
                          href={normaliseUrl(data.lead.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all underline decoration-line underline-offset-4 hover:text-red"
                        >
                          {data.lead.link}
                        </a>
                      ) : (
                        <span className="break-all">{data.lead.link}</span>
                      )
                    ) : null
                  }
                />
                <Fact
                  label="Šta traži"
                  value={isLeadNeed(data.lead.need) ? LEAD_NEED_LABELS[data.lead.need] : null}
                />
                <Fact
                  label="Jezik forme"
                  value={data.lead.language === "en" ? "English" : "Crnogorski"}
                />
                <Fact
                  label="Poruka"
                  value={
                    data.lead.message ? (
                      <span className="leading-relaxed whitespace-pre-line">
                        {data.lead.message}
                      </span>
                    ) : null
                  }
                />
                <Fact label="Stiglo" value={stampText(data.lead.created_at)} />
                <Fact
                  label="Obavještenje"
                  value={
                    data.lead.notify_error
                      ? `Nije poslato: ${data.lead.notify_error}`
                      : stampText(data.lead.notified_at)
                  }
                />
              </Facts>
            </Panel>

            <Panel title="Status">
              <div className="flex flex-wrap gap-2">
                {SETTABLE.map((status) => (
                  <button
                    key={status}
                    type="button"
                    aria-pressed={data.lead.status === status}
                    disabled={busy !== null || data.lead.status === status}
                    aria-busy={busy === status}
                    onClick={() => void changeStatus(status)}
                    className={buttonClass}
                  >
                    {LEAD_STATUS_LABELS[status]}
                  </button>
                ))}
              </div>
              {data.lead.status === "accepted" && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Upit je prihvaćen kad je od njega napravljen projekat, pa se status više ne
                  mijenja odavde.
                </p>
              )}
            </Panel>

            <Panel title="Projekat">
              {data.lead.project_id ? (
                <p>
                  <GoLink
                    to={`?v=projekat&id=${data.lead.project_id}`}
                    className="font-semibold underline decoration-red decoration-2 underline-offset-4 hover:text-red"
                  >
                    Otvori projekat
                  </GoLink>
                </p>
              ) : (
                <div className="grid gap-4">
                  <fieldset className="grid gap-2">
                    <legend className="eyebrow mb-1 text-muted">Dogovoreni paket</legend>
                    {PACKAGE_IDS.map((option) => (
                      <label
                        key={option}
                        className="pick flex min-h-11 cursor-pointer items-center gap-3 border-2 border-line px-3 py-2 has-[:checked]:border-ink"
                      >
                        <input
                          type="radio"
                          name="convert-package"
                          value={option}
                          checked={packageId === option}
                          onChange={() => setPackageId(option)}
                          className="accent-red"
                        />
                        <span>{packageText(option)}</span>
                      </label>
                    ))}
                  </fieldset>

                  <button
                    type="button"
                    disabled={busy !== null}
                    aria-busy={busy === "convert"}
                    onClick={() => void convert()}
                    className={`${primaryButtonClass} justify-self-start`}
                  >
                    {busy === "convert" ? "Pravim…" : "Napravi projekat"}
                  </button>

                  <p className="text-sm leading-relaxed text-muted">
                    Paket je ono što je već dogovoreno van sajta. Pravljenje projekta ništa ne
                    naplaćuje i ne šalje ništa klijentu.
                  </p>
                </div>
              )}
            </Panel>

            <Panel title="Brisanje">
              {data.lead.project_id ? (
                <p className="leading-relaxed text-muted">
                  Od ovog upita je napravljen projekat, pa se više ne briše — projekat bi ostao
                  bez svog porijekla. Obrišite projekat ako treba da nestane i jedno i drugo.
                </p>
              ) : (
                <>
                  <p className="max-w-prose leading-relaxed text-muted">
                    Trajno uklanja upit sa svim bilješkama i istorijom. Za spam, duplikat ili
                    sopstveni test.
                  </p>
                  <ConfirmButton
                    label="Obriši upit"
                    confirmLabel="Sigurno obriši"
                    busy={busy !== null}
                    onConfirm={() => void remove()}
                    className="mt-3"
                  />
                </>
              )}
            </Panel>

            {problem && <DataError code={problem} />}

            <Notes
              notes={data.notes}
              onAdd={async (body) => {
                const answer = await addLeadNote(id, body);
                if (answer.ok) reload();
                return answer;
              }}
            />

            <Panel title="Istorija">
              <Timeline rows={data.activity} />
            </Panel>
          </div>
        )}
      </AsyncView>
    </>
  );
}
