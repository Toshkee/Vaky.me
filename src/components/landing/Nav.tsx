import Link from "next/link";
import type { Dictionary } from "@/i18n";

/**
 * A masthead, not a floating nav bar: name left, sections right, one heavy
 * rule under the lot. It scrolls away like the top of a printed page — the
 * WhatsApp FAB is what stays within reach once you are past the hero.
 */
export function Nav({ dict }: { dict: Dictionary }) {
  const links = [
    { label: dict.nav.work, href: "#radovi" },
    { label: dict.nav.pricing, href: "#cijene" },
    { label: dict.nav.contact, href: "#kontakt" },
  ];

  const home = dict.lang === "en" ? "/en/" : "/";

  return (
    <header className="border-b-2 border-ink">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-6 px-5 sm:px-8">
        <Link
          href={home}
          className="tap headline inline-block py-3 text-lg tracking-[0.01em] uppercase sm:text-xl"
          aria-label="VibeLab.me"
        >
          VibeLab<span className="text-red">.me</span>
        </Link>

        <nav className="flex items-baseline gap-5 text-xs sm:gap-7 sm:text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="sweep inline-block py-3 font-medium">
              {l.label}
            </a>
          ))}
          <Link
            href={dict.nav.langHref}
            className="sweep inline-block py-3 font-bold"
            aria-label={dict.lang === "en" ? "Crnogorski" : "English"}
          >
            {dict.nav.langLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
