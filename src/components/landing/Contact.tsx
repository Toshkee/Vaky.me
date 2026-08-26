import type { Dictionary } from "@/i18n";
import {
  emailLink,
  instagramLink,
  site,
  viberLink,
  whatsappLink,
} from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

/** The close: headline on the left, five plain contact rows on the right. */
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
    <section id="kontakt" className="scroll-mt-16 border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2 className="headline text-4xl sm:text-6xl">{dict.contact.title}</h2>
          <p className="mt-5 max-w-md text-lg text-muted">{dict.contact.sub}</p>
        </Reveal>

        <div className="self-center">
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-line py-4 last:border-b sm:py-5"
            >
              <span className={`eyebrow ${row.primary ? "text-red" : "text-muted"}`}>
                {row.label}
              </span>
              <span className="text-lg font-semibold transition-colors group-hover:text-red sm:text-xl">
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
