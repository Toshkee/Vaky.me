import type { Dictionary } from "@/i18n";
import { VIDEOS_ID } from "./facts";
import { ArrowIcon } from "./icons";
import { ReelVideo } from "./ReelVideo";
import { ScrollRow } from "./ScrollRow";
import { Marked, SceneLabel } from "./SectionHead";

/**
 * The motion design scene: the video add-on shown rather than described.
 * Real vertical videos — for clients, my own promo, and three made for a
 * concept, each saying which it is — in a row that runs off the edge of the
 * page on a dark ground, so they read as a strip of screens.
 */
export function MotionVideos({ dict }: { dict: Dictionary }) {
  const { videos, scenes } = dict.film;
  return (
    <section
      id={VIDEOS_ID}
      aria-labelledby={`${VIDEOS_ID}-title`}
      className="on-ink scroll-mt-20 overflow-hidden bg-ink py-16 text-paper sm:py-24"
    >
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
        <div>
          <SceneLabel name={scenes.videos} tone="ink" />
          <h2 id={`${VIDEOS_ID}-title`} className="display mt-4 text-poster-lg">
            <Marked text={videos.title} mark={videos.mark} />
          </h2>
        </div>
        <div>
          <p className="max-w-lg leading-relaxed text-muted-dark">{videos.sub}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="headline text-xl">{videos.price.replace("{price}", dict.pricing.launchVideos.price)}</p>
            <a
              href="#kontakt"
              data-umami-event="videos_enquiry"
              className="btn group inline-flex min-h-12 items-center gap-2.5 border-paper bg-paper px-6 py-3 text-ink transition-colors hover:border-red hover:bg-red hover:text-white"
            >
              {videos.ask}
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </div>
        </div>
      </div>

      <ScrollRow labels={{ prev: videos.prev, next: videos.next }} className="mt-12">
        {videos.items.map((item) => (
          <li key={item.file} className="w-[64vw] max-w-[17rem] shrink-0 snap-start sm:w-[16rem]">
            <figure>
              <ReelVideo
                src={`/video/${item.file}.mp4`}
                poster={`/video/${item.file}.jpg`}
                sound={item.sound}
                labels={{ play: videos.play, pause: videos.pause, soundOn: videos.soundOn, soundOff: videos.soundOff }}
              />
              <figcaption className="mt-3">
                <span className="eyebrow block text-red-bright">{item.kind}</span>
                <span className="headline mt-1.5 block text-lg">{item.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-dark">{item.line}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ScrollRow>
    </section>
  );
}
