import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { BrandWordmark } from "@/components/BrandWordmark";
import { hasPhone, instagramLink, site, whatsappLink } from "@/config/site";
import { conceptsPath } from "./portfolio";

/**
 * The end credits: who made it, where, and the few links a visitor comes
 * back down here for — set the way a film's last card is, on black.
 */
export function Footer({ dict }: { dict: Dictionary }) {
  const home = dict.lang === "en" ? "/en/" : "/";
  const footerLink =
    "inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-paper hover:underline";

  return (
    <footer className="on-ink bg-ink text-muted-dark">
      <div className="shell py-12 sm:py-16">
        <dl className="grid gap-8 text-center sm:grid-cols-2 sm:text-left">
          <div>
            <dt className="eyebrow">{dict.film.credits.role}</dt>
            <dd className="display mt-3 text-poster-md text-paper">{site.founder.name}</dd>
          </div>
          <div className="sm:text-right">
            <dt className="eyebrow">{dict.film.credits.studio}</dt>
            <dd className="mt-3">
              <Link href={home} className="tap inline-block text-poster-sm">
                <BrandWordmark tone="paper" />
              </Link>
            </dd>
          </div>
        </dl>

        <p className="mx-auto mt-10 max-w-md text-center text-sm">{dict.footer.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-ink-2 pt-6 text-sm">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.city}, {dict.lang === "en" ? "Montenegro" : "Crna Gora"}
          </p>
          {/* Every link a full 44px row, so a thumb lands on it, and the
              WhatsApp beside the handle once a number is configured. */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href={conceptsPath(dict)} className={footerLink}>
              {dict.work.conceptsTitle}
            </Link>
            <Link href={dict.lang === "en" ? "/en/privacy/" : "/privacy/"} className={footerLink}>
              {dict.footer.privacy}
            </Link>
            {hasPhone && (
              <a href={whatsappLink(dict.contact.direct.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className={footerLink}>
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
