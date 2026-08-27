"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { emailLink, gmailComposeLink, instagramDmLink } from "@/config/site";
import { hasFormBackend, hasTurnstile, services } from "@/config/services";
import { track } from "@/lib/analytics";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Tony } from "@/components/mascot/Tony";
import { CheckIcon, SparkleIcon } from "./icons";
import { Turnstile } from "./Turnstile";

/**
 * The reply coupon, and the funnel's heart: one screen after the hero, which
 * points at it. It asks for the least a reply can be built on — the business's
 * site or Instagram, somewhere to answer, and optionally what they want.
 *
 * Two transports, one form. With a form backend configured the request is sent
 * in place and the visitor never leaves the page; without one — the state this
 * site shipped in — the same fields become a prefilled email, which is what a
 * static site can do on its own. Instagram stays next to both, because most
 * businesses here answer there first and half of them have no website at all.
 *
 * Tony watches the form. He faces the page by default, turns toward the fields
 * while they have the visitor's attention, ticks the link off once it looks
 * real, and jumps once when the message goes. Pose swaps are held frames, not
 * animations, so they survive reduced-motion; only the jump is a real
 * animation and that one is gated in CSS.
 */
type Status = "idle" | "sending" | "sent" | "invalid" | "challenge" | "offline" | "spam" | "error";

export function ConceptRequest({ dict }: { dict: Dictionary }) {
  const [link, setLink] = useState("");
  const [contact, setContact] = useState("");
  const [goal, setGoal] = useState("");
  const [trap, setTrap] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [started, setStarted] = useState(false);
  const [jump, setJump] = useState(false);
  const [gmail, setGmail] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gmailTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c = dict.hero.concept;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (gmailTimer.current) clearTimeout(gmailTimer.current);
  }, []);

  const validLink = /[.@]/.test(link) && link.trim().length >= 4;
  const valid = validLink && contact.trim().length >= 3;

  const message = () => {
    const lines = [c.prefill.replace("{link}", link.trim() || "—")];
    if (contact.trim()) lines.push(`${c.contactLabel}: ${contact.trim()}`);
    if (goal.trim()) lines.push("", goal.trim());
    return lines.join("\n");
  };

  const emailHref = emailLink(dict.contact.emailSubject, message());

  function celebrate() {
    setJump(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setJump(false), 1000);
  }

  function begin() {
    setFocused(true);
    if (started) return;
    setStarted(true);
    track("concept_form_started", { lang: dict.lang });
  }

  /**
   * mailto: fails silently on machines with no mail app configured — common on
   * desktop Windows, and it looks like the button simply did nothing. So: fire
   * the mailto, and if this page is still the visitor's focused, visible page
   * 1.6 seconds later, no mail client took over — offer Gmail's web compose
   * with the same message instead.
   */
  function sendByEmail() {
    celebrate();
    track("concept_form_submitted", { lang: dict.lang, transport: "email" });
    if (gmailTimer.current) clearTimeout(gmailTimer.current);
    const cancel = () => {
      if (gmailTimer.current) clearTimeout(gmailTimer.current);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", cancel);
    gmailTimer.current = setTimeout(() => {
      cancel();
      setGmail(true);
    }, 1600);
    window.location.href = emailHref;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid) {
      setStatus("invalid");
      return;
    }
    if (trap) return; // a bot filled the hidden field; drop it silently
    if (!hasFormBackend) {
      sendByEmail();
      return;
    }
    if (hasTurnstile && !token) {
      setStatus("challenge");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(services.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          link: link.trim(),
          contact: contact.trim(),
          goal: goal.trim(),
          language: dict.lang,
          "cf-turnstile-response": token,
        }),
      });

      if (response.ok) {
        setStatus("sent");
        celebrate();
        track("concept_form_submitted", { lang: dict.lang, transport: "form" });
        setLink("");
        setContact("");
        setGoal("");
        return;
      }

      /* Everything the visitor typed stays in the fields on every failure —
         retyping a brief because a provider hiccuped is how a lead is lost. */
      const spam = response.status === 429 || response.status === 422;
      setStatus(spam ? "spam" : "error");
      track("concept_form_failed", { lang: dict.lang, reason: spam ? "rejected" : "provider" });
    } catch {
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      setStatus(offline ? "offline" : "error");
      track("concept_form_failed", { lang: dict.lang, reason: offline ? "offline" : "network" });
    }
  }

  /**
   * Two taps, not one. Opening Instagram in the same gesture that writes the
   * clipboard means the app takes over the screen before the "copied" line can
   * render — the visitor lands in an empty thread never knowing the message was
   * waiting to be pasted. So the first tap copies and relabels the button, and
   * only the second one leaves the page. With no link typed there is nothing to
   * copy, so that case still goes straight through.
   */
  async function sendInstagram() {
    if (!link.trim() || copied) {
      celebrate();
      track("concept_form_submitted", { lang: dict.lang, transport: "instagram" });
      window.open(instagramDmLink(), "_blank", "noopener,noreferrer");
      return;
    }
    try {
      await navigator.clipboard.writeText(message());
      setCopied(true);
    } catch {
      window.open(instagramDmLink(), "_blank", "noopener,noreferrer");
    }
  }

  const attentive = focused || link.trim().length > 0;
  const sending = status === "sending";

  const statusMessage = {
    idle: copied ? c.copied : c.note,
    sending: c.sending,
    sent: c.success,
    invalid: c.errorRequired,
    challenge: c.errorChallenge,
    offline: c.errorOffline,
    spam: c.errorSpam,
    error: c.errorProvider,
  }[status];
  const isError = ["invalid", "challenge", "offline", "spam", "error"].includes(status);

  const field =
    "mt-1.5 block w-full border-2 border-line bg-paper-2 px-3 py-2.5 text-lg transition-colors placeholder:text-muted focus:border-ink focus:outline-none";
  const fieldLabel = "eyebrow text-muted";

  return (
    <section id="koncept" className="scroll-mt-24 border-t border-line bg-paper-warm">
      <div className="shell py-12 sm:py-16">
        <PixelWindow title="VIBELAB OS">
          <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <form onSubmit={submit} noValidate>
              <p>
                <span className="px inline-flex items-center gap-2 border-2 border-red bg-paper px-2.5 py-1 text-[1.15rem] leading-none text-red uppercase">
                  <SparkleIcon className="w-3.5" />
                  {c.eyebrow}
                </span>
              </p>

              <h2 className="headline mt-4 text-2xl sm:text-3xl">{c.title}</h2>
              <p className="mt-2 max-w-lg leading-relaxed text-muted">{c.body}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col justify-end">
                  <label htmlFor="concept-link" className={fieldLabel}>
                    {c.linkLabel}
                  </label>
                  <input
                    id="concept-link"
                    name="link"
                    type="text"
                    inputMode="url"
                    required
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                      setCopied(false);
                      if (status !== "idle") setStatus("idle");
                    }}
                    onFocus={begin}
                    onBlur={() => setFocused(false)}
                    placeholder={c.placeholder}
                    className={field}
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label htmlFor="concept-contact" className={fieldLabel}>
                    {c.contactLabel}
                  </label>
                  <input
                    id="concept-contact"
                    name="contact"
                    type="text"
                    required
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    autoComplete="email"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (status !== "idle") setStatus("idle");
                    }}
                    onFocus={begin}
                    onBlur={() => setFocused(false)}
                    placeholder={c.contactPlaceholder}
                    className={field}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="concept-goal" className={fieldLabel}>
                  {c.goalLabel}
                </label>
                <textarea
                  id="concept-goal"
                  name="goal"
                  rows={2}
                  maxLength={1000}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  onFocus={begin}
                  onBlur={() => setFocused(false)}
                  placeholder={c.goalPlaceholder}
                  className={`${field} text-base`}
                />
              </div>

              {/* Bait. A person never sees this; a form-filling bot fills
                  everything it finds, and anything that arrives with this set
                  is dropped here and again at the provider. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                className="hidden"
              />

              {hasFormBackend && hasTurnstile && started && <Turnstile onToken={setToken} />}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  className="px px-btn px-btn--primary block min-h-12 bg-red px-6 py-3 text-center text-[1.25rem] text-white hover:bg-red-deep disabled:opacity-70"
                >
                  {hasFormBackend ? (sending ? c.sending : c.submit) : c.submitEmail}
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

              {/* The email route stays reachable even when the form owns the
                  submit button — some people would simply rather write one. */}
              {hasFormBackend && (
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {c.fallbackTitle}{" "}
                  <a
                    href={emailHref}
                    className="font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
                  >
                    {c.submitEmail}
                  </a>
                </p>
              )}

              {gmail && (
                <p role="status" className="mt-2 text-sm leading-relaxed">
                  {c.emailFallback}{" "}
                  <a
                    href={gmailComposeLink(dict.contact.emailSubject, message())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
                  >
                    {c.emailFallbackAction} ↗
                  </a>
                </p>
              )}
            </form>

            {/* Tony at his post. Below lg he stands under the form, small and
                out of everything's way; from lg up he gets the right column.
                Either way his feet are on a drawn ground line. */}
            <div
              aria-hidden="true"
              className="relative flex flex-col justify-end pt-2 lg:pt-0 lg:pl-6"
            >
              {valid && (
                <span className="px-card absolute bottom-28 left-1/2 ml-6 px-2 py-1.5 lg:bottom-40 lg:ml-9">
                  <CheckIcon className="w-4 text-ok" />
                </span>
              )}
              <div className="tony-track w-full justify-center">
                <Tony
                  direction={jump ? "front" : attentive ? "left" : "front"}
                  pose={jump ? "jump" : "idle"}
                  scale={0.4}
                  className="lg:hidden"
                />
                <Tony
                  direction={jump ? "front" : attentive ? "left" : "front"}
                  pose={jump ? "jump" : "idle"}
                  scale={0.55}
                  className="hidden lg:block"
                />
              </div>
            </div>
          </div>
        </PixelWindow>
      </div>
    </section>
  );
}
