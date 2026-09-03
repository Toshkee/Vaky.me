import Link from "next/link";
import { emailLink } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Vaky } from "@/components/mascot/Vaky";
import { RootHtml } from "./root-html";
import "./globals.css";

/* The site has two root layouts — one per language — so nothing wraps the
   global 404 and it renders its own document. As `global-not-found` (enabled
   in next.config.ts) that document is the whole page; as a plain
   `not-found.tsx` it would be nested inside Next's built-in <html> and
   hydrate with a mismatch. The copy is Montenegrin because an unknown URL is
   far likelier to be a mistyped /demo path than a mistyped /en one. */
export default function GlobalNotFound() {
  return (
    <RootHtml lang="sr-ME">
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Facing away, walking off. The one page where his back is the point. */}
        <Vaky direction="back" pose="walk" scale={0.44} className="mb-2" />

        <p className="headline text-8xl text-red sm:text-9xl">404</p>
        <h1 className="headline mt-6 text-3xl sm:text-5xl">Ova stranica ne postoji.</h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          Kao ni tvoj sajt… <span className="font-semibold text-ink">još.</span>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <Button href={emailLink("Novi sajt")}>
            Napravimo ga
          </Button>
          <Link
            href="/"
            className="font-semibold underline decoration-red decoration-2 underline-offset-8 transition-colors hover:text-red"
          >
            Nazad na početnu
          </Link>
        </div>
      </main>
    </RootHtml>
  );
}
