import type { Dictionary } from "@/i18n";
import {
  emailLink,
  instagramLink,
  site,
  viberLink,
  whatsappLink,
} from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The close: headline on the left, three plain contact rows on the right.
 *
 * WhatsApp, Viber and "Pozovi" are all the same number, so printing it three
 * times read as padding. The number appears once, as the primary row; the
 * other two ways to reach it are a single line underneath.
 */
export function Contact({ dict }: { dict: Dictionary }) {
  const rows = [
    {
      label: dict.contact.whatsapp,
      value: site.phoneDisplay,
      href: whatsappLink(dict.contact.prefill),
      external: true,
      primary: true,
    },
    {
      label: dict.contact.instagram,
      value: `@${site.instagram}`,
      href: instagramLink(),
      external: true,
      primary: false,
    },
    {
      label: dict.contact.emailLabel,
      value: site.email,
      href: emailLink(dict.contact.emailSubject),
      external: false,
      primary: false,
    },
  ];

  return (
    <section id="kontakt" className="scroll-mt-4 border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">{dict.contact.title}</h2>
          <p className="mt-3 max-w-md text-muted">{dict.contact.sub}</p>
        </Reveal>

        <div className="self-center">
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-4 first:border-t-2 first:border-t-ink"
            >
              <span className={`eyebrow ${row.primary ? "text-red" : "text-muted"}`}>
                {row.label}
              </span>
              <span className="tnum text-lg font-semibold transition-colors group-hover:text-red">
                {row.value}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </span>
            </a>
          ))}

          <p className="mt-4 text-sm text-muted">
            <a href={viberLink()} className="sweep tap font-semibold text-ink">
              {dict.contact.viber}
            </a>
            <span aria-hidden="true"> · </span>
            <a href={site.phoneHref} className="sweep tap font-semibold text-ink">
              {dict.contact.call}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
