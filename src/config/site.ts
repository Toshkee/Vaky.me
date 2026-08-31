/** Central brand and public contact configuration. */
export const site = {
  name: "Vaky",
  /* This value feeds every canonical tag, the sitemap, robots.txt and the
     JSON-LD @id. Connect vaky.me to Cloudflare Pages before publishing this
     build so canonical links never point at an unserved host. */
  url: "https://vaky.me",

  instagram: "vaky.me",
  email: "vakymne@gmail.com",

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

/**
 * The web fallback for visitors whose computer has no mail app wired up —
 * on desktop Windows that is common, and a mailto: click then simply does
 * nothing. Gmail's compose endpoint takes the same subject and body.
 */
export function gmailComposeLink(subject: string, body: string): string {
  const q = new URLSearchParams({ view: "cm", fs: "1", to: site.email, su: subject, body });
  return `https://mail.google.com/mail/?${q}`;
}

export function emailLink(subject: string, body?: string): string {
  /* Percent-encoding, not URLSearchParams: mailto: follows RFC 6068, where a
     "+" is a literal plus rather than a space. Form-encoding the body makes
     Gmail and Apple Mail render "Zdravo!+Ovo+je" instead of the sentence. */
  const q = [`subject=${encodeURIComponent(subject)}`];
  if (body) q.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}?${q.join("&")}`;
}
