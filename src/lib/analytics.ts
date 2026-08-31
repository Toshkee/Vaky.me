/**
 * The six things worth counting, and nothing else.
 *
 * No visitor is identified and no field a visitor typed is ever sent — not
 * the link, not the email address, not the message. Properties are limited to
 * values that were already on the page: which language, which demo, which
 * package. Most events are declared with `data-umami-event` attributes
 * directly on the element; this helper is for the few that only exist as the
 * result of something happening, like a form submission failing.
 */
type EventName =
  | "hero_primary_cta"
  | "lead_form_started"
  | "lead_form_submitted"
  | "lead_form_failed"
  | "portfolio_demo_opened"
  | "plan_enquiry"
  /* The onboarding at /start/. Same rule, and it matters more here: these
     events carry which package, which language, which step and which upload
     zone — never a business name, an email address, a phone number or a word
     the client typed. A funnel is a count of steps, not a copy of the brief. */
  | "onboarding_opened"
  | "onboarding_language_selected"
  | "onboarding_started"
  | "onboarding_step_completed"
  | "onboarding_file_uploaded"
  | "onboarding_review_opened"
  | "onboarding_submission_started"
  | "onboarding_submission_success"
  | "onboarding_submission_error";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export function track(event: EventName, data?: Record<string, string>) {
  window.umami?.track(event, data);
}
