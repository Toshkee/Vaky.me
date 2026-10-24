"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { SplitText, gsap, reducedMotion } from "@/components/motion/gsap";
import { ExternalIcon } from "./icons";
import { SceneLabel } from "./SectionHead";

const PORTRAIT_SIZES = "(min-width: 64rem) 10rem, 6rem";

/**
 * Scene three: who made all this. The first line of the bio set large, its
 * words darkening one by one as it is scrolled through, the rest of it under
 * it beside the portrait, and then what I do with my own hands — design,
 * code, motion — in three columns, each with the tools it is done in as
 * square tags.
 */
export function Statement({ dict }: { dict: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);
  const { about } = dict;
  const { founder } = site;
  const host = new URL(founder.url).host;

  useEffect(() => {
    const scope = section.current;
    if (reducedMotion() || !lead.current || !scope) return;
    const split = SplitText.create(lead.current, { type: "words" });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: lead.current, start: "top 82%", end: "bottom 50%", scrub: true },
        },
      );
      /* The tags drop into their columns one after another. */
      gsap.utils.toArray<HTMLElement>("[data-skill]").forEach((column) => {
        gsap.from(column.querySelectorAll("[data-tag]"), {
          y: 14,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "back.out(2)",
          scrollTrigger: { trigger: column, start: "top 85%", once: true },
        });
      });
    }, scope);
    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section ref={section} aria-labelledby="ko-stoji" className="py-16 sm:py-24">
      <div className="shell">
        <SceneLabel as="h2" id="ko-stoji" name={about.title} />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <p
              ref={lead}
              className="max-w-[26ch] text-[clamp(1.625rem,3.4vw,3rem)] leading-[1.1] font-bold tracking-[-0.025em] [font-stretch:85%]"
            >
              {about.lead}
            </p>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-muted sm:text-lg">{about.body}</p>
          </div>

          <figure data-reveal className="flex items-center gap-5 self-end lg:flex-col lg:items-start">
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
                className="block size-24 rounded-xl object-cover grayscale lg:size-40"
              />
            </picture>
            <figcaption>
              <span className="headline block text-xl">{founder.name}</span>
              <span className="mt-1 block text-sm text-muted">{about.role}</span>
              <a
                href={founder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
              >
                {host}
                <span className="sr-only">
                  {" "}
                  — {about.portfolioNote} ({dict.work.newTab})
                </span>
                <ExternalIcon className="size-4 shrink-0" />
              </a>
            </figcaption>
          </figure>
        </div>

        <h3 className="eyebrow mt-16 text-muted sm:mt-20">{about.skills.title}</h3>
        <ul className="mt-4 grid border-t border-ink sm:grid-cols-3">
          {about.skills.items.map((skill) => (
            <li
              key={skill.name}
              data-skill
              className="border-b border-line py-6 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <p className="display text-poster-sm">{skill.name}</p>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-muted">{skill.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <li key={tag} data-tag className="border border-ink px-2 py-1 text-xs font-semibold tracking-[0.06em] uppercase">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
