"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import {
  emailLink,
  instagramDmLink,
  whatsappLink,
} from "@/config/site";

/**
 * The reply coupon.
 *
 * A classified ad ends with a slip you tear off and send back, which is why a
 * form belongs on a page built as a printed notice — as long as it looks like
 * a slip and not like a SaaS signup. It takes a website OR an Instagram
 * handle, because most businesses here have the second and not the first.
 *
 * There is no backend: it composes a message and hands it to whichever app the
 * visitor picked. Email and WhatsApp both accept pre-filled text; Instagram
 * does not, so there the link goes to the clipboard and we say so out loud
 * rather than letting it disappear. With JS off nothing here fires and the
 * WhatsApp button beside it still works, so no visitor is stranded.
 */
export function ConceptRequest({ dict }: { dict: Dictionary }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const c = dict.hero.concept;

  const message = () => {
    const trimmed = link.trim();
    return trimmed ? c.prefill.replace("{link}", trimmed) : dict.contact.prefill;
  };

  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

  /* A real href, so the primary action works on middle-click, "copy link
     address", and with JS disabled — the form's submit handler exists only so
     that Enter in the field does the same thing. */
  const emailHref = emailLink(dict.contact.emailSubject, message());

  function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = emailHref;
  }

  async function sendInstagram() {
    const trimmed = link.trim();
    if (trimmed) {
      try {
        await navigator.clipboard.writeText(message());
        setCopied(true);
      } catch {
        /* clipboard blocked — the DM still opens, just without the paste hint */
      }
    }
    open(instagramDmLink());
  }

  return (
    <form onSubmit={sendEmail} className="border-2 border-ink p-5 sm:p-6">
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
        className="mt-5 block w-full border-b-2 border-line bg-transparent px-1 py-2.5 text-lg transition-colors placeholder:text-muted focus:border-ink focus:outline-none"
      />

      <a
        href={emailHref}
        className="mt-4 block w-full bg-red px-6 py-3.5 text-center font-semibold text-white transition-colors duration-150 hover:bg-red-deep"
      >
        {c.submitEmail}
      </a>
      <button type="submit" className="sr-only">
        {c.submitEmail}
      </button>

      <p className="mt-3.5 flex flex-wrap items-center gap-x-2 text-sm text-muted">
        <span>{c.or}</span>
        <button
          type="button"
          onClick={() => open(whatsappLink(message()))}
          className="sweep font-semibold text-ink"
        >
          {dict.contact.whatsapp}
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={sendInstagram} className="sweep font-semibold text-ink">
          {dict.contact.instagram}
        </button>
      </p>

      <p role="status" className="mt-3 text-xs leading-relaxed text-muted">
        {copied ? c.copied : c.note}
      </p>
    </form>
  );
}
