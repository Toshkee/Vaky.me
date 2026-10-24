import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { site } from "@/config/site";
import { Analytics } from "@/components/Analytics";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";

/* One family for the whole site. Bricolage Grotesque (SIL OFL) has an
   optical-size axis as well as width and weight: at body size it opens up and
   reads plainly, at title size the same file tightens and gets its quirks,
   so one face carries both voices. Headlines also narrow it on the width
   axis. Its Latin Extended cut carries č ć ž š đ. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
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
      /* The landing page's inline gate sets data-intro on this element before
         React hydrates it; that one attribute is expected to differ. */
      suppressHydrationWarning
      /* globals.css sets scroll-behavior: smooth. Next wants to know, so it
         can turn it off for the instant of a route change and back on
         after — without this it warns on every navigation in dev. */
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {analytics && <Analytics />}
        <ConsoleGreeting />
      </body>
    </html>
  );
}
