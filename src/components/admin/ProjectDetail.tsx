"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import {
  addProjectNote,
  cancelOnboarding,
  createOnboarding,
  deleteProject,
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
  HoldButton,
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
  TRADE_OPTIONS,
  Timeline,
  buttonClass,
  inputClass,
  isLiveRequest,
  packageText,
  primaryButtonClass,
  stampText,
  tradeName,
  useGo,
  useLoad,
} from "./ui";

/**
 * The whole workspace for one engagement, in one read.
 *
 * The order is the order of work: the link while the client has not answered,
 * the brief once they have, then what they said and sent. The edit form, the
 * history and deletion are on the page because they must be reachable, not
 * because they are read, so they open on demand.
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

const linkClass = "underline decoration-line underline-offset-4 hover:text-red";

export function ProjectDetail({ id }: { id: string }) {
  const load = useCallback(() => getProject(id), [id]);
  const { result, busy, reload } = useLoad(load);

  return (
    <>
      <p className="text-sm">
        <GoLink to="?v=projekti" className={linkClass}>
          Nazad na projekte
        </GoLink>
      </p>

      <AsyncView result={result} busy={busy} onRetry={reload}>
        {(data) => {
          const { project } = data;
          const live = isLiveRequest(data.request?.status ?? null);
          return (
            <div className="mt-4 grid gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h1 className="headline text-2xl break-words">{project.business_name}</h1>
                  <StatusPill kind="project" value={project.status} />
                  {data.request && live && <StatusPill kind="request" value={data.request.status} />}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {packageText(project.package_id)}
                  {tradeName(project.trade) && <> · {tradeName(project.trade)}</>}
                  {project.contact_name && <> · {project.contact_name}</>}
                  {project.email && (
                    <>
                      {" · "}
                      <a href={`mailto:${project.email}`} className={linkClass}>
                        {project.email}
                      </a>
                    </>
                  )}
                  {project.phone && (
                    <>
                      {" · "}
                      <a href={`tel:${project.phone.replace(/\s/g, "")}`} className={linkClass}>
                        {project.phone}
                      </a>
                    </>
                  )}
                  {data.lead && (
                    <>
                      {" · "}
                      <GoLink to={`?v=upiti&id=${data.lead.id}`} className={linkClass}>
                        iz upita od {stampText(data.lead.created_at)}
                      </GoLink>
                    </>
                  )}
                </p>
              </div>

              {data.warnings.length > 0 && <Warnings warnings={data.warnings} />}

              <OnboardingBlock projectId={id} request={data.request} onChanged={reload} />

              <Briefs projectId={id} briefs={data.briefs} />

              {data.submission && <Submission submission={data.submission} project={project} />}

              <Files projectId={id} files={data.files} onChanged={reload} />

              <Notes
                notes={data.notes}
                onAdd={async (body) => {
                  const answer = await addProjectNote(id, body);
                  if (answer.ok) reload();
                  return answer;
                }}
              />

              <ProjectForm project={project} onSaved={reload} />

              <Panel title="Istorija" folded>
                <Timeline rows={data.activity} />
              </Panel>

              <DeleteBlock projectId={id} hasFiles={data.files.length > 0} />
            </div>
          );
        }}
      </AsyncView>
    </>
  );
}

/**
 * The one thing on this screen that cannot be undone.
 *
 * Last, folded, and armed before it fires — the same two-step the onboarding
 * link uses, because the mistake being guarded against is the same one: a
 * press meant for the button above it.
 */
function DeleteBlock({ projectId, hasFiles }: { projectId: string; hasFiles: boolean }) {
  const go = useGo();
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<ApiErrorCode | null>(null);

  async function remove() {
    setBusy(true);
    setProblem(null);
    const answer = await deleteProject(projectId);
    /* Left busy on success: the view is on its way out, and a live button on a
       project that no longer exists only invites a second press. */
    if (answer.ok) go("?v=projekti");
    else {
      setBusy(false);
      setProblem(answer.code);
    }
  }

  return (
    <Panel title="Brisanje" folded>
      <p className="max-w-prose text-sm leading-relaxed text-muted">
        Briše projekat sa linkovima, odgovorima, bilješkama, brifovima i istorijom
        {hasFiles ? " — i fajlove koje je klijent poslao" : ""}. Upit ostaje i vraća se na
        „Ozbiljan upit“. Ništa od ovoga se ne vraća.
      </p>

      <HoldButton
        label="Obriši projekat"
        busy={busy}
        onConfirm={() => void remove()}
        className="mt-3"
      />

      {problem && (
        <div className="mt-3">
          <DataError code={problem} />
        </div>
      )}
    </Panel>
  );
}

/** Flags raised by comparing the answers against the package that is actually
 *  agreed. Advisory on purpose: nothing here stopped the client, and nothing
 *  here is shown to them. */
function Warnings({ warnings }: { warnings: readonly ScopeWarning[] }) {
  return (
    <section aria-labelledby="scope-warnings" className="border-2 border-red bg-paper p-4">
      <h2 id="scope-warnings" className="headline text-lg text-red">
        Provjeri obim
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        Klijent ovo ne vidi i ništa mu nije blokirano — samo provjeri dogovor prije izrade.
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
    trade: project.trade ?? "",
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
    <Panel title="Podaci i status" folded>
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
            hint="Već dati odgovori ostaju; otvoren link prelazi na nova pitanja."
          />
          <SelectField
            id="project-trade"
            label="Djelatnost"
            value={form.trade}
            options={TRADE_OPTIONS}
            onChange={(value) => update({ trade: value })}
            hint="Poslije promjene generiši brief ponovo."
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
 *
 * Open while the link is the thing to do — none yet, or the client has it —
 * and folded once the questionnaire is in, when the facts here are history.
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
  const settled = request !== null && !live && url === null;

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
    <Panel title="Onboarding link" folded={settled}>
      {url && (
        <div className="mb-4 border-2 border-ink bg-paper-2 p-4">
          <p className="leading-relaxed font-semibold">
            Link se vidi samo sada — server čuva samo njegov otisak. Pošalji ga klijentu odmah;
            izgubljen se ne vraća, pravi se novi.
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
          {live && <Fact label="Zadnja aktivnost" value={stampText(request.last_activity_at)} />}
          {request.completed_at && <Fact label="Popunjen" value={stampText(request.completed_at)} />}
        </Facts>
      ) : (
        <EmptyState>Link još nije napravljen. Klijent bez njega ne može da popuni upitnik.</EmptyState>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {live ? (
          <HoldButton
            label="Poništi link"
            busy={busy === "cancel"}
            onConfirm={() => void cancel()}
          />
        ) : (
          <button
            type="button"
            disabled={busy !== null}
            aria-busy={busy === "create"}
            onClick={() => void create()}
            className={request ? buttonClass : primaryButtonClass}
          >
            {request ? "Napravi novi link" : "Napravi onboarding link"}
          </button>
        )}
        {live && (
          <p className="text-sm leading-relaxed text-muted">
            Poništen link klijentu odmah prestaje da radi, i usred popunjavanja.
          </p>
        )}
      </div>

      {code && (
        <div className="mt-3">
          <DataError code={code} />
        </div>
      )}
    </Panel>
  );
}
