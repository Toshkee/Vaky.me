import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Libre_Franklin } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { Analytics } from "@/components/Analytics";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";

/* Libre Franklin is a revival of ATF Franklin Gothic (1902). It carries the
   reading layer — body copy, eyebrows, forms, tables — under the pixel
   headlines. Its caron on š/č stays open, which is where geometric sans faces
   fail on Montenegrin. */
const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/* The pixel face. Geist Pixel Square (Vercel, SIL OFL) — a monospace bitmap
   face drawn on a strict square grid, self-hosted from the `geist` package
   rather than Google Fonts because the Google build ships a reduced glyph
   table. This file carries č ć ž š đ and a euro sign that is not an 8, which
   are the two things that retired Pixelify Sans and then Jersey 10 here —
   check the cmap, not the specimen, before swapping it again.

   Unlike Jersey 10 it sits in a normal em box (cap height 0.72em), so it is
   set at text sizes, not inflated ones. */
const pixel = localFont({
  src: "./fonts/GeistPixel-Square.woff2",
  variable: "--font-pixel",
  weight: "400",
  display: "swap",
  /* Not preloaded: it sets buttons and headlines, and the LCP element is
     the hero paragraph in Franklin. `swap` shows Franklin for the moment
     before it lands. */
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

export function RootHtml({
  lang,
  analytics = true,
  children,
}: {
  lang: string;
  /** Off for the onboarding shell: its address bar holds the client's link
   *  token, and a page-view tracker would report that path to the analytics
   *  provider. See src/app/(onboarding)/layout.tsx. */
  analytics?: boolean;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      /* globals.css sets scroll-behavior: smooth. Next wants to know, so it
         can turn it off for the instant of a route change and back on
         after — without this it warns on every navigation in dev. */
      data-scroll-behavior="smooth"
      className={`${franklin.variable} ${pixel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {analytics && <Analytics />}
        <ConsoleGreeting />
      </body>
    </html>
  );
}
