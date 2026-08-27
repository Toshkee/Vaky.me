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
  | "concept_form_started"
  | "concept_form_submitted"
  | "concept_form_failed"
  | "portfolio_demo_opened"
  | "plan_enquiry";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export function track(event: EventName, data?: Record<string, string>) {
  window.umami?.track(event, data);
}
