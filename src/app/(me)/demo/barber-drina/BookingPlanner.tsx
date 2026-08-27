"use client";

import { useState } from "react";
import { publicDetails, priceGroups, services } from "./data";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function BookingPlanner() {
  const [selectedId, setSelectedId] = useState(services[0].id);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const selected = services.find((service) => service.id === selectedId) ?? services[0];
  const message = `Zdravo, želio bih da zakažem termin za: ${selected.name}. Koji termini su slobodni?`;

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <label
          htmlFor="usluga"
          className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Izaberi uslugu
        </label>
        <div className="relative mt-3">
          <select
            id="usluga"
            value={selectedId}
            onChange={(event) => {
              setSelectedId(event.target.value);
              setStatus("idle");
            }}
            className={`block min-h-12 w-full appearance-none border border-white/45 bg-black pl-4 pr-11 text-base text-white hover:border-white/75 ${focus}`}
          >
            {priceGroups.map((group) => (
              <optgroup key={group.id} label={group.title}>
                {group.items.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} — {service.price}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className="pointer-events-none absolute right-4 top-1/2 w-3 -translate-y-1/2 fill-none stroke-white stroke-2"
          >
            <path d="M1 1.5 6 6.5l5-5" />
          </svg>
        </div>
        <p className="mt-3 text-sm text-white/50">
          Cijena po zvaničnom cjenovniku: <span className="text-white">{selected.price}</span>
        </p>
      </div>

      <div className="border-t border-white/25 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Pošalji poruku
        </p>
        <p className="mt-3 text-lg leading-relaxed sm:text-xl">“{message}”</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
            className={`inline-flex min-h-12 items-center justify-center border border-white/40 px-6 text-sm font-bold transition-colors hover:border-white ${focus}`}
          >
            {status === "copied" ? "Poruka kopirana" : "Kopiraj poruku"}
          </button>
        </div>
        <p aria-live="polite" className="mt-4 min-h-5 text-sm text-white/55">
          {status === "copied" && "Sada je samo nalijepi u Instagram poruku."}
          {status === "failed" && "Kopiranje nije uspjelo — označi tekst iznad i kopiraj ručno."}
          {status === "idle" && "Termin potvrđuje barber direktno u DM-u."}
        </p>
      </div>
    </div>
  );
}
