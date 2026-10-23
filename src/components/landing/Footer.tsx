import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { BrandWordmark } from "@/components/BrandWordmark";
import { hasPhone, instagramLink, site, whatsappLink } from "@/config/site";

/**
 * The foot of the page, on the same ink as the contact section above it, so
 * the close reads as one dark block: the mark, the line the studio stands
 * by, and the few links a visitor comes back down here for.
 */
export function Footer({ dict }: { dict: Dictionary }) {
  const home = dict.lang === "en" ? "/en/" : "/";
  const footerLink =
    "inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-paper hover:underline";

  return (
    <footer className="on-ink bg-ink text-muted-dark">
      <div className="shell border-t border-ink-2 py-10">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <Link href={home} className="tap text-[1.6rem]">
            <BrandWordmark tone="paper" />
          </Link>
          <p className="max-w-sm text-sm">{dict.footer.tagline}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-sm">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.city},{" "}
            {dict.lang === "en" ? "Montenegro" : "Crna Gora"}
          </p>
          {/* Every link a full 44px row, so a thumb lands on it, and the
              WhatsApp beside the handle once a number is configured. */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href={dict.lang === "en" ? "/en/privacy/" : "/privacy/"} className={footerLink}>
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
              <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className={footerLink}>
                @{site.instagram}
              </a>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
