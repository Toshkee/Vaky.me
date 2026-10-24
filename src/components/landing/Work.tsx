import type { Dictionary } from "@/i18n";
import { ConceptsTeaser } from "./ConceptsTeaser";
import { SceneLabel, SectionHead } from "./SectionHead";
import { WorkTile } from "./WorkTile";
import { liveWork } from "./portfolio";

/**
 * Scene six: the work. Only what runs for real clients is laid out here —
 * the private app and the sites live on their own domains, each with what
 * was made. The concepts made for each trade have a page of their own, and
 * the dark panel under the work is the door to it.
 */
export function Work({ dict }: { dict: Dictionary }) {
  const { work, film } = dict;
  return (
    <section id="radovi" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <SectionHead slate={<SceneLabel name={film.scenes.work} />} title={work.title} sub={work.liveSub} />

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {liveWork(dict).map((tile) => (
            <li key={tile.key} data-reveal>
              <WorkTile tile={tile} dict={dict} />
            </li>
          ))}
        </ul>

        <ConceptsTeaser dict={dict} />
      </div>
    </section>
  );
}
