import type { ReactNode, Ref } from "react";
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
 * `screenRef` and `screenClassName` let the caller attach the in-view scroll
 * animation (`is-live`, see globals.css); `children` is for anything that
 * belongs on the screen but is not shown, such as captures being warmed.
 */
export function PhoneFrame({
  href,
  live,
  label,
  slug,
  alt,
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
  screenRef?: Ref<HTMLDivElement>;
  screenClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(live ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      data-umami-event="portfolio_demo_opened"
      data-umami-event-demo={slug}
      className={`group block w-[16.5rem] transition-transform duration-100 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 motion-reduce:transition-none sm:w-[18rem] ${className}`}
    >
      <div className="px-frame">
        <div className="px-notch relative bg-ink px-[3px] pt-6 pb-5">
          <span aria-hidden="true" className="absolute top-2.5 left-1/2 block h-1 w-10 -translate-x-1/2 bg-paper-2/40" />
          <div
            ref={screenRef}
            className={`phone-screen px-notch aspect-[9/17] overflow-hidden bg-paper-2 ${screenClassName}`}
          >
            <picture>
              <source type="image/avif" srcSet={`/work/${slug}-phone.avif`} />
              <img
                key={slug}
                src={`/work/${slug}-phone.webp`}
                alt={alt}
                width={780}
                loading="lazy"
                decoding="async"
                className="phone-page"
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
