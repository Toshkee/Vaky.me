import type { Dictionary } from "@/i18n";
import { isLive } from "./facts";

/** One piece of work as a tile: a client's live site or app, or a concept. */
export type WorkTileData = {
  key: string;
  name: string;
  tag: string;
  /** Null for the app: it is private, so there is nothing to open. */
  href: string | null;
  /** The tile image is /work/thumbs/<thumb>.avif and .webp. */
  thumb: string;
  live: boolean;
  /** What it is, in a few words: "Aplikacija uživo", "Dizajn koncept". */
  label: string;
  /** What was made, in a sentence. */
  line: string;
};

/** The concepts page, in the dictionary's language. */
export function conceptsPath(dict: Dictionary) {
  return dict.lang === "en" ? "/en/concepts/" : "/koncepti/";
}

/** The work running for real clients: the private app first, then the sites
    live on their own domains, in the dictionary's order. */
export function liveWork(dict: Dictionary): WorkTileData[] {
  const { app, items, liveLabel } = dict.work;
  const sites = items.flatMap((item) => item.projects).filter((project) => isLive(project.href));
  return [
    {
      key: "reform-fitness",
      name: app.name,
      tag: app.tag,
      href: null,
      thumb: "reform-fitness",
      live: true,
      label: app.label,
      line: app.solution,
    },
    ...sites.map((project) => ({
      key: project.slug,
      name: project.name,
      tag: project.tag,
      href: project.href,
      thumb: project.slug,
      live: true,
      label: liveLabel,
      line: project.solution,
    })),
  ];
}

/** The concepts, grouped by the trade they were made for; a trade with only
    live work has no group. */
export function conceptGroups(dict: Dictionary) {
  return dict.work.items
    .map((item) => ({
      key: item.key,
      type: item.type,
      tiles: item.projects
        .filter((project) => !isLive(project.href))
        .map(
          (project): WorkTileData => ({
            key: project.slug,
            name: project.name,
            tag: project.tag,
            href: project.href,
            thumb: project.slug,
            live: false,
            label: dict.work.conceptLabel,
            line: project.solution,
          }),
        ),
    }))
    .filter((group) => group.tiles.length > 0);
}

/** "15 koncepata", with the noun in the form the number asks for. */
export function conceptsCount(dict: Dictionary, n: number) {
  const forms = dict.work.conceptsCount;
  const rule = new Intl.PluralRules(dict.lang === "en" ? "en" : "sr-Latn").select(n);
  const form = rule === "one" ? forms.one : rule === "few" ? forms.few : forms.other;
  return form.replace("{n}", String(n));
}
