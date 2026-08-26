"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import { emailLink, instagramDmLink } from "@/config/site";

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

  function sendInstagram() {
    if (link.trim()) {
      navigator.clipboard
        .writeText(message())
        .then(() => setCopied(true))
        .catch(() => setCopied(false));
    }
    window.open(instagramDmLink(), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      id="concept"
      onSubmit={sendEmail}
      className="scroll-mt-28 border-2 border-ink p-5 md:scroll-mt-16 sm:p-6"
    >
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

      <button
        type="submit"
        className="mt-4 block min-h-12 w-full bg-red px-6 py-3.5 text-center font-semibold text-white transition-colors duration-150 hover:bg-red-deep"
      >
        {c.submitEmail}
      </button>

      <button
        type="button"
        onClick={sendInstagram}
        className="mt-2.5 block min-h-12 w-full border-2 border-ink px-6 py-3 text-center font-semibold text-ink transition-colors hover:border-red hover:text-red"
      >
        {c.submitInstagram}
      </button>

      <p role="status" className="mt-3 text-xs leading-relaxed text-muted">
        {copied ? c.copied : c.note}
      </p>
    </form>
  );
}
