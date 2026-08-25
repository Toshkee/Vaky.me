import Link from "next/link";
import { whatsappLink } from "@/config/site";
import { dictionaries } from "@/i18n";
import { PaintedButton } from "@/components/brush/PaintedButton";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="headline text-8xl text-red sm:text-9xl">404</p>
      <h1 className="headline mt-6 text-3xl sm:text-5xl">Ova stranica ne postoji.</h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        Kao ni tvoj sajt… <span className="font-semibold text-white">još.</span>
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        <PaintedButton href={whatsappLink(dictionaries.me.contact.prefill)} external>
          Napravimo ga
        </PaintedButton>
        <Link
          href="/"
          className="font-semibold underline decoration-red decoration-2 underline-offset-8 transition-colors hover:text-red-bright"
        >
          Nazad na početnu
        </Link>
      </div>
    </main>
  );
}
