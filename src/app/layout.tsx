import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Pixelify_Sans } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

/* Libre Franklin is a revival of ATF Franklin Gothic (1902) — the face that
   set newspaper headlines for a century. One variable family carries the whole
   page: masthead, headlines, tables and body. Its caron on š/č stays open at
   display sizes, which is where geometric sans faces fail on Montenegrin. */
const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/* The pixel face carries controls only — buttons, nav, the wordmark and the
   step numerals. It is deliberately kept off the reading layer: a specimen at
   12/16/24/48px showed its euro sign is near-indistinguishable from 0 and 8
   ("€350" reads "03S0"), and its letterforms mush at the 12px/0.18em eyebrow
   setting. Headlines, body copy, eyebrows and every price stay in Franklin. */
const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "VibeLab — Sajtovi koji donose klijente | Web studio Podgorica",
  description:
    "Moderan sajt za tvoj biznis — gotov za 7 dana, od €100. Restorani, teretane, saloni i mali biznisi u Crnoj Gori. Besplatan koncept prije plaćanja.",
  openGraph: {
    siteName: "VibeLab",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // The inline script below adds `js` to <html> before React hydrates, so the
  // server and client classNames differ by design.
  return (
    <html
      lang="sr-ME"
      className={`${franklin.variable} ${pixel.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* gates hidden-until-revealed styles so content is never lost without JS */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
