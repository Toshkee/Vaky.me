"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { emailLink, instagramDmLink } from "@/config/site";
import { PixelWindow } from "@/components/ui/PixelWindow";

/**
 * The reply coupon.
 *
 * A classified ad ends with a slip you tear off and send back, which is why a
 * form belongs on a page built as a printed notice — as long as it looks like
 * a slip and not like a SaaS signup. It takes a website OR an Instagram
 * handle, because most businesses here have the second and not the first.
 *
 * There is no backend: email accepts a fully prefilled message. Instagram does
 * not, so its action copies the same message before opening the DM thread.
 */
export function ConceptRequest({ dict }: { dict: Dictionary }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const c = dict.hero.concept;

  const message = () => {
    const trimmed = link.trim();
    return trimmed ? c.prefill.replace("{link}", trimmed) : dict.contact.prefill;
  };

  const emailHref = emailLink(dict.contact.emailSubject, message());

  function sendEmail(e: React.FormEvent) {
    e.preventDefault();
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

  return (
    <PixelWindow chrome>
      {/* The one piece of drawn art on the page: three shopfronts and the site
          one of them is about to get. Decorative — it says nothing the copy
          below does not, so it is hidden from assistive tech. */}
      <div aria-hidden="true" className="flex justify-center border-b-2 border-ink bg-paper-2">
        <Image
          src="/vignette.png"
          alt=""
          width={96}
          height={64}
          className="px-art h-32 w-48"
          priority
        />
      </div>

      <form id="concept" onSubmit={sendEmail} className="scroll-mt-28 p-5 md:scroll-mt-16 sm:p-6">
        <p className="eyebrow text-red">{c.eyebrow}</p>

        <h2 className="headline mt-3 text-xl">{c.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>

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
          placeholder={c.placeholder}
          className="mt-5 block w-full border-2 border-line bg-paper-2 px-3 py-2.5 text-lg transition-colors placeholder:text-muted focus:border-ink focus:outline-none"
        />

        <button
          type="submit"
          className="px px-btn px-btn--primary mt-5 block min-h-12 w-full bg-red px-6 py-3.5 text-center text-[1.0625rem] font-semibold text-white hover:bg-red-deep"
        >
          {c.submitEmail}
        </button>

        <button
          type="button"
          onClick={sendInstagram}
          className="px px-btn mt-4 block min-h-12 w-full bg-paper px-6 py-3 text-center text-[1.0625rem] font-semibold text-ink transition-colors hover:text-red"
        >
          {copied ? c.submitInstagramCopied : c.submitInstagram}
        </button>

        <p role="status" className="mt-4 text-xs leading-relaxed text-muted">
          {copied ? c.copied : c.note}
        </p>
      </form>
    </PixelWindow>
  );
}
