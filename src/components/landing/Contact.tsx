import type { Dictionary } from "@/i18n";
import {
  emailLink,
  instagramLink,
  site,
  viberLink,
  whatsappLink,
} from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

/** The close: a poster headline and five plain rows. No tiles, no icons. */
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
      label: dict.contact.viber,
      value: site.phoneDisplay,
      href: viberLink(),
      external: false,
      primary: false,
    },
    {
      label: dict.contact.instagram,
      value: `@${site.instagram}`,
      href: instagramLink(),
      external: true,
      primary: false,
    },
    {
      label: dict.contact.call,
      value: site.phoneDisplay,
      href: site.phoneHref,
      external: false,
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
    <section id="kontakt" className="scroll-mt-16 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="headline max-w-3xl text-[clamp(3rem,9vw,6.5rem)]">
            {dict.contact.title}
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">{dict.contact.sub}</p>
        </Reveal>

        <div className="mt-14 max-w-3xl">
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-line py-5 last:border-b"
            >
              <span
                className={`text-sm font-bold tracking-[0.16em] uppercase ${
                  row.primary ? "text-red-soft" : "text-muted"
                }`}
              >
                {row.label}
              </span>
              <span className="text-xl font-semibold transition-colors group-hover:text-red-bright sm:text-2xl">
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
        </div>
      </div>
    </section>
  );
}
