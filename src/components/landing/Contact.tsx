import type { Dictionary } from "@/i18n";
import { emailLink, instagramLink, site } from "@/config/site";
import { Tony } from "@/components/mascot/Tony";

/**
 * The close: headline on the left, Instagram and email on the right.
 */
export function Contact({ dict }: { dict: Dictionary }) {
  const rows = [
    {
      label: dict.contact.instagram,
      value: `@${site.instagram}`,
      href: instagramLink(),
      external: true,
      primary: true,
    },
    {
      label: dict.contact.emailLabel,
      value: site.email,
      href: emailLink(dict.contact.emailSubject, dict.contact.prefill),
      external: false,
      primary: false,
    },
  ];

  return (
    <section id="kontakt" className="scroll-mt-28 border-t border-line md:scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* wrapper is the grid's first column — not decorative */}
          <div>
            <h2 className="headline text-2xl sm:text-3xl">{dict.contact.title}</h2>
            <p className="mt-3 max-w-md text-muted">{dict.contact.sub}</p>
          </div>

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
          </div>
        </div>

        {/* The page's last line before the footer rule. He gets the sign-off. */}
        <div className="tony-track mt-10 sm:mt-14">
          <Tony direction="right" pose="tumble" scale={0.42} lap={13} />
        </div>
      </div>
    </section>
  );
}
