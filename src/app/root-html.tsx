import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo } from "next/font/google";
import { site } from "@/config/site";
import { Analytics } from "@/components/Analytics";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";

/* One family for the whole site. Archivo (Omnibus-Type, SIL OFL) is a
   grotesque with a width axis as well as a weight axis: body copy sits at its
   normal width, headlines run heavy and opened up, and the films stretch it
   further for their captions — one file, three voices. Its Latin Extended
   cut carries č ć ž š đ with open carons, which is where a lot of geometric
   faces fail on Montenegrin. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
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
  themeColor: "#f2ede4",
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
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {analytics && <Analytics />}
        <ConsoleGreeting />
      </body>
    </html>
  );
}
