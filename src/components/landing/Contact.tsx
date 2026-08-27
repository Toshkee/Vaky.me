import type { Dictionary } from "@/i18n";
import { emailLink, instagramDmLink, instagramLink, site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { TonyPlay } from "@/components/mascot/TonyPlay";
import { HeartIcon } from "./icons";
import { SectionHead } from "./SectionHead";

/**
 * The close: one last VibeLab OS window. The pitch and both ways to reach us
 * on the left; on the right, Tony next to a terminal that has already made up
 * its mind. The terminal speaks its usual machine English and is decoration —
 * every fact in it is in the real copy beside it.
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
    <section id="kontakt" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHead icon={<HeartIcon />} title={dict.contact.title} />

        <PixelWindow chrome className="mt-7">
          <div className="grid gap-2 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div>
              <p className="max-w-md text-muted">{dict.contact.sub}</p>

              <p className="mt-6">
                <Button href={instagramDmLink()} external arrow>
                  {dict.contact.action}
                </Button>
              </p>

              <div className="mt-7">
                {rows.map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-3.5 first:border-t-2 first:border-t-ink"
                  >
                    <span className={`eyebrow ${row.primary ? "text-red" : "text-muted"}`}>
                      {row.label}
                    </span>
                    <span className="tnum font-semibold transition-colors group-hover:text-red">
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

            {/* the sign-off scene: Tony beside the terminal, both on one
                ground line */}
            <div aria-hidden="true" className="os-anim flex flex-col justify-end pt-4 lg:pt-0">
              <div className="tony-track w-full items-end justify-center gap-4">
                <TonyPlay direction="right" pose="stand" scale={0.42} />
                <div className="w-full max-w-[250px] border-2 border-ink bg-ink p-4">
                  <p className="px text-[1.1rem] leading-none text-red-bright uppercase">
                    VIBELAB OS
                  </p>
                  <p className="px mt-2.5 text-[1.35rem] leading-tight text-paper uppercase">
                    Let&#39;s build
                    <br />
                    something great
                    <span className="os-caret">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PixelWindow>
      </div>
    </section>
  );
}
