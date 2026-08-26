"use client";

import { useState } from "react";
import { publicDetails, services } from "./data";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function BookingPlanner() {
  const [selected, setSelected] = useState<(typeof services)[number]>(services[0]);
  const [copied, setCopied] = useState(false);

  const message = `Zdravo, želio bih da zakažem termin za: ${selected.name}. Koji termini su slobodni?`;

  async function copyMessage() {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
          01 · Izaberi uslugu
        </p>
        <div className="mt-5 grid gap-2">
          {services.map((service) => {
            const active = selected.id === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setSelected(service);
                  setCopied(false);
                }}
                aria-pressed={active}
                className={`flex min-h-14 items-center justify-between border px-4 text-left transition-colors ${focus} ${
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/25 text-white hover:border-white/60"
                }`}
              >
                <span className="font-semibold">{service.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] opacity-60">
                  {active ? "Izabrano" : service.eyebrow}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/30 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
          02 · Pošalji poruku
        </p>
        <p className="mt-5 max-w-xl text-xl leading-relaxed text-white sm:text-2xl">
          “{message}”
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={publicDetails.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 items-center justify-center bg-white px-6 text-sm font-bold text-black transition-colors hover:bg-[#dedede] ${focus}`}
          >
            Otvori Instagram DM
          </a>
          <button
            type="button"
            onClick={copyMessage}
            className={`inline-flex min-h-12 items-center justify-center border border-white/40 px-6 text-sm font-bold text-white transition-colors hover:border-white ${focus}`}
          >
            {copied ? "Poruka kopirana" : "Kopiraj poruku"}
          </button>
        </div>
        <p aria-live="polite" className="mt-4 min-h-5 text-sm text-white/55">
          {copied ? "Sada je samo nalijepi u Instagram poruku." : "Termin potvrđuje barber direktno u DM-u."}
        </p>
      </div>
    </div>
  );
}
