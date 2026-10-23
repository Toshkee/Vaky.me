"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { Film } from "@/components/motion/Film";
import { SplitText, gsap, reducedMotion } from "@/components/motion/gsap";
import { heroFacts } from "./facts";
import { ExternalIcon } from "./icons";
import { SceneLabel } from "./SectionHead";

const PORTRAIT_SIZES = "(min-width: 64rem) 8rem, 5rem";

/**
 * Scene three: who made all this. The bio set as one large statement whose
 * words darken one by one as it is scrolled through — read at the pace of
 * the scroll — then the credit line, the portrait, the portfolio film, and
 * the numbers counting up.
 */
export function Statement({ dict }: { dict: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const { about } = dict;
  const { founder } = site;
  const host = new URL(founder.url).host;
  const facts = heroFacts(dict);

  useEffect(() => {
    if (reducedMotion() || !text.current) return;
    const split = SplitText.create(text.current, { type: "words" });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: text.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const n = { v: 0 };
        gsap.to(n, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = String(Math.round(n.v));
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, section);
    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section ref={section} data-scene={dict.film.scenes.about} className="py-24 sm:py-32">
      <div className="shell">
        <SceneLabel word={dict.film.scene} n={3} name={about.title} />

        <p
          ref={text}
          className="mt-10 max-w-[30ch] text-[clamp(1.85rem,4.4vw,4.1rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
        >
          {about.body}
        </p>

        <div className="mt-16 grid gap-12 border-t border-line pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow text-muted">{dict.film.credits.role}</p>
            <div className="mt-5 flex items-center gap-5">
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
                  className="block size-20 rounded-2xl object-cover grayscale lg:size-32"
                />
              </picture>
              <div>
                <p className="display text-[clamp(2.25rem,4vw,3.5rem)]">{founder.name}</p>
                <p className="mt-2 text-muted">{about.role}</p>
              </div>
            </div>
            <a
              href={founder.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red"
            >
              {about.link}: {host}
              <span className="sr-only"> ({dict.work.newTab})</span>
              <ExternalIcon className="size-4 shrink-0" />
            </a>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
              {facts.map((fact) => {
                const numeric = /^\d+$/.test(fact.value);
                return (
                  <div key={fact.label} className="border-t border-line pt-3">
                    <dt className="text-sm text-muted">{fact.label}</dt>
                    <dd className="display tnum mt-2 text-[clamp(2.5rem,4vw,3.5rem)]" {...(numeric ? { "data-count": fact.value } : {})}>
                      {fact.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <figure data-reveal>
            <Film
              source={{ kind: "portfolio", inputProps: { url: host, question: about.film.question, label: about.film.label } }}
              labels={{ play: dict.motion.play, pause: dict.motion.pause }}
              className="overflow-hidden rounded-[1.25rem] border border-line bg-paper"
            />
            <figcaption className="mt-4 text-sm text-muted">{about.film.note}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
