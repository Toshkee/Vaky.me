import type { Dictionary } from "@/i18n";

/* Every design concept on the site, in the order they were made. The five
   in the phone above are the ones with a business type a visitor can pick;
   the rest are only reachable from here. Names, not descriptions — the demo
   itself does the talking. */
const DEMOS = [
  { slug: "lucky-chopsticks", name: "Lucky Chopsticks" },
  { slug: "barber-drina", name: "Barber Drina" },
  { slug: "konoba-skadar", name: "Konoba Skadar" },
  { slug: "titan-gym", name: "Titan Gym" },
  { slug: "barbershop-stari-grad", name: "Barbershop Stari Grad" },
  { slug: "dental-clinic-kovacevic", name: "Dental Clinic Kovačević" },
  { slug: "skyline-tattoo", name: "Skyline Tattoo" },
  { slug: "kraftart", name: "KraftArt" },
  { slug: "lavlav", name: "LavLav" },
  { slug: "andrea-beauty-house", name: "Andrea Beauty House" },
  { slug: "studio-ljepote-mila", name: "Studio ljepote Mila" },
  { slug: "studio-ljepote-zdravlja", name: "Studio ljepote i zdravlja" },
  { slug: "soul-studio", name: "Soul Studio" },
  { slug: "pilates-by-maja", name: "Pilates by Maja" },
  { slug: "telo-pilates", name: "Telo Pilates Club" },
];

/**
 * The full list of concepts as a ticker under the phone: one printed line
 * of names sliding past, the way a stock strip runs under a broadcast.
 *
 * The strip is rendered twice, end to end, and the whole pair slides one
 * strip's width and snaps back — which, because the copy is identical, is
 * invisible. The second copy is hidden from assistive tech so nobody hears
 * fifteen names twice; with less motion asked for it is not shown at all
 * and the first simply wraps into a static list.
 *
 * It stops under the pointer and while a link in it has focus, so a name
 * can actually be clicked and a keyboard user is not chasing it.
 */
export function DemoTicker({ dict }: { dict: Dictionary }) {
  const strip = (hidden: boolean) => (
    <ul className="ticker-strip" aria-hidden={hidden || undefined}>
      {DEMOS.map((demo) => (
        <li key={demo.slug} className="flex items-center">
          <a
            href={`/demo/${demo.slug}/`}
            tabIndex={hidden ? -1 : undefined}
            className="headline whitespace-nowrap text-lg underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-red hover:decoration-red"
          >
            {demo.name}
          </a>
          <span aria-hidden="true" className="ticker-dot" />
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label={dict.work.allLabel} className="mt-12 border-t-2 border-ink pt-3 sm:mt-14">
      <p className="eyebrow text-muted">
        {dict.work.allLabel}
        <span aria-hidden="true"> · </span>
        <span className="tnum">{DEMOS.length}</span>
      </p>
      <div className="ticker mt-3">
        {strip(false)}
        {strip(true)}
      </div>
    </nav>
  );
}
