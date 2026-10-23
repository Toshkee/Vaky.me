import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Film } from "@/components/motion/Film";
import type { HeroFilmProject } from "@/components/motion/films/HeroFilm";
import { ArrowIcon } from "./icons";
import { isLive } from "./ProjectCase";
import { Marked } from "./SectionHead";

/**
 * The hero's facts with their counts filled in. Counted from the portfolio,
 * not typed in: a project with an absolute href is a client site running on
 * its own domain, everything else is a concept on this site. The trade pages
 * print the same facts.
 */
export function heroFacts(dict: Dictionary) {
  const projects = dict.work.items.flatMap((item) => item.projects);
  const live = projects.filter((project) => isLive(project.href)).length;
  const counts: Record<string, string> = { "{live}": String(live), "{concepts}": String(projects.length - live) };
  return dict.hero.facts.map((fact) => ({ label: fact.label, value: counts[fact.value] ?? fact.value }));
}

export function Hero({ dict }: { dict: Dictionary }) {
  const live = dict.work.items.flatMap((item) => item.projects).filter((project) => isLive(project.href));

  /* The film shows the same live work the portfolio lists, captioned in the
     portfolio's own words. */
  const site = (project: (typeof live)[number]): HeroFilmProject => ({
    slug: project.slug,
    label: dict.work.liveLabel,
    name: project.name,
    tag: project.tag,
  });
  const { app } = dict.work;

  return (
    <section className="overflow-hidden">
      <div className="shell grid gap-10 pt-10 pb-14 sm:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-10 lg:pt-12 lg:pb-20">
        <div className="relative z-10">
          <p className="eyebrow eyebrow--dot">{dict.hero.eyebrow}</p>

          <h1 className="headline display mt-6 text-[clamp(2.75rem,6.2vw,5.4rem)]">
            {dict.hero.titleA}
            <br />
            <Marked text={dict.hero.titleB} mark={dict.hero.titleMark} now />
          </h1>

          <p className="mt-7 max-w-[32ch] text-lg leading-relaxed text-muted sm:text-xl">{dict.hero.sub}</p>

          {/* One action carries the page. "See the work" is the same journey
              one scroll further down, so it is a link, not a second pill
              competing with the thing the page wants pressed. */}
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href="#kontakt" arrow event="hero_primary_cta">
              {dict.hero.ctaPrimary}
            </Button>
            <a
              href="#radovi"
              className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-sun decoration-2 underline-offset-[6px] transition-colors hover:text-sun-ink"
            >
              {dict.hero.ctaSecondary}
              <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </a>
          </div>

          {/* Where, how much is live, how much is drawn, which languages —
              set as a table, not as claims. */}
          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
            {heroFacts(dict).map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="headline tnum mt-1.5 text-xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Film
          source={{
            kind: "hero",
            inputProps: {
              sites: [site(live[0]), site(live[1])],
              app: {
                label: app.label,
                name: app.name,
                tag: app.tag,
                screens: [app.screens[0].slug, app.screens[1].slug, app.screens[2].slug],
              },
            },
          }}
          labels={{ play: dict.motion.play, pause: dict.motion.pause }}
          poster={<SeaPoster />}
          className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-paper-2 lg:mr-0 lg:max-w-none"
          controlsClassName="right-4 top-4"
        />
      </div>
    </section>
  );
}

/** The film's opening frame — calm sea under an empty sky — drawn in the
    page itself, so the box is never blank while the film loads. */
function SeaPoster() {
  return (
    <svg viewBox="0 0 1080 1200" className="size-full" preserveAspectRatio="none">
      <path d="M0 905c90-14 180-14 270 0s180 14 270 0 180-14 270 0 180 14 270 0V1200H0Z" fill="var(--color-ink)" />
      <path
        d="M0 951c90-10 180-10 270 0s180 10 270 0 180-10 270 0 180 10 270 0"
        fill="none"
        stroke="var(--color-foam)"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
