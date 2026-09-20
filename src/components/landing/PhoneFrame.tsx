"use client";

import { useState, type ReactNode, type Ref } from "react";
import Link from "next/link";

/**
 * A project's opening screens inside a phone: an ink body with a stepped
 * corner, a paper screen with the same notch, a speaker slot above and a
 * home bar below. The whole device is one link that opens the project.
 *
 * The phone is a tall capture, not a live frame: `_headers` forbids framing
 * the site anywhere, including here, and a demo running inside a picture of
 * a phone on a real phone is worse than opening it. Captures are regenerated
 * with `node scripts/capture-phone-shots.mjs` against a running dev server.
 *
 * When `slug` changes, the new capture is fetched behind the one on screen
 * and swapped in once it has arrived. A visitor switching trades keeps
 * looking at the last phone until the next is ready, never at an empty one.
 *
 * `screenRef` and `screenClassName` let the caller attach the in-view scroll
 * animation (`is-live`, see globals.css); `children` is for anything that
 * belongs on the screen but is not shown, such as captures being warmed.
 */
/* `small` shrinks to its column — two of them share a phone screen — and
   never grows past a hand-sized phone. */
const SIZES = {
  default: "w-[16.5rem] sm:w-[18rem]",
  small: "w-full max-w-[15rem]",
} as const;

export function PhoneFrame({
  href,
  live,
  label,
  slug,
  alt,
  size = "default",
  screenRef,
  screenClassName = "",
  className = "",
  children,
}: {
  href: string;
  /** A real client site opens in its own window; a concept opens in place. */
  live: boolean;
  /** The accessible name of the link. */
  label: string;
  slug: string;
  alt: string;
  size?: keyof typeof SIZES;
  screenRef?: Ref<HTMLDivElement>;
  screenClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  /* The capture painted on the screen right now. It trails `slug` by exactly
     the time the next picture takes to arrive. */
  const [shown, setShown] = useState(slug);
  const pending = shown !== slug;

  /* `onLoad` covers the network; the ref covers a capture already in the
     cache, which can be complete before any listener hears about it. */
  const arrived = (node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth > 0) setShown(slug);
  };

  return (
    <Link
      href={href}
      {...(live ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      data-umami-event="portfolio_demo_opened"
      data-umami-event-demo={slug}
      className={`group block transition-transform duration-100 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 motion-reduce:transition-none ${SIZES[size]} ${className}`}
    >
      <div className="px-frame">
        <div className="px-notch relative bg-ink px-[3px] pt-6 pb-5">
          <span aria-hidden="true" className="absolute top-2.5 left-1/2 block h-1 w-10 -translate-x-1/2 bg-paper-2/40" />
          <div
            ref={screenRef}
            /* The dot grid is the screen's empty state, not decoration. The
               captures below the fold are lazy, so the first thing a visitor
               scrolling into this section sees is the screen before its
               picture — and a flat cream rectangle inside a phone reads as a
               site that failed to load. The grid is the same ground the map
               placeholder uses, costs no request, and is covered the moment
               the capture paints over it. */
            className={`phone-screen px-grid px-notch aspect-[9/17] overflow-hidden bg-paper-2 ${screenClassName}`}
          >
            {pending && (
              <picture>
                <source type="image/avif" srcSet={`/work/${shown}-phone.avif`} />
                <img src={`/work/${shown}-phone.webp`} alt="" width={780} className="phone-page" />
              </picture>
            )}
            <picture key={slug}>
              <source type="image/avif" srcSet={`/work/${slug}-phone.avif`} />
              <img
                ref={arrived}
                src={`/work/${slug}-phone.webp`}
                alt={alt}
                width={780}
                loading={pending ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => setShown(slug)}
                className={pending ? "phone-page absolute inset-0 opacity-0" : "phone-page"}
              />
            </picture>
            {children}
          </div>
          <span aria-hidden="true" className="absolute bottom-2 left-1/2 block h-1 w-16 -translate-x-1/2 bg-paper-2/40" />
        </div>
      </div>
    </Link>
  );
}
