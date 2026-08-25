import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n";

export function Nav({ dict }: { dict: Dictionary }) {
  const links = [
    { label: dict.nav.work, href: "#radovi" },
    { label: dict.nav.pricing, href: "#cijene" },
    { label: dict.nav.contact, href: "#kontakt" },
  ];

  const home = dict.lang === "en" ? "/en/" : "/";

  return (
    <header className="nav-drop sticky top-0 z-50">
      <div className="nav-bar backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href={home} className="shrink-0" aria-label="VibeCode.me">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              priority
              className="rounded-full transition-transform duration-300 hover:rotate-[-8deg]"
            />
          </Link>

          <div className="flex items-center gap-6 sm:gap-8">
            <ul className="hidden items-center gap-8 sm:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="sweep text-sm font-medium text-white/90">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#kontakt" className="sweep text-sm font-medium text-white/90 sm:hidden">
              {dict.nav.contact}
            </a>
            <Link
              href={dict.nav.langHref}
              className="sweep text-sm font-bold"
              aria-label={dict.lang === "en" ? "Crnogorski" : "English"}
            >
              {dict.nav.langLabel}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
