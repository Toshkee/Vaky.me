"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import {
  addProjectNote,
  cancelOnboarding,
  createOnboarding,
  getProject,
  saveProject,
  type ProjectPatch,
  type ProjectRow,
  type RequestRow,
  type ScopeWarning,
} from "@/lib/admin/client";
import { isPackageId, isValidEmail, type ApiErrorCode } from "@/lib/onboarding/schema";
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS, isProjectStatus } from "@/lib/workflow";
import { Briefs } from "./Briefs";
import { Files } from "./Files";
import { Notes } from "./Notes";
import { Submission } from "./Submission";
import {
  AsyncView,
  ConfirmButton,
  DataError,
  EmptyState,
  Fact,
  Facts,
  Field,
  GoLink,
  PACKAGE_OPTIONS,
  Panel,
  SelectField,
  StatusPill,
  Timeline,
  buttonClass,
  inputClass,
  isLiveRequest,
  primaryButtonClass,
  stampText,
  useLoad,
} from "./ui";

/**
 * The whole workspace for one engagement, in one read.
 *
 * Every action on this screen refetches the project when it succeeds — the
 * timeline, the status and the scope flags are all downstream of things done
 * here, and recomputing them on the server is cheaper than keeping five copies
 * of the truth in sync in the browser. The refetch keeps what is on screen
 * until the new data lands, so saving a note does not blank the page.
 */

const STATUS_OPTIONS = PROJECT_STATUSES.map((status) => ({
  value: status,
  label: PROJECT_STATUS_LABELS[status],
}));

export function ProjectDetail({ id }: { id: string }) {
  const load = useCallback(() => getProject(id), [id]);
  const { result, busy, reload } = useLoad(load);

  return (
    <>
      <p className="text-sm">
        <GoLink
          to="?v=projekti"
          className="underline decoration-line underline-offset-4 hover:text-red"
        >
          Nazad na projekte
        </GoLink>
      </p>

      <AsyncView result={result} busy={busy} onRetry={reload}>
        {(data) => (
          <div className="mt-4 grid gap-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="headline text-2xl break-words">{data.project.business_name}</h1>
              <StatusPill kind="project" value={data.project.status} />
              {data.request && <StatusPill kind="request" value={data.request.status} />}
            </div>

            {data.warnings.length > 0 && <Warnings warnings={data.warnings} />}

            <ProjectForm project={data.project} onSaved={reload} />

            <OnboardingBlock projectId={id} request={data.request} onChanged={reload} />

            {data.lead && (
              <Panel title="Upit">
                <p>
                  <GoLink
                    to={`?v=upiti&id=${data.lead.id}`}
                    className="underline decoration-line underline-offset-4 hover:text-red"
                  >
                    Otvori upit od {stampText(data.lead.created_at)}
                  </GoLink>
                </p>
              </Panel>
            )}

            {data.submission ? (
              <Submission submission={data.submission} />
            ) : (
              <Panel title="Odgovori klijenta">
                <EmptyState>Klijent još nije popunio upitnik.</EmptyState>
              </Panel>
            )}

            <Files projectId={id} files={data.files} onChanged={reload} />

            <Notes
              notes={data.notes}
              onAdd={async (body) => {
                const answer = await addProjectNote(id, body);
                if (answer.ok) reload();
                return answer;
              }}
            />

            <Briefs projectId={id} briefs={data.briefs} />

            <Panel title="Istorija">
              <Timeline rows={data.activity} />
            </Panel>
          </div>
        )}
      </AsyncView>
    </>
  );
}

/** Flags raised by comparing the answers against the package that is actually
 *  agreed. Advisory on purpose: nothing here stopped the client, and nothing
 *  here is shown to them. */
function Warnings({ warnings }: { warnings: readonly ScopeWarning[] }) {
  return (
    <section aria-labelledby="scope-warnings" className="border-2 border-red bg-paper-2 p-4">
      <h2 id="scope-warnings" className="headline text-lg text-red">
        Provjeri obim
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        Interna napomena za tebe. Klijent ovo ne vidi i ništa mu nije blokirano — ovo je poziv da
        se dogovor provjeri prije nego što izrada krene.
      </p>
      <ul className="mt-3 grid gap-2">
        {warnings.map((warning) => (
          <li key={warning.id} className="leading-relaxed">
            {warning.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectForm({ project, onSaved }: { project: ProjectRow; onSaved: () => void }) {
  const [form, setForm] = useState<ProjectPatch>(() => ({
    businessName: project.business_name,
    contactName: project.contact_name ?? "",
    email: project.email ?? "",
    phone: project.phone ?? "",
    instagram: project.instagram ?? "",
    existingSite: project.existing_site ?? "",
    packageId: isPackageId(project.package_id) ? project.package_id : "start",
    status: isProjectStatus(project.status) ? project.status : "created",
  }));
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [code, setCode] = useState<ApiErrorCode | null>(null);
  const [problem, setProblem] = useState<string | null>(null);

  function update(patch: Partial<ProjectPatch>) {
    setForm((current) => ({ ...current, ...patch }));
    setSaved(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    if (form.email.trim() && !isValidEmail(form.email)) {
      setProblem("Provjeri email adresu.");
      return;
    }

    setBusy(true);
    setCode(null);
    setProblem(null);

    const answer = await saveProject(project.id, {
      ...form,
      businessName: form.businessName.trim(),
      contactName: form.contactName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      instagram: form.instagram.trim(),
      existingSite: form.existingSite.trim(),
    });

    setBusy(false);
    if (!answer.ok) {
      setCode(answer.code);
      return;
    }
    setSaved(true);
    onSaved();
  }

  return (
    <Panel title="Podaci">
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="project-business"
            label="Naziv biznisa"
            value={form.businessName}
            onChange={(value) => update({ businessName: value })}
            required
            maxLength={160}
          />
          <Field
            id="project-contact"
            label="Kontakt osoba"
            value={form.contactName}
            onChange={(value) => update({ contactName: value })}
            maxLength={120}
          />
          <Field
            id="project-email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => update({ email: value })}
            maxLength={160}
          />
          <Field
            id="project-phone"
            label="Telefon"
            type="tel"
            value={form.phone}
            onChange={(value) => update({ phone: value })}
            maxLength={40}
          />
          <Field
            id="project-instagram"
            label="Instagram"
            value={form.instagram}
            onChange={(value) => update({ instagram: value })}
            maxLength={120}
          />
          <Field
            id="project-site"
            label="Postojeći sajt"
            value={form.existingSite}
            onChange={(value) => update({ existingSite: value })}
            maxLength={300}
          />
          <SelectField
            id="project-package"
            label="Paket"
            value={form.packageId}
            options={PACKAGE_OPTIONS}
            onChange={(value) => {
              if (isPackageId(value)) update({ packageId: value });
            }}
            hint="Promjena paketa ne dira već date odgovore — otvoren link se prebacuje na nova pitanja."
          />
          <SelectField
            id="project-status"
            label="Status"
            value={form.status}
            options={STATUS_OPTIONS}
            onChange={(value) => {
              if (isProjectStatus(value)) update({ status: value });
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={busy || !form.businessName.trim()}
            aria-busy={busy}
            className={primaryButtonClass}
          >
            {busy ? "Čuvam…" : "Sačuvaj"}
          </button>
          <p role="status" className="text-sm text-muted">
            {saved && "Sačuvano."}
          </p>
        </div>

        {problem && (
          <p role="alert" className="text-sm font-semibold text-red">
            {problem}
          </p>
        )}
        {code && <DataError code={code} />}
      </form>
    </Panel>
  );
}

/**
 * The private onboarding link.
 *
 * The URL exists in the clear exactly once — the database keeps only a hash of
 * the token — so it is shown here with a copy button and a plain warning, and
 * a link that got away is replaced rather than recovered.
 */
function OnboardingBlock({
  projectId,
  request,
  onChanged,
}: {
  projectId: string;
  request: RequestRow | null;
  onChanged: () => void;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState<"create" | "cancel" | null>(null);
  const [code, setCode] = useState<ApiErrorCode | null>(null);
  const [copied, setCopied] = useState<"idle" | "done" | "manual">("idle");
  const field = useRef<HTMLInputElement>(null);

  const live = isLiveRequest(request?.status ?? null);

  async function create() {
    setBusy("create");
    setCode(null);
    setCopied("idle");
    const answer = await createOnboarding(projectId);
    setBusy(null);
    if (!answer.ok) {
      setCode(answer.code);
      return;
    }
    setUrl(answer.data.url);
    onChanged();
  }

  async function cancel() {
    setBusy("cancel");
    setCode(null);
    const answer = await cancelOnboarding(projectId);
    setBusy(null);
    if (!answer.ok) {
      setCode(answer.code);
      return;
    }
    setUrl(null);
    onChanged();
  }

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied("done");
    } catch {
      field.current?.focus();
      field.current?.select();
      setCopied("manual");
    }
  }

  return (
    <Panel title="Onboarding link">
      {url && (
        <div className="mb-4 border-2 border-ink bg-paper-2 p-4">
          <p className="leading-relaxed font-semibold">
            Ovo je jedini put da se link vidi — server čuva samo njegov otisak. Pošalji ga klijentu
            sada; ako se izgubi, može se napraviti samo novi.
          </p>
          <label htmlFor="onboarding-url" className="eyebrow mt-3 block text-muted">
            Link za klijenta
          </label>
          <input
            id="onboarding-url"
            ref={field}
            readOnly
            value={url}
            onFocus={(event) => event.target.select()}
            className={`${inputClass} mt-1`}
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => void copy()} className={buttonClass}>
              Kopiraj link
            </button>
            <p role="status" className="text-sm text-muted">
              {copied === "done" && "Kopirano."}
              {copied === "manual" && "Kopiranje nije prošlo — link je označen, kopiraj ručno."}
            </p>
          </div>
        </div>
      )}

      {request ? (
        <Facts>
          <Fact label="Status linka" value={<StatusPill kind="request" value={request.status} />} />
          <Fact label="Napravljen" value={stampText(request.created_at)} />
          <Fact label="Klijent otvorio" value={stampText(request.first_opened_at)} />
          <Fact label="Zadnja aktivnost" value={stampText(request.last_activity_at)} />
          <Fact label="Popunjen" value={stampText(request.completed_at)} />
        </Facts>
      ) : (
        <EmptyState>Za ovaj projekat još nije napravljen onboarding link.</EmptyState>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {live ? (
          <ConfirmButton
            label="Poništi link"
            confirmLabel="Sigurno poništi"
            busy={busy === "cancel"}
            onConfirm={() => void cancel()}
          />
        ) : (
          <button
            type="button"
            disabled={busy !== null}
            aria-busy={busy === "create"}
            onClick={() => void create()}
            className={buttonClass}
          >
            {request ? "Napravi novi link" : "Napravi onboarding link"}
          </button>
        )}
      </div>

      {live && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Poništavanje zatvara formu i klijentu odmah prestaje da radi, i usred popunjavanja.
        </p>
      )}

      {code && (
        <div className="mt-3">
          <DataError code={code} />
        </div>
      )}
    </Panel>
  );
}
