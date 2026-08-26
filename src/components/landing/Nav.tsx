"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n";

/**
 * A masthead, not a floating nav bar: name left, sections right, one heavy
 * rule under the lot. The sticky treatment keeps the work, pricing and contact
 * sections within reach without turning the masthead into a large app bar.
 */
export function Nav({ dict }: { dict: Dictionary }) {
  const links = [
    { label: dict.nav.work, href: "#radovi" },
    { label: dict.nav.pricing, href: "#cijene" },
    { label: dict.nav.contact, href: "#kontakt" },
  ];

  const home = dict.lang === "en" ? "/en/" : "/";
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("#radovi, #cijene, #kontakt"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const linkClass = (href: string) =>
    `inline-flex min-h-11 items-center border-b-2 px-0.5 font-medium transition-colors ${
      active === href
        ? "border-red text-red"
        : "border-transparent hover:border-line hover:text-red"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href={home}
          className="tap headline shrink-0 text-lg tracking-[0.01em] uppercase sm:text-xl"
          aria-label="VibeLab"
        >
          Vibe<span className="text-red">Lab</span>
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
            className={linkClass(link.href)}
            aria-current={active === link.href ? "location" : undefined}
          >
            <span className="mx-auto">{link.label}</span>
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
