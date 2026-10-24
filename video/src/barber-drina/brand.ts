import { loadFont } from "@remotion/google-fonts/BricolageGrotesque";

/* The concept's own look, lifted from src/app/(me)/demo/barber-drina: black,
   white and the white at half strength, capitals set heavy and tight, and the
   site's face. The videos are sold as "your site's colours and type", so they
   use nothing the site does not. */
export const color = {
  black: "#000000",
  white: "#ffffff",
  dim: "rgba(255, 255, 255, 0.55)",
  line: "rgba(255, 255, 255, 0.25)",
  bezel: "#262626",
};

/* latin-ext for č, ć, š, ž and đ. */
const bricolage = loadFont("normal", { weights: ["400", "600", "800"], subsets: ["latin", "latin-ext"] });

export const font = bricolage.fontFamily;

/**
 * Prices as the shop publishes them, from the concept's own data
 * (src/app/(me)/demo/barber-drina/data.ts, transcribed from Barber Drina's
 * Instagram price list). Five of the twelve, the ones a first visit asks for.
 */
export const prices = [
  { name: "Klasično šišanje", euros: 10 },
  { name: "Fade šišanje", euros: 12 },
  { name: "Šišanje i brada", euros: 15 },
  { name: "Klasično brijanje", euros: 5 },
  { name: "Pranje i feniranje", euros: 2 },
];

export const handle = "@barber_drina";
/** Said on every end card: this is a concept, not a client's video. */
export const credit = "Dizajn koncept · vaky.me";
