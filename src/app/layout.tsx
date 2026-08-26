import type { Metadata, Viewport } from "next";
import { Libre_Franklin } from "next/font/google";
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
      className={`${franklin.variable} h-full antialiased`}
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
