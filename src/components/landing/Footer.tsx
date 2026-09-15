import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { hasPhone, instagramLink, site, whatsappLink } from "@/config/site";

export function Footer({ dict }: { dict: Dictionary }) {
  const home = dict.lang === "en" ? "/en/" : "/";
  const footerLink =
    "inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-ink hover:underline";

  return (
    <footer className="border-t-2 border-ink">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-sm text-muted">
        <Link href={home} className="flex min-h-11 items-center gap-2.5">
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
        {/* Every link a full 44px row, so a thumb lands on it, and the
            WhatsApp beside the handle once a number is configured. */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <Link
            href={dict.lang === "en" ? "/en/privacy/" : "/privacy/"}
            className={footerLink}
          >
            {dict.footer.privacy}
          </Link>
          {hasPhone && (
            <a
              href={whatsappLink(dict.contact.direct.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLink}
            >
              WhatsApp
            </a>
          )}
          {site.instagram && (
            <a
              href={instagramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLink}
            >
              @{site.instagram}
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
