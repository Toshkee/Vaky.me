import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "./icons";
import { ProjectPhone } from "./ProjectPhone";

type Project = Dictionary["work"]["items"][number]["projects"][number];

/**
 * A project whose href leaves this site is a real client site that is live on
 * its own domain; everything under /demo/ is a concept. The distinction is the
 * only thing separating work we delivered from work we imagined, so it is read
 * off the destination rather than carried as a flag two dictionaries have to
 * keep in sync.
 */
export const isLive = (href: string) => href.startsWith("https://");

/**
 * One project, told the same way every time: the phone with its opening
 * screens, and beside it the situation, the move, and what is in it. The
 * landing page's live sites, its concept picker and every trade page draw
 * this one block, so a project reads the same wherever it turns up.
 *
 * `compact` is for two of these side by side, down to a phone screen where
 * each gets half the width: a phone that shrinks to its column, the lines
 * stacked instead of tabled, no "includes", and a text link instead of a
 * button that would not fit. `children` go onto the phone's screen unseen —
 * captures being warmed.
 */
export function ProjectCase({
  project,
  dict,
  compact = false,
  children,
}: {
  project: Project;
  dict: Dictionary;
  compact?: boolean;
  children?: ReactNode;
}) {
  const live = isLive(project.href);
  const open = live ? dict.work.openLive : dict.work.open;

  return (
    <article
      className={
        compact
          ? "grid gap-4 xl:grid-cols-[15rem_1fr] xl:items-center xl:gap-8"
          : "grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:gap-16"
      }
    >
      <ProjectPhone
        href={project.href}
        live={live}
        label={`${open}: ${project.name}${live ? ` (${dict.work.newTab})` : ""}`}
        slug={project.slug}
        alt={dict.work.phoneAlt.replace("{name}", project.name)}
        size={compact ? "small" : "default"}
        className={compact ? "justify-self-center xl:justify-self-start" : "justify-self-center sm:justify-self-start"}
      >
        {children}
      </ProjectPhone>

      <div className="min-w-0">
        <p className="eyebrow text-red">
          {live ? dict.work.liveLabel : dict.work.conceptLabel}
          <span aria-hidden="true" className="text-muted"> · </span>
          <span className="text-muted">{project.tag}</span>
        </p>
        <h3 className={`headline mt-2 ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
          {project.name}
        </h3>

        {compact ? (
          <dl className="mt-4 grid gap-y-1 border-t-2 border-ink pt-3 text-sm leading-snug">
            <dt className="eyebrow text-muted">{dict.work.briefLabel}</dt>
            <dd className="mb-3">{project.brief}</dd>
            <dt className="eyebrow text-muted">{dict.work.solutionLabel}</dt>
            <dd>{project.solution}</dd>
          </dl>
        ) : (
          <dl className="mt-5 grid max-w-md gap-x-5 gap-y-1 border-t-2 border-ink pt-4 text-sm leading-snug sm:grid-cols-[5.5rem_1fr] sm:gap-y-3">
            <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.briefLabel}</dt>
            <dd className="mb-3 sm:mb-0">{project.brief}</dd>
            <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.solutionLabel}</dt>
            <dd className="mb-3 sm:mb-0">{project.solution}</dd>
            <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.includesLabel}</dt>
            <dd className="text-muted">{project.includes.join(" · ")}</dd>
          </dl>
        )}

        {compact ? (
          <a
            href={project.href}
            {...(live ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            data-umami-event="portfolio_demo_opened"
            className="group mt-5 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-red hover:decoration-red"
          >
            {open}
            {live && <span className="sr-only"> ({dict.work.newTab})</span>}
            <ArrowIcon className="w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <Button
            href={project.href}
            external={live}
            variant="secondary"
            arrow
            event="portfolio_demo_opened"
            className="mt-7"
          >
            {open}
            {live && <span className="sr-only"> ({dict.work.newTab})</span>}
          </Button>
        )}
      </div>
    </article>
  );
}
