/** Central brand and public contact configuration. */
export const site = {
  name: "VibeLab",
  /* The free Vercel domain. vibelab.me and vibecode.me are both registered to
     other people, so nothing here may claim them — this value feeds every
     canonical tag, the sitemap, robots.txt and the JSON-LD @id, and pointing
     those at a domain we do not own hands our search signals to a stranger.
     One-line change the day a real domain is bought. */
  url: "https://vibelab-me.vercel.app",

  instagram: "vibelab.me",
  email: "vibecodemne@gmail.com",

  city: "Podgorica",
} as const;

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
