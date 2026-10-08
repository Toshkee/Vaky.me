import type { Language, PackageId } from "./onboarding/schema";

/**
 * What Vaky sells, as numbers and limits — the one place they are written.
 *
 * The marketing words for a package (name, tagline, feature rows) stay in the
 * i18n dictionaries, because words differ per language. What must NOT differ
 * per language, per component or per endpoint is the arithmetic: what a
 * package costs, whether it is one page or five, how many revision rounds it
 * carries. The pricing section, the onboarding, the admin dashboard and the
 * build brief all read those facts from here, so a price change is one edit.
 *
 * A few price mentions live outside this module on purpose, as prose: the
 * hero headline, the trade pages and the meta description say "od €250" in a
 * sentence. All mean the entry price — if `start.price.amount` ever changes,
 * change them too (grep for "€250" in src/i18n/).
 *
 * Imported by both the browser bundle and the Cloudflare Functions build, so
 * the same rules apply as in `./onboarding/schema`: relative imports only, no
 * React, no DOM, no Node.
 */

export type PackagePrice = {
  amount: number;
  /** "fixed" renders as "€250"; "from" as "Od €800" / "From €800" — a
   *  starting price whose final figure depends on scope. */
  kind: "fixed" | "from";
};

export type PackageDef = {
  id: PackageId;
  price: PackagePrice;
  /** Start is ONE scrolling page built from sections — never "how many
   *  pages". Everything that asks or writes about structure checks this. */
  onePage: boolean;
  /** Separate pages the package covers. `null` means agreed per project. */
  maxPages: number | null;
  /** Revision rounds before launch. `null` means agreed per project. */
  revisionRounds: number | null;
  /** Which site languages the package includes by default. */
  languages: "me" | "me-en" | "custom";
};

export const PACKAGES: Record<PackageId, PackageDef> = {
  start: {
    id: "start",
    price: { amount: 250, kind: "fixed" },
    onePage: true,
    maxPages: 1,
    revisionRounds: 1,
    languages: "me",
  },
  business: {
    id: "business",
    price: { amount: 500, kind: "fixed" },
    onePage: false,
    maxPages: 5,
    revisionRounds: 2,
    languages: "me-en",
  },
  project: {
    id: "project",
    price: { amount: 800, kind: "from" },
    onePage: false,
    maxPages: null,
    revisionRounds: null,
    languages: "custom",
  },
};

const FROM: Record<Language, string> = { me: "Od", en: "From" };

export function priceLabel(id: PackageId, language: Language): string {
  const { amount, kind } = PACKAGES[id].price;
  return kind === "from" ? `${FROM[language]} €${amount}` : `€${amount}`;
}
