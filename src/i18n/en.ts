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
    sub: "We design and build bespoke websites — for a restaurant, a gym, a clinic, an agency or any other line of work.",
    offer: "We take it from the first sketch to launch, and maintain the site afterwards.",
    ctaPrimary: "Get your free concept",
    ctaSecondary: "See our work",
    facts: [
      { label: "Based in", value: "Podgorica" },
      { label: "Delivered in", value: "up to 10 days" },
      { label: "From", value: "€100" },
      { label: "Languages", value: "ME + EN" },
    ],
    concept: {
      eyebrow: "Free concept",
      title: "Already have a site or an Instagram?",
      body: "Send us the link and see what your business could look like — before you pay a cent.",
      placeholder: "your-site.me or @instagram",
      linkLabel: "Site or Instagram",
      contactLabel: "Where we reply",
      contactPlaceholder: "email or @instagram",
      goalLabel: "What you need (optional)",
      goalPlaceholder: "Briefly: what you do and what the site should do for you.",
      required: "required",
      submit: "Send request",
      sending: "Sending…",
      success: "Got it. We'll reply to the contact you left.",
      errorRequired: "We need your site or Instagram link, and a contact to reply to.",
      errorChallenge: "Give the check a second to finish, then send again.",
      errorOffline: "You appear to be offline. Check the connection and try again.",
      errorSpam: "Too many attempts in a short time. Wait a minute and try again.",
      errorProvider: "Sending isn't working right now. Try again, or write to us directly.",
      fallbackTitle: "Rather do it directly?",
      submitEmail: "Send email",
      submitInstagram: "Open Instagram DM",
      submitInstagramCopied: "Message copied — open Instagram",
      copied: "Message copied — just paste it into the Instagram DM.",
      note: "Your email opens with the link already written in. We get back to you as soon as we can.",
      emailFallback: "Email app didn't open?",
      emailFallbackAction: "Open Gmail in the browser",
      prefill: "Hi! This is my site/Instagram: {link} — could I get a free concept?",
    },
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
        brief: "Guests want the menu, favourite dishes and the location before choosing where to eat tonight.",
        solution: "A menu by mood, featured dishes and the visit details on one distinctive page.",
        includes: ["Menu", "Specials", "Bookings"],
      },
      {
        name: "Barber Drina",
        tag: "Barber · Stari Aerodrom",
        href: "/demo/barber-drina/",
        brief: "The price list lives in an Instagram post customers have to scroll back to find.",
        solution: "The price list as a table, and a helper that writes the booking DM for you.",
        includes: ["Price list", "Booking by DM", "Map"],
      },
      {
        name: "Konoba Skadar",
        tag: "Restaurant",
        href: "/demo/konoba-skadar/",
        brief: "Guests pick a place on their phone and want the menu and a free table.",
        solution: "The menu as text by category, calling and booking one tap away.",
        includes: ["Menu", "Bookings", "Map"],
      },
      {
        name: "Titan Gym",
        tag: "Gym",
        href: "/demo/titan-gym/",
        brief: "Memberships and the class timetable get asked for over messages all week.",
        solution: "Prices and the weekly timetable on the site, a trial session as the main button.",
        includes: ["Memberships", "Timetable", "Programmes"],
      },
      {
        name: "Barbershop Stari Grad",
        tag: "Barber",
        href: "/demo/barbershop-stari-grad/",
        brief: "Booking happens over Viber, and the price list is nowhere to be found.",
        solution: "Prices, opening hours and the team on one page, Viber within thumb's reach.",
        includes: ["Price list", "Opening hours", "Viber"],
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
        day: "Day 3–9",
        title: "We build",
        body: "Design, copy, photos and the technical work. You focus on your business.",
      },
      {
        day: "By day 10",
        title: "Live",
        body: "Your site is on your domain. We keep it maintained from there.",
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
        tagline: "Everything that matters, on one page.",
        badge: null,
      },
      {
        name: "Business",
        price: "€200",
        tagline: "A complete website for your company.",
        badge: "Most popular",
      },
      {
        name: "Premium",
        price: "from €350",
        tagline: "Custom design and the features you need.",
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
    inherits: "Everything in {plan}, plus:",
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
        a: "Up to 10 days from the moment we have your materials (text, photos, price list). Simpler sites are often ready sooner; for larger projects we agree the deadline up front.",
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
    sub: "Send an Instagram DM or email — we usually reply the same day.",
    action: "Message us on Instagram",
    instagram: "Instagram",
    emailLabel: "Email",
    prefill: "Hi! I'm interested in a website for my business. Can I get a free concept?",
    emailSubject: "Website for my business",
  },

  footer: {
    tagline: "Web studio from Podgorica. Websites that bring customers.",
    rights: "All rights reserved.",
    privacy: "Privacy",
  },

  privacy: {
    title: "Privacy",
    updated: "Updated 27 August 2026.",
    intro:
      "This site is a small studio's calling card. There are no accounts, no logins and nothing is sold here — so there is no reason for us to know anything about you beyond what you send us yourself.",
    sections: [
      {
        when: "always",
        title: "Who handles your data",
        body: [
          "VibeLab, a web studio in Podgorica. For anything about your data, write to vibecodemne@gmail.com.",
        ],
      },
      {
        when: "form",
        title: "When you send a concept request",
        body: [
          "The form is handled by Basin (usebasin.com), which forwards submissions to our inbox. Only what you typed is sent: your site or Instagram link, the contact to reply to, your message, and the page language.",
          "We use it to reply to you and nothing else. No newsletter, no sharing with third parties, no advertising. We delete the message once the conversation is over, and within a year at the latest.",
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

  fab: "Message us on Instagram",

  meta: {
    title: "VibeLab — Websites that bring customers | Web studio Podgorica",
    description:
      "Bespoke website design and development — delivered within 10 days, from €100. A web studio in Podgorica, Montenegro. Free concept before you pay.",
  },
};
