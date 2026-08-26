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
    eyebrow: "Web studio — Podgorica, Montenegro",
    titleA: "Websites that",
    titleB: "bring customers.",
    sub: "A fast, modern website for your business — done in 7 days, from €100.",
    ctaPrimary: "Message us on Instagram",
    ctaSecondary: "See our work",
    proof: [
      "Built for mobile",
      "SEO basics included",
      "Domain and launch handled",
    ],
    concept: {
      eyebrow: "Free concept",
      title: "Already have a site or an Instagram?",
      body: "Send us the link and see what your business could look like — before you pay a cent.",
      placeholder: "your-site.me or @instagram",
      submitEmail: "Send email",
      submitInstagram: "Open Instagram DM",
      copied: "Message copied — just paste it into the Instagram DM.",
      note: "Your email opens with the link already written in. We reply the same day.",
      prefill: "Hi! This is my site/Instagram: {link} — could I get a free concept?",
    },
  },

  work: {
    title: "Work",
    sub: "Interactive design concepts — open and try them on your own phone.",
    conceptLabel: "Design concept",
    items: [
      {
        name: "Konoba Skadar",
        tag: "Restaurant",
        href: "/demo/konoba-skadar/",
      },
      {
        name: "Titan Gym",
        tag: "Gym",
        href: "/demo/titan-gym/",
      },
      {
        name: "Barbershop Stari Grad",
        tag: "Barber",
        href: "/demo/barbershop-stari-grad/",
      },
      {
        name: "Barber Drina",
        tag: "Barber · Stari Aerodrom",
        href: "/demo/barber-drina/",
      },
    ],
  },

  why: {
    title: "Why VibeLab?",
    sub: "A simple process, a clear agreement, and a website ready to work for your business.",
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
        body: "Design, content, domain, launch, and technical maintenance in one place.",
      },
      {
        title: "No lock-in",
        body: "Maintenance has no contract lock-in and can be cancelled.",
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
    sub: "Clear prices, no fine print.",
    plans: [
      {
        name: "Start",
        price: "€100",
        tagline: "One page that sells.",
        features: [
          "One modern page",
          "Perfect on phones",
          "Contact buttons of your choice",
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
          "Everything in Start",
          "Up to 5 pages",
          "Menu or price list",
          "Photo gallery",
          "Google Business profile",
        ],
        badge: "Most popular",
      },
      {
        name: "Premium",
        price: "from €350",
        tagline: "For those who want it all.",
        features: [
          "Everything in Business",
          "Custom design",
          "English version",
          "Online reservations",
          "Advanced SEO",
        ],
        badge: null,
      },
    ],
    maintenance: {
      title: "Maintenance & hosting — €20/month",
      body: "first month free, no contract lock-in.",
    },
    addonsTitle: "Add-ons",
    addons: [
      "English version +€80",
      "Google Business profile +€50",
      "Extra page +€40",
      "Logo & branding +€60",
    ],
    planAction: "Choose package",
    packagePrefill:
      "Hi! I'm interested in the {package} package for my business. Can we discuss the details?",
    cta: {
      title: "Send us your website or Instagram",
      body: "Get a free starting concept and a clear package recommendation, with no obligation.",
      action: "Request a concept",
    },
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
    sub: "Send an Instagram DM or email — we reply the same day.",
    instagram: "Instagram",
    emailLabel: "Email",
    prefill: "Hi! I'm interested in a website for my business. Can I get a free concept?",
    emailSubject: "Website for my business",
  },

  footer: {
    tagline: "Web studio from Podgorica. Websites that bring customers.",
    rights: "All rights reserved.",
  },

  fab: "Message us on Instagram",

  meta: {
    title: "VibeLab.me — Websites that bring customers | Web studio Podgorica",
    description:
      "A modern website for your business — done in 7 days, from €100. Restaurants, gyms, salons and small businesses in Montenegro. Free concept before you pay.",
  },
};
