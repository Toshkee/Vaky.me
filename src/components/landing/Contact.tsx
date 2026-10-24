"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { emailLink, hasPhone, instagramDmLink, phoneDisplay, site, whatsappLink } from "@/config/site";
import { hasTurnstile } from "@/config/services";
import { track } from "@/lib/analytics";
import { isValidEmail, isValidPhone } from "@/lib/onboarding/schema";
import { OFFERED_LEAD_NEEDS, type OfferedLeadNeed } from "@/lib/workflow";
import { Tag } from "@/components/ui/Tag";
import { useAutoGrow } from "@/components/ui/useAutoGrow";
import { useMagnets } from "@/components/motion/magnet";
import { ArrowIcon } from "./icons";
import { Marked, SceneLabel } from "./SectionHead";
import { Turnstile } from "./Turnstile";

/**
 * The close, and the page's one conversion point: the hero and the nav both
 * point here, and nothing in between asks for anything.
 *
 * What it asks for is deliberately small — a name, an email, and whatever else
 * the visitor feels like adding. It is an enquiry, not an order: nothing is
 * chosen, nothing is priced and nothing is paid here. Vaky reads it, writes
 * back, and the two of them agree on the work somewhere a person can ask
 * questions. Only then does a private link to the real brief exist.
 *
 * The enquiry posts to this site's own `/api/lead`, which stores it before it
 * emails anyone — so a mail provider's bad minute cannot lose a lead. When
 * that call fails (offline, or a plain `next dev` where `/api/` does not
 * exist) the visitor is not left holding a dead button: Instagram sits beside
 * the submit, and an email with everything they typed is one link away.
 *
 * It opens with the question set large and one round red button that leans
 * toward the mouse, the direct lines as pills under it, and then the form on
 * its own card with what happens next beside it.
 */
type Status = "idle" | "sending" | "sent" | "invalid" | "phone" | "challenge" | "offline" | "spam" | "error";

export function Contact({ dict }: { dict: Dictionary }) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [need, setNeed] = useState<OfferedLeadNeed | "">("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [started, setStarted] = useState(false);
  const messageRef = useAutoGrow(message);
  const scene = useRef<HTMLElement>(null);
  useMagnets(scene);
  const c = dict.contact.lead;
  const d = dict.contact;

  const valid = name.trim().length >= 2 && isValidEmail(email.trim());

  /* What goes to Instagram or into an email, when the visitor takes one of
     those routes instead. Same fields, written as a sentence a person can
     read in a chat thread. */
  const written = () => {
    const lines = [c.prefill.replace("{link}", link.trim() || business.trim() || "—")];
    if (name.trim()) lines.push(`${c.nameLabel}: ${name.trim()}`);
    if (email.trim()) lines.push(`${c.emailLabel}: ${email.trim()}`);
    if (phone.trim()) lines.push(`${c.phoneLabel}: ${phone.trim()}`);
    if (need) lines.push(`${c.needLabel}: ${c.needOptions[need]}`);
    if (message.trim()) lines.push("", message.trim());
    return lines.join("\n");
  };

  function begin() {
    if (started) return;
    setStarted(true);
    track("lead_form_started", { lang: dict.lang });
  }

  function typed<T>(set: (value: T) => void) {
    return (value: T) => {
      set(value);
      if (status !== "idle" && status !== "sent") setStatus("idle");
    };
  }

  /* The same move the brief makes when a step fails (see `focusProblem` in
     src/components/onboarding/Onboarding.tsx): put the caret on the field that
     has to change. Without it the status line updates three elements away and
     a screen-reader or switch user is told something is wrong but not what. */
  function focusProblem(id: string) {
    document.getElementById(id)?.focus();
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid) {
      setStatus("invalid");
      focusProblem(name.trim().length < 2 ? "lead-name" : "lead-email");
      return;
    }
    if (phone.trim() && !isValidPhone(phone.trim())) {
      setStatus("phone");
      focusProblem("lead-phone");
      return;
    }
    if (trap) return; // a bot filled the hidden field; drop it silently
    if (hasTurnstile && !token) {
      setStatus("challenge");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          businessName: business.trim(),
          email: email.trim(),
          phone: phone.trim(),
          link: link.trim(),
          need,
          message: message.trim(),
          language: dict.lang,
          challenge: token,
          website: trap,
        }),
      });

      if (response.ok) {
        setStatus("sent");
        track("lead_form_submitted", { lang: dict.lang, transport: "form" });
        /* Emptied only once the server has said yes: it confirms the enquiry
           went somewhere, and a second press of the button then cannot quietly
           send the same person twice. */
        setName("");
        setBusiness("");
        setEmail("");
        setPhone("");
        setLink("");
        setNeed("");
        setMessage("");
        return;
      }

      /* Everything the visitor typed stays in the fields on every failure —
         retyping an enquiry because a provider hiccuped is how a lead is
         lost. The wording follows the server's own code so "too many
         attempts" never reads as "something went wrong". */
      let code = "";
      try {
        const body = (await response.json()) as { error?: unknown };
        code = typeof body.error === "string" ? body.error : "";
      } catch {
        code = "";
      }
      if (response.status === 429 || code === "rate-limit") setStatus("spam");
      else if (code === "challenge") setStatus("challenge");
      else setStatus("error");
      track("lead_form_failed", { lang: dict.lang, reason: code || "provider" });

      /* For whoever is looking at the console, not for the visitor. A 404 here
         means the page is being served without the Functions behind it — a
         plain `next dev`, or a static preview — and the enquiry never reached
         a server at all. Worth saying once, because on screen it is
         indistinguishable from a provider having a bad minute. */
      if (response.status === 404) {
        console.warn(
          "[Vaky] /api/lead answered 404: this build is being served without Cloudflare Functions. " +
            "Run `npm run build && npm run dev:api` to exercise the form locally.",
        );
      }
    } catch {
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      setStatus(offline ? "offline" : "error");
      track("lead_form_failed", { lang: dict.lang, reason: offline ? "offline" : "network" });
    }
  }

  /**
   * Two taps, not one. Opening Instagram in the same gesture that writes the
   * clipboard means the app takes over the screen before the "copied" line can
   * render — the visitor lands in an empty thread never knowing the message was
   * waiting to be pasted. So the first tap copies and relabels the button, and
   * only the second one leaves the page. With nothing typed there is nothing to
   * copy, so that case still goes straight through.
   */
  async function sendInstagram() {
    if (!name.trim() || copied) {
      track("lead_form_submitted", { lang: dict.lang, transport: "instagram" });
      window.open(instagramDmLink(), "_blank", "noopener,noreferrer");
      return;
    }
    try {
      await navigator.clipboard.writeText(written());
      setCopied(true);
    } catch {
      window.open(instagramDmLink(), "_blank", "noopener,noreferrer");
    }
  }

  const sending = status === "sending";

  const statusMessage = {
    idle: copied ? c.copied : c.note,
    sending: c.sending,
    sent: c.success,
    invalid: c.errorRequired,
    phone: c.errorPhone,
    challenge: c.errorChallenge,
    offline: c.errorOffline,
    spam: c.errorSpam,
    error: c.errorProvider,
  }[status];
  const isError = ["invalid", "phone", "challenge", "offline", "spam", "error"].includes(status);
  const failed = ["offline", "spam", "error"].includes(status);

  /* One pill per channel: the channel's name, the handle or number beside it. */
  const pill =
    "group inline-flex min-h-12 items-center gap-3 rounded-full border-[1.5px] border-ink px-5 py-2 font-semibold transition-colors hover:bg-ink hover:text-paper";
  const pillValue = "min-w-0 text-sm font-normal text-muted transition-colors group-hover:text-muted-dark";
  /* Split the way the brief's fields are (src/components/onboarding/Field.tsx):
     a field that failed keeps its error edge while focused, so tabbing into
     the very field you were asked to fix does not repaint it as fine. */
  const field =
    "mt-2 block w-full rounded-xl border-[1.5px] bg-white px-4 py-3 transition-colors placeholder:text-muted focus:outline-none";
  const fieldEdge = (invalid: boolean) =>
    invalid ? "border-danger focus:border-danger" : "border-line-strong focus:border-ink";
  const fieldLabel = "text-sm font-semibold";

  /* Which field the current status is actually about. `invalid` covers both
     required fields at once, so each is checked on its own rather than
     reddening the pair and making the visitor guess which one is wrong. */
  const problem = {
    name: status === "invalid" && name.trim().length < 2,
    email: status === "invalid" && !isValidEmail(email.trim()),
    phone: status === "phone",
  };

  /* Every field shares the same handlers; only the label, the value and the
     placeholder differ. Written once here rather than five times below. */
  const text = (
    id: string,
    label: string,
    value: string,
    set: (value: string) => void,
    extra: {
      placeholder: string;
      type?: string;
      inputMode?: "email" | "tel" | "url";
      autoComplete?: string;
      required?: boolean;
      /** True when the status line below is about this field. */
      invalid?: boolean;
    },
  ) => (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {!extra.required && <span className="font-normal text-muted"> ({c.optional})</span>}
      </label>
      <input
        id={id}
        name={id.replace("lead-", "")}
        type={extra.type ?? "text"}
        inputMode={extra.inputMode}
        required={extra.required}
        autoComplete={extra.autoComplete}
        autoCapitalize={extra.autoComplete === "name" || extra.autoComplete === "organization" ? "words" : "none"}
        autoCorrect="off"
        spellCheck={false}
        value={value}
        aria-invalid={extra.invalid || undefined}
        /* Only the field the message is about points at it — describing every
           field with the same sentence would say "check name and email" while
           the caret sits on the phone number. */
        aria-describedby={extra.invalid ? "lead-status" : undefined}
        onChange={(event) => {
          typed(set)(event.target.value);
          setCopied(false);
        }}
        onFocus={begin}
        placeholder={extra.placeholder}
        className={`${field} ${fieldEdge(Boolean(extra.invalid))}`}
      />
    </div>
  );

  return (
    <section ref={scene} id="kontakt" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <SceneLabel name={dict.film.scenes.contact} />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div className="max-w-4xl">
            <h2 className="display text-poster-xl">
              <Marked text={d.title} mark={d.titleMark} />
            </h2>
            <p className="headline mt-5 text-xl sm:text-2xl">
              {c.bubble.pre}
              <span className="text-red">{c.bubble.em}</span>
              {c.bubble.post}
            </p>
          </div>
          {/* The one round button on the page: it leans toward the mouse and
              takes the visitor to the first field of the form. */}
          <a
            href="#forma"
            data-magnet="0.35"
            data-umami-event="contact_round_button"
            onClick={() => window.setTimeout(() => document.getElementById("lead-name")?.focus({ preventScroll: true }), 700)}
            className="flex size-32 shrink-0 items-center justify-center rounded-full bg-red p-4 text-center font-semibold text-white transition-colors hover:bg-ink sm:size-40 sm:text-lg"
          >
            {dict.film.cta} →
          </a>
        </div>

        {/* The direct lines, as pills that lean toward the mouse. */}
        <div className="mt-10 border-t border-ink pt-6">
          <h3 className="eyebrow text-muted">{d.direct.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {site.instagram && (
              <li>
                <a href={instagramDmLink()} target="_blank" rel="noopener noreferrer" data-magnet className={pill}>
                  {d.direct.instagram}
                  <span className={pillValue}>@{site.instagram}</span>
                </a>
              </li>
            )}
            {hasPhone && (
              <li>
                <a
                  href={whatsappLink(d.direct.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnet
                  data-umami-event="lead_form_submitted"
                  data-umami-event-transport="whatsapp"
                  className={pill}
                >
                  {d.direct.whatsapp}
                  <span className={pillValue}>{phoneDisplay()}</span>
                </a>
              </li>
            )}
            <li className="min-w-0">
              <a href={emailLink(dict.contact.emailSubject, dict.contact.prefill)} data-magnet className={`${pill} max-w-full`}>
                {d.direct.email}
                <span className={`${pillValue} truncate`}>{site.email}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          {/* What happens after. On a phone it sits under the form. */}
          <aside className="order-2 lg:pt-2">
            <h3 className="eyebrow text-muted">{d.direct.pointsTitle}</h3>
            <ol className="mt-4 grid gap-3 leading-relaxed text-muted">
              {d.direct.points.map((point, i) => (
                <li key={point} className="grid grid-cols-[1.5rem_1fr] gap-2">
                  <span className="tnum font-semibold text-red">{i + 1}.</span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </aside>

          <form
            id="forma"
            onSubmit={submit}
            noValidate
            className="on-paper order-1 scroll-mt-28 rounded-2xl bg-paper-2 p-6 text-ink sm:p-8"
          >
            <Tag tone="red">{c.eyebrow}</Tag>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {text("lead-name", c.nameLabel, name, setName, {
                placeholder: c.namePlaceholder,
                autoComplete: "name",
                required: true,
                invalid: problem.name,
              })}
              {text("lead-business", c.businessLabel, business, setBusiness, {
                placeholder: c.businessPlaceholder,
                autoComplete: "organization",
              })}
              {text("lead-email", c.emailLabel, email, setEmail, {
                placeholder: c.emailPlaceholder,
                type: "email",
                inputMode: "email",
                autoComplete: "email",
                required: true,
                invalid: problem.email,
              })}
              {text("lead-phone", c.phoneLabel, phone, setPhone, {
                placeholder: c.phonePlaceholder,
                type: "tel",
                inputMode: "tel",
                autoComplete: "tel",
                invalid: problem.phone,
              })}
            </div>

            <div className="mt-5">
              {text("lead-link", c.linkLabel, link, setLink, {
                placeholder: c.linkPlaceholder,
                inputMode: "url",
              })}
            </div>

            {/* Every answer on the table, one tap each, instead of a system
                menu that opens in the OS's own grey. They are real radios —
                the chip is the label — so arrow keys and screen readers get a
                radio group for free. */}
            <fieldset className="mt-5 min-w-0 border-0 p-0">
              <legend className={fieldLabel}>
                {c.needLabel}
                <span className="font-normal text-muted"> ({c.optional})</span>
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {OFFERED_LEAD_NEEDS.map((option) => {
                  const checked = need === option;
                  return (
                    <label
                      key={option}
                      className={`pick relative flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] px-4 py-2 leading-snug transition-colors ${
                        checked ? "border-ink bg-ink text-paper" : "border-line-strong bg-white hover:border-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="need"
                        value={option}
                        checked={checked}
                        onChange={() => {
                          typed(setNeed)(option);
                          setCopied(false);
                        }}
                        /* The question is optional, and a radio cannot be
                           unticked on its own: a second tap on the chosen
                           answer takes it back. Space gets its own handler
                           because a browser sends no click for it on a radio
                           that is already checked. */
                        onClick={() => {
                          if (!checked) return;
                          setNeed("");
                          setCopied(false);
                        }}
                        onKeyDown={(event) => {
                          if (event.key !== " " || !checked) return;
                          event.preventDefault();
                          setNeed("");
                          setCopied(false);
                        }}
                        onFocus={begin}
                        className="sr-only"
                      />
                      {c.needOptions[option]}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-5">
              <label htmlFor="lead-message" className={fieldLabel}>
                {c.messageLabel}
                <span className="font-normal text-muted"> ({c.optional})</span>
              </label>
              <textarea
                ref={messageRef}
                id="lead-message"
                name="message"
                /* The floor, not the ceiling — see useAutoGrow. */
                rows={3}
                maxLength={2000}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setCopied(false);
                }}
                onFocus={begin}
                placeholder={c.messagePlaceholder}
                className={`${field} ${fieldEdge(false)} resize-none text-base`}
              />
            </div>

            {/* Bait. A person never sees this; a form-filling bot fills
                everything it finds, and anything that arrives with this set
                is answered with a cheerful 200 and stored nowhere. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={trap}
              onChange={(event) => setTrap(event.target.value)}
              className="hidden"
            />

            {hasTurnstile && started && <Turnstile onToken={setToken} />}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="btn btn-primary group inline-flex min-h-13 items-center justify-center gap-2.5 bg-red px-6 py-3 text-white hover:bg-red-deep disabled:opacity-70"
              >
                {sending ? c.sending : c.submit}
                {!sending && (
                  <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                )}
              </button>
              {site.instagram && (
                <button
                  type="button"
                  onClick={sendInstagram}
                  className="btn inline-flex min-h-13 items-center justify-center bg-transparent px-6 py-3 text-ink hover:bg-ink hover:text-paper"
                >
                  {copied ? c.submitInstagramCopied : c.submitInstagram}
                </button>
              )}
            </div>

            <p
              id="lead-status"
              role="status"
              className={`mt-4 text-sm leading-relaxed ${isError ? "font-semibold text-danger" : "text-muted"}`}
            >
              {statusMessage}
            </p>

            {/* The way out when the enquiry could not be sent — and it is a
                button, not a footnote. A visitor who has just filled seven
                fields and been told it failed will not hunt for an underline.
                The mail opens with everything they typed already in it.

                Always in the tree, even while empty: a live region only
                reliably announces content that changes INSIDE an element
                screen readers already know about. */}
            <p role="status" className={failed ? "mt-3" : undefined}>
              {failed && (
                <a
                  href={emailLink(dict.contact.emailSubject, written())}
                  className="btn inline-flex min-h-12 items-center bg-transparent px-6 py-3 text-ink hover:bg-ink hover:text-paper"
                >
                  {c.emailFallbackAction}
                </a>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
