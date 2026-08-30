import type { Metadata } from "next";
import Link from "next/link";
import { Sora, Source_Sans_3 } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import {
  blackShelf,
  delivery,
  gauge,
  goldShelf,
  heroPiece,
  materials,
  measurePiece,
  moreCollections,
  novoShelf,
  placements,
  promise,
  shapes,
  shop,
  support,
} from "./data";
import styles from "./maluni.module.css";

/* Sora for anything structural — the wordmark, headings, collection names,
   the buttons. It is drawn on a geometric skeleton with flat terminals and
   even sidebearings, which is the closest a typeface gets to the machined
   look of the objects this shop sells. Source Sans 3 carries every sentence
   meant to be read at length; it has a larger x-height at small sizes, which
   is what the delivery terms and the measuring card need.

   The pairing stayed; the way it is set did not. Display sizes went up and
   tracking went tighter, body copy went up half a step and darkened, and the
   grey wash that used to cover every paragraph is now reserved for genuinely
   secondary lines. Small type set loosely in a light grey is most of what
   made the first version read as a printed catalogue.

   Both are loaded with latin-ext, which is what carries č ć ž š đ — the page
   sets "plaćanje", "pošiljke", "MINĐUŠE" and "nijesi" in both families. */
const display = Sora({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-mal-display",
});
const text = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-mal-text",
});

export const metadata: Metadata = {
  title: "Maluni Shop Podgorica — piercing nakit, Crna Gora | Dizajn koncept",
  description:
    "Dizajn koncept ulazne stranice za Maluni Shop iz Podgorice: izbor nakita po mjestu i obliku, mjere i materijali, dostava i plaćanje, a kupovina ostaje na postojećem shopu.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-maluni-shop.png"] },
};

const sans = "[font-family:var(--font-mal-display),system-ui,sans-serif]";

/* Two rings, because the page has two grounds. An offset outline lands on the
   field around the control, not on the control, so a cobalt ring on the ink
   band would sit at 1.9:1 — the light cobalt is used there instead. */
const focusOnLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mal-cobalt)]";
const focusOnInk =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mal-cobalt-light)]";

/* Filled cobalt means one thing on this page and only one: the tap leaves for
   the live store. Nothing else is a filled button, and — the change that
   quieted the whole page — nothing else is cobalt type either. Links inside
   the page are ink with a cobalt rule under them, so the store CTA is the one
   solid block of colour on screen rather than one blue thing among thirty. */
const shopCta = `inline-flex items-center justify-center bg-[var(--mal-cobalt)] font-semibold tracking-[0.005em] text-white transition-colors hover:bg-[var(--mal-cobalt-deep)] ${sans}`;
const shopCtaLarge = `${shopCta} min-h-14 px-9 text-[0.98rem] ${focusOnLight}`;
const shopCtaHeader = `${shopCta} min-h-11 px-4 text-[0.82rem] sm:px-6 ${focusOnLight}`;
const shopCtaOnInk = `${shopCta} min-h-14 px-9 text-[0.98rem] ${focusOnInk}`;

/* Anything that moves within this page — the hero's second action — is an
   underlined link, never a second button. The visitor should be able to tell
   "this leaves for the shop" from "this scrolls down" without reading. */
const inPageLink = `inline-flex min-h-11 items-center font-semibold underline decoration-[var(--mal-steel)] decoration-2 underline-offset-[8px] transition-colors hover:text-[var(--mal-cobalt)] hover:decoration-[var(--mal-cobalt)] ${focusOnLight} ${sans}`;

const outLink = `inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-[var(--mal-cobalt)] decoration-2 underline-offset-[8px] transition-colors hover:text-[var(--mal-cobalt)] hover:no-underline ${focusOnLight} ${sans}`;
const outLinkOnInk = `inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-[var(--mal-cobalt-light)] decoration-2 underline-offset-[8px] transition-colors hover:text-[var(--mal-cobalt-light)] hover:no-underline ${focusOnInk} ${sans}`;

const sectionBox = "mx-auto max-w-6xl px-5 sm:px-8";
const h2Type = `text-[clamp(1.95rem,7.4vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.028em] ${sans}`;
/* Two bands are subordinate to what they contain — the collection names are
   the display type in one, the eight terms are the substance of the other — so
   their titles sit a full step below the page's other headings. Five headings
   at one size is how a page starts looking like a template. */
const h2Quiet = `text-[clamp(1.35rem,4.8vw,1.85rem)] font-semibold leading-[1.1] tracking-[-0.022em] ${sans}`;
const leadType = "text-[1.05rem] leading-[1.62] text-[var(--mal-muted)] sm:text-[1.1rem]";

/* The outbound mark. Steel rather than cobalt, and one size down from the
   label it follows: it is a signpost, not a second accent. */
function Out({ ink = false }: { ink?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`text-[0.8em] ${ink ? "text-[var(--mal-ink-muted)]" : "text-[var(--mal-steel)]"}`}
    >
      ↗
    </span>
  );
}

/**
 * Every link on this page leaves for the shop's own systems, so they all need
 * the same four attributes. Building them in one place is what guarantees no
 * external link ever ships without `rel="noopener"`, and that the analytics
 * events stay spelled the same way across twenty-odd controls.
 */
function outbound(action: string, event: "demo_outbound" | "demo_contact" = "demo_outbound") {
  return {
    target: "_blank",
    rel: "noopener noreferrer",
    "data-umami-event": event,
    "data-umami-event-demo": "maluni-shop",
    "data-umami-event-action": action,
  } as const;
}

export default function MaluniShopPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${text.variable} min-h-screen bg-[var(--mal-paper)] text-[var(--mal-ink)] [font-family:var(--font-mal-text),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* No sticky anything. A front door whose whole job is routing should not
          also park a bar over the thing it is routing you to; the shop link is
          in the header, in the hero, on every collection and at the close. */}
      <header className="bg-[var(--mal-paper)]">
        <div className={`${sectionBox} flex items-center justify-between gap-4 py-4`}>
          <a href="#vrh" className={`inline-flex min-h-11 flex-col justify-center ${focusOnLight}`}>
            {/* Set in type, not rebuilt from their logo: the shop has not
                given us its mark, and guessing at one would be inventing a
                brand for them. */}
            <span
              className={`text-[1.2rem] font-semibold tracking-[-0.02em] sm:text-[1.35rem] ${sans}`}
            >
              {shop.name}
            </span>
            {/* At 360px the full descriptor and the shop button cannot share a
                row, so the phone gets the city and the descriptor returns as
                soon as it fits on one line. */}
            <span className="text-[0.74rem] leading-tight text-[var(--mal-muted)]">
              <span className="sm:hidden">{shop.area}</span>
              <span className="hidden sm:inline">{shop.descriptorLine}</span>
            </span>
          </a>
          <a href={shop.shopUrl} {...outbound("shop-header")} className={shopCtaHeader}>
            Otvori shop
          </a>
        </div>

        {/* The shop's own standing announcement line, rebuilt as three plain
            facts instead of three badges. Left-aligned so it wraps into a
            readable block at 360px rather than a ragged centred stack. */}
        <ul
          className={`${sectionBox} flex flex-wrap items-center border-b border-[var(--mal-line)] pb-3 text-[0.78rem] text-[var(--mal-muted)]`}
        >
          {promise.map((item, index) => (
            <li key={item} className="flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="px-2.5 text-[var(--mal-steel)]">
                  ·
                </span>
              ) : null}
              {item}
            </li>
          ))}
        </ul>
      </header>

      <main id="vrh">
        {/* The first screen is the case itself: a white room, one piece in it
            at the largest scale the page ever uses, and the sentence a visitor
            arrives with. The old version put the piece in a bordered box a
            third of this size beside the text, which is the composition of a
            catalogue entry rather than of a shop window. */}
        <section className="bg-[var(--mal-case)]">
          <div
            className={`${sectionBox} pt-12 pb-16 sm:pt-16 sm:pb-24 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16 lg:pt-24 lg:pb-28`}
          >
            <div>
              {/* leading is 1.04 rather than the 1.0 a poster headline would
                  normally take: "Pronađi" and "piercingu" put an ascender with
                  a caron and a descender on the same line, and at 4.5rem a
                  tighter line box crowds them. */}
              <h1
                className={`max-w-[15ch] text-[clamp(2.35rem,9.2vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.036em] text-balance lg:max-w-[12ch] ${sans}`}
              >
                Pronađi nakit koji pripada tvom piercingu.
              </h1>
              <p className={`mt-7 max-w-md text-pretty ${leadType}`}>
                Piercing nakit za cijelu Crnu Goru. Biraj po mjestu na kojem se nosi ili po obliku
                osovine — kupovina se završava u postojećem shopu na {shop.shopDomain}.
              </p>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={shop.shopUrl}
                  {...outbound("shop-hero")}
                  className={`${shopCtaLarge} w-full justify-center sm:w-auto`}
                >
                  Otvori shop
                </a>
                <a href="#pronalazak" className={inPageLink}>
                  Pronađi nakit
                </a>
              </div>
            </div>

            <figure className="mt-12 lg:mt-0">
              <div
                className={`${styles.plate} mx-auto w-full max-w-[24rem] sm:max-w-[26rem] lg:max-w-none`}
              >
                <DemoPhoto
                  src={heroPiece.photo.src}
                  alt={heroPiece.photo.alt}
                  width={heroPiece.photo.width}
                  height={heroPiece.photo.height}
                  sizes="(min-width: 640px) 26rem, calc(100vw - 2.5rem)"
                  priority
                  className={`${styles.cutout} block h-auto w-full`}
                />
                {/* The page's one sheen: it crosses the plate once, on load,
                    and then stays off its edge for good. */}
                <span aria-hidden="true" className={styles.glint} />
              </div>
              {/* On the live store this exact line is burned into the JPEG in a
                  pixel font. Here it is type: selectable, translatable, sharp
                  at any size and readable out loud. */}
              <figcaption
                className={`mx-auto mt-4 max-w-[24rem] text-[0.82rem] tracking-[0.02em] text-[var(--mal-muted)] sm:max-w-[26rem] lg:max-w-none ${sans}`}
              >
                {heroPiece.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The densest thing on the page, and deliberately the second thing on
            it: the shop already sorts its jewellery two ways, and a front door
            that reproduces both saves the visitor the menu. */}
        <section id="pronalazak" className="scroll-mt-6 bg-[var(--mal-paper)]">
          <div className={`${sectionBox} py-16 sm:py-24`}>
            <h2 className={h2Type}>Prvo mjesto, pa oblik</h2>
            <p className={`mt-5 max-w-xl ${leadType}`}>
              Ponuda je na sajtu podijeljena na dva načina — po mjestu na kojem se nakit nosi i po
              obliku same osovine. Vode do istih artikala, samo iz drugog ugla.
            </p>

            <h3 className={`mt-12 text-[0.95rem] font-semibold sm:mt-16 ${sans}`}>Po mjestu</h3>
            {/* Rows, not cards. The hairline between them is the only rule left
                in this band; the tap target is the whole row and it lights up
                white on the porcelain ground rather than turning blue. */}
            <ul className="mt-4 border-b border-[var(--mal-line)]">
              {placements.map((placement) => (
                <li key={placement.id} className="border-t border-[var(--mal-line)]">
                  <a
                    href={placement.url}
                    {...outbound(`mjesto-${placement.id}`)}
                    className={`group -mx-3 block px-3 py-5 transition-colors hover:bg-[var(--mal-case)] sm:flex sm:items-baseline sm:gap-10 sm:py-6 ${focusOnLight}`}
                  >
                    {/* The mark rides with the name, never at the end of the
                        description: a description wraps, and a mark left to
                        follow a wrapped sentence strands itself on a line of
                        its own at 360px. The name never wraps. */}
                    <span
                      className={`block text-[1.15rem] font-semibold tracking-[0.045em] transition-colors group-hover:text-[var(--mal-cobalt)] sm:w-36 sm:shrink-0 sm:text-[1.25rem] ${sans}`}
                    >
                      {placement.name}
                      <span className="ml-2.5">
                        <Out />
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[0.98rem] leading-relaxed text-[var(--mal-muted)] sm:mt-0">
                      {placement.line}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* The second axis is an index, not a second list of rows: someone
                who already knows they wear a labret does not need a sentence
                explaining what a labret is. */}
            <h3 className={`mt-14 text-[0.95rem] font-semibold ${sans}`}>Po obliku</h3>
            <ul className="mt-3 flex flex-wrap items-center gap-y-1">
              {shapes.map((shape, index) => (
                <li key={shape.id} className="flex items-center">
                  {index > 0 ? (
                    <span aria-hidden="true" className="px-2.5 text-[var(--mal-steel)]">
                      ·
                    </span>
                  ) : null}
                  <a
                    href={shape.url}
                    {...outbound(`oblik-${shape.id}`)}
                    className={`inline-flex min-h-11 items-center text-[0.9rem] font-medium tracking-[0.06em] underline decoration-[var(--mal-line)] decoration-2 underline-offset-[7px] transition-colors hover:text-[var(--mal-cobalt)] hover:decoration-[var(--mal-cobalt)] ${focusOnLight} ${sans}`}
                  >
                    {shape.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Three collections, three grounds, three sizes of object. They
            alternate rather than repeating one card, and the pieces are now
            the largest thing in each band instead of a thumbnail beside a
            paragraph — which is the single change that stops the section
            reading as a catalogue listing. */}
        <section>
          <div className="bg-[var(--mal-case)]">
            <div className={`${sectionBox} pt-16 sm:pt-24`}>
              <h2 className={h2Quiet}>Kolekcije</h2>
              <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-[var(--mal-muted)]">
                Pored podjele po mjestu i obliku, shop nekoliko grupa vodi zasebno.
              </p>
            </div>
          </div>

          <article className="bg-[var(--mal-case)]">
            <div
              className={`${styles.shelf} ${sectionBox} py-12 sm:py-16 md:grid md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] md:items-center md:gap-16`}
            >
              <div className={`${styles.plate} w-full`}>
                <DemoPhoto
                  src={goldShelf.photo.src}
                  alt={goldShelf.photo.alt}
                  width={goldShelf.photo.width}
                  height={goldShelf.photo.height}
                  sizes="(min-width: 768px) 26rem, calc(100vw - 2.5rem)"
                  className={`${styles.cutout} block h-auto w-full`}
                />
              </div>
              <div className="mt-7 md:mt-0">
                <h3
                  className={`text-[clamp(1.7rem,6.4vw,2.5rem)] font-semibold tracking-[-0.025em] ${sans}`}
                >
                  {goldShelf.name}
                </h3>
                <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-[var(--mal-muted)]">
                  {goldShelf.line}
                </p>
                <a
                  href={goldShelf.url}
                  {...outbound(`kolekcija-${goldShelf.id}`)}
                  className={`${outLink} mt-4 text-[0.95rem]`}
                >
                  Otvori GOLD kolekciju
                  <Out />
                </a>
              </div>
            </div>
          </article>

          <article className="bg-[var(--mal-ink)] text-[var(--mal-paper)]">
            <div
              className={`${styles.shelf} ${sectionBox} py-14 sm:py-20 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-center md:gap-16`}
            >
              <div>
                <h3
                  className={`text-[clamp(2rem,7.8vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.028em] ${sans}`}
                >
                  {blackShelf.name}
                </h3>
                <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-[var(--mal-ink-muted)]">
                  {blackShelf.line}
                </p>
                <a
                  href={blackShelf.url}
                  {...outbound(`kolekcija-${blackShelf.id}`)}
                  className={`${outLinkOnInk} mt-4 text-[0.95rem]`}
                >
                  Otvori BLACK kolekciju
                  <Out ink />
                </a>
              </div>
              {/* A lit panel on the ink field: the piece was photographed on
                  white, so the plate is the only light in an otherwise dark
                  band and the black jewellery reads at full contrast. */}
              <div className={`${styles.plate} mt-9 w-full md:mt-0`}>
                <DemoPhoto
                  src={blackShelf.photo.src}
                  alt={blackShelf.photo.alt}
                  width={blackShelf.photo.width}
                  height={blackShelf.photo.height}
                  sizes="(min-width: 768px) 22rem, calc(100vw - 2.5rem)"
                  className={`${styles.cutout} block h-auto w-full`}
                />
              </div>
            </div>
          </article>

          <article className="bg-[var(--mal-paper)]">
            <div
              className={`${styles.shelf} ${sectionBox} py-12 sm:py-16 md:grid md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-center md:gap-16`}
            >
              {/* Third band, third arrangement: the name leads on the phone and
                  the piece sits left on the desktop, so the three shelves read
                  as one case seen from three distances rather than one card
                  repeated. Order rather than DOM position, because on a phone
                  the name still has to come first. */}
              <div className="md:order-2">
                <h3
                  className={`text-[clamp(1.55rem,5.8vw,2.15rem)] font-semibold tracking-[-0.025em] ${sans}`}
                >
                  {novoShelf.name}
                </h3>
                <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-[var(--mal-muted)]">
                  {novoShelf.line}
                </p>
                <a
                  href={novoShelf.url}
                  {...outbound(`kolekcija-${novoShelf.id}`)}
                  className={`${outLink} mt-4 text-[0.95rem]`}
                >
                  Vidi šta je novo
                  <Out />
                </a>
              </div>
              <div className={`${styles.plate} mt-7 w-full md:order-1 md:mt-0`}>
                <DemoPhoto
                  src={novoShelf.photo.src}
                  alt={novoShelf.photo.alt}
                  width={novoShelf.photo.width}
                  height={novoShelf.photo.height}
                  sizes="(min-width: 768px) 20rem, calc(100vw - 2.5rem)"
                  className={`${styles.cutout} block h-auto w-full`}
                />
              </div>
            </div>
          </article>

          <div className="bg-[var(--mal-paper)]">
            <div
              className={`${sectionBox} flex flex-wrap items-center gap-x-8 gap-y-1 pb-16 sm:pb-24`}
            >
              {moreCollections.map((collection) => (
                <a
                  key={collection.id}
                  href={collection.url}
                  {...outbound(`kolekcija-${collection.id}`)}
                  className={`${outLink} text-[0.9rem] tracking-[0.06em]`}
                >
                  {collection.name}
                  <Out />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* The one thing this shop's own site leaves a first-time buyer to work
            out on their own, and the reason the page exists: the four values
            every article page already lists, shown once — as a photograph of a
            piece that has all of them, and as a comparison of the sizes. */}
        <section className="bg-[var(--mal-shell)]">
          <div
            className={`${sectionBox} py-16 sm:py-24 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-16`}
          >
            <div>
              <h2 className={h2Type}>Kako se bira mjera</h2>
              <p className={`mt-5 max-w-lg ${leadType}`}>
                Uz svaki artikal na sajtu stoje materijal, debljina osovine, dužina ili prečnik i
                podatak o dragulju. To su četiri broja po kojima se nakit zaista bira.
              </p>
              <ul className="mt-8 flex max-w-lg flex-col gap-5">
                {materials.map((line) => (
                  <li key={line} className="text-[1rem] leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>

              <figure className="mt-10 max-w-[24rem]">
                <div className={`${styles.plate} w-full`}>
                  <DemoPhoto
                    src={measurePiece.photo.src}
                    alt={measurePiece.photo.alt}
                    width={measurePiece.photo.width}
                    height={measurePiece.photo.height}
                    sizes="(min-width: 640px) 24rem, calc(100vw - 2.5rem)"
                    className={`${styles.cutout} block h-auto w-full`}
                  />
                </div>
                <figcaption className={`mt-3 text-[0.82rem] text-[var(--mal-muted)] ${sans}`}>
                  {measurePiece.caption}
                </figcaption>
              </figure>
            </div>

            {/* The measuring card. Every bar is a proportion of the shop's own
                numbers, and the note under it says so — nothing here claims to
                be actual size on anybody's screen. No border any more: on the
                shell floor the white panel is its own edge. */}
            <div className="mt-12 bg-[var(--mal-case)] p-6 sm:p-8 lg:mt-0">
              <h3 className={`text-[0.92rem] font-semibold ${sans}`}>{gauge.thickness.label}</h3>
              <ul className="mt-5 flex flex-col gap-5">
                {gauge.thickness.items.map((item) => (
                  <li key={item.value} className="flex items-center gap-5">
                    <span className={`w-14 shrink-0 text-[0.92rem] tabular-nums ${sans}`}>
                      {item.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block min-w-0 flex-1 rounded-full bg-[var(--mal-steel)]"
                      style={{ height: `${item.weight * 10}px` }}
                    />
                  </li>
                ))}
              </ul>

              <h3 className={`mt-9 text-[0.92rem] font-semibold ${sans}`}>{gauge.length.label}</h3>
              <ul className="mt-5 flex flex-col gap-5">
                {gauge.length.items.map((item) => (
                  <li key={item.value} className="flex items-center gap-5">
                    <span className={`w-14 shrink-0 text-[0.92rem] tabular-nums ${sans}`}>
                      {item.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block h-[3px] min-w-0 flex-1 bg-[var(--mal-line)]"
                    >
                      <span
                        className="block h-full rounded-full bg-[var(--mal-ink)]"
                        style={{ width: `${(item.span / 10) * 100}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[0.8rem] leading-relaxed text-[var(--mal-muted)]">
                {gauge.disclaimer}
              </p>
            </div>
          </div>
        </section>

        {/* Eight terms the shop publishes itself, set as terms. They used to
            sit in a ruled table of eight bordered rows, which is exactly the
            shape of an old shipping-info page; here they are just pairs with
            air between them. */}
        <section className="bg-[var(--mal-case)]">
          <div className={`${sectionBox} py-14 sm:py-20`}>
            <h2 className={h2Quiet}>Dostava i plaćanje</h2>
            {/* Two columns only from sm. Narrower than that, the longest
                detail gets about 136px to wrap in, which turns a sentence into
                a six-line stack. */}
            <dl className="mt-8 grid max-w-4xl gap-x-14 gap-y-8 sm:mt-10 sm:grid-cols-2">
              {delivery.map((fact) => (
                <div key={fact.term}>
                  <dt
                    className={`text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-[var(--mal-muted)] ${sans}`}
                  >
                    {fact.term}
                  </dt>
                  <dd className="mt-2 text-[1rem] leading-relaxed">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-[var(--mal-paper)]">
          <div
            className={`${sectionBox} py-16 sm:py-24 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-16`}
          >
            <div>
              <h2 className={h2Type}>{support.heading}</h2>
              <p className={`mt-6 max-w-xl ${leadType}`}>{support.body}</p>
              <address className="mt-9 not-italic">
                <a
                  href={shop.instagramUrl}
                  {...outbound("instagram-podrska", "demo_contact")}
                  className={`inline-flex min-h-14 items-center gap-3 text-[1.08rem] font-semibold underline decoration-[var(--mal-cobalt)] decoration-2 underline-offset-[8px] transition-colors hover:text-[var(--mal-cobalt)] hover:no-underline ${focusOnLight} ${sans}`}
                >
                  <InstagramIcon className="h-[1.3rem] w-[1.3rem] shrink-0" />
                  {support.ctaLabel}
                </a>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--mal-muted)]">
                  Profil: @{shop.instagram}
                  <span aria-hidden="true" className="px-2 text-[var(--mal-steel)]">
                    ·
                  </span>
                  {shop.areaSentence}
                </p>
              </address>
            </div>

            {/* The only colour on the page that is not cobalt, and it is the
                jewellery's own: five enamel tops answering "which of these"
                faster than the paragraph beside them can. */}
            <figure className="mt-12 lg:mt-0">
              <div className={`${styles.plate} w-full max-w-[17rem] lg:max-w-none`}>
                <DemoPhoto
                  src={support.photo.src}
                  alt={support.photo.alt}
                  width={support.photo.width}
                  height={support.photo.height}
                  sizes="(min-width: 1024px) 20rem, 17rem"
                  className={`${styles.cutout} block h-auto w-full`}
                />
              </div>
              <figcaption className={`mt-3 text-[0.82rem] text-[var(--mal-muted)] ${sans}`}>
                {support.photoCaption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The handoff. Everything commercial lives on the other side of this
            button, and the paragraph next to it says exactly that. */}
        <section className="bg-[var(--mal-ink)] text-[var(--mal-paper)]">
          <div
            className={`${sectionBox} py-20 sm:py-28 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16`}
          >
            <h2
              className={`text-[clamp(2.1rem,9vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.036em] text-balance ${sans}`}
            >
              Nakit za tvoj sljedeći detalj.
            </h2>
            <div className="mt-10 lg:mt-0">
              <p className="max-w-sm text-[1.02rem] leading-relaxed text-[var(--mal-ink-muted)]">
                Cijene, zalihe, korpa i naručivanje su na {shop.shopDomain}. Ova strana samo skraćuje
                put do pravog artikla.
              </p>
              <a
                href={shop.shopUrl}
                {...outbound("shop-final")}
                className={`${shopCtaOnInk} mt-8 w-full justify-center sm:w-auto lg:w-full`}
              >
                Otvori shop
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--mal-paper)]">
        <div
          className={`${sectionBox} flex flex-col gap-5 pt-12 pb-[max(3rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-end sm:justify-between`}
        >
          <div>
            <p className={`text-[1.05rem] font-semibold ${sans}`}>{shop.name}</p>
            <p className="mt-3 max-w-lg text-[0.76rem] leading-relaxed text-[var(--mal-muted)]">
              Nezvanični dizajn koncept. Kategorije, uslovi dostave i plaćanja preuzeti su sa
              zvaničnog webshopa {shop.shopDomain} i javnog Instagram profila prodavnice, a
              fotografije su isječci njihovih vlastitih snimaka proizvoda. Kupovina se u cjelosti
              obavlja na postojećem shopu.
            </p>
          </div>
          <p className="text-[0.76rem] text-[var(--mal-muted)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-semibold text-[var(--mal-ink)] hover:underline ${focusOnLight}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
