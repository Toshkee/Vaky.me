import type { Dictionary } from "@/i18n";
/**
 * A project whose href leaves this site is a real client site that is live on
 * its own domain; everything under /demo/ is a concept. The distinction is the
 * only thing separating work we delivered from work we imagined, so it is read
 * off the destination rather than carried as a flag two dictionaries have to
 * keep in sync.
 */
export const isLive = (href: string) => href.startsWith("https://");

/**
 * The hero's facts with their counts filled in. Counted from the portfolio,
 * not typed in: a project with an absolute href is a client site running on
 * its own domain, everything else is a concept on this site. The trade pages
 * and the "who is behind it" scene print them.
 */
export function heroFacts(dict: Dictionary) {
  const projects = dict.work.items.flatMap((item) => item.projects);
  const live = projects.filter((project) => isLive(project.href)).length;
  const counts: Record<string, string> = { "{live}": String(live), "{concepts}": String(projects.length - live) };
  return dict.hero.facts.map((fact) => ({ label: fact.label, value: counts[fact.value] ?? fact.value }));
}


/** The anchors of the three expertise cards — sites, apps, motion design —
    which the hero's services row links to, in that order. */
export const SERVICE_IDS = ["usluga-web", "usluga-app", "usluga-motion"] as const;

/** The motion design scene, where the hero's third service and the video
    card in the expertise scene send the visitor to watch the videos. */
export const VIDEOS_ID = "motion-design";
