"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { VakyLockup } from "@/components/VakyHead";
import { Button } from "@/components/ui/Button";
import { INTRO_REVEAL, SplitText, gsap } from "@/components/motion/gsap";
import { SERVICE_IDS, VIDEOS_ID } from "./facts";
import { ArrowIcon } from "./icons";
import { ReelVideo } from "./ReelVideo";
import { Marked } from "./SectionHead";

/**
 * Scene one: the name, the promise, and the three things Vaky makes, each
 * with what it starts at and a way down to its card — and beside them a
 * client's video playing, so the page moves from its first second.
 *
 * When the opening titles play, the hero comes up under their rising curtain:
 * the promise line by line out of its own baselines, everything else lifting
 * in after it. On any later page of the visit the hero is simply there.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  const scene = useRef<HTMLElement>(null);
  const { hero, pricing, film } = dict;
  const { videos } = film;
  /* The Reform Fitness story, the first of the motion design videos. */
  const reel = videos.items.find((item) => item.file === "reform-fitness-prica") ?? videos.items[0];

  /* Sites and apps lead to their cards; the videos lead to where they can
     be watched. */
  const services = [
    { name: film.expertise.sites.name, price: film.expertise.sites.price, href: `#${SERVICE_IDS[0]}` },
    { name: pricing.mobileApps.title, price: pricing.mobileApps.price, href: `#${SERVICE_IDS[1]}` },
    { name: pricing.launchVideos.title, price: pricing.launchVideos.price, href: `#${VIDEOS_ID}` },
  ];

  useEffect(() => {
    const node = scene.current;
    if (document.documentElement.dataset.intro !== "play" || !node) return;
    const title = node.querySelector("h1")!;
    const split = SplitText.create(title, { type: "lines", mask: "lines" });
    const items = node.querySelectorAll("[data-rise]");
    gsap.set(split.lines, { yPercent: 110 });
    gsap.set(items, { opacity: 0, y: 28 });
    const play = () => {
      gsap.to(split.lines, { yPercent: 0, duration: 1.2, stagger: 0.09, ease: "expo.out", delay: 0.35 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.25,
        clearProps: "transform,opacity",
      });
    };
    window.addEventListener(INTRO_REVEAL, play, { once: true });
    return () => {
      window.removeEventListener(INTRO_REVEAL, play);
      gsap.killTweensOf([split.lines, items]);
      split.revert();
      gsap.set(items, { clearProps: "transform,opacity" });
    };
  }, []);

  return (
    <section ref={scene} className="pt-6 sm:pt-10">
      <div className="shell">
        <p data-rise className="eyebrow rec border-b border-line pb-4">
          {hero.eyebrow}
        </p>

        <div className="mt-8 grid gap-12 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <div>
            <p data-rise>
              <VakyLockup className="text-poster-xl" />
            </p>

            <h1 className="headline mt-8 max-w-[24ch] text-[clamp(1.625rem,3.2vw,2.75rem)] sm:mt-10">
              {hero.titleA} <Marked text={hero.titleB} mark={hero.titleMark} now />
            </h1>
            <p data-rise className="mt-5 max-w-[46ch] leading-relaxed text-muted sm:text-lg">
              {hero.sub}
            </p>

            <ul data-rise aria-label={film.scenes.expertise} className="mt-10 grid border-t border-ink sm:grid-cols-3">
              {services.map((service) => (
                <li key={service.name} className="border-b border-line sm:border-b-0 sm:border-l sm:first:border-l-0 sm:[&:first-child>a]:pl-0">
                  <a
                    href={service.href}
                    className="group flex min-h-16 items-center justify-between gap-4 py-4 sm:block sm:px-5 sm:py-5"
                  >
                    <span className="headline block text-xl sm:text-2xl">{service.name}</span>
                    <span className="flex items-center gap-2 text-muted sm:mt-2">
                      <span className="tnum">{service.price}</span>
                      <ArrowIcon className="size-4 shrink-0 text-red transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* One action carries the page; the work is the same journey one
                scroll further down, so it is a link, not a second button. */}
            <div data-rise className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href="#kontakt" arrow event="hero_primary_cta">
                {hero.ctaPrimary}
              </Button>
              <a
                href="#radovi"
                className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red"
              >
                {hero.ctaSecondary}
                <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
              </a>
            </div>
          </div>

          {/* A client's video, playing from the first second: the motion
              design the third service sells, made for real work. */}
          <figure data-rise className="w-full max-w-[16rem] lg:max-w-none lg:self-start">
            <ReelVideo
              src={`/video/${reel.file}.mp4`}
              poster={`/video/${reel.file}.jpg`}
              sound={reel.sound}
              labels={{ play: videos.play, pause: videos.pause, soundOn: videos.soundOn, soundOff: videos.soundOff }}
            />
            <figcaption className="mt-3">
              <span className="eyebrow block text-red">{reel.kind}</span>
              <span className="headline mt-1.5 block text-lg">{reel.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{reel.line}</span>
              <a
                href={`#${VIDEOS_ID}`}
                className="group mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
              >
                {videos.more}
                <ArrowIcon className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
