/** Central brand and public contact configuration. */
export const site = {
  name: "Vaky",
  /* Feeds every canonical tag, the sitemap, robots.txt and the JSON-LD @id. */
  url: "https://vaky.me",

  instagram: "vaky.me",
  email: "vakymne@gmail.com",
  /* International format, digits only. Leave empty and every WhatsApp
     button on the site stays hidden; fill it in and they all appear. One
     field, because a chat number that differs between the form and the
     footer is a number nobody answers. */
  phone: "38267474438",

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

export const hasPhone = site.phone.length > 0;

/** "38267123456" shown as "+382 67 123 456" — the way a Montenegrin number
    is read aloud, so a visitor recognises it as a local line at a glance. */
export function phoneDisplay(): string {
  const digits: string = site.phone;
  if (!digits.startsWith("382")) return `+${digits}`;
  const rest = digits.slice(3);
  return `+382 ${[rest.slice(0, 2), rest.slice(2, 5), rest.slice(5)].filter(Boolean).join(" ")}`;
}

/** Opens a WhatsApp thread with the message already typed. */
export function whatsappLink(text: string): string {
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`;
}
