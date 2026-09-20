import type { Dictionary } from "./index";

export const en: Dictionary = {
  lang: "en",
  htmlLang: "en",

  nav: {
    work: "Examples",
    pricing: "Pricing",
    contact: "Contact",
    langLabel: "ME",
    langHref: "/",
    skip: "Skip to content",
  },

  hero: {
    eyebrow: "Web studio — Montenegro",
    titleA: "A website for your business.",
    titleB: "From €200, in 10 days.",
    sub: "Restaurant, salon, barbershop, gym, villa. You get a free concept first, then you decide.",
    ctaPrimary: "Get your free concept",
    ctaSecondary: "See the examples",
    facts: [
      { label: "Working in", value: "Montenegro" },
      { label: "Sites live", value: "{live}" },
      { label: "Concepts", value: "{concepts}" },
      { label: "Languages", value: "ME + EN" },
    ],
  },

  work: {
    title: "What we have made",
    liveTitle: "Live sites",
    liveSub: "Running for real clients, on their own domains.",
    conceptsTitle: "Concepts for your trade",
    conceptsSub:
      "Built for specific businesses in Montenegro, so you can see what your site could look like. Open them on your phone.",
    liveLabel: "Live site",
    conceptLabel: "Design concept",
    briefLabel: "Brief",
    solutionLabel: "Approach",
    includesLabel: "Includes",
    tabsLabel: "What do you do?",
    pickLabel: "Projects",
    open: "Open the demo",
    openLive: "Open the site",
    newTab: "opens in a new window",
    phoneAlt: "{name} — the site's opening screens on a phone",
    items: [
      {
        key: "villa",
        type: "Villa",
        projects: [
          {
            name: "Villa Vučje",
            slug: "villa-vucje",
            tag: "villavucje.me · Kolašin",
            href: "https://villavucje.me/",
            brief: "The house was let through Booking and Airbnb only — with no address of its own.",
            solution: "A site on its own domain: the house, the gallery and the location; booking goes to Booking and Airbnb.",
            includes: ["Gallery", "Location", "Booking"],
          },
        ],
      },
      {
        key: "apartment",
        type: "Apartment",
        projects: [
          {
            name: "Mandarina",
            slug: "mandarina",
            tag: "mandarinapt.me · Petrovac na Moru",
            href: "https://mandarinapt.me/",
            brief: "The sea view and the pool are the whole argument, and a listing buries them among a hundred others.",
            solution: "A site that walks through the apartment, the pool and the beach, then hands the guest to Booking or Airbnb.",
            includes: ["Gallery", "Pool and beach", "Location"],
          },
        ],
      },
      {
        key: "restaurant",
        type: "Restaurant",
        projects: [
          {
            name: "Lucky Chopsticks",
            slug: "lucky-chopsticks",
            tag: "Asian restaurant · Podgorica",
            href: "/demo/lucky-chopsticks/",
            brief: "Guests check the menu and location before picking where to eat.",
            solution: "A menu by mood and featured dishes on one distinctive page.",
            includes: ["Menu", "Specials", "Bookings"],
          },
          {
            name: "Konoba Skadar",
            slug: "konoba-skadar",
            tag: "Konoba · Virpazar",
            href: "/demo/konoba-skadar/",
            brief: "Guests pick a place by phone and want the menu and a free table.",
            solution: "The menu as text by category, calling and booking one tap away.",
            includes: ["Menu", "Bookings", "Map"],
          },
        ],
      },
      {
        key: "barber",
        type: "Barber",
        projects: [
          {
            name: "Barber Drina",
            slug: "barber-drina",
            tag: "Barber · Stari Aerodrom",
            href: "/demo/barber-drina/",
            brief: "The price list lives in an Instagram post guests scroll back to find.",
            solution: "A price table, and a helper that writes the booking DM for you.",
            includes: ["Price list", "Booking by DM", "Map"],
          },
          {
            name: "Barbershop Stari Grad",
            slug: "barbershop-stari-grad",
            tag: "Barber · Stara Varoš",
            href: "/demo/barbershop-stari-grad/",
            brief: "Booking runs over Viber, and prices are nowhere to be found.",
            solution: "Prices, hours and the team on one page, Viber one tap away.",
            includes: ["Price list", "Opening hours", "Viber"],
          },
        ],
      },
      {
        key: "hair",
        type: "Hair salon",
        projects: [
          {
            name: "Andrea Beauty House",
            slug: "andrea-beauty-house",
            tag: "Salon, braids and kids · New City",
            href: "/demo/andrea-beauty-house/",
            brief: "The house runs three Instagram profiles, so nobody knows which one is for what.",
            solution: "The site as a hallway with three doors: salon, braids and kids, each with its own profile.",
            includes: ["Salon", "Braids", "Kids"],
          },
        ],
      },
      {
        key: "beauty",
        type: "Beauty salon",
        projects: [
          {
            name: "Studio ljepote Mila",
            slug: "studio-ljepote-mila",
            tag: "Beauty and PMU · City Kvart",
            href: "/demo/studio-ljepote-mila/",
            brief: "Treatments, permanent makeup, courses and a shop — four businesses under one name, scattered across channels.",
            solution: "The page as a magazine: three ways in, leading to treatments, courses and the shop that already works.",
            includes: ["Treatments", "Courses", "Shop"],
          },
          {
            name: "Studio ljepote i zdravlja",
            slug: "studio-ljepote-zdravlja",
            tag: "Beauty studio · Zabjelo",
            href: "/demo/studio-ljepote-zdravlja/",
            brief: "A list of treatment names tells you nothing if you don't already know what they are called.",
            solution: "Treatments grouped by what brings someone in — face, body, massage — not by name.",
            includes: ["Face", "Body", "Massage"],
          },
          {
            name: "LavLav",
            slug: "lavlav",
            tag: "Nail & beauty · Master kvart",
            href: "/demo/lavlav/",
            brief: "Booking already runs on DIKIDI, but the studio has nowhere to introduce itself.",
            solution: "A page that introduces the studio and hands the visitor straight to the booking that already exists.",
            includes: ["Manicure", "Pedicure", "Booking"],
          },
        ],
      },
      {
        key: "tattoo",
        type: "Tattoo",
        projects: [
          {
            name: "Skyline Tattoo",
            slug: "skyline-tattoo",
            tag: "Tattoo and piercing · Podgorica",
            href: "/demo/skyline-tattoo/",
            brief: "The studio has no site — the work sits in Instagram highlights nobody can search.",
            solution: "A portfolio built on the studio's own highlights: Minimal, Bold and Piercings.",
            includes: ["Portfolio", "Piercing", "Instagram"],
          },
          {
            name: "KraftArt",
            slug: "kraftart",
            tag: "Tattoo and piercing · Masline",
            href: "/demo/kraftart/",
            brief: "Appointments run over DM, Viber, WhatsApp and the phone, and nowhere does it say what the studio does.",
            solution: "Services, artists and the address on one page, every booking channel one tap away.",
            includes: ["Services", "Artists", "Booking"],
          },
        ],
      },
      {
        key: "pilates",
        type: "Pilates & yoga",
        projects: [
          {
            name: "Soul Studio",
            slug: "soul-studio",
            tag: "Yoga & Reformer Pilates · Podgorica",
            href: "/demo/soul-studio/",
            brief: "Anyone who has tried neither cannot tell them apart, so they cannot tell which to book.",
            solution: "The two practices explained against each other, no jargon and no promises.",
            includes: ["Yoga", "Reformer", "Contact"],
          },
          {
            name: "Telo Pilates Club",
            slug: "telo-pilates",
            tag: "Reformer pilates · Vektra",
            href: "/demo/telo-pilates/",
            brief: "The timetable and prices live in the booking system, and nobody knows what to pick there.",
            solution: "The formats explained before booking, then the guest chooses in the system that already runs.",
            includes: ["Formats", "Booking", "Instagram"],
          },
          {
            name: "Studio Pilates by Maja",
            slug: "pilates-by-maja",
            tag: "Group and personal training · Podgorica",
            href: "/demo/pilates-by-maja/",
            brief: "The timetable is an Instagram post that gets replaced every week.",
            solution: "The page explains the two kinds of training and sends you to the current post with the times.",
            includes: ["Group", "Personal", "Times"],
          },
        ],
      },
      {
        key: "gym",
        type: "Gym",
        projects: [
          {
            name: "Titan Gym",
            slug: "titan-gym",
            tag: "Gym · Podgorica",
            href: "/demo/titan-gym/",
            brief: "Memberships and the timetable get asked for over DMs all week.",
            solution: "Prices and timetable online, a trial session as the main button.",
            includes: ["Memberships", "Timetable", "Programmes"],
          },
        ],
      },
      {
        key: "dentist",
        type: "Dentist",
        projects: [
          {
            name: "Dental Clinic Kovačević",
            slug: "dental-clinic-kovacevic",
            tag: "Dentistry · Igalo and Zelenika",
            href: "/demo/dental-clinic-kovacevic/",
            brief: "A family practice works in two towns, and online it exists only as one Instagram profile.",
            solution: "Three areas of work and a board with both locations; messages go to the profile the clinic runs itself.",
            includes: ["Dentistry", "Oral surgery", "Aesthetic work"],
          },
        ],
      },
    ],
  },
  process: {
    title: "How we work",
    sub: "From the first message to a site that works, with no hidden phases.",
    windowTitle: "From message to site — 4 steps",
    steps: [
      {
        when: "Day 1",
        title: "You reach out",
        body: "The form on this site, an Instagram DM or an email — whatever is easiest. Tell us what your business does and what you need; we usually reply the same day.",
      },
      {
        when: "Day 1–2",
        title: "Free concept",
        body: "We look at your business, your Instagram and your competition, then sketch the first version of your site. If you like it, you pick a package and only then do we agree on a price.",
      },
      {
        when: "Day 3–9",
        title: "We build",
        body: "Through a short questionnaire you send us your logo, photos and text — wherever you are unsure, you tap \"Not sure\". From that comes a brief for your site alone, then the design and the technical work: phone first, fast and ready for Google. At the end you review and send your notes in one go.",
      },
      {
        when: "By day 10",
        title: "Live",
        body: "The site runs on your domain and all of it is yours. If you would rather not think about the technical side, we can take over hosting and small edits.",
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
          label: "SEO and speed",
          values: [true, true, true],
          explain:
            "Title, description, sitemap and robots.txt so Google finds you; structured data so it knows what you are and when you are open; sharing cards for Instagram, WhatsApp and Viber; and a site that loads instantly, even on a weak connection. Every site gets this — it is not an add-on.",
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
          label: "Google Business Profile",
          values: [false, true, true],
          explain:
            "We tidy up your Google Maps listing — or create it if you have none: the right category, opening hours, services with prices, photos and a link to the site. That is how people find you when they search for \"barber Podgorica\" rather than only when they already know your name.",
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
      {
        q: "Can I edit the content myself?",
        a: "The site has no admin panel — that is what keeps it fast and secure, but it means prices, text and photos do not change on their own. Small edits are part of the €20/month maintenance; without it, you write to us and we agree per change. If you need to manage content yourself every day, that is a Project and we say so up front.",
      },
      {
        q: "Who writes the text and takes the photos?",
        a: "We write the copy from what you tell us in the questionnaire — you only review and correct it. The photos are yours: what you already have, from a phone or a photographer. We process them so they load fast. If you have none, we tell you what to shoot and how.",
      },
      {
        q: "What if I have no logo?",
        a: "Not a problem. For Start and Business we make a simple wordmark from the business name, in the site's colour and type — enough for the site, the Google profile and Instagram. A full logo with variants is separate work, if you ever need it.",
      },
    ],
  },

  contact: {
    title: "Ready for a new website?",
    sub: "Leave a few details, or write to us directly — whichever is easier.",
    direct: {
      title: "Or write directly",
      whatsapp: "WhatsApp",
      instagram: "Instagram DM",
      email: "Email",
      whatsappPrefill: "Hi! I'm interested in a website for my business. Could we talk about a quote?",
      pointsTitle: "What happens next",
      points: [
        "We reply the same day, tomorrow at the latest.",
        "You get a free concept — a sketch of the site before any decision.",
        "We agree on a package and a price.",
      ],
    },
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
      note: "No commitment — once we reply, you decide how to go on.",
      emailFallbackAction: "Send an email instead",
      prefill: "Hi! This is my business: {link} — could I get a quote for a website?",
      bubble: { pre: "Tell us what you do — ", em: "the rest", post: " is on us." },
    },
  },

  footer: {
    tagline: "Web design & development in Montenegro. Websites that bring customers.",
    rights: "All rights reserved.",
    privacy: "Privacy",
  },

  privacy: {
    title: "Privacy",
    updated: "Updated 31 August 2026.",
    intro:
      "This site is a small studio's calling card. There are no accounts, no logins and nothing is sold here — so there is no reason for us to know anything about you beyond what you send us yourself.",
    sections: [
      {
        when: "always",
        title: "Who handles your data",
        body: [
          "Vaky, a web studio in Montenegro. For anything about your data, write to vakymne@gmail.com.",
        ],
      },
      {
        when: "form",
        title: "When you send an enquiry through the site",
        body: [
          "The form posts to our own server at Cloudflare and the enquiry is stored in our database. Only what you typed is sent: your name, business name, email, phone, link, what you need and your message — plus the page language. A copy of the same enquiry also reaches us by email.",
          "We use it to reply to you and to put together a quote, and for nothing else. No newsletter, no sharing with third parties, no advertising. We delete the enquiry once the conversation is over, and within a year at the latest; you can ask for deletion sooner, at vakymne@gmail.com.",
          "Nothing is paid through the site and we never ask for card details. To protect the form from abuse we record an irreversibly hashed form of your IP address so we can limit repeated attempts — your address cannot be read back from it.",
        ],
      },
      {
        when: "always",
        title: "When you write by email",
        body: [
          "That button only opens your mail app with a message already written. The site never sees or stores what you send that way — from there your email provider's terms apply.",
        ],
      },
      {
        when: "always",
        title: "When you fill in the project start form",
        body: [
          "Once we have agreed on the work, we send you a private questionnaire link, and that is where you send us what we need to build the site. Only what you type and attach is sent: business name, your name, email, phone, your answers, and the files you choose.",
          "Answers are stored in our database at Cloudflare, and files in private storage that cannot be reached from the internet without a signed link that expires. We use them solely to build your site — we do not share them with anyone and do not use them for advertising. We keep them for as long as we work together and at most a year after that; you can ask for deletion sooner, at vakymne@gmail.com.",
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

  /* One page per kind of business, at /en/website-for-…/. See me.ts. */
  trades: {
    eyebrow: "A website for your trade",
    examplesTitle: "What we have made",
    examplesSub: "Some of these are live client sites, the rest are concepts made for a specific business. Open them on your phone.",
    needsTitle: "What such a site has to have",
    priceTitle: "Price and timeline",
    priceBody: "The Start package is €200 and goes online within 10 days. You get a free concept before paying, so you see what the site would look like before you decide.",
    priceLink: "See all packages",
    othersTitle: "Other trades",
    items: {
      villa: {
        slug: "website-for-villas",
        title: "A website for a villa or holiday house",
        metaTitle: "Website for a villa — from €200, online in 10 days | Vaky",
        description: "Website design for villas and holiday houses in Montenegro. Gallery, location and booking on your own domain, alongside Booking and Airbnb. From €200, free concept.",
        intro: "A house rented only through Booking and Airbnb shares a page with a thousand similar ones and pays commission on every night. A site on its own domain is the address a guest remembers and comes back to next summer.",
        needs: [
          { title: "A gallery that sells", body: "Large photos of the house, the garden and the view, in the order a guest looks around." },
          { title: "Location and surroundings", body: "A map, the distance to the beach or the mountains, what is nearby." },
          { title: "Booking without a spreadsheet", body: "A button that goes to Booking, Airbnb or straight to your Viber and WhatsApp." },
          { title: "Two languages", body: "Montenegrin and English, because guests come from all over Europe." },
        ],
      },
      apartment: {
        slug: "website-for-apartments",
        title: "A website for apartments",
        metaTitle: "Website for apartments — from €200, online in 10 days | Vaky",
        description: "Website design for holiday apartments in Montenegro. Gallery, pool and beach, location and booking through Booking or directly. From €200, free concept.",
        intro: "In a listing an apartment gets lost among a hundred similar ones, and what sets it apart, the view, the pool, the beach nearby, fits in two photos. On its own site that becomes the whole story, and booking still goes wherever suits you.",
        needs: [
          { title: "What sets it apart", body: "The view, the pool, the terrace or the beach five steps away, first and largest on the page." },
          { title: "Each apartment on its own", body: "Its own photos, number of beds and what it includes." },
          { title: "Booking", body: "Booking, Airbnb or a direct enquiry over Viber and WhatsApp, whichever suits you." },
          { title: "Two languages", body: "Montenegrin and English, with prices and seasons that are easy to update." },
        ],
      },
      restaurant: {
        slug: "website-for-restaurants",
        title: "A website for a restaurant",
        metaTitle: "Website for a restaurant — from €200, online in 10 days | Vaky",
        description: "Website design for restaurants and taverns in Montenegro. A menu that reads on a phone, one-tap reservations, opening hours and a map. From €200, free concept.",
        intro: "Before coming, a guest looks for three things: the menu, the opening hours and how to book a table. If they have to dig through Instagram for it, they often move on. A site gives all three in one place, on a phone.",
        needs: [
          { title: "A menu that reads on a phone", body: "Dishes and prices as text, not a photo of the menu to zoom into." },
          { title: "One-tap reservation", body: "A call or a WhatsApp message with one tap, no five-field form." },
          { title: "Opening hours and a map", body: "When you are open and how to get there, parking included." },
          { title: "Photos of the food and the room", body: "What the guest pictures before they arrive." },
        ],
      },
      barber: {
        slug: "website-for-barbershops",
        title: "A website for a barbershop",
        metaTitle: "Website for a barbershop — from €200, online in 10 days | Vaky",
        description: "Website design for barbershops in Montenegro. Work, price list and appointments over Instagram, Viber or online. From €200, free concept.",
        intro: "A customer picks a barber by the pictures and books by message. A site brings both together: the work, the price list and a booking button that goes to Instagram, Viber or online appointments.",
        needs: [
          { title: "The work, in a gallery", body: "Cuts and beards at full size, not in an Instagram grid." },
          { title: "A price list", body: "Cut, beard, combo, with prices changed in one place." },
          { title: "Appointments", body: "Instagram DM, Viber or an online planner, however you already work." },
          { title: "Location and hours", body: "A map and the hours, the second question after the price." },
        ],
      },
      hair: {
        slug: "website-for-hair-salons",
        title: "A website for a hair salon",
        metaTitle: "Website for a hair salon — from €200, online in 10 days | Vaky",
        description: "Website design for hair salons in Montenegro. Prices by service, work, team and booking by call, Viber or Instagram. From €200, free concept.",
        intro: "A hair salon lives on recommendations and on Instagram. The site is where that recommendation leads: prices, work, the team and a booking button, without scrolling through a hundred posts.",
        needs: [
          { title: "Prices by service", body: "Cut, colour, treatments, with prices a client sees before messaging." },
          { title: "Work and team", body: "Who works in the salon and what they do best, with photos of the work." },
          { title: "Booking", body: "A call, Viber or Instagram DM with one tap." },
          { title: "Location and hours", body: "A map, the hours and how to get there, parking included." },
        ],
      },
      beauty: {
        slug: "website-for-beauty-salons",
        title: "A website for a beauty salon",
        metaTitle: "Website for a beauty salon — from €200, online in 10 days | Vaky",
        description: "Website design for beauty salons in Montenegro. Treatments and prices, gallery, team and booking over Instagram or Viber. From €200, free concept.",
        intro: "Treatments, prices and who does them, that is what a client wants to know before sending a message. A site lays it out clearly, and booking stays on Instagram or Viber if that suits you.",
        needs: [
          { title: "Treatments and prices", body: "By category, with duration and price, no PDF price list." },
          { title: "A gallery of work", body: "Nails, lashes, facials, whatever you are chosen for." },
          { title: "The team", body: "Who does what, with a photo and a short line." },
          { title: "Booking", body: "Instagram DM, Viber or a call with one tap." },
        ],
      },
      tattoo: {
        slug: "website-for-tattoo-studios",
        title: "A website for a tattoo studio",
        metaTitle: "Website for a tattoo studio — from €200, online in 10 days | Vaky",
        description: "Website design for tattoo studios in Montenegro. Portfolio by artist and style, prices from, appointment enquiries and aftercare. From €200, free concept.",
        intro: "For a tattoo studio the portfolio is everything. A site shows it at full size, by artist and by style, and leads to an appointment enquiry, instead of the work getting lost in an Instagram grid.",
        needs: [
          { title: "Portfolio by artist", body: "Each artist with their own work and style, at full size." },
          { title: "Styles and prices from", body: "What you do and from how much, so enquiries come from people who know what they want." },
          { title: "Appointment enquiry", body: "A form with a description and a picture of the idea, or straight to Instagram DM." },
          { title: "Aftercare and questions", body: "What you explain to every client again, written once." },
        ],
      },
      pilates: {
        slug: "website-for-pilates-studios",
        title: "A website for a pilates or yoga studio",
        metaTitle: "Website for a pilates studio — from €200, online in 10 days | Vaky",
        description: "Website design for pilates and yoga studios in Montenegro. Class schedule, prices and packages, instructors and trial class sign-up. From €200, free concept.",
        intro: "A new member first looks for the schedule, the price of a monthly pass and where the studio is. A site answers all three before the message, and shows the instructors and the space the way someone walking in for the first time sees them.",
        needs: [
          { title: "Class schedule", body: "By day and type of class, readable on a phone." },
          { title: "Prices and packages", body: "Single class, monthly pass, packages, in one place." },
          { title: "Instructors and the space", body: "Who leads the classes and what the studio looks like inside." },
          { title: "Trial class sign-up", body: "A message or a call with one tap, no registration." },
        ],
      },
      gym: {
        slug: "website-for-gyms",
        title: "A website for a gym",
        metaTitle: "Website for a gym — from €200, online in 10 days | Vaky",
        description: "Website design for gyms in Montenegro. Memberships, opening hours, space and equipment, trainers and sign-up. From €200, free concept.",
        intro: "A gym is chosen by price, opening hours and what it looks like inside. A site gives all of that without a phone call: memberships, equipment, trainers and a sign-up button.",
        needs: [
          { title: "Memberships", body: "Monthly, quarterly, student, with prices changed in one place." },
          { title: "Opening hours", body: "Including holidays and weekends, because that is the first thing checked." },
          { title: "Space and equipment", body: "Photos of the floor and the machines, what is looked at before a first visit." },
          { title: "Trainers and programmes", body: "Who works there and what they offer, from personal training to group classes." },
        ],
      },
      dentist: {
        slug: "website-for-dentists",
        title: "A website for a dental practice",
        metaTitle: "Website for a dentist — from €200, online in 10 days | Vaky",
        description: "Website design for dental practices in Montenegro. Services and price list, team, appointment booking, location. From €200, free concept.",
        intro: "A patient chooses a practice on trust: who the doctor is, which services they do, what it costs and how to book. A site says that calmly and clearly, without a hard sell.",
        needs: [
          { title: "Services and price list", body: "From a check-up to implants, with prices or price ranges." },
          { title: "The practice team", body: "Doctors with a photo, specialisation and experience." },
          { title: "Appointment booking", body: "A call, Viber or a form, with opening hours next to the button." },
          { title: "Location and parking", body: "A map and how to get there, because patients come back for years." },
        ],
      },
    },
  },

  meta: {
    title: "Website Development Montenegro — from €200, within 10 days | Vaky",
    description:
      "Website design and development in Montenegro. A modern site for your business — from €200, live within 10 days. Free concept before you pay. Vaky, Podgorica.",
    serviceTypes: ["Website development", "Web design", "Website maintenance"],
  },
};
