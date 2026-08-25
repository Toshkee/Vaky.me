import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "VibeCode.me — Sajtovi koji donose klijente | Web studio Podgorica",
  description:
    "Moderan sajt za tvoj biznis — gotov za 7 dana, od €150. Restorani, teretane, saloni i mali biznisi u Crnoj Gori. Besplatan koncept prije plaćanja.",
  openGraph: {
    siteName: "VibeCode.me",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr-ME"
      className={`${barlow.variable} ${schibsted.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
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
