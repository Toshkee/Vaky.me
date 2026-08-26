/**
 * Central contact + brand config. Every phone number, handle and link on the
 * site comes from here — edit this file only, never hardcode in components.
 */
export const site = {
  name: "VibeCode.me",
  url: "https://vibecode.me",

  /** International format, digits only — used for wa.me / viber links */
  whatsappNumber: "38267474438",
  /** Human-readable phone shown on the page */
  phoneDisplay: "+382 67 474 438",
  phoneHref: "tel:+38267474438",

  instagram: "vibecode.me",
  email: "vibecodemne@gmail.com",

  city: "Podgorica",
} as const;

/** wa.me deep link with a pre-filled message */
export function whatsappLink(text: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** viber deep link (opens chat with the number) */
export function viberLink(): string {
  return `viber://chat?number=%2B${site.whatsappNumber}`;
}

export function instagramLink(): string {
  return `https://instagram.com/${site.instagram}`;
}

export function emailLink(subject: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
