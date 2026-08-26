import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { instagramLink, site } from "@/config/site";

export function Footer({ dict }: { dict: Dictionary }) {
  const home = dict.lang === "en" ? "/en/" : "/";

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-8 text-sm text-muted sm:px-8">
        <Link href={home} className="flex items-center gap-2.5" aria-label="VibeCode.me">
          <Image src="/logo.png" alt="" width={26} height={26} className="rounded-full" />
          <span>
            © {new Date().getFullYear()} {site.name} — {site.city},{" "}
            {dict.lang === "en" ? "Montenegro" : "Crna Gora"}
          </span>
        </Link>
        <p className="hidden md:block">{dict.footer.tagline}</p>
        <a
          href={instagramLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          @{site.instagram}
        </a>
      </div>
    </footer>
  );
}
