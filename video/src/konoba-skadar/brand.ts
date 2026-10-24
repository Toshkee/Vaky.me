import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadKarla } from "@remotion/google-fonts/Karla";

/* The concept's own palette and type, lifted from
   src/app/(me)/demo/konoba-skadar/page.tsx. The video is sold as "your
   site's colours and type", so it uses nothing the site does not. */
export const color = {
  lake: "#101d24",
  deep: "#0c161c",
  amber: "#dfa15c",
  cream: "#f2e9d8",
  ink: "#22333b",
  rust: "#8e3b2f",
  wine: "#6e2a22",
};

/* latin-ext for č, ć, š, ž and đ. */
const subsets: ("latin" | "latin-ext")[] = ["latin", "latin-ext"];

const fraunces = loadFraunces("normal", { weights: ["400"], subsets });
loadFraunces("italic", { weights: ["400"], subsets });
const karla = loadKarla("normal", { weights: ["400", "700"], subsets });

export const font = {
  serif: fraunces.fontFamily,
  sans: karla.fontFamily,
};
