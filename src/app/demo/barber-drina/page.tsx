import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { BookingPlanner } from "./BookingPlanner";
import { publicDetails, services } from "./data";

export const metadata: Metadata = {
  title: "Barber Drina — Stari Aerodrom, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Barber Drina na Starom Aerodromu u Podgorici. Rezervacije putem Instagram DM-a, ponedjeljak–subota 09–21h.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-barber-drina.png"] },
};

const display = "font-sans uppercase";
const eyebrow = "text-[11px] font-bold uppercase tracking-[0.26em]";
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";
const focusDark =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-black ${compact ? "h-12 w-44" : "aspect-square w-full"}`}
    >
      <Image
        src="/barber-drina-logo.jpg"
        alt="Barber Drina — Shave & Haircut, est. 2021"
        width={400}
        height={400}
        priority={!compact}
        className={
          compact
            ? "absolute left-1/2 top-1/2 w-[210px] max-w-none -translate-x-1/2 -translate-y-1/2"
            : "h-full w-full object-cover"
        }
      />
    </div>
  );
}

export default function BarberDrinaPage() {
  return (
    <div className="min-h-screen bg-black pb-20 text-white md:pb-0">
      <VibeLabBar />

      <header className="sticky top-0 z-40 border-b border-white/15 bg-black/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
          <a href="#vrh" aria-label="Barber Drina — početak" className={`block ${focusDark}`}>
            <BrandLockup compact />
          </a>
          <nav aria-label="Glavna navigacija" className="hidden items-center gap-7 sm:flex">
            <a href="#usluge" className={`${eyebrow} py-5 text-white/65 hover:text-white ${focusDark}`}>
              Usluge
            </a>
            <a href="#termin" className={`${eyebrow} py-5 text-white/65 hover:text-white ${focusDark}`}>
              Termin
            </a>
            <a href="#lokacija" className={`${eyebrow} py-5 text-white/65 hover:text-white ${focusDark}`}>
              Lokacija
            </a>
          </nav>
          <a
            href={publicDetails.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center border border-white px-4 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black ${focusDark}`}
          >
            Zakaži
          </a>
        </div>
      </header>

      <main id="vrh">
        <section className="border-b border-white/15">
          <div className="mx-auto grid max-w-6xl lg:min-h-[680px] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col justify-between border-white/15 px-5 py-14 sm:px-8 sm:py-20 lg:border-r lg:py-24">
              <div>
                <p className={`${eyebrow} text-white/50`}>
                  Stari Aerodrom · Podgorica · Est. {publicDetails.established}
                </p>
                <h1 className={`${display} mt-8 max-w-3xl text-[clamp(3.5rem,17vw,9.5rem)] font-extrabold leading-[0.8] tracking-[-0.055em]`}>
                  Šišanje.
                  <br />
                  Brijanje.
                  <br />
                  <span className="text-white/35">Termin u DM-u.</span>
                </h1>
              </div>

              <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
                  Barber shop za muško šišanje i brijanje. Izaberi uslugu, pripremi poruku i dogovori slobodan termin direktno sa barberom.
                </p>
                <a
                  href="#termin"
                  className={`inline-flex min-h-11 shrink-0 items-center text-sm font-bold uppercase tracking-[0.18em] underline decoration-white/40 underline-offset-8 hover:decoration-white ${focusDark}`}
                >
                  Rezerviši termin ↓
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center bg-[#0b0b0b] p-8 sm:p-14 lg:p-10">
              <div className="w-full max-w-[500px]">
                <BrandLockup />
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Osnovne informacije" className="bg-white text-black">
          <div className="mx-auto grid max-w-6xl divide-y divide-black/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["Radno vrijeme", publicDetails.shortHours],
              ["Lokacija", "Stari Aerodrom"],
              ["Rezervacije", "Instagram DM"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-5 px-5 py-5 sm:block sm:px-8 sm:py-7">
                <p className={`${eyebrow} text-black/45`}>{label}</p>
                <p className={`${display} text-xl font-bold sm:mt-2 sm:text-2xl`}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="usluge" className="scroll-mt-24 bg-[#efefeb] text-black">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className={`${eyebrow} text-black/45`}>Usluge</p>
                <h2 className={`${display} mt-4 text-5xl font-bold leading-none tracking-[-0.03em] sm:text-7xl`}>
                  Osnovno.
                  <br />
                  Urađeno kako treba.
                </h2>
              </div>

              <ol className="border-t-2 border-black">
                {services.map((service, index) => (
                  <li key={service.id} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-black/25 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-6 sm:py-8">
                    <span className={`${display} text-lg font-bold text-black/35`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className={`${display} text-3xl font-bold tracking-[-0.02em] sm:text-4xl`}>
                        {service.name}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-black/55">
                        {service.description}
                      </p>
                    </div>
                    <span className={`${eyebrow} col-start-2 mt-2 text-black/40 sm:col-start-auto sm:mt-0`}>
                      {service.eyebrow}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-black/45">
              Nazivi usluga su prijedlog zasnovan na javnom opisu “Shave &amp; Haircut”. Konačnu ponudu i cijene potvrđuje vlasnik.
            </p>
          </div>
        </section>

        <section id="termin" className="scroll-mt-24 border-y border-white/15 bg-black">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mb-12 flex flex-col gap-5 border-b border-white/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`${eyebrow} text-white/45`}>Rezervacija</p>
                <h2 className={`${display} mt-4 text-5xl font-bold leading-none tracking-[-0.03em] sm:text-7xl`}>
                  Složi poruku.
                  <br />
                  Pošalji DM.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-white/55">
                Bez formulara i bez lažne potvrde termina. Dogovor se završava direktno na zvaničnom Instagram profilu.
              </p>
            </div>
            <BookingPlanner />
          </div>
        </section>

        <section className="bg-white text-black">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
            <div className="px-5 py-16 sm:px-8 sm:py-24 lg:border-r lg:border-black/20">
              <p className={`${eyebrow} text-black/45`}>Radovi i novosti</p>
              <h2 className={`${display} mt-4 text-5xl font-bold leading-none tracking-[-0.03em] sm:text-7xl`}>
                Prati svjež rad.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 sm:text-base">
                Novi rezovi, dostupni termini i kratki video sadržaj objavljuju se na zvaničnim profilima Barber Drina.
              </p>
              <div className="mt-9 grid max-w-md border-t-2 border-black">
                <a
                  href={publicDetails.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-16 items-center justify-between border-b border-black/25 font-bold hover:bg-black hover:px-4 hover:text-white ${focusLight}`}
                >
                  <span>Instagram · @{publicDetails.instagram}</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={publicDetails.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-16 items-center justify-between border-b border-black/25 font-bold hover:bg-black hover:px-4 hover:text-white ${focusLight}`}
                >
                  <span>TikTok · @{publicDetails.tiktok}</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={publicDetails.ownerInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-16 items-center justify-between border-b border-black/25 font-bold hover:bg-black hover:px-4 hover:text-white ${focusLight}`}
                >
                  <span>Owner · @{publicDetails.ownerInstagram}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="flex min-h-[390px] items-center justify-center bg-[#e4e4df] p-8 sm:p-14">
              <div className="w-full max-w-[420px] border border-black/25 bg-black p-4 shadow-[14px_14px_0_#bcbcb5]">
                <BrandLockup />
              </div>
            </div>
          </div>
        </section>

        <section id="lokacija" className="scroll-mt-24 bg-[#efefeb] text-black">
          <div className="mx-auto grid w-full min-w-0 max-w-6xl overflow-hidden lg:grid-cols-[0.8fr_1.2fr]">
            <div className="min-w-0 px-5 py-16 sm:px-8 sm:py-24">
              <p className={`${eyebrow} text-black/45`}>Kontakt i lokacija</p>
              <h2 className={`${display} mt-4 text-4xl font-bold leading-none tracking-[-0.03em] sm:text-7xl`}>
                Stari Aerodrom.
              </h2>
              <address className="mt-8 max-w-sm not-italic">
                <p className="text-lg font-bold">{publicDetails.address}</p>
                <p className="mt-4 text-black/60">{publicDetails.hours}</p>
              </address>
              <div className="mt-9 flex flex-col items-start gap-5">
                <a
                  href={publicDetails.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-12 items-center justify-center bg-black px-6 text-sm font-bold text-white hover:bg-black/75 ${focusLight}`}
                >
                  Otvori Google mapu ↗
                </a>
                <a href={publicDetails.phoneUrl} className={`font-bold underline decoration-black/30 underline-offset-4 hover:decoration-black ${focusLight}`}>
                  {publicDetails.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="min-h-[390px] min-w-0 overflow-hidden border-t border-black/20 lg:border-l lg:border-t-0">
              <iframe
                src={publicDetails.mapUrl}
                title={`Mapa — ${publicDetails.address}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full min-h-[390px] w-full max-w-full border-0 grayscale"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 bg-black text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="w-48">
            <BrandLockup compact />
            <p className="mt-4 text-xs leading-relaxed text-white/45">
              Dizajn koncept sa ilustrativnom ponudom. Poslovni podaci su preuzeti sa javnih profila i moraju se potvrditi prije objave.
            </p>
          </div>
          <div className="text-sm text-white/55 sm:text-right">
            <p>{publicDetails.address}</p>
            <p className="mt-2">
              Koncept: <Link href="/" className={`font-bold text-white hover:underline ${focusDark}`}>VibeLab.me</Link>
            </p>
          </div>
        </div>
      </footer>

      <a
        href={publicDetails.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed inset-x-3 bottom-3 z-50 inline-flex min-h-14 items-center justify-between bg-white px-5 text-sm font-extrabold uppercase tracking-[0.12em] text-black shadow-[0_8px_30px_rgba(0,0,0,.35)] md:hidden ${focusLight}`}
      >
        <span>Zakaži putem Instagram DM-a</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
