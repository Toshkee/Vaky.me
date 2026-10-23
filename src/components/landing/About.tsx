import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { Film } from "@/components/motion/Film";
import { ExternalIcon } from "./icons";

const PORTRAIT_SIZES = "(min-width: 64rem) 9rem, 6rem";

/**
 * Who the visitor is writing to: one person, with a face and a name, and the
 * portfolio that says the rest.
 *
 * It sits right under the hero because "who makes this?" comes before "what
 * have they made?". The bio is set large, as a statement rather than a
 * caption, with the portrait and name as its byline; beside it, a film of
 * pavletosic.com shows the portfolio being asked a question.
 */
export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;
  const { founder } = site;
  const host = new URL(founder.url).host;

  return (
    <section className="bg-paper-2">
      <div className="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div>
          <h2 className="eyebrow eyebrow--dot">{about.title}</h2>

          <p className="mt-7 text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.32] font-medium tracking-[-0.015em] text-pretty">
            {about.body}
          </p>

          <div className="mt-9 flex items-center gap-5">
            <picture className="shrink-0">
              <source
                type="image/avif"
                srcSet="/about/pavle-tosic-320.avif 320w, /about/pavle-tosic-640.avif 640w"
                sizes={PORTRAIT_SIZES}
              />
              <img
                src="/about/pavle-tosic-320.webp"
                srcSet="/about/pavle-tosic-320.webp 320w, /about/pavle-tosic-640.webp 640w"
                sizes={PORTRAIT_SIZES}
                alt={about.photoAlt}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className="block size-20 rounded-full object-cover sm:size-24 lg:size-36"
              />
            </picture>
            <div>
              <p className="headline text-2xl">{founder.name}</p>
              <p className="mt-1 text-muted">{about.role}</p>
              <a
                href={founder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-sun decoration-2 underline-offset-[6px] transition-colors hover:text-sun-ink"
              >
                {/* The host alone on a phone, where the label would push the
                    arrow onto a line of its own. */}
                <span className="hidden sm:inline">{about.link}: </span>
                {host}
                <span className="sr-only"> ({dict.work.newTab})</span>
                <ExternalIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
            </div>
          </div>
        </div>

        <figure>
          <Film
            source={{
              kind: "portfolio",
              inputProps: { url: host, question: about.film.question, label: about.film.label },
            }}
            labels={{ play: dict.motion.play, pause: dict.motion.pause }}
            className="overflow-hidden rounded-[1.25rem] border border-line bg-paper"
          />
          <figcaption className="mt-4 text-sm text-muted">{about.film.note}</figcaption>
        </figure>
      </div>
    </section>
  );
}
