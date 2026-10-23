"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Film, type FilmSource } from "@/components/motion/Film";
import { gsap, reducedMotion } from "@/components/motion/gsap";
import { ArrowIcon, CheckIcon } from "./icons";
import { SceneLabel, SectionHead } from "./SectionHead";

type Genre = {
  name: string;
  price: string;
  intro: string;
  includes: readonly string[];
  note?: string;
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
    if (reducedMotion()) return;
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
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="ekspertiza" data-scene={dict.film.scenes.expertise} className="scroll-mt-20 py-24 sm:py-32">
      <div className="shell">
        <SectionHead
          slate={<SceneLabel word={dict.film.scene} n={4} name={dict.film.scenes.expertise} />}
          title={expertise.title}
          mark={expertise.mark}
        />
      </div>

      <div className="shell mt-14 grid gap-6 sm:mt-16 lg:gap-10">
        {genres.map((genre, i) => (
          <article
            key={genre.name}
            data-card
            className={`relative origin-top overflow-hidden rounded-[1.75rem] lg:sticky ${genre.look.card}`}
            style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
          >
            <div className="grid min-h-[min(46rem,82vh)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="flex flex-col p-7 sm:p-10 lg:p-14">
                <p className="eyebrow">
                  {expertise.genre} {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-5 text-[clamp(3.25rem,7vw,6.5rem)]">{genre.name}</h3>
                <p className="headline mt-4 text-2xl">{genre.price}</p>
                <p className="mt-6 max-w-xl text-lg leading-relaxed">{genre.intro}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {genre.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 size-5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {genre.note && <p className="mt-6 max-w-xl text-sm leading-relaxed">{genre.note}</p>}
                <Ask href="#kontakt" tone={genre.look.tone}>
                  {expertise.ask}
                </Ask>
              </div>

              <div className={`relative flex items-center justify-center p-6 sm:p-10 ${genre.look.media}`}>
                <Film
                  source={genre.film}
                  labels={{ play: dict.motion.play, pause: dict.motion.pause }}
                  className={`w-full overflow-hidden rounded-[1.25rem] ${genre.film.kind === "reel" ? "max-w-[18rem]" : "max-w-[30rem]"}`}
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
    <a href={href} className={`btn group mt-10 inline-flex min-h-12 w-fit items-center gap-2.5 px-6 py-3 ${look}`}>
      {children}
      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </a>
  );
}
