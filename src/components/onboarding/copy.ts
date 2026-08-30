import type { OnboardingCopy } from "@/i18n/onboarding";
import type { ErrorCode, Question } from "@/lib/onboarding/schema";

/** `"Korak {n} od {total}"` with the numbers filled in — the same placeholder
 *  style the landing dictionary already uses. */
export function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    const megabytes = bytes / 1024 / 1024;
    return `${megabytes >= 10 ? Math.round(megabytes) : megabytes.toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function errorText(copy: OnboardingCopy, code: ErrorCode | undefined): string | null {
  return code ? copy.errors[code] : null;
}

/** The words for a question, in the current language. Typed as a complete map
 *  over every question id, so this cannot come back undefined. */
export function words(copy: OnboardingCopy, question: Question) {
  return copy.questions[question.id];
}
