import type { Dictionary } from "./index";

export const en: Dictionary = {
  lang: "en",
  htmlLang: "en",

  nav: {
    work: "Work",
    pricing: "Pricing",
    contact: "Contact",
    cta: "Get a concept",
    langLabel: "ME",
    langHref: "/",
  },

  hero: {
    eyebrow: "Web studio — Podgorica, Montenegro",
    titleA: "Websites that",
    titleB: "bring customers.",
    sub: "A fast, modern website for your business — done in 7 days, from €100.",
    ctaPrimary: "Get your free concept",
    ctaSecondary: "See our work",
    reply: "We reply the same day",
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
      submitInstagramCopied: "Message copied — open Instagram",
      copied: "Message copied — just paste it into the Instagram DM.",
      note: "Your email opens with the link already written in. We reply the same day.",
      emailFallback: "Email app didn't open?",
      emailFallbackAction: "Open Gmail in the browser",
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
        badge: null,
      },
      {
        name: "Business",
        price: "€200",
        tagline: "A complete small-business website.",
        badge: "Most popular",
      },
      {
        name: "Premium",
        price: "from €350",
        tagline: "For those who want it all.",
        badge: null,
      },
    ],
    compare: {
      title: "Compare packages",
      featureLabel: "What you get",
      rows: [
        {
          label: "Number of pages",
          values: ["1", "up to 5", "as agreed"],
          explain:
            "How many separate pages the site has — for example Home, Services, Gallery, Contact.",
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
          values: [false, true, true],
          explain:
            "Your menu or price list as real text rather than an image — readable on a phone and easy to update.",
        },
        {
          label: "Photo gallery",
          values: [false, true, true],
          explain: "A gallery with photos prepared so they load fast.",
        },
        {
          label: "English version",
          values: [false, true, true],
          explain: "A full translation of the site and a language switcher for visitors from abroad.",
        },
        {
          label: "Custom design",
          values: [false, false, true],
          explain: "A design built for your brand instead of an adapted template.",
        },
        {
          label: "Online reservations",
          values: [false, false, true],
          explain: "A form your guests use to request a booking or an appointment.",
        },
        {
          label: "Advanced SEO",
          values: [false, false, true],
          explain:
            "Structured data, social sharing cards and load-speed optimisation.",
        },
      ],
    },
    detailsAction: "What do I get?",
    detailsIntro: "Everything in this package, explained without the jargon.",
    detailsIncluded: "Included",
    detailsExcluded: "Not in this package",
    detailsClose: "Close",
    maintenance: {
      title: "Maintenance & hosting",
      price: "€20/month",
      body: "First month free, no contract lock-in.",
    },
    addons: "Add-ons are agreed separately, based on what you actually need.",
    planAction: "Choose package",
    packagePrefill:
      "Hi! I'm interested in the {package} package for my business. Can we discuss the details?",
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
    action: "Message us on Instagram",
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
    title: "VibeLab — Websites that bring customers | Web studio Podgorica",
    description:
      "A modern website for your business — done in 7 days, from €100. Restaurants, gyms, salons and small businesses in Montenegro. Free concept before you pay.",
  },
};
