/**
 * Central contact + brand config. Every phone number, handle and link on the
 * site comes from here — edit this file only, never hardcode in components.
 */
export const site = {
  name: "VibeLab.me",
  /* The free Vercel domain. vibelab.me and vibecode.me are both registered to
     other people, so nothing here may claim them — this value feeds every
     canonical tag, the sitemap, robots.txt and the JSON-LD @id, and pointing
     those at a domain we do not own hands our search signals to a stranger.
     One-line change the day a real domain is bought. */
  url: "https://vibelab-me.vercel.app",

  /** International format, digits only — used for wa.me / viber links */
  whatsappNumber: "38267474438",
  /** Human-readable phone shown on the page */
  phoneDisplay: "+382 67 474 438",
  phoneHref: "tel:+38267474438",

  instagram: "vibelab.me",
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

/** Opens a DM thread. Instagram has no way to pre-fill the message text —
    anything the visitor typed has to reach the clipboard instead. */
export function instagramDmLink(): string {
  return `https://ig.me/m/${site.instagram}`;
}

export function emailLink(subject: string, body?: string): string {
  /* Percent-encoding, not URLSearchParams: mailto: follows RFC 6068, where a
     "+" is a literal plus rather than a space. Form-encoding the body makes
     Gmail and Apple Mail render "Zdravo!+Ovo+je" instead of the sentence. */
  const q = [`subject=${encodeURIComponent(subject)}`];
  if (body) q.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}?${q.join("&")}`;
}
