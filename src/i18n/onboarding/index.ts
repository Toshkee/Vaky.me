import { me } from "./me";
import { en } from "./en";

export type { OnboardingCopy, QuestionCopy, StepCopy } from "./types";

/**
 * Both languages, together, because the onboarding switches between them in
 * place rather than by navigating — a client who picked the wrong one on the
 * first screen should not lose a half-filled form to find out.
 *
 * That is the one real cost of this feature's i18n: the words for both
 * languages are in the page's JavaScript. It is text, it compresses well, and
 * it buys an instant switch on a form people fill in on a phone.
 */
export const onboardingCopy = { me, en } as const;
