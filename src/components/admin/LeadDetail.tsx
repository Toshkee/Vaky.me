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
import { ConceptBrief } from "./ConceptBrief";
import { Notes } from "./Notes";
import {
  AsyncView,
  HoldButton,
  DataError,
  Fact,
  Facts,
  GoLink,
  Panel,
  SelectField,
  StatusPill,
  TRADE_OPTIONS,
  Timeline,
  buttonClass,
  mailErrorText,
  packageText,
  primaryButtonClass,
  stampText,
  useGo,
  useLoad,
} from "./ui";

/**
 * One enquiry, and the one decision that matters about it: does it become a
 * project. That form sits right under the name until it has been answered;
 * after that the header links to the project and the form is gone.
 *
 * "Prihvaćen" is deliberately not among the settable statuses — a lead
 * becomes accepted by being converted, which also creates the project record,
 * and a status set by hand would leave the two out of step.
 */

const SETTABLE: readonly Exclude<LeadStatus, "accepted">[] = LEAD_STATUSES.filter(
  (status): status is Exclude<LeadStatus, "accepted"> => status !== "accepted",
);

const STATUS_OPTIONS = SETTABLE.map((status) => ({
  value: status,
  label: LEAD_STATUS_LABELS[status],
}));

function isSettable(value: string): value is Exclude<LeadStatus, "accepted"> {
  return (SETTABLE as readonly string[]).includes(value);
}

const linkClass = "underline decoration-line underline-offset-4 hover:text-red";

export function LeadDetail({ id }: { id: string }) {
  const go = useGo();
  const load = useCallback(() => getLead(id), [id]);
  const { result, busy: refreshing, reload } = useLoad(load);

  const [busy, setBusy] = useState<string | null>(null);
  const [problem, setProblem] = useState<ApiErrorCode | null>(null);
  const [packageId, setPackageId] = useState<PackageId>("start");
  const [trade, setTrade] = useState("");

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
    const answer = await convertLead(id, packageId, trade);
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
        <GoLink to="?v=upiti" className={linkClass}>
          Nazad na upite
        </GoLink>
      </p>

      <AsyncView result={result} busy={refreshing} onRetry={reload}>
        {(data) => {
          const { lead } = data;
          const meta = [
            isLeadNeed(lead.need) ? LEAD_NEED_LABELS[lead.need] : null,
            `stiglo ${stampText(lead.created_at)}`,
            lead.language === "en" ? "forma na engleskom" : null,
          ].filter(Boolean);

          return (
            <div className="mt-4 grid gap-8">
              <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h1 className="headline text-2xl break-words">
                      {lead.business_name || lead.name}
                    </h1>
                    <StatusPill kind="lead" value={lead.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted">{meta.join(" · ")}</p>
                  {lead.notify_error && (
                    <p className="mt-1 text-sm font-semibold text-red">
                      Obavještenje o upitu nije stiglo mejlom: {mailErrorText(lead.notify_error)}
                    </p>
                  )}
                </div>

                {lead.project_id ? (
                  <GoLink to={`?v=projekat&id=${lead.project_id}`} className={buttonClass}>
                    Otvori projekat
                  </GoLink>
                ) : (
                  <div className="w-full sm:w-52 sm:shrink-0">
                    <SelectField
                      id="lead-status"
                      label="Status"
                      value={lead.status}
                      options={STATUS_OPTIONS}
                      disabled={busy !== null}
                      onChange={(value) => {
                        if (isSettable(value)) void changeStatus(value);
                      }}
                    />
                  </div>
                )}
              </div>

              {!lead.project_id && (
                <Panel title="Napravi projekat">
                  <div className="grid gap-4">
                    <fieldset>
                      <legend className="eyebrow mb-2 text-muted">Dogovoreni paket</legend>
                      <div className="flex flex-wrap gap-2">
                        {PACKAGE_IDS.map((option) => (
                          <label
                            key={option}
                            className="pick flex min-h-11 cursor-pointer items-center gap-2.5 border-2 border-line bg-paper px-3 py-2 has-[:checked]:border-ink"
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
                      </div>
                    </fieldset>

                    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                      <SelectField
                        id="convert-trade"
                        label="Djelatnost"
                        value={trade}
                        options={TRADE_OPTIONS}
                        onChange={setTrade}
                      />
                      <button
                        type="button"
                        disabled={busy !== null}
                        aria-busy={busy === "convert"}
                        onClick={() => void convert()}
                        className={primaryButtonClass}
                      >
                        {busy === "convert" ? "Pravim…" : "Napravi projekat"}
                      </button>
                    </div>

                    <p className="text-sm leading-relaxed text-muted">
                      Ništa se ne naplaćuje i klijentu se ništa ne šalje. Djelatnost bira strukturu
                      u briefu za izradu i mijenja se i kasnije.
                    </p>
                  </div>
                </Panel>
              )}

              <Panel title="Kontakt">
                <Facts>
                  {lead.business_name && <Fact label="Osoba" value={lead.name} />}
                  <Fact
                    label="Email"
                    value={
                      <a href={`mailto:${lead.email}`} className={linkClass}>
                        {lead.email}
                      </a>
                    }
                  />
                  <Fact
                    label="Telefon"
                    value={
                      lead.phone ? (
                        <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className={linkClass}>
                          {lead.phone}
                        </a>
                      ) : null
                    }
                  />
                  {/* Free text on the public form — people type "@handle" as
                      readily as a URL, so it is stored as typed. It becomes a
                      link here only if it parses as http(s); anything else is
                      shown as text, never as an href Vaky would click. */}
                  {lead.link && (
                    <Fact
                      label="Instagram ili sajt"
                      value={
                        isValidUrl(lead.link) ? (
                          <a
                            href={normaliseUrl(lead.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`break-all ${linkClass}`}
                          >
                            {lead.link}
                          </a>
                        ) : (
                          <span className="break-all">{lead.link}</span>
                        )
                      }
                    />
                  )}
                  {lead.message && (
                    <Fact
                      label="Poruka"
                      value={
                        <span className="leading-relaxed whitespace-pre-line">{lead.message}</span>
                      }
                    />
                  )}
                </Facts>
              </Panel>

              <ConceptBrief leadId={id} />

              {problem && <DataError code={problem} />}

              <Notes
                notes={data.notes}
                onAdd={async (body) => {
                  const answer = await addLeadNote(id, body);
                  if (answer.ok) reload();
                  return answer;
                }}
              />

              <Panel title="Istorija" folded>
                <Timeline rows={data.activity} />
              </Panel>

              {/* A lead that became a project is not deletable — the project
                  would lose its origin. Deleting the project brings it back
                  to "Ozbiljan upit", and the option with it. */}
              {!lead.project_id && (
                <Panel title="Brisanje" folded>
                  <p className="text-sm leading-relaxed text-muted">
                    Trajno briše upit sa bilješkama i istorijom. Za spam, duplikat ili test.
                  </p>
                  <HoldButton
                    label="Obriši upit"
                    busy={busy !== null}
                    onConfirm={() => void remove()}
                    className="mt-3"
                  />
                </Panel>
              )}
            </div>
          );
        }}
      </AsyncView>
    </>
  );
}
