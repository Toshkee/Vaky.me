import Link from "next/link";
import { instagramLink } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Tony } from "@/components/mascot/Tony";
import { RootHtml } from "./root-html";
import "./globals.css";

/* The site has two root layouts — one per language — so nothing wraps the
   global 404. It therefore has to render its own document, or Next falls back
   to its unstyled built-in page. The copy is Montenegrin because an unknown
   URL is far likelier to be a mistyped /demo path than a mistyped /en one. */
export default function NotFound() {
  return (
    <RootHtml lang="sr-ME">
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Facing away, walking off. The one page where his back is the point. */}
        <Tony direction="back" pose="walk" scale={0.44} className="mb-2" />

        <p className="headline text-8xl text-red sm:text-9xl">404</p>
        <h1 className="headline mt-6 text-3xl sm:text-5xl">Ova stranica ne postoji.</h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          Kao ni tvoj sajt… <span className="font-semibold text-ink">još.</span>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <Button href={instagramLink()} external>
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
