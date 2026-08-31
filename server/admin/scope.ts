import {
  answerHas,
  answerText,
  type Answers,
  type PackageId,
} from "../../src/lib/onboarding/schema";

/**
 * "Potentially outside package scope", computed rather than stored.
 *
 * A client is never blocked for asking — a Start client whose goal is selling
 * is a sales conversation, not an error. These flags are how the dashboard
 * starts that conversation: derived fresh from the answers on every read, so
 * changing the package or the answers can never leave a stale warning behind.
 *
 * The final commercial call — upgrade, add-on, include it, decline it — is
 * Vaky's, made outside this code.
 */

export type ScopeWarning = {
  id: string;
  /** Montenegrin, for the dashboard. The build brief writes its own English
   *  wording per id — see server/admin/brief.ts. */
  label: string;
};

export function scopeWarnings(
  packageId: PackageId,
  answers: Answers | null,
  submissionPackageId: PackageId | null,
): ScopeWarning[] {
  const out: ScopeWarning[] = [];

  if (submissionPackageId && submissionPackageId !== packageId) {
    out.push({
      id: "package-mismatch",
      label: `Odgovori su prikupljeni pod drugim paketom (${submissionPackageId}) — pregledaj da li još važe.`,
    });
  }

  if (!answers) return out;

  const wantsShop = answerHas(answers, "goals", "sell-products");
  const wantsBooking = answerHas(answers, "goals", "take-bookings");
  const wantsSelfEditing = answerText(answers, "selfEditing") === "yes";

  if (packageId === "start") {
    if (wantsShop) {
      out.push({
        id: "start-shop",
        label: "Cilj je prodaja proizvoda — Start paket nema prodavnicu. Kandidat za Projekat ili dogovor.",
      });
    }
    if (wantsBooking) {
      out.push({
        id: "start-booking",
        label: "Klijent bi primao rezervacije — online zakazivanje nije u Start paketu.",
      });
    }
  }

  if (packageId === "business" && wantsShop) {
    out.push({
      id: "business-shop",
      label: "Cilj je prodaja proizvoda — prodavnica je Projekat teritorija.",
    });
  }

  if ((packageId === "start" || packageId === "business") && wantsSelfEditing) {
    out.push({
      id: "self-editing",
      label:
        "Klijent želi sam da mijenja sadržaj — uređivanje kroz sajt (CMS) nije u ovom paketu; sitne izmjene pokriva održavanje.",
    });
  }

  if (answerText(answers, "textsReady") === "help") {
    out.push({
      id: "copywriting",
      label: "Klijent traži pomoć oko tekstova — uređujemo dostavljeno; kompletan copywriting se dogovara posebno.",
    });
  }

  if (answerText(answers, "logoStatus") === "redo") {
    out.push({
      id: "logo-redo",
      label: "Klijent bi novu verziju loga — izrada loga se dogovara posebno.",
    });
  }

  return out;
}
