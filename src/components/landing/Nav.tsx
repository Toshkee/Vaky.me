"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { BrandWordmark } from "@/components/BrandWordmark";

/**
 * A masthead, not a floating nav bar: Tony's mark and the name on the left,
 * sections on the right, one heavy rule under the lot. The sticky treatment
 * keeps the work, pricing and contact sections within reach without turning
 * the masthead into a large app bar. The one loud thing in it is the red
 * concept button — the same action the whole page funnels toward.
 *
 * The section you are in is marked with a red rule under the label, drawn in
 * CSS off `aria-current` so the indicator and the announced state can never
 * disagree.
 *
 * Labels are NOT set in the pixel face, though the button is. Rendered at 4x,
 * pixel faces proved ambiguous at nav sizes — a brand name that misreads is
 * not a trade worth making for texture.
 */
export function Nav({ dict }: { dict: Dictionary }) {
  const links = [
    { label: dict.nav.work, href: "#radovi" },
    { label: dict.nav.pricing, href: "#cijene" },
    { label: dict.nav.contact, href: "#kontakt" },
  ];

  const home = dict.lang === "en" ? "/en/" : "/";
  const [active, setActive] = useState("");

  /* Which section is under the reading line, recomputed from geometry.

     This deliberately is not an IntersectionObserver watching a band. Contact
     is the last section and short, and the footer below it is not tall enough
     to push it up the viewport: at maximum scroll it sits around 2/3 down the
     page, so any band placed high enough to feel like "where you are" is a
     band Contact can never reach. It was unreachable by arithmetic, not by
     mistuning — hence the explicit bottom case below.

     An observer also only fires on change, so a callback that reads only the
     delivered entries never learns that the last active section has left. That
     is why Pricing used to stay lit all the way through the FAQ. */
  useEffect(() => {
    const ids = ["radovi", "cijene", "kontakt"];

    const update = () => {
      const line = window.innerHeight * 0.35;

      const current = ids.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= line && rect.bottom > line;
      });
      if (current) {
        setActive(`#${current}`);
        return;
      }

      // Contact never crosses the line: the page runs out of scroll while it
      // is still below the middle of the screen, so it takes over as soon as
      // it is on screen at all. Nothing else can be under the line by then.
      const last = ids[ids.length - 1];
      const rect = document.getElementById(last)?.getBoundingClientRect();
      const lastOnScreen = rect ? rect.top < window.innerHeight : false;

      // Between the marked sections nothing is a nav target, so the indicator
      // clears rather than pointing at a section you have already left.
      setActive(lastOnScreen ? `#${last}` : "");
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const linkClass = (href: string) =>
    `nav-link inline-flex min-h-11 items-center px-2 font-semibold transition-colors ${
      active === href ? "text-red" : "hover:text-red"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href={home} className="tap shrink-0">
          <BrandWordmark className="h-7 sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={linkClass(l.href)}
              aria-current={active === l.href ? "location" : undefined}
            >
              {l.label}
            </a>
          ))}
          {/* No call to action up here. It pointed at #kontakt, which is
              exactly where the hero's button already goes — two red buttons
              on one screen competing for the same click, and the masthead is
              for finding your way, not for closing. */}
          <Link
            href={dict.nav.langHref}
            className="tap font-bold transition-colors hover:text-red"
            aria-label={dict.lang === "en" ? "Crnogorski" : "English"}
          >
            {dict.nav.langLabel}
          </Link>
        </nav>
      </div>

      <nav className="grid grid-cols-4 border-t border-line px-3 text-center text-xs md:hidden">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            /* w-fit so the indicator rule hugs the label here too, rather than
               stretching to the full grid cell as it would by default */
            className={`${linkClass(link.href)} mx-auto w-fit`}
            aria-current={active === link.href ? "location" : undefined}
          >
            {link.label}
          </a>
        ))}
        <Link
          href={dict.nav.langHref}
          className="inline-flex min-h-11 items-center justify-center border-b-2 border-transparent font-bold transition-colors hover:text-red"
          aria-label={dict.lang === "en" ? "Crnogorski" : "English"}
        >
          {dict.nav.langLabel}
        </Link>
      </nav>
    </header>
  );
}
