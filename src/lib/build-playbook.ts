import type { Dictionary } from "../i18n/index";

/**
 * Vaky's house knowledge, written for the coding agent that builds a site.
 *
 * The onboarding questionnaire collects the client's facts; this module holds
 * the studio's. What stack every site is built on, what a site for a given
 * trade has to contain and in what order, what each questionnaire style
 * option means as a concrete design direction, what never ships, and what
 * "done" means. The build brief (server/admin/brief.ts) and the concept
 * brief (server/admin/concept.ts) both read from here so the two prompts
 * cannot drift apart.
 *
 * The trade playbooks are the same lists the public trade pages make in
 * Montenegrin (src/i18n/me.ts, `trades.items[].needs`), rewritten in English
 * with the customer question each section answers — an agent should build
 * for the question, not for the heading.
 *
 * Imported by both the browser bundle (the dashboard's trade picker) and the
 * Cloudflare Functions build, so the usual rules: relative imports only, no
 * React, no DOM, no Node.
 */

/* ── Trades ───────────────────────────────────────────────────────────── */

/** The trades the public site has a landing page for. Deriving the type
 *  from the dictionary means adding a trade page without a playbook fails
 *  to compile, and so does a playbook for a trade that has no page. */
export type Trade = keyof Dictionary["trades"]["items"];

export type PageSection = {
  name: string;
  /** The question a visitor has that this section exists to answer. */
  answers: string;
  /** What goes in it, concretely. */
  content: string;
};

export type TradePlaybook = {
  /** Dashboard label, Montenegrin — the dashboard is. */
  label: string;
  /** What the brief calls the site, English. */
  name: string;
  /** Who arrives, from where, and what they came to find out. */
  visitor: string;
  /** In order. The first section is the hero. */
  sections: PageSection[];
  /** Contact actions, most important first. */
  contact: string[];
  /** What such sites usually get wrong — so the agent does not. */
  mistakes: string[];
};

const CALL = "Call — a `tel:` link with the number visible next to it";
const WHATSAPP = "WhatsApp — `https://wa.me/<number>` with a prefilled first line";
const VIBER = "Viber — `viber://chat?number=%2B382...`";
const INSTAGRAM = "Instagram DM — a link to the profile";
const MAP = "Map — a link that opens the location in Google Maps (an embed only if the client wants it; it is heavy)";

export const TRADE_PLAYBOOK: Record<Trade, TradePlaybook> = {
  villa: {
    label: "Vila / kuća za odmor",
    name: "villa or holiday-house",
    visitor:
      "A guest who saw the house on Booking or Airbnb, or heard of it from a friend, deciding whether to book — usually from abroad, on a phone, comparing it with three others.",
    sections: [
      {
        name: "Hero",
        answers: "Is this the place I saw, and is it what I want?",
        content:
          "One full-width photograph of the house or the view, the name, where it is (town, distance to the sea), and one line of facts: sleeps N, bedrooms, pool if there is one. The contact and booking actions visible without scrolling.",
      },
      {
        name: "Gallery",
        answers: "What does it look like?",
        content:
          "Large photographs in the order a guest walks through: exterior, living space, kitchen, bedrooms, bathrooms, terrace, view. No thumbnail grid that needs a tap to see anything.",
      },
      {
        name: "The house",
        answers: "Does it fit us?",
        content:
          "Capacity, bedrooms and beds, bathrooms, and the amenities as a scannable list — pool, parking, air conditioning, Wi-Fi, kitchen, washing machine. Facts, not prose.",
      },
      {
        name: "Location & surroundings",
        answers: "Where exactly, and what is around it?",
        content:
          "Map link, distances to the beach, the town, the airport, and what is nearby — shops, restaurants, the mountain. Only distances the client gave or that can be read off a map.",
      },
      {
        name: "Booking",
        answers: "How much, and how do I book?",
        content:
          "The client's Booking.com or Airbnb listing as a link, and direct contact (WhatsApp, Viber, email) as the preferred route. Season prices only if the client supplied them — a price table nobody maintains is worse than none.",
      },
      {
        name: "Practical",
        answers: "What do I need to know before I arrive?",
        content:
          "Check-in and check-out times, pets, smoking, minimum stay, how to get there — only what the client provided.",
      },
    ],
    contact: [WHATSAPP, VIBER, "Email — a `mailto:` link", "The Booking.com or Airbnb listing, as a link", MAP],
    mistakes: [
      "Photographs of the house shrunk to thumbnails — the photographs are the product.",
      "Copy about unforgettable memories and hidden gems instead of beds, distances and prices.",
      "A booking form that is really an email with extra steps; a direct message is faster for both sides.",
      "Only one language — most guests are foreign; if the package includes one language, build it in English and say so in the handover.",
    ],
  },

  apartment: {
    label: "Apartmani",
    name: "holiday-apartments",
    visitor:
      "A guest who found the apartments in a Booking or Airbnb listing where they looked like a hundred others, now checking whether what sets them apart is real — the view, the pool, the walk to the beach.",
    sections: [
      {
        name: "Hero",
        answers: "What makes this place different?",
        content:
          "The one thing that sets the apartments apart — the view, the pool, the terrace, the beach five steps away — as the biggest photograph on the page, with the name, the town, and the contact actions.",
      },
      {
        name: "Apartments",
        answers: "Which one is for us?",
        content:
          "Each apartment on its own: its photographs, number of beds, size, what it includes (balcony, sea view, kitchen), and its price if the client supplied one. One block per apartment, not a shared paragraph.",
      },
      {
        name: "Shared amenities",
        answers: "What do all guests get?",
        content: "Pool, parking, Wi-Fi, barbecue, garden — as a list.",
      },
      {
        name: "Location & surroundings",
        answers: "Where exactly, and what is around it?",
        content: "Map link, distances to the beach, the centre and the airport, what is nearby.",
      },
      {
        name: "Booking",
        answers: "How do I reserve?",
        content:
          "Booking.com, Airbnb, or a direct message over Viber and WhatsApp — whichever the client uses, in that client's order of preference. Seasons and prices only if supplied, in one table that is easy to update.",
      },
    ],
    contact: [WHATSAPP, VIBER, "Email — a `mailto:` link", "The Booking.com or Airbnb listing, as a link", MAP],
    mistakes: [
      "All apartments described together, so a guest cannot tell which one has the view.",
      "Prices scattered through prose instead of one table.",
      "A gallery with no captions — a guest needs to know which apartment they are looking at.",
      "Only one language — most guests are foreign; if the package includes one language, build it in English and say so in the handover.",
    ],
  },

  restaurant: {
    label: "Restoran / konoba",
    name: "restaurant",
    visitor:
      "A guest deciding tonight, on a phone, often from an Instagram link, who wants three things before coming: the menu, the opening hours, and a way to reserve a table.",
    sections: [
      {
        name: "Hero",
        answers: "What kind of place is this, and is it open?",
        content:
          "A photograph of the room or of a dish, the name, the kind of kitchen and the town in one line, today's opening hours, and the reservation action — a call or a WhatsApp message — visible without scrolling.",
      },
      {
        name: "Menu",
        answers: "What can I eat, and what does it cost?",
        content:
          "Dishes and prices as text, grouped by course, readable on a phone. Never a photograph or a PDF of the printed menu. If the client only has a photograph, transcribe it and flag anything unreadable.",
      },
      {
        name: "Reservation",
        answers: "How do I get a table?",
        content:
          "One tap: call, or a WhatsApp message with the first line prefilled. No five-field form. If the client uses a reservation service, link it.",
      },
      {
        name: "Hours & location",
        answers: "When are you open, and how do I get there?",
        content:
          "Opening hours per day, including the days it is closed, the address, a map link, and parking if the client mentioned it.",
      },
      {
        name: "Food & space",
        answers: "What is it like?",
        content:
          "Photographs of the dishes and the room — what a guest imagines before coming. The client's own photographs only.",
      },
      {
        name: "Events & groups",
        answers: "Can I book it for a celebration?",
        content: "Only if the client offers it: private dining, groups, live music, with the contact action repeated.",
      },
    ],
    contact: [CALL, WHATSAPP, VIBER, INSTAGRAM, MAP],
    mistakes: [
      "The menu as a photograph that has to be zoomed, or a PDF that opens in another app.",
      "Opening hours that exist only on Instagram or in Google Maps and not on the site.",
      "A hero that hides the phone number under a video.",
      "A reservation form instead of a message — nobody at the restaurant is watching an inbox at 8pm.",
    ],
  },

  barber: {
    label: "Barbershop",
    name: "barbershop",
    visitor:
      "A customer choosing a barber by the work he has seen on Instagram, ready to book by message, who wants the price and the location before he writes.",
    sections: [
      {
        name: "Hero",
        answers: "Is this the barber whose work I saw?",
        content:
          "One strong photograph of a cut or of the shop, the name, the town, and the booking action.",
      },
      {
        name: "Work",
        answers: "Can he do what I want?",
        content:
          "Haircuts and beards in full size, not a nine-up Instagram grid. The client's own photographs, most recent first.",
      },
      {
        name: "Prices",
        answers: "How much?",
        content:
          "Services with prices in one table — cut, beard, the combination, kids — from one place in the code so a price change is one edit.",
      },
      {
        name: "Booking",
        answers: "How do I get a slot?",
        content:
          "Whatever the shop actually uses — Instagram DM, Viber, a call, or a link to its online booking tool. Do not build a booking system; link to the one in use.",
      },
      {
        name: "Team",
        answers: "Who will cut my hair?",
        content: "If there is more than one barber: each with a photograph, a first name and what he does best.",
      },
      {
        name: "Location & hours",
        answers: "Where, and when?",
        content: "Address, map link, opening hours per day — the second question after the price.",
      },
    ],
    contact: [INSTAGRAM, VIBER, CALL, "The shop's online booking link, if it has one", MAP],
    mistakes: [
      "Work shown in a tiny grid when the work is the whole argument.",
      "A price list as an image that goes stale.",
      "A custom booking form nobody at the shop watches.",
    ],
  },

  hair: {
    label: "Frizerski salon",
    name: "hair-salon",
    visitor:
      "A client who arrived from a recommendation or from Instagram, who wants the price of the service she has in mind and a way to book, without scrolling through a hundred posts.",
    sections: [
      {
        name: "Hero",
        answers: "Is this the salon I was told about?",
        content: "A photograph of the salon or of a finished look, the name, the town, and the booking action.",
      },
      {
        name: "Prices",
        answers: "How much does what I want cost?",
        content:
          "Services with prices by category — cut, colour, treatments, styling — in one place, as text. Ranges where a price depends on hair length, said so.",
      },
      {
        name: "Work & team",
        answers: "Who does what, and how well?",
        content:
          "Who works in the salon and what each does best, next to photographs of their work. Real names only if the client supplied them.",
      },
      {
        name: "Booking",
        answers: "How do I book?",
        content: "A call, Viber, or an Instagram message, one tap each. Link an online booking tool if the salon uses one.",
      },
      {
        name: "Location & hours",
        answers: "Where, and when?",
        content: "Address, map link, opening hours per day, parking if the client mentioned it.",
      },
    ],
    contact: [CALL, VIBER, INSTAGRAM, MAP],
    mistakes: [
      "A price list hidden behind a 'contact us for prices' line — the price is the first question.",
      "Stock photographs of models instead of the salon's own work.",
      "A team section with no names and no faces, which says nothing.",
    ],
  },

  beauty: {
    label: "Kozmetički salon",
    name: "beauty-salon",
    visitor:
      "A client who wants to know which treatments the salon does, how long they take, what they cost and who does them — before she sends a message, which is how she will book.",
    sections: [
      {
        name: "Hero",
        answers: "What does this salon do?",
        content: "A photograph of the salon or of a result, the name, the town, and the booking action.",
      },
      {
        name: "Treatments & prices",
        answers: "What do you offer, how long, how much?",
        content:
          "By category — nails, lashes, face, body — each treatment with its duration and price, as text. No PDF price list.",
      },
      {
        name: "Work",
        answers: "How good is it?",
        content: "Photographs of results — nails, lashes, treatments — the salon's own, most recent first.",
      },
      {
        name: "Team",
        answers: "Who will I be with?",
        content: "Each person with a photograph and one sentence on what she does. Only people the client named.",
      },
      {
        name: "Booking",
        answers: "How do I book?",
        content: "Instagram DM, Viber, or a call — one tap each. Link an online booking tool if the salon uses one.",
      },
      {
        name: "Location & hours",
        answers: "Where, and when?",
        content: "Address, map link, opening hours per day.",
      },
    ],
    contact: [INSTAGRAM, VIBER, CALL, MAP],
    mistakes: [
      "Treatments listed without duration or price, so every enquiry starts with 'how much'.",
      "Stock photographs of spa stones and orchids.",
      "A hero that is a decorative pattern instead of the salon's work.",
    ],
  },

  tattoo: {
    label: "Tattoo studio",
    name: "tattoo-studio",
    visitor:
      "Someone who has an idea and is choosing an artist by portfolio — by style, in full size — and wants to know roughly what it costs and how to ask for an appointment.",
    sections: [
      {
        name: "Hero",
        answers: "Whose work is this?",
        content: "One strong piece, full width, the studio name, the town, and the enquiry action.",
      },
      {
        name: "Portfolio by artist",
        answers: "Who does the style I want?",
        content:
          "Each artist with their own work in full size, grouped or tagged by style — fine line, blackwork, realism, traditional. The client's photographs, credited to the right artist.",
      },
      {
        name: "Styles & starting prices",
        answers: "Do you do what I want, and from how much?",
        content:
          "What the studio does and the minimum price or hourly rate, if the client supplied them, so the enquiry comes from someone who knows what they are asking for.",
      },
      {
        name: "Appointment enquiry",
        answers: "How do I get a consultation?",
        content:
          "A short form — description, placement, size, a reference image upload — or a direct Instagram DM, whichever the client prefers. Nothing books a slot; it starts a conversation.",
      },
      {
        name: "Aftercare & questions",
        answers: "What do I need to know?",
        content: "The aftercare instructions and the questions the studio answers every day, written once. Only what the client supplied.",
      },
      {
        name: "Studio & location",
        answers: "Where, and what is it like?",
        content: "Photographs of the studio, the address, a map link, opening hours.",
      },
    ],
    contact: [INSTAGRAM, "The enquiry form, if the client wants one", VIBER, MAP],
    mistakes: [
      "Work shown in an Instagram-sized grid when the work is the whole reason to visit.",
      "A gothic template — dark for the sake of it, illegible type, skulls in the corners.",
      "No prices at all, so half the enquiries are from people who will not book.",
    ],
  },

  pilates: {
    label: "Pilates / joga studio",
    name: "pilates or yoga studio",
    visitor:
      "A new member who wants to know when classes are, what a monthly pass costs, and where the studio is — and who would like to try one class before committing.",
    sections: [
      {
        name: "Hero",
        answers: "What is this studio, and can I try it?",
        content:
          "A photograph of the studio in use, the name, the kind of practice, the town, and the trial-class action.",
      },
      {
        name: "Schedule",
        answers: "When are the classes?",
        content:
          "By day and by class type, readable on a phone — a table that reflows into a list, not an image. If the schedule changes weekly, build it from one data file the client can hand Vaky.",
      },
      {
        name: "Prices & packages",
        answers: "How much?",
        content: "Single class, monthly pass, packages, trial class — in one table.",
      },
      {
        name: "Instructors & space",
        answers: "Who teaches, and what is it like inside?",
        content:
          "Each instructor with a photograph and one sentence on what they teach, then photographs of the room as a first-time visitor sees it.",
      },
      {
        name: "Trial class",
        answers: "How do I sign up?",
        content: "A message or a call, one tap. No account, no registration, no calendar widget.",
      },
      {
        name: "Location & hours",
        answers: "Where?",
        content: "Address, map link, how to get there, parking.",
      },
    ],
    contact: [WHATSAPP, VIBER, CALL, INSTAGRAM, MAP],
    mistakes: [
      "A schedule as an image that cannot be read on a phone or updated without a designer.",
      "Prices hidden until sign-up.",
      "Stock photographs of a woman on a beach at sunrise.",
    ],
  },

  gym: {
    label: "Teretana",
    name: "gym",
    visitor:
      "Someone choosing a gym by price, opening hours and what it looks like inside — who wants those three answers without calling.",
    sections: [
      {
        name: "Hero",
        answers: "What kind of gym is this?",
        content: "A photograph of the floor, the name, the town, opening status, and the sign-up action.",
      },
      {
        name: "Memberships",
        answers: "How much?",
        content: "Monthly, quarterly, yearly, student, day pass — one table, prices from one place in the code.",
      },
      {
        name: "Hours",
        answers: "When can I train?",
        content: "Per day, including weekends and holidays — the first thing a visitor checks.",
      },
      {
        name: "Space & equipment",
        answers: "What is inside?",
        content: "Photographs of the halls and the machines; a short list of what there is — free weights, cardio, functional zone, changing rooms.",
      },
      {
        name: "Trainers & programmes",
        answers: "Who can help me?",
        content: "Trainers with a photograph and what they offer, personal and group; programmes as a list with times if the client supplied them.",
      },
      {
        name: "Sign-up & location",
        answers: "How do I join, and where?",
        content: "A call or a message, the address, a map link, parking.",
      },
    ],
    contact: [CALL, WHATSAPP, VIBER, INSTAGRAM, MAP],
    mistakes: [
      "Membership prices missing, so every visitor has to call.",
      "Stock photographs of athletes who have never been in the building.",
      "A hero that shouts — huge type, dark gradients, lightning — instead of showing the room.",
    ],
  },

  dentist: {
    label: "Stomatološka ordinacija",
    name: "dental-practice",
    visitor:
      "A patient choosing a practice on trust: who the doctor is, which services they do, roughly what they cost, and how to book — and who is often a little anxious.",
    sections: [
      {
        name: "Hero",
        answers: "Who are you, and can I book?",
        content:
          "A calm photograph of the team or the practice, the name, the town, the booking action with the phone number visible, and the opening hours.",
      },
      {
        name: "Services & prices",
        answers: "What do you do, and what does it cost?",
        content:
          "From a check-up to implants, each with a price or a range if the client supplied one. Plain language, no procedure codes.",
      },
      {
        name: "Team",
        answers: "Who will treat me?",
        content: "Each doctor with a photograph, specialisation and years of experience — as supplied, nothing added.",
      },
      {
        name: "Booking",
        answers: "How do I make an appointment?",
        content: "Call, Viber, or a short form, with the opening hours next to the button so a patient knows when someone will answer.",
      },
      {
        name: "Location & parking",
        answers: "How do I get there?",
        content: "Address, map link, floor and entrance, parking — patients come back for years.",
      },
      {
        name: "Patient information",
        answers: "What should I know before I come?",
        content: "First-visit information, payment options, what to bring — only if the client supplied it.",
      },
    ],
    contact: [CALL, VIBER, "A short appointment form, if the client wants one", MAP],
    mistakes: [
      "Stock photographs of perfect smiles; the practice's own team photograph is worth more.",
      "Before-and-after pictures without the client confirming consent.",
      "Discount banners and urgency — the tone is calm and clear, never a sale.",
      "Medical claims not supplied by the client.",
    ],
  },
};

export const TRADE_IDS = Object.keys(TRADE_PLAYBOOK) as Trade[];

export function isTrade(value: unknown): value is Trade {
  return typeof value === "string" && value in TRADE_PLAYBOOK;
}

/* ── Style directions ─────────────────────────────────────────────────── */

/** The options of the questionnaire's `style` question, see
 *  src/lib/onboarding/schema.ts. */
export const STYLE_IDS = [
  "minimal",
  "modern",
  "elegant",
  "dark",
  "light",
  "playful",
  "corporate",
  "not-sure",
] as const;
export type StyleId = (typeof STYLE_IDS)[number];

export type StyleDirection = {
  name: string;
  typography: string;
  palette: string;
  hero: string;
  rhythm: string;
};

export const STYLE_DIRECTIONS: Record<StyleId, StyleDirection> = {
  minimal: {
    name: "Minimal and simple",
    typography:
      "One sans family in two weights, or one grotesk for headings and the system stack for body. Large size steps between levels, generous measure, nothing tracked or uppercase unless it is a label.",
    palette:
      "Warm off-white or near-white ground, near-black ink, one accent used only for actions and links. Greys for secondary text, no tints.",
    hero: "Type-led: a headline and one photograph, or the headline alone over a line of facts. No decoration, no badge, no second button.",
    rhythm:
      "Wide spacing, hairline rules between sections, mostly one column. Density comes from photographs and tables, never from chrome.",
  },
  modern: {
    name: "Modern",
    typography:
      "A bold grotesk with tight leading for headings, a quieter sans for body. Strong contrast in scale between headline and everything else.",
    palette: "Neutral ground with one saturated accent that the trade justifies. No gradients.",
    hero: "A full-bleed photograph with the headline set over it, or a split layout — type on one side, photograph on the other. Sharp corners or a small radius, used consistently.",
    rhythm:
      "Alternate full-width photograph bands with dense text sections. Asymmetric grids where the content supports them.",
  },
  elegant: {
    name: "Elegant and premium",
    typography:
      "A high-contrast serif for display, a quiet sans for body and labels. Small uppercase tracked labels for eyebrows. Restraint in weight — one display weight is enough.",
    palette:
      "Warm neutrals — cream, stone, charcoal — with one deep accent: bottle green, oxblood, navy. Gold only as a thin rule, never as a fill.",
    hero: "A large photograph with small type, bottom-left or centred, and a lot of air around it. The action is a text link or a thin outlined button.",
    rhythm: "Slow. Few elements per screen, generous vertical space, thin rules. Photographs are allowed to be the whole section.",
  },
  dark: {
    name: "Darker colours",
    typography:
      "A grotesk, one step heavier for small text than you would use on a light ground. Larger body size, more leading.",
    palette:
      "A deep tinted dark ground — never pure black — with light ink at controlled contrast and one accent that reads on dark. Muted text must still pass AA; check it, it usually fails first.",
    hero: "The photograph on the dark ground, or type on dark with the accent for the action. Photographs need their own contrast; lift them with a subtle edge, not a glow.",
    rhythm:
      "Sections separated by shifts in tone rather than lines. A dark site does not need a light mode, but it does need contrast tested on a phone in daylight.",
  },
  light: {
    name: "Light and clean",
    typography: "A friendly sans at normal weights, clear hierarchy from size alone.",
    palette:
      "Pale ground, dark ink, one soft accent and muted secondaries. Lots of white — it is the material.",
    hero: "A photograph and a short headline side by side, the action right under the headline.",
    rhythm: "Open and airy, clear grouping, light rules or none. Cards only where a set of things is genuinely a set.",
  },
  playful: {
    name: "Colourful and creative",
    typography:
      "A display face with character — rounded, geometric, or a bold condensed — for headings, a plain sans for body. Headlines may break the grid; body never does.",
    palette:
      "Two or three saturated colours on a light ground, each with a job: one for ground blocks, one for actions, one for emphasis.",
    hero: "A colour block with a cut-out photograph, or a tilted or overlapping element — one such move, not five.",
    rhythm:
      "Varied: colour bands, overlapping images, a section that is only a big line of type. Every element still has a job; no confetti, no floating shapes.",
  },
  corporate: {
    name: "Serious and corporate",
    typography: "A restrained sans, conventional hierarchy, nothing decorative. Tables and lists welcome.",
    palette: "Navy or charcoal, white, one accent. Greys with a hint of the primary.",
    hero: "A plain statement of what the business does, with a photograph of the people or the work — not a stock handshake.",
    rhythm:
      "A regular grid, clear section titles, consistent spacing. Trust cues — certificates, clients, years — only if the client supplied them.",
  },
  "not-sure": {
    name: "No particular idea — Vaky decides",
    typography: "Take the direction from the trade playbook: what the best sites in this trade do, done well.",
    palette: "Derived from the client's logo and photographs if they exist; otherwise from the trade.",
    hero: "Whatever answers the visitor's first question fastest for this trade.",
    rhythm: "Propose one direction, build it, and state the choice and the reason in the handover.",
  },
};

export function isStyleId(value: unknown): value is StyleId {
  return typeof value === "string" && (STYLE_IDS as readonly string[]).includes(value);
}

/* ── Stack ────────────────────────────────────────────────────────────── */

/** How every Vaky site is built and delivered, unless the brief says the
 *  package requires more. */
export const STACK: readonly string[] = [
  "React — the latest stable release — written in TypeScript, on Next.js (App Router) with `output: \"export\"`: a static site with no server runtime. Every Vaky site is React; do not substitute another framework, plain HTML, or a template engine. If a section of this brief requires a backend (a booking flow, a shop, a form), implement it as Cloudflare Pages Functions and say so in the handover; do not add a server for anything else.",
  "Components are Server Components by default; `\"use client\"` only on the leaves that genuinely need state or browser APIs — a menu toggle, a gallery, a form. No class components, no legacy patterns (`useEffect` for derived values, manual memoisation everywhere), no `any`.",
  "Tailwind CSS with the design tokens declared once in `globals.css` — colours, type scale, spacing, radius. Components use the tokens; no arbitrary values scattered through class lists.",
  "Fonts through `next/font` — self-hosted, `display: swap`, at most two families, subset to the characters the site uses (Latin Extended for Montenegrin).",
  "Images: source files from the assets folder, exported as AVIF and WebP at several widths by a build script (sharp), served through `<picture>` with explicit `width` and `height`. The hero image eager with `fetchpriority=\"high\"`, everything below the fold `loading=\"lazy\"`. No image served larger than its largest rendered size.",
  "Hosting on Cloudflare Pages: `next build` produces `out/`, which is deployed as-is. A `public/_headers` file sets `Content-Security-Policy` (no `unsafe-inline` for scripts), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and a long cache for hashed assets.",
  "No database, no CMS, no analytics script, no cookie banner, no chat widget — unless the package or a section of this brief names it.",
  "Contact actions are plain links: `tel:`, `https://wa.me/<number>`, `viber://chat?number=%2B382...`, the Instagram profile URL, a Google Maps link. A form only where the brief lists one, posting to a Pages Function that validates on the server.",
  "Content — prices, hours, menu items, schedules — lives in one typed data file per kind (`src/content/*.ts`), so a change is one edit and the client can send changes to Vaky as a message.",
  "A `README.md` that says how to run, build and deploy, and where each kind of content lives.",
];

/* ── What never ships ─────────────────────────────────────────────────── */

/** The house rule on design, one list for both briefs. */
export const ANTI_SLOP: readonly string[] = [
  "Design for THIS business and its trade. Strip the logo and the name: if what is left could be any business, or looks like a template or an AI default, it is not done.",
  "Never: purple or blue gradients, gradient text, glassmorphism, three identical cards in a row, decorative blobs or floating shapes, generic marketing copy, fake reviews, fake statistics, fake client logos, a 'trusted by' strip.",
  "Always: strong typography with real hierarchy, intentional composition with asymmetry where the content supports it, photographs at full width where they are the argument, sections of varying density.",
  "Copy is short, specific and in the client's language. No agency phrases — 'we craft unforgettable experiences' is a placeholder, not a sentence.",
  "Icons only where they help scanning (contact actions, a list of amenities), from one set, at one size. No emoji as icons.",
  "Animation only for state — a menu opening, a gallery moving. Nothing fades in on scroll. `prefers-reduced-motion` turns the rest off.",
];

/* ── Definition of done ───────────────────────────────────────────────── */

export const DONE: readonly string[] = [
  "Lighthouse on mobile, on the production build, scores 90 or above in all four categories on every page.",
  "Zero errors and zero warnings in the browser console on every page, including hydration warnings.",
  "Checked by eye at 390px and 1440px on every page (and at 768px where a layout changes): no horizontal scroll, no clipped text, no image stretched or cropped into nonsense, no awkward line break in a headline.",
  "Exactly one `h1` per page; heading levels in order; every image has meaningful `alt` or is marked decorative.",
  "Every tap target at least 44×44px; every control reachable and operable by keyboard with a visible focus state; text contrast AA, including muted text and text on photographs.",
  "`prefers-reduced-motion` respected; nothing moves that the visitor did not ask to move.",
  "Contact links work on a real phone: `tel:` dials, `wa.me` opens WhatsApp with the prefilled line, the map link opens the right pin.",
  "No lorem ipsum, no stock photograph presented as the client's own, no invented price, hour, service or review. Every gap is a marked placeholder listed in the handover.",
  "`npm run build`, lint and typecheck pass clean. The build output is under 200KB of JavaScript on the home page.",
  "The handover contains: the decisions taken and why, the list of open questions for Vaky, the list of placeholders, and how to change each kind of content.",
];
