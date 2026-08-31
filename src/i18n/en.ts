import type { Dictionary } from "./index";

export const en: Dictionary = {
  lang: "en",
  htmlLang: "en",

  nav: {
    work: "Work",
    pricing: "Pricing",
    contact: "Contact",
    langLabel: "ME",
    langHref: "/",
  },

  hero: {
    eyebrow: "Web studio — Montenegro",
    titleA: "Websites that",
    titleB: "bring customers.",
    sub: "Modern websites for businesses that want more enquiries, a stronger first impression and a professional online presence.",
    offer: "A clear price up front and everything handled from first sketch to launch — none of the agency overhead.",
    ctaPrimary: "Get your free concept",
    ctaSecondary: "See our work",
    facts: [
      { label: "Working in", value: "Montenegro" },
      { label: "Delivered in", value: "up to 10 days" },
      { label: "From", value: "€200" },
      { label: "Languages", value: "ME + EN" },
    ],
  },

  work: {
    title: "Work",
    sub: "Interactive design concepts — open and try them on your own phone.",
    conceptLabel: "Design concept",
    briefLabel: "Brief",
    solutionLabel: "Approach",
    includesLabel: "Includes",
    swipeHint: "Swipe for the other projects",
    counter: "{n} of {total}",
    prev: "Previous project",
    next: "Next project",
    items: [
      {
        name: "Lucky Chopsticks",
        tag: "Asian restaurant · Podgorica",
        href: "/demo/lucky-chopsticks/",
        brief: "Guests check the menu and location before picking where to eat.",
        solution: "A menu by mood and featured dishes on one distinctive page.",
        includes: ["Menu", "Specials", "Bookings"],
      },
      {
        name: "Barber Drina",
        tag: "Barber · Stari Aerodrom",
        href: "/demo/barber-drina/",
        brief: "The price list lives in an Instagram post guests scroll back to find.",
        solution: "A price table, and a helper that writes the booking DM for you.",
        includes: ["Price list", "Booking by DM", "Map"],
      },
      {
        name: "Konoba Skadar",
        tag: "Restaurant",
        href: "/demo/konoba-skadar/",
        brief: "Guests pick a place by phone and want the menu and a free table.",
        solution: "The menu as text by category, calling and booking one tap away.",
        includes: ["Menu", "Bookings", "Map"],
      },
      {
        name: "Titan Gym",
        tag: "Gym",
        href: "/demo/titan-gym/",
        brief: "Memberships and the timetable get asked for over DMs all week.",
        solution: "Prices and timetable online, a trial session as the main button.",
        includes: ["Memberships", "Timetable", "Programmes"],
      },
      {
        name: "Barbershop Stari Grad",
        tag: "Barber",
        href: "/demo/barbershop-stari-grad/",
        brief: "Booking runs over Viber, and prices are nowhere to be found.",
        solution: "Prices, hours and the team on one page, Viber one tap away.",
        includes: ["Price list", "Opening hours", "Viber"],
      },
    ],
  },

  why: {
    title: "Why VibeLab?",
    sub: "Website development in Montenegro — a simple process, a clear agreement and a site that works for your business.",
    items: [
      {
        title: "See the concept first",
        body: "Get an initial design direction before you make a commitment.",
      },
      {
        title: "Clear scope and price",
        body: "Know what your package includes and what it costs before work begins.",
      },
      {
        title: "Everything handled",
        body: "Design, content, domain and launch — all in one place.",
      },
      {
        title: "Direct communication",
        body: "You talk directly to the people building your site — no middlemen.",
      },
    ],
  },

  process: {
    title: "How we work",
    steps: [
      {
        day: "Day 1",
        title: "You reach out",
        body: "Instagram DM or email. Tell us what your business does and what you need.",
      },
      {
        day: "Day 1–2",
        title: "Free concept",
        body: "We sketch your new website — before you pay a cent.",
      },
      {
        day: "Day 3–9",
        title: "We build",
        body: "Design, copy, photos and the technical work. You focus on your business.",
      },
      {
        day: "By day 10",
        title: "Live",
        body: "Your site is live on your domain. If you want, we can take over maintenance from there.",
      },
    ],
  },

  pricing: {
    title: "Pricing",
    sub: "Clear prices, no fine print.",
    plans: [
      {
        name: "Start",
        tagline:
          "One scrolling page — what you do, where you are and how to reach you, all in one place.",
        badge: null,
      },
      {
        name: "Business",
        tagline:
          "When the site has to work, not just look good: up to five pages, an English version, and bookings through the service you already use.",
        badge: "Recommended",
      },
      {
        name: "Project",
        tagline:
          "For what doesn't fit a package — a shop, connections to your own systems, more languages. The final price depends on the scope.",
        badge: null,
      },
    ],
    compare: {
      title: "Compare packages",
      featureLabel: "What you get",
      rows: [
        {
          label: "Design built for your brand",
          values: [true, true, true],
          explain:
            "Colours, type and layout are chosen for your business. We don't adapt a template — which is why no two of our sites look alike.",
        },
        {
          label: "Perfect on phones",
          values: [true, true, true],
          explain:
            "The site reflows for phone, tablet and desktop. Most of your visitors arrive on a phone.",
        },
        {
          label: "Contact buttons of your choice",
          values: [true, true, true],
          explain:
            "Buttons that go straight to Instagram, WhatsApp, Viber, a phone call or email — you pick which ones.",
        },
        {
          label: "Photo gallery",
          values: [true, true, true],
          explain:
            "Your photos processed so they open instantly even on a weak connection, without losing sharpness.",
        },
        {
          label: "Google Maps & contact",
          values: [true, true, true],
          explain: "A map pinned to your exact location, plus address and opening hours.",
        },
        {
          label: "SEO basics",
          values: [true, true, true],
          explain:
            "Title, description, sitemap and robots.txt — what Google needs to find and index the site.",
        },
        {
          label: "Menu or price list",
          values: [true, true, true],
          explain:
            "Your menu or price list as real text rather than an image — readable on a phone and easy to update.",
        },
        {
          label: "Online reservations",
          values: [false, true, true],
          explain:
            "The site connects to the booking service you already run — DIKIDI, Google reservations or similar — so guests book without leaving it. A booking system of your own, with slots and staff in our database, is a Project.",
        },
        {
          label: "English version",
          values: [false, true, true],
          explain:
            "The site in two languages, Montenegrin and English, with a switcher and separate URLs. You supply the English text; if you need it translated too, we agree that separately.",
        },
        {
          label: "Advanced SEO",
          values: [false, true, true],
          explain: "Structured data, social sharing cards and load-speed optimisation.",
        },
        {
          label: "Number of pages",
          values: ["1", "up to 5", "as agreed"],
          explain:
            "How many separate pages the site has — for example Home, Services, Gallery, Contact. Start is one scrolling page: everything you need sits in sections one below the other rather than on separate URLs. For most small businesses that does the job.",
        },
        {
          label: "Rounds of revisions",
          values: ["1", "2", "as agreed"],
          explain:
            "How many times we work through your notes after the first version. You collect everything in one round and send it at once, and we do it together. Further rounds are possible and agreed separately.",
        },
        {
          label: "Shop and online payments",
          values: [false, false, true],
          explain:
            "Cart, card payments and an order overview — for when the site sells rather than just starts a conversation.",
        },
        {
          label: "Connections to your systems",
          values: [false, false, true],
          explain:
            "The site wired into what you already run — stock, till, booking system or client records.",
        },
        {
          label: "More than two languages",
          values: [false, false, true],
          explain: "A third language and beyond, each on its own URLs so Google indexes them separately.",
        },
      ],
    },
    inherits: "Everything in {plan}, plus:",
    detailsAction: "What do I get?",
    detailsIntro: "Everything in this package, explained without the jargon.",
    detailsIncluded: "Included",
    detailsExcluded: "Not in this package",
    detailsClose: "Close",
    maintenance: {
      title: "Maintenance & hosting",
      optional: "Optional",
      price: "€20/month",
      intro:
        "After launch the site is yours and runs on your domain. If you'd rather not think about the technical side, we take that worry over — first month free, cancel any time.",
      includes: [
        "Hosting & domain management",
        "Monitoring & technical updates",
        "Regular backups",
        "Small content updates",
      ],
      note: "Small updates cover text, prices and photos — new pages and features are agreed separately. The domain is a separate cost, ~€25/year.",
    },
    planAction: "Ask about this package",
    planNote: "Nothing is paid through the site — we agree on what you need first.",
  },

  faq: {
    title: "FAQ",
    items: [
      {
        q: "How long does it take?",
        a: "Up to 10 days from the moment we have your materials (text, photos, price list). Simpler sites are often ready sooner; for larger projects we agree the deadline up front.",
      },
      {
        q: "Do I need a domain and hosting?",
        a: "We can set it all up: the domain is ~€25/year, and hosting is included in the optional maintenance. And if you'd rather look after hosting yourself, the site and domain are yours — we hand over everything you need.",
      },
      {
        q: "Do I have to take the maintenance plan?",
        a: "No. The site is yours and runs on your domain — nothing you have to subscribe to with us. Maintenance at €20/month is an option for those who'd rather not deal with the technical side — hosting, monitoring, backups and small content updates. Cancel whenever you like.",
      },
      {
        q: "I already have a website. Can you redesign it?",
        a: "Yes — redesigns are our specialty. Send us the link and you'll get a free concept of the new site, no strings attached.",
      },
      {
        q: "How does payment work?",
        a: "50% up front, 50% when the site is done and you're happy. No hidden costs.",
      },
    ],
  },

  contact: {
    title: "Ready for a new website?",
    sub: "Leave a few details — you get a free concept, then we agree on scope and price. We usually reply the same day.",
    directLabel: "Or directly:",
    prefill: "Hi! I'm interested in a website for my business. Could we talk about a quote?",
    emailSubject: "Website for my business",
    lead: {
      eyebrow: "Free concept",
      nameLabel: "Name",
      namePlaceholder: "What we should call you",
      businessLabel: "Business name",
      businessPlaceholder: "Your shop, salon, restaurant…",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+382 67 123 456",
      linkLabel: "Site or Instagram",
      linkPlaceholder: "your-site.me or @instagram",
      needLabel: "What you need",
      needOptions: {
        "new-site": "A new website",
        redesign: "A redesign of an existing one",
        shop: "An online shop",
        "something-else": "Something else",
        "not-sure": "Not sure yet",
      },
      messageLabel: "Briefly about the business",
      messagePlaceholder: "What you do and what the site should do for you.",
      optional: "optional",
      submit: "Request a quote",
      sending: "Sending…",
      success: "Got it. We'll reply to the email you left, usually the same day.",
      errorRequired: "We need your name and an email to reply to.",
      errorPhone: "Check the phone number, or leave the field empty.",
      errorChallenge: "Give the check a second to finish, then send again.",
      errorOffline: "You appear to be offline. Check the connection and try again.",
      errorSpam: "Too many attempts in a short time. Wait a minute and try again.",
      errorProvider: "Sending isn't working right now. Send us an email — everything you typed is already in it.",
      submitInstagram: "Open Instagram DM",
      submitInstagramCopied: "Message copied — open Instagram",
      copied: "Message copied — just paste it into the Instagram DM.",
      note: "Nothing is paid through the site. We agree on the work first, then build.",
      emailFallbackAction: "Send an email instead",
      prefill: "Hi! This is my business: {link} — could I get a quote for a website?",
      bubble: { pre: "You get a", em: "free concept", post: " first, then we talk." },
    },
  },

  footer: {
    tagline: "Web design & development in Montenegro. Websites that bring customers.",
    rights: "All rights reserved.",
    privacy: "Privacy",
  },

  privacy: {
    title: "Privacy",
    updated: "Updated 30 August 2026.",
    intro:
      "This site is a small studio's calling card. There are no accounts, no logins and nothing is sold here — so there is no reason for us to know anything about you beyond what you send us yourself.",
    sections: [
      {
        when: "always",
        title: "Who handles your data",
        body: [
          "VibeLab, a web studio in Montenegro. For anything about your data, write to vibecodemne@gmail.com.",
        ],
      },
      {
        when: "form",
        title: "When you send an enquiry through the site",
        body: [
          "The form posts to our own server at Cloudflare and the enquiry is stored in our database. Only what you typed is sent: your name, business name, email, phone, link, what you need and your message — plus the page language. A copy of the same enquiry also reaches us by email.",
          "We use it to reply to you and to put together a quote, and for nothing else. No newsletter, no sharing with third parties, no advertising. We delete the enquiry once the conversation is over, and within a year at the latest; you can ask for deletion sooner, at vibecodemne@gmail.com.",
          "Nothing is paid through the site and we never ask for card details. To protect the form from abuse we record an irreversibly hashed form of your IP address so we can limit repeated attempts — your address cannot be read back from it.",
        ],
      },
      {
        when: "always",
        title: "When you write by email or Instagram",
        body: [
          "Those buttons only open your mail app or Instagram with a message already written. The site never sees or stores what you send that way — from there it is Google's or Meta's terms, depending on where you write.",
        ],
      },
      {
        when: "always",
        title: "When you fill in the project start form",
        body: [
          "Once we have agreed on the work, we send you a private questionnaire link, and that is where you send us what we need to build the site. Only what you type and attach is sent: business name, your name, email, phone, your answers, and the files you choose.",
          "Answers are stored in our database at Cloudflare, and files in private storage that cannot be reached from the internet without a signed link that expires. We use them solely to build your site — we do not share them with anyone and do not use them for advertising. We keep them for as long as we work together and at most a year after that; you can ask for deletion sooner, at vibecodemne@gmail.com.",
          "While you are filling it in, your answers are kept in your browser's own storage so you do not lose them if you close the page. That stays on your device, is cleared as soon as you send, and is not a cookie. Files are never kept there.",
          "We never ask for passwords. To protect the form from abuse we record an irreversibly hashed form of your IP address so we can limit repeated attempts — your address cannot be read back from it, and it is not linked to your answers.",
        ],
      },
      {
        when: "turnstile",
        title: "Spam protection",
        body: [
          "The form is protected by Cloudflare Turnstile. It loads only once you start filling the form in, and at that point Cloudflare sees your IP address and basic browser information in order to tell a person from a bot. Turnstile may set a technical cookie for that check.",
        ],
      },
      {
        when: "analytics",
        title: "Visitor statistics",
        body: [
          "We use Umami, a cookieless page counter. It records which page was opened, which site you arrived from, a rough country-level location and the type of device. It does not store your IP address, does not build a profile of you and does not follow you between sites.",
          "Query strings — everything after a ? — are dropped, and if your browser sends Do Not Track, nothing is recorded at all. What you type into the form is never sent to analytics.",
        ],
      },
      {
        when: "cloudflare",
        title: "Cloudflare visitor measurement",
        body: [
          "The site is served through Cloudflare, which adds its own page counter to every response. It sets no cookies and builds no profile of a visitor — it counts page opens and basic loading data. That data stays with Cloudflare, under their terms.",
        ],
      },
      {
        when: "always",
        title: "Google Maps on the demo pages",
        body: [
          "The map on a demo page does not load by itself. Until you press “Show map”, Google receives no request from this page at all. Once you open it, Google sees your IP address and browser details under its own terms.",
        ],
      },
      {
        when: "always",
        title: "Cookies",
        body: [
          "The site sets no cookies of its own, and has no consent banner because there is nothing to ask consent for.",
        ],
      },
      {
        when: "always",
        title: "The demo pages",
        body: [
          "The projects under /demo/ are design concepts. Contact details on them are examples, unless the business owner has explicitly asked for the real ones to be shown.",
        ],
      },
    ],
  },

  meta: {
    title: "Website Development Montenegro — from €200, within 10 days | VibeLab",
    description:
      "Website design and development in Montenegro. A modern site for your business — from €200, live within 10 days. Free concept before you pay. VibeLab, Podgorica.",
    serviceTypes: ["Website development", "Web design", "Website maintenance"],
  },
};
