"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { emailLink, instagramDmLink, instagramLink, site } from "@/config/site";
import { hasTurnstile } from "@/config/services";
import { track } from "@/lib/analytics";
import { isValidEmail, isValidPhone } from "@/lib/onboarding/schema";
import { LEAD_NEEDS, type LeadNeed } from "@/lib/workflow";
import { OsBadge } from "@/components/ui/OsBadge";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Tony } from "@/components/mascot/Tony";
import { BubbleIcon, CheckIcon, SparkleIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { Turnstile } from "./Turnstile";

/**
 * The close, and the page's one conversion point: the hero and the nav both
 * point here, and nothing in between asks for anything.
 *
 * What it asks for is deliberately small — a name, an email, and whatever else
 * the visitor feels like adding. It is an enquiry, not an order: nothing is
 * chosen, nothing is priced and nothing is paid here. VibeLab reads it, writes
 * back, and the two of them agree on the work somewhere a person can ask
 * questions. Only then does a private link to the real brief exist.
 *
 * The enquiry posts to this site's own `/api/lead`, which stores it before it
 * emails anyone — so a mail provider's bad minute cannot lose a lead. When
 * that call fails (offline, or a plain `next dev` where `/api/` does not
 * exist) the visitor is not left holding a dead button: Instagram sits beside
 * the submit, and an email with everything they typed is one link away.
 *
 * Tony watches the form. He faces the page by default, turns toward the fields
 * while they have the visitor's attention, ticks the enquiry off once it looks
 * real, and jumps once when it goes. Pose swaps are held frames, not
 * animations, so they survive reduced-motion; only the jump is a real
 * animation and that one is gated in CSS.
 */
type Status = "idle" | "sending" | "sent" | "invalid" | "phone" | "challenge" | "offline" | "spam" | "error";

export function Contact({ dict }: { dict: Dictionary }) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [need, setNeed] = useState<LeadNeed | "">("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [started, setStarted] = useState(false);
  const [jump, setJump] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c = dict.contact.lead;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

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

  function celebrate() {
    setJump(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setJump(false), 1000);
  }

  function begin() {
    setFocused(true);
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

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid) {
      setStatus("invalid");
      return;
    }
    if (phone.trim() && !isValidPhone(phone.trim())) {
      setStatus("phone");
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
        celebrate();
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
      celebrate();
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

  const attentive = focused || name.trim().length > 0;
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

  const directLink =
    "font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:text-red hover:decoration-red";
  const field =
    "mt-1.5 block w-full border-2 border-line bg-paper-2 px-3 py-2.5 text-lg transition-colors placeholder:text-muted focus:border-ink focus:outline-none";
  const fieldLabel = "eyebrow text-muted";

  const say = "px-say w-40 px-3 py-2 text-center text-sm font-semibold leading-snug";
  const bubbleLine = (
    <>
      {c.bubble.pre} <span className="text-red">{c.bubble.em}</span>
      {c.bubble.post}
      {valid && <CheckIcon className="ml-1.5 inline w-4 align-[-0.125rem] text-ok" />}
    </>
  );

  /* Every field shares the same handlers; only the label, the value and the
     placeholder differ. Written once here rather than six times below. */
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
    },
  ) => (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {!extra.required && <span className="normal-case"> ({c.optional})</span>}
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
        onChange={(event) => {
          typed(set)(event.target.value);
          setCopied(false);
        }}
        onFocus={begin}
        onBlur={() => setFocused(false)}
        placeholder={extra.placeholder}
        className={field}
      />
    </div>
  );

  return (
    <section id="kontakt" className="scroll-mt-24 border-t border-line bg-paper-warm">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<BubbleIcon />} title={dict.contact.title} />
        <p className="mt-3 max-w-xl text-muted">{dict.contact.sub}</p>

        <PixelWindow title="VIBELAB OS" className="mt-7">
          <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <form onSubmit={submit} noValidate>
              <p>
                <OsBadge tone="red">
                  <SparkleIcon className="w-3.5" />
                  {c.eyebrow}
                </OsBadge>
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {text("lead-name", c.nameLabel, name, setName, {
                  placeholder: c.namePlaceholder,
                  autoComplete: "name",
                  required: true,
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
                })}
                {text("lead-phone", c.phoneLabel, phone, setPhone, {
                  placeholder: c.phonePlaceholder,
                  type: "tel",
                  inputMode: "tel",
                  autoComplete: "tel",
                })}
                {text("lead-link", c.linkLabel, link, setLink, {
                  placeholder: c.linkPlaceholder,
                  inputMode: "url",
                })}

                <div>
                  <label htmlFor="lead-need" className={fieldLabel}>
                    {c.needLabel}
                    <span className="normal-case"> ({c.optional})</span>
                  </label>
                  <select
                    id="lead-need"
                    name="need"
                    value={need}
                    onChange={(event) => typed(setNeed)(event.target.value as LeadNeed | "")}
                    onFocus={begin}
                    onBlur={() => setFocused(false)}
                    className={field}
                  >
                    <option value="">—</option>
                    {LEAD_NEEDS.map((option) => (
                      <option key={option} value={option}>
                        {c.needOptions[option]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="lead-message" className={fieldLabel}>
                  {c.messageLabel}
                  <span className="normal-case"> ({c.optional})</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={2}
                  maxLength={2000}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setCopied(false);
                  }}
                  onFocus={begin}
                  onBlur={() => setFocused(false)}
                  placeholder={c.messagePlaceholder}
                  className={`${field} text-base`}
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

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  className="px px-btn px-btn--primary block min-h-12 bg-red px-6 py-3 text-center text-[1.25rem] text-white hover:bg-red-deep disabled:opacity-70"
                >
                  {sending ? c.sending : c.submit}
                </button>
                <button
                  type="button"
                  onClick={sendInstagram}
                  className="px px-btn block min-h-12 bg-paper px-6 py-3 text-center text-[1.25rem] text-ink transition-colors hover:text-red"
                >
                  {copied ? c.submitInstagramCopied : c.submitInstagram}
                </button>
              </div>

              <p
                role="status"
                className={`mt-4 text-xs leading-relaxed ${isError ? "font-semibold text-red" : "text-muted"}`}
              >
                {statusMessage}
              </p>

              {/* The way out when the enquiry could not be sent — and it is a
                  button, not a footnote. A visitor who has just filled seven
                  fields and been told it failed will not hunt for an underline.
                  The mail opens with everything they typed already in it, so
                  nothing is retyped.

                  Always in the tree, even while empty: a live region only
                  reliably announces content that changes INSIDE an element
                  screen readers already know about. Mounting the region
                  together with its message is exactly the pattern they miss —
                  and the person this line exists for would hear nothing. */}
              <p role="status" className={failed ? "mt-3" : undefined}>
                {failed && (
                  <a
                    href={emailLink(dict.contact.emailSubject, written())}
                    className="px px-btn inline-flex min-h-12 items-center bg-paper px-6 py-3 text-[1.25rem] text-ink transition-colors hover:text-red"
                  >
                    {c.emailFallbackAction}
                  </a>
                )}
              </p>
            </form>

            {/* Tony at his post. Below lg he stands under the form, small and
                out of everything's way; from lg up he gets the right column.
                Either way his feet are on a drawn ground line. */}
            <div
              aria-hidden="true"
              className="relative flex flex-col justify-end pt-2 lg:pt-0 lg:pl-6"
            >
              <div className="tony-track w-full justify-center">
                {/* Below lg there is no room at Tony's side, so the bubble
                    hangs over his head — in flow, so it makes its own space
                    instead of landing on the form's status line. */}
                <span className="flex flex-col items-center gap-4 lg:hidden">
                  <span className={`${say} px-say--down`}>{bubbleLine}</span>
                  <Tony
                    direction={jump ? "front" : attentive ? "left" : "front"}
                    pose={jump ? "jump" : "idle"}
                    scale={0.4}
                  />
                </span>
                {/* From lg up it stands beside him, anchored to Tony rather
                    than the column so the tail stays at his head at every
                    window width — pulled a step toward the form because
                    centered it would clip the window edge at the narrow end
                    of lg. */}
                <span className="relative hidden -translate-x-8 lg:block">
                  <span className={`${say} absolute bottom-14 left-full ml-3`}>{bubbleLine}</span>
                  <Tony
                    direction={jump ? "front" : attentive ? "left" : "front"}
                    pose={jump ? "jump" : "idle"}
                    scale={0.55}
                  />
                </span>
              </div>
            </div>
          </div>
        </PixelWindow>

        {/* The direct line, for people who would rather just write — a
            sentence, not another slab of buttons. */}
        <p className="mt-5 text-sm text-muted">
          {dict.contact.directLabel}{" "}
          <a
            href={instagramLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={directLink}
          >
            @{site.instagram}
          </a>
          <span aria-hidden="true"> · </span>
          <a href={emailLink(dict.contact.emailSubject, dict.contact.prefill)} className={directLink}>
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
