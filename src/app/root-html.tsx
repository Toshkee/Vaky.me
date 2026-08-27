import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Jersey_10, Libre_Franklin } from "next/font/google";
import { site } from "@/config/site";
import { Analytics } from "@/components/Analytics";

/* Libre Franklin is a revival of ATF Franklin Gothic (1902) — the face that
   set newspaper headlines for a century. One variable family carries the whole
   page: masthead, headlines, tables and body. Its caron on š/č stays open at
   display sizes, which is where geometric sans faces fail on Montenegrin. */
const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/* The pixel face carries button labels and nothing else; headlines, body copy,
   eyebrows and every price stay in Franklin.

   It replaced Pixelify Sans, which failed on the two things this site actually
   sets: its euro sign was indistinguishable from 8 (a specimen of "€100 €200
   €350" read "8100 8200 8350"), and its antialiased terminals mushed the
   caron on č/š/ž at button sizes.

   Jersey 10 is a true bitmap face drawn against a ~10px reference height, so
   it stays crisp small, and its glyph table really does carry č ć ž š đ —
   which is not a given. Silkscreen was the better-looking candidate and was
   rejected here for shipping no č/ć/đ at all: those letters silently fell back
   to the monospace stack, mixing two faces inside one word ("TAČNO"). Check
   the cmap, not the specimen, before swapping this. */
const pixel = Jersey_10({
  variable: "--font-pixel",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
  /* Not preloaded. next/font preloads every subset of every declared family,
     which put four woff2 files in front of the first paint — and two of them
     were for a face that only sets button labels. The LCP element on this page
     is the hero paragraph, so Franklin keeps its preload and the pixel face
     arrives when the stylesheet asks for it. `swap` means the buttons show in
     Franklin for the moment before it lands. */
  preload: false,
});

/* Both root layouts share everything except the language they declare, so the
   chrome lives here and each layout supplies its own `lang`. Two root layouts
   (rather than one plus a client-side correction) are what let /en/ ship
   `lang="en"` in the served HTML instead of patching it after hydration. */
export const sharedMetadata = {
  metadataBase: new URL(site.url),
  openGraph: {
    siteName: site.name,
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
} satisfies Metadata;

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export function RootHtml({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html
      lang={lang}
      className={`${franklin.variable} ${pixel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
