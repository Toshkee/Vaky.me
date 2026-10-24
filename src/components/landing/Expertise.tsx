"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Film, type FilmSource } from "@/components/motion/Film";
import { gsap, reducedMotion } from "@/components/motion/gsap";
import { SERVICE_IDS, VIDEOS_ID } from "./facts";
import { ArrowIcon, CheckIcon } from "./icons";
import { SceneLabel, SectionHead } from "./SectionHead";

type Genre = {
  name: string;
  price: string;
  intro: string;
  includes: readonly string[];
  note?: string;
  /** A link down to where this genre can be watched. */
  more?: string;
  film: FilmSource;
  look: { card: string; tone: "ink" | "red" | "paper"; media: string };
};

/**
 * Scene four: the three genres — websites, apps, motion design — as three
 * cards that stack. Each one pins under the masthead, and as the next slides
 * up over it the one underneath steps back and dims, so the three read as a
 * deck being dealt rather than three blocks in a row. Each has its own film.
 *
 * Below lg the cards are simply one after another: on a phone a card is
 * taller than the screen, and a pinned card taller than the screen is a card
 * whose bottom half nobody can reach.
 */
export function Expertise({ dict }: { dict: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const { expertise } = dict.film;
  const { mobileApps, launchVideos } = dict.pricing;
  const villa = dict.work.items.flatMap((item) => item.projects).find((p) => p.slug === "villa-vucje");

  const genres: Genre[] = [
    {
      ...expertise.sites,
      film: {
        kind: "site",
        inputProps: { slug: "villa-vucje", domain: villa ? new URL(villa.href).host : "villavucje.me", live: dict.film.live },
      },
      look: { card: "on-ink bg-ink text-paper", tone: "ink", media: "bg-ink" },
    },
    {
      name: mobileApps.title,
      price: mobileApps.price,
      intro: mobileApps.intro,
      includes: mobileApps.includes,
      film: {
        kind: "app",
        inputProps: { screens: dict.work.app.screens.map((s) => ({ slug: s.slug, caption: s.caption })) },
      },
      look: { card: "on-red bg-red text-white", tone: "red", media: "bg-red" },
    },
    {
      name: launchVideos.title,
      price: launchVideos.price,
      intro: launchVideos.intro,
      includes: launchVideos.includes,
      note: launchVideos.note,
      more: dict.film.videos.more,
      film: {
        kind: "reel",
        inputProps: {
          kind: "launch",
          lines: [dict.reels.launch.lines[0], dict.reels.launch.lines[1]],
          slug: "konoba-skadar",
          domain: dict.motion.domain,
          cta: dict.reels.launch.cta,
        },
      },
      look: { card: "on-paper bg-paper-2 text-ink", tone: "paper", media: "bg-ink" },
    },
  ];

  useEffect(() => {
    const scope = section.current;
    if (reducedMotion() || !scope) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const trigger = { trigger: next, start: "top bottom", end: "top 25%", scrub: true };
          gsap.to(card, { scale: 0.93 - (cards.length - i - 2) * 0.025, ease: "none", scrollTrigger: trigger });
          gsap.to(card.querySelector("[data-shade]"), { opacity: 0.45, ease: "none", scrollTrigger: { ...trigger } });
        });
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="ekspertiza" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <SectionHead
          slate={<SceneLabel name={dict.film.scenes.expertise} />}
          title={expertise.title}
          mark={expertise.mark}
        />
      </div>

      <div className="shell mt-10 grid gap-5 sm:mt-12 lg:gap-8">
        {genres.map((genre, i) => (
          <article
            key={genre.name}
            id={SERVICE_IDS[i]}
            data-card
            className={`relative origin-top scroll-mt-24 overflow-hidden rounded-2xl lg:sticky ${genre.look.card}`}
            style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
          >
            <div className="grid min-h-[min(40rem,76vh)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <h3 className="display text-poster-md">{genre.name}</h3>
                <p className="headline mt-3 text-xl">{genre.price}</p>
                <p className="mt-5 max-w-xl leading-relaxed">{genre.intro}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {genre.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 size-5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {genre.note && <p className="mt-6 max-w-xl text-sm leading-relaxed">{genre.note}</p>}
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Ask href="#kontakt" tone={genre.look.tone}>
                    {expertise.ask}
                  </Ask>
                  {genre.more && (
                    <a
                      href={`#${VIDEOS_ID}`}
                      className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red"
                    >
                      {genre.more}
                      <ArrowIcon className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none" />
                    </a>
                  )}
                </div>
              </div>

              <div className={`relative flex items-center justify-center p-6 sm:p-10 ${genre.look.media}`}>
                <Film
                  source={genre.film}
                  labels={{ play: dict.motion.play, pause: dict.motion.pause }}
                  className={`w-full overflow-hidden rounded-xl ${genre.film.kind === "reel" ? "max-w-[18rem]" : "max-w-[30rem]"}`}
                  controlsClassName="right-3 bottom-3"
                  delay={300}
                />
              </div>
            </div>
            <span data-shade aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Ask({ href, tone, children }: { href: string; tone: Genre["look"]["tone"]; children: ReactNode }) {
  const look =
    tone === "paper" ? "btn-primary bg-red text-white hover:bg-red-deep" : "bg-paper text-ink hover:bg-ink hover:text-paper";
  return (
    <a href={href} className={`btn group inline-flex min-h-12 w-fit items-center gap-2.5 px-6 py-3 ${look}`}>
      {children}
      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </a>
  );
}
