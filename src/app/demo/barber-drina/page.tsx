import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { BookingPlanner } from "./BookingPlanner";
import { priceGroups, publicDetails } from "./data";

export const metadata: Metadata = {
  title: "Barber Drina — Stari Aerodrom, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Barber Drina na Starom Aerodromu u Podgorici. Cjenovnik, rezervacije putem Instagram DM-a, ponedjeljak–subota 09–21h.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-barber-drina.png"] },
};

const display = "font-sans uppercase";
const eyebrow = "text-[11px] font-bold uppercase tracking-[0.22em]";
const heading = `${display} text-3xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-4xl`;
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";
const focusDark =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-black ${compact ? "h-10 w-40" : "aspect-square w-full"}`}
    >
      <Image
        src="/barber-drina-logo.jpg"
        alt="Barber Drina — Shave & Haircut, est. 2021"
        width={400}
        height={400}
        priority={!compact}
        className={
          compact
            ? "absolute left-1/2 top-1/2 w-[190px] max-w-none -translate-x-1/2 -translate-y-1/2"
            : "h-full w-full object-cover"
        }
      />
    </div>
  );
}

export default function BarberDrinaPage() {
  return (
    <div className="min-h-screen bg-black pb-24 text-white md:pb-0">
      <VibeLabBar />

      <header className="sticky top-0 z-40 border-b border-white/15 bg-black/95 backdrop-blur">
        <div className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#vrh" aria-label="Barber Drina — početak" className={`block ${focusDark}`}>
            <BrandLockup compact />
          </a>
          <nav aria-label="Glavna navigacija" className="hidden items-center gap-6 sm:flex">
            <a href="#cjenovnik" className={`${eyebrow} py-4 text-white/70 hover:text-white ${focusDark}`}>
              Cjenovnik
            </a>
            <a href="#termin" className={`${eyebrow} py-4 text-white/70 hover:text-white ${focusDark}`}>
              Termin
            </a>
            <a href="#lokacija" className={`${eyebrow} py-4 text-white/70 hover:text-white ${focusDark}`}>
              Lokacija
            </a>
          </nav>
          <a
            href={publicDetails.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-10 items-center border border-white px-4 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black ${focusDark}`}
          >
            Zakaži
          </a>
        </div>
      </header>

      <main id="vrh">
        {/* The logo asset is pure black, so the hero stays one uniform black
            field — a second dark tone behind it shows the JPG's edges as a seam. */}
        <section className="border-b border-white/15 bg-black">
          <div className="mx-auto grid max-w-5xl lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between px-5 py-12 sm:px-6 sm:py-16 lg:border-r lg:border-white/15 lg:pr-12">
              <div>
                <p className={`${eyebrow} text-white/55`}>
                  Stari Aerodrom · Podgorica · Est. {publicDetails.established}
                </p>
                <h1
                  className={`${display} mt-6 text-[clamp(2.25rem,7vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.04em]`}
                >
                  Šišanje.
                  <br />
                  Brijanje.
                  <br />
                  <span className="text-white/45">Termin u DM-u.</span>
                </h1>
              </div>

              <div className="mt-10 flex flex-col items-start gap-4 border-t border-white/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-sm leading-relaxed text-white/65">
                  Barber shop za muško šišanje i brijanje. Izaberi uslugu, pripremi poruku i dogovori
                  slobodan termin direktno sa barberom.
                </p>
                <a
                  href="#termin"
                  className={`inline-flex min-h-11 shrink-0 items-center text-sm font-bold uppercase tracking-[0.16em] underline decoration-white/40 underline-offset-8 hover:decoration-white ${focusDark}`}
                >
                  Rezerviši termin <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center px-5 pb-12 sm:px-6 sm:pb-16 lg:p-12">
              <div className="w-full max-w-[320px]">
                <BrandLockup />
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Osnovne informacije" className="bg-white text-black">
          <div className="mx-auto grid max-w-5xl divide-y divide-black/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["Radno vrijeme", publicDetails.shortHours],
              ["Lokacija", "Stari Aerodrom"],
              ["Rezervacije", "Instagram DM"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-5 px-5 py-4 sm:block sm:px-6 sm:py-5"
              >
                <p className={`${eyebrow} text-black/60`}>{label}</p>
                <p className={`${display} text-base font-bold sm:mt-1.5 sm:text-lg`}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cjenovnik" className="scroll-mt-20 bg-[#efefeb] text-black">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div>
                <h2 className={heading}>Cjenovnik</h2>
                <p className="mt-5 max-w-xs text-xs leading-relaxed text-black/65">
                  Cijene su preuzete sa zvaničnog cjenovnika Barber Drina objavljenog na{" "}
                  <a
                    href={publicDetails.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline underline-offset-2 hover:text-black ${focusLight}`}
                  >
                    Instagram profilu
                  </a>
                  . Kao dio dizajn koncepta, konačnu ponudu potvrđuje vlasnik prije objave.
                </p>
              </div>

              {/* Capped below lg so a row's price never strands hundreds of
                  pixels from its name; the lg grid column takes over above it. */}
              <div className="max-w-[34rem] border-2 border-black bg-white lg:max-w-none">
                {priceGroups.map((group, index) => (
                  <div
                    key={group.id}
                    className={`px-4 py-5 sm:px-7 sm:py-6 ${index > 0 ? "border-t border-black/20" : ""}`}
                  >
                    <h3 className={`${eyebrow} text-black/60`}>{group.title}</h3>
                    <dl className="mt-4 grid gap-3.5">
                      {group.items.map((item) => (
                        <div key={item.id} className="flex items-baseline justify-between gap-5">
                          <dt className="text-sm sm:text-base">{item.name}</dt>
                          <dd className="shrink-0 font-bold tabular-nums">{item.price}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="termin" className="scroll-mt-20 border-y border-white/15 bg-black">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
            <div className="mb-8 flex flex-col gap-4 border-b border-white/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`${eyebrow} text-white/55`}>Rezervacija</p>
                <h2 className={`${heading} mt-3`}>Složi poruku. Pošalji DM.</h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-white/60">
                Bez formulara i bez lažne potvrde termina. Dogovor se završava direktno na zvaničnom
                Instagram profilu.
              </p>
            </div>
            <BookingPlanner />
          </div>
        </section>

        <section className="bg-white text-black">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className={`${eyebrow} text-black/60`}>Profili</p>
              <h2 className={`${heading} mt-3`}>Prati svjež rad.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-black/65">
                Fotografije i kratki video sadržaj objavljuju se na zvaničnim profilima Barber
                Drina.
              </p>
            </div>

            <div className="grid border-t-2 border-black">
              {[
                {
                  label: `Instagram · @${publicDetails.instagram}`,
                  href: publicDetails.instagramUrl,
                },
                { label: `TikTok · @${publicDetails.tiktok}`, href: publicDetails.tiktokUrl },
                {
                  label: `Vlasnik · @${publicDetails.ownerInstagram}`,
                  href: publicDetails.ownerInstagramUrl,
                },
              ].map((profile) => (
                <a
                  key={profile.href}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-14 items-center justify-between gap-4 border-b border-black/25 px-3 text-sm font-bold transition-colors hover:bg-black hover:text-white ${focusLight}`}
                >
                  <span>{profile.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Split section: each half is a full-width grid cell holding a 32rem
            block pushed towards the centre, so the map bleeds to the viewport
            edge while the text stays on the same rail as the rest of the page. */}
        <section id="lokacija" className="scroll-mt-20 grid bg-[#efefeb] text-black lg:grid-cols-2">
          <div className="flex min-w-0 justify-end">
            <div className="w-full min-w-0 px-5 py-12 sm:px-6 sm:py-16 lg:max-w-[32rem]">
              <p className={`${eyebrow} text-black/60`}>Kontakt i lokacija</p>
              <h2 className={`${heading} mt-3`}>Stari Aerodrom.</h2>
              <address className="mt-6 max-w-sm not-italic">
                <p className="font-bold">{publicDetails.address}</p>
                <p className="mt-3 text-sm text-black/65">{publicDetails.hours}</p>
              </address>
              <div className="mt-7 flex flex-col items-start gap-4">
                <a
                  href={publicDetails.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-12 items-center justify-center bg-black px-6 text-sm font-bold text-white hover:bg-black/75 ${focusLight}`}
                >
                  Otvori Google mapu <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={publicDetails.phoneUrl}
                  className={`text-sm font-bold underline decoration-black/30 underline-offset-4 hover:decoration-black ${focusLight}`}
                >
                  {publicDetails.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
          <div className="min-h-[320px] min-w-0 overflow-hidden border-t border-black/20 lg:border-l lg:border-t-0">
            <iframe
              src={publicDetails.mapUrl}
              title={`Mapa — ${publicDetails.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full min-h-[320px] w-full max-w-full border-0"
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 bg-black text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="w-44">
            <BrandLockup compact />
            <p className="mt-3 text-xs leading-relaxed text-white/55">
              Dizajn koncept. Poslovni podaci i cijene su preuzeti sa javnih profila i moraju se
              potvrditi prije objave.
            </p>
          </div>
          <div className="text-sm text-white/60 sm:text-right">
            <p>{publicDetails.address}</p>
            <p className="mt-2">
              Koncept:{" "}
              <Link href="/" className={`font-bold text-white hover:underline ${focusDark}`}>
                VibeLab.me
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* The focus ring is drawn inside the button: an offset ring would land on
          the black page behind it and disappear. */}
      <a
        href={publicDetails.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-3 bottom-3 z-50 inline-flex min-h-14 items-center justify-between bg-white px-5 text-sm font-extrabold uppercase tracking-[0.12em] text-black shadow-[0_8px_30px_rgba(0,0,0,.35)] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-black md:hidden"
      >
        <span>Zakaži putem Instagram DM-a</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
