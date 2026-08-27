"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { emailLink, gmailComposeLink, instagramDmLink } from "@/config/site";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Tony } from "@/components/mascot/Tony";
import { HeartIcon } from "./icons";

/**
 * The reply coupon, now a full section — the funnel's heart, one screen after
 * the hero that points at it. It takes a website OR an Instagram handle,
 * because most businesses here have the second and not the first.
 *
 * There is no backend: email accepts a fully prefilled message. Instagram
 * does not, so its action copies the same message before opening the DM
 * thread.
 *
 * Tony watches the form. He faces the page by default, turns toward the
 * input while it has the visitor's attention, offers a heart once the link
 * looks real, and jumps once when the message is sent. Pose swaps are held
 * frames, not animations, so they survive reduced-motion; only the jump is
 * a real animation and that one is gated in CSS.
 */
export function ConceptRequest({ dict }: { dict: Dictionary }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);
  const [fallback, setFallback] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c = dict.hero.concept;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
  }, []);

  const valid = /[.@]/.test(link) && link.trim().length >= 4;

  const message = () => {
    const trimmed = link.trim();
    return trimmed ? c.prefill.replace("{link}", trimmed) : dict.contact.prefill;
  };

  const emailHref = emailLink(dict.contact.emailSubject, message());

  function celebrate() {
    setSent(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSent(false), 1000);
  }

  /**
   * mailto: fails silently on machines with no mail app configured — common
   * on desktop Windows, and it looks like the button simply did nothing. So:
   * fire the mailto, and if this page is still the visitor's focused, visible
   * page 1.6 seconds later, no mail client took over — offer Gmail's web
   * compose with the same message instead.
   */
  function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    celebrate();
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    const cancel = () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", cancel);
    fallbackTimer.current = setTimeout(() => {
      cancel();
      setFallback(true);
    }, 1600);
    window.location.href = emailHref;
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

  return (
    <section id="koncept" className="scroll-mt-24 border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <PixelWindow title="VIBELAB OS">
          <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <form onSubmit={sendEmail}>
              <p>
                <span className="px inline-flex items-center gap-2 border-2 border-red bg-paper px-2.5 py-1 text-[1.15rem] leading-none text-red uppercase">
                  <HeartIcon className="w-3.5" />
                  {c.eyebrow}
                </span>
              </p>

              <h2 className="headline mt-4 text-2xl sm:text-3xl">{c.title}</h2>
              <p className="mt-2 max-w-lg leading-relaxed text-muted">{c.body}</p>

              <label htmlFor="concept-link" className="sr-only">
                {c.title}
              </label>
              <input
                id="concept-link"
                name="link"
                type="text"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setCopied(false);
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={c.placeholder}
                className="mt-6 block w-full border-2 border-line bg-paper-2 px-3 py-2.5 text-lg transition-colors placeholder:text-muted focus:border-ink focus:outline-none"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <button
                  type="submit"
                  className="px px-btn px-btn--primary block min-h-12 bg-red px-6 py-3 text-center text-[1.25rem] text-white hover:bg-red-deep"
                >
                  {c.submitEmail}
                </button>
                <button
                  type="button"
                  onClick={sendInstagram}
                  className="px px-btn block min-h-12 bg-paper px-6 py-3 text-center text-[1.25rem] text-ink transition-colors hover:text-red"
                >
                  {copied ? c.submitInstagramCopied : c.submitInstagram}
                </button>
              </div>

              <p role="status" className="mt-4 text-xs leading-relaxed text-muted">
                {copied ? c.copied : c.note}
              </p>

              {fallback && (
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
                  <HeartIcon className="w-4 text-red" />
                </span>
              )}
              <div className="tony-track w-full justify-center">
                <Tony
                  direction={sent ? "front" : attentive ? "left" : "front"}
                  pose={sent ? "jump" : "idle"}
                  scale={0.4}
                  className="lg:hidden"
                />
                <Tony
                  direction={sent ? "front" : attentive ? "left" : "front"}
                  pose={sent ? "jump" : "idle"}
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
