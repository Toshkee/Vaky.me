"use client";

import { useState } from "react";

/**
 * A map that costs the visitor nothing until they ask for it.
 *
 * Google's `output=embed` iframe hands the visitor's IP address, user agent
 * and the embedding page to Google the moment it renders — on a demo page
 * nobody asked for that. So the frame stays unbuilt behind a real button, and
 * the address is always reachable through the plain link underneath, which
 * costs no request at all.
 */
export function MapEmbed({
  query,
  title,
  className = "",
  buttonClassName,
  linkClassName,
  note = "Mapa se učitava sa Google servera tek kada je otvoriš.",
  loadLabel = "Prikaži mapu",
  openLabel = "Otvori u Google Mapama",
}: {
  /** Plain-text place query — encoded here, never pre-encoded by the caller. */
  query: string;
  title: string;
  /** Box sizing and filters; applied to the placeholder and the iframe alike. */
  className?: string;
  buttonClassName: string;
  /** Omit where the page already carries its own "open in Maps" link. */
  linkClassName?: string;
  note?: string;
  loadLabel?: string;
  openLabel?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(query);

  if (loaded) {
    return (
      <iframe
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
        {/* A grid drawn in the demo's own text colour, so the placeholder
            reads as a map plate in every palette without an asset. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,currentColor 0 1px,transparent 1px 16px),repeating-linear-gradient(90deg,currentColor 0 1px,transparent 1px 16px)",
          }}
        />
        <p className="relative max-w-xs text-xs leading-relaxed opacity-75">{note}</p>
        <button type="button" onClick={() => setLoaded(true)} className={`relative ${buttonClassName}`}>
          {loadLabel}
        </button>
        {linkClassName ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative inline-flex min-h-11 items-center ${linkClassName}`}
          >
            {openLabel} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
