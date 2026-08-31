import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { instagramLink, site } from "@/config/site";

export function Footer({ dict }: { dict: Dictionary }) {
  const home = dict.lang === "en" ? "/en/" : "/";

  return (
    <footer className="border-t-2 border-ink">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-sm text-muted">
        <Link href={home} className="flex items-center gap-2.5">
          <Image
            src="/vaky-head.png"
            alt=""
            width={94}
            height={96}
            className="h-6 w-auto shrink-0"
          />
          <span>
            © {new Date().getFullYear()} {site.name} — {site.city},{" "}
            {dict.lang === "en" ? "Montenegro" : "Crna Gora"}
          </span>
        </Link>
        <p className="hidden md:block">{dict.footer.tagline}</p>
        <Link
          href={dict.lang === "en" ? "/en/privacy/" : "/privacy/"}
          className="underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          {dict.footer.privacy}
        </Link>
        {site.instagram && (
          <a
            href={instagramLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            @{site.instagram}
          </a>
        )}
      </div>
    </footer>
  );
}
