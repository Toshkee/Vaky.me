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
    cta: "Message us",
  },

  hero: {
    eyebrow: "Web studio — Podgorica, Montenegro",
    titleA: "Websites that",
    titleB: "bring customers.",
    sub: "A fast, modern website for your business — done in 7 days. No complications, no hidden costs.",
    ctaPrimary: "Message us on WhatsApp",
    ctaSecondary: "See our work",
    trust: ["Done in 7 days", "From €100", "One month of maintenance free"],
    panel: {
      url: "konoba-primjer.me",
      oldLabel: "2015",
      newLabel: "2026",
      dragHint: "Drag",
      caption: "This is what we do: your website, before and after.",
    },
  },

  work: {
    title: "Work",
    sub: "Click and try — every site is real. Open it on your own phone.",
    open: "Open site",
    items: [
      {
        name: "Konoba Skadar",
        tag: "Restaurant",
        desc: "Homemade cuisine on the shore of Lake Skadar — menu, gallery and reservations.",
        href: "/demo/konoba-skadar/",
      },
      {
        name: "Titan Gym",
        tag: "Gym",
        desc: "Memberships, class schedule and trainers — a site that signs up new members.",
        href: "/demo/titan-gym/",
      },
      {
        name: "Barbershop Stari Grad",
        tag: "Barber",
        desc: "Price list, barbers and one-tap booking.",
        href: "/demo/barbershop-stari-grad/",
      },
    ],
  },

  process: {
    title: "How we work",
    sub: "From a message to a live website — no meetings, no complications.",
    steps: [
      {
        day: "Day 1",
        title: "You reach out",
        body: "WhatsApp, Viber or Instagram DM. Tell us what your business does.",
      },
      {
        day: "Day 1–2",
        title: "Free concept",
        body: "We sketch your new website — before you pay a cent.",
      },
      {
        day: "Day 2–6",
        title: "We build",
        body: "Design, copy, photos, launch. You focus on your business.",
      },
      {
        day: "Day 7",
        title: "Live",
        body: "Your site is on your domain, working for you. We keep it maintained.",
      },
    ],
  },

  pricing: {
    title: "Pricing",
    sub: "Clear prices, no fine print. You pay 50% up front, 50% when you're happy.",
    plans: [
      {
        name: "Start",
        price: "€100",
        tagline: "One page that sells.",
        features: [
          "One modern page",
          "Perfect on phones",
          "WhatsApp / Viber button",
          "Google Maps & contact",
          "SEO basics",
        ],
        badge: null,
      },
      {
        name: "Business",
        price: "€200",
        tagline: "A complete small-business website.",
        features: [
          "Multiple pages",
          "Menu or price list",
          "Photo gallery",
          "Google Business profile",
          "SEO basics",
          "Everything in Start",
        ],
        badge: "Most popular",
      },
      {
        name: "Premium",
        price: "from €350",
        tagline: "For those who want it all.",
        features: [
          "Custom design",
          "English version",
          "Online reservations",
          "Advanced SEO",
          "Priority support",
          "Everything in Business",
        ],
        badge: null,
      },
    ],
    maintenance: {
      title: "Maintenance & hosting — €20/month",
      body: "First month free. Small updates, hosting and technical care — all included, no contract lock-in.",
    },
    addonsTitle: "Add-ons",
    addons: [
      "English version +€80",
      "Google Business profile +€50",
      "Extra page +€40",
      "Logo & branding +€60",
    ],
  },

  faq: {
    title: "FAQ",
    items: [
      {
        q: "How long does it take?",
        a: "Typically 7 days from the moment we receive your materials (text, photos, price list). Simpler sites even faster.",
      },
      {
        q: "Do I need a domain and hosting?",
        a: "We handle everything. A domain is ~€25/year and hosting is included in maintenance. You don't need to know anything technical.",
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
    sub: "Message us — we reply the same day. Free concept, no obligation.",
    whatsapp: "WhatsApp",
    viber: "Viber",
    instagram: "Instagram",
    call: "Call us",
    emailLabel: "Email",
    prefill: "Hi! I'm interested in a website for my business. Can I get a free concept?",
    emailSubject: "Website for my business",
  },

  footer: {
    tagline: "Web studio from Podgorica. Websites that bring customers.",
    rights: "All rights reserved.",
  },

  fab: "Message us",

  meta: {
    title: "VibeCode.me — Websites that bring customers | Web studio Podgorica",
    description:
      "A modern website for your business — done in 7 days, from €100. Restaurants, gyms, salons and small businesses in Montenegro. Free concept before you pay.",
  },
};
