import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { ArrowIcon, PersonIcon } from "./icons";
import { SectionHead } from "./SectionHead";

const PORTRAIT_SIZES = "(min-width: 64rem) 15rem, (min-width: 40rem) 12rem, 7rem";

/**
 * Who the visitor is writing to: one person, with a face and a name.
 *
 * It sits right under the hero because "who makes this?" comes before "what
 * have they made?", and it is kept to a byline so it never competes with the
 * hero's one button. On a phone the portrait is a small frame beside the name
 * with the paragraph running under both, so the section costs a few lines
 * rather than a screen. From sm up the portrait stands to the left of all of
 * it, and the name and the paragraph meet at its middle.
 */
export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;
  const { founder } = site;

  return (
    <section className="border-t border-line bg-paper-warm">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<PersonIcon />} title={about.title} />

        <div className="mt-8 grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-x-5 gap-y-6 sm:mt-10 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-x-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-14">
          <PixelWindow chrome className="sm:row-span-2">
            <picture>
              <source
                type="image/avif"
                srcSet="/about/pavle-tosic-320.avif 320w, /about/pavle-tosic-640.avif 640w"
                sizes={PORTRAIT_SIZES}
              />
              <img
                src="/about/pavle-tosic-640.webp"
                srcSet="/about/pavle-tosic-320.webp 320w, /about/pavle-tosic-640.webp 640w"
                sizes={PORTRAIT_SIZES}
                alt={about.photoAlt}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className="block aspect-square w-full"
              />
            </picture>
          </PixelWindow>

          <div className="sm:self-end">
            <p className="eyebrow text-red">{about.role}</p>
            <h3 className="headline mt-2 text-2xl sm:text-3xl">{founder.name}</h3>
          </div>

          <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:self-start">
            <p className="max-w-xl leading-relaxed text-pretty sm:text-lg">{about.body}</p>
            <a
              href={founder.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-red hover:decoration-red"
            >
              {about.link}: {new URL(founder.url).host}
              <span className="sr-only"> ({dict.work.newTab})</span>
              <ArrowIcon className="w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
