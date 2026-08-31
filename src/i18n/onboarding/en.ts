import type { OnboardingCopy } from "./types";

/**
 * The brief, in English — for clients from abroad and anyone who would simply
 * rather read it in English. Same rules as the Montenegrin file: plain words,
 * no web vocabulary, and a way out of every question.
 *
 * This is a translation of intent, not of sentences. Where the Montenegrin
 * carries a local reference (Viber, a phone format) the English keeps it,
 * because the business being asked is still in Montenegro.
 */
export const en: OnboardingCopy = {
  lang: "en",
  htmlLang: "en",

  meta: {
    title: "Start your project | Vaky",
    description:
      "A short questionnaire for Vaky clients: tell us about your business, send us your materials, and we start building.",
  },

  gate: {
    eyebrow: "New project",
    title: "Hello! Let's begin.",
    intro:
      "A few short questions about your business and the site we're building. No jargon — just tell us what you need.",
    languageLabel: "Choose a language",
    me: "Crnogorski",
    en: "English",
    action: "Let's go",
    minutes: "Takes about 5 minutes",
    tony: "If you don't know something, skip it. That's what “I'm not sure” is for.",
  },

  resume: {
    title: "Continue where you left off",
    body: "We have your unfinished answers saved on this device.",
    action: "Continue",
    restart: "Start over",
    restartConfirm: "Sure? This deletes everything.",
  },

  privateLink: {
    checking: "Checking your link…",
    invalidTitle: "This link doesn't work",
    invalidBody:
      "Check that the whole link was copied, then try again. If it still doesn't work, write to us — we'll send you a new one.",
    completedTitle: "This questionnaire is already complete",
    completedBody:
      "We've already received your answers and materials for this project. If you'd like to add or change something, just write to us directly — everything reaches us.",
  },

  info: {
    title: "The questionnaire opens from your own link",
    body:
      "There's nothing to fill in here. Once we've agreed what we're building and what it costs, we send you a private link — it opens the questionnaire for your package, with your details already filled in.",
    stepsTitle: "How it goes",
    steps: [
      "You write to us through the form on the site, or on Instagram.",
      "We get back to you and agree on scope and price.",
      "You get the questionnaire link and send us your materials.",
    ],
    noLink: "No link yet? Write to us — we'll send one within minutes.",
    action: "Back to the site",
  },

  chrome: {
    step: "Step {n} of {total}",
    progressLabel: "Progress",
    back: "Back",
    next: "Next",
    toReview: "Review and send",
    optional: "optional",
    packageLabel: "Package",
    languageLabel: "Language",
    otherLanguage: "Crnogorski",
    draftNote: "Your answers are saved on this device until you send them.",
    errorSummary: "Please check the highlighted fields.",
    home: "vaky.me",
    packageNotes: {
      start: "Your site is one scrolling page — here we choose what goes on it.",
      business: "Your package covers up to five separate pages.",
      project: "The number of pages is agreed per project — tick everything you need.",
    },
  },

  steps: {
    business: {
      title: "About your business",
      intro: "The basics — who you are and how to reach you.",
      tony: "First, tell us a little about your business.",
    },
    custom: {
      title: "What the site should be able to do",
      intro:
        "Your project is custom-built, so tell us everything it needs to do. You'll only get detailed questions about what you pick.",
    },
    website: {
      title: "What the site should achieve",
      intro: "Why you're building it, and what should be on it.",
    },
    design: {
      title: "How the site should look",
      intro: "No design vocabulary needed — just tell us what you like.",
      tony: "Now let's talk about the look 👀",
    },
    features: {
      title: "What the site should do",
      intro: "Tick everything that sounds useful.",
    },
    shop: {
      title: "Your shop",
      intro: "A few questions so we know how selling should work.",
    },
    booking: {
      title: "Bookings and appointments",
      intro: "So bookings work the way you already work.",
    },
    materials: {
      title: "Materials",
      intro: "Upload anything you think could help us. You don't need to have everything ready.",
      tony: "Upload your logo, photos, and anything else that could help.",
    },
    finish: {
      title: "One last thing",
      intro: "Your domain, and anything else you'd like us to know.",
    },
  },

  questions: {
    /* ── Business ── */
    businessName: { label: "Business name", placeholder: "e.g. Konoba Skadar" },
    contactName: { label: "Your name", placeholder: "First and last name" },
    email: {
      label: "Email",
      placeholder: "you@example.com",
      help: "This is where we reply with the next steps.",
    },
    phone: { label: "Phone", placeholder: "+382 6X XXX XXX" },
    instagram: { label: "Instagram or Facebook", placeholder: "@yourprofile" },
    existingSite: {
      label: "Existing website",
      placeholder: "your-site.me",
      help: "If you have a site we're replacing, leave the address.",
    },
    activity: {
      label: "What does your business do?",
      placeholder: "In a couple of sentences — what you do and what you're good at.",
    },
    customers: {
      label: "Who are your typical customers?",
      placeholder: "e.g. locals, tourists, other businesses…",
    },

    /* ── Your project (Projekat package only) ── */
    projectType: {
      label: "What should the site be able to do?",
      help: "Tick everything you need — it's fine if you don't know exactly yet.",
      options: {
        shop: "Online shop",
        booking: "Appointment booking that follows your rules",
        "self-editing": "Changing content yourself — text, photos, products",
        integrations: "Connecting to software you already use",
        accounts: "Customer sign-in — accounts on the site",
        automation: "Automatic notifications and similar processes",
        "content-site": "A large site with many pages and lots of content",
        other: "Something else",
        "not-sure": "I'm not sure — I'll describe it in my own words at the end",
      },
    },
    projectTypeOther: { label: "What exactly?", placeholder: "Describe it in your own words." },
    integrationsWhat: {
      label: "What should the site connect to?",
      help: "Name the software, or describe it in your own words.",
      placeholder: "e.g. DIKIDI, the till, stock, Excel sheets…",
    },

    /* ── The site ── */
    goals: {
      label: "What do you most want the new site to achieve?",
      help: "You can pick more than one.",
      options: {
        "find-us": "Make it easier for people to find information about us",
        "more-enquiries": "Get more enquiries and calls",
        "present-services": "Present our services properly",
        "sell-products": "Sell products",
        "take-bookings": "Take bookings",
        "look-professional": "Look more professional online",
        "not-sure": "I'm not sure — let Vaky recommend",
        other: "Something else",
      },
    },
    goalsOther: { label: "What else?", placeholder: "Tell us briefly." },
    sections: {
      label: "What would you like to include on your website?",
      help: "This package includes one scrolling page made up of different sections. Choose what you'd like visitors to see as they scroll.",
      options: {
        about: "Introducing the business / about us",
        services: "Services",
        products: "Products",
        menu: "Menu",
        "pricing-list": "Price list",
        gallery: "Photo gallery",
        testimonials: "Customer reviews",
        location: "Location and map",
        contact: "Contact details and opening hours",
        social: "Links to social media",
        "contact-form": "Contact form",
        other: "Something else",
        "not-sure": "I'm not sure — let Vaky suggest the structure",
      },
    },
    sectionsOther: { label: "What else?", placeholder: "Tell us briefly." },
    pages: {
      label: "Which pages should the site have?",
      help: "Tick everything you think you need.",
      options: {
        home: "Home",
        about: "About us",
        services: "Services",
        gallery: "Gallery",
        pricing: "Prices",
        contact: "Contact",
        blog: "Blog and news",
        faq: "FAQ",
        shop: "Shop",
        booking: "Bookings",
        other: "Something else",
        "not-sure": "I'm not sure — let Vaky recommend",
      },
    },
    pagesOther: { label: "Which other page?", placeholder: "e.g. Our team" },

    /* ── Design ── */
    style: {
      label: "How would you like the site to look?",
      help: "Pick up to three things you like.",
      options: {
        minimal: "Minimal and simple",
        modern: "Modern",
        elegant: "Elegant and premium",
        dark: "Darker colours",
        light: "Light and clean",
        playful: "Colourful and creative",
        corporate: "Serious and corporate",
        "not-sure": "No particular idea — let Vaky suggest",
      },
    },
    inspiration: {
      label: "Are there any websites you like?",
      help: "They don't have to be from your industry. Send any site whose look you like.",
      placeholder: "somesite.com",
    },
    avoid: {
      label: "Is there anything you definitely don't want on the site?",
      placeholder: "e.g. too much text, dark colours, animation…",
    },

    /* ── Features ── */
    features: {
      label: "What should the site have?",
      help: "Tick everything that sounds useful. If you're not sure, pick the last option.",
      options: {
        "contact-form": "Contact form",
        whatsapp: "WhatsApp button",
        viber: "Viber button",
        map: "Google map",
        instagram: "Instagram posts on the site",
        booking: "Online bookings",
        shop: "Online shop",
        multilingual: "Site in more than one language",
        newsletter: "Newsletter signup",
        reviews: "Customer reviews",
        gallery: "Photo gallery",
        video: "Video",
        "not-sure": "I'm not sure — let Vaky recommend",
        other: "Something else",
      },
    },
    featuresOther: { label: "What else?", placeholder: "Tell us briefly." },
    siteLanguages: {
      label: "Which languages should the site be in?",
      help: "Your package covers Montenegrin plus an English version. You supply the English text — we edit it and build it in.",
      options: {
        "me-only": "Montenegrin only",
        "me-en": "Montenegrin and English",
        "not-sure": "I'm not sure — advise me",
      },
    },
    languagesNeeded: {
      label: "Which languages do you need?",
      help: "Montenegrin is assumed.",
      options: {
        english: "English",
        russian: "Russian",
        german: "German",
        italian: "Italian",
        albanian: "Albanian",
        turkish: "Turkish",
        other: "Another one",
      },
    },
    languagesOther: { label: "Which other language?", placeholder: "e.g. French" },
    selfEditing: {
      label: "Would you like to change texts, photos or products on the site yourself later?",
      options: {
        yes: "Yes, I'd do that myself",
        no: "No, I'd rather you changed things for me",
        "not-sure": "I'm not sure",
      },
    },

    /* ── Shop ── */
    productCount: {
      label: "Roughly how many products do you have?",
      options: {
        "to-20": "Up to 20",
        "20-100": "20 to 100",
        "100-500": "100 to 500",
        "500-plus": "More than 500",
        "not-sure": "I'm not sure",
      },
    },
    productCategories: {
      label: "What kinds of products do you sell?",
      placeholder: "e.g. clothing, footwear, accessories",
      help: "Helps us set up the categories in the shop.",
    },
    productReady: {
      label: "What do you already have ready?",
      help: "Tick everything you have. Whatever is missing, we'll sort out together.",
      options: {
        photos: "Product photos",
        prices: "Prices",
        descriptions: "Product descriptions",
        none: "None of it yet",
      },
    },
    variants: {
      label: "Does the same product come in more than one version?",
      help: "For example several sizes or colours.",
      options: { yes: "Yes", no: "No", "not-sure": "I'm not sure" },
    },
    payment: {
      label: "How would you like customers to pay?",
      options: {
        card: "By card online",
        "on-delivery": "Cash on delivery",
        "bank-transfer": "Bank transfer",
        "in-store": "In person at your place",
        "not-sure": "I'm not sure — I'd like a recommendation",
      },
    },
    delivery: {
      label: "How do goods reach the customer?",
      options: {
        courier: "By courier",
        own: "We deliver ourselves",
        pickup: "The customer collects from us",
        "not-sure": "I'm not sure — I'd like a recommendation",
      },
    },
    stock: {
      label: "Should the site keep track of how much you have in stock?",
      help: "When something sells out, the site marks it automatically.",
      options: { yes: "Yes", no: "Not needed", "not-sure": "I'm not sure" },
    },
    orderNotify: {
      label: "How should we let you know about a new order?",
      options: { email: "By email", phone: "By message to my phone", both: "Both" },
    },

    /* ── Bookings ── */
    bookingServices: {
      label: "What can customers book with you?",
      placeholder: "e.g. haircut, beard, colouring…",
      help: "List everything — we'll turn it into a proper list.",
    },
    bookingDuration: {
      label: "How long does one appointment usually take?",
      options: {
        "to-30": "Up to 30 minutes",
        "30-60": "30 to 60 minutes",
        "1-2h": "1 to 2 hours",
        more: "More than 2 hours",
        varies: "Depends on the service",
      },
    },
    bookingHours: {
      label: "Your opening hours",
      placeholder: "e.g. Mon–Fri 09–17, Sat 09–14, closed Sunday",
    },
    bookingStaff: {
      label: "Does more than one person take appointments?",
      help: "If so, the customer chooses who they're booking with.",
      options: { one: "No, just one person", several: "Yes, several of us", "not-sure": "I'm not sure" },
    },
    bookingAdvance: {
      label: "How far ahead can customers book?",
      options: {
        "same-day": "Same day",
        week: "A week ahead",
        month: "A month ahead",
        longer: "Longer than that",
        "not-sure": "I'm not sure",
      },
    },
    bookingCancellation: {
      label: "Can customers cancel an appointment themselves?",
      options: {
        free: "Yes, no restrictions",
        "with-notice": "Yes, but with notice",
        no: "No",
        "not-sure": "I'm not sure",
      },
    },
    bookingCurrent: {
      label: "How do you take appointments today?",
      options: {
        phone: "By phone",
        messages: "Over Viber or WhatsApp",
        instagram: "Instagram messages",
        notebook: "We write them in a notebook",
        system: "We use some software",
        "not-sure": "It varies",
      },
    },
    bookingCurrentSystem: { label: "Which software do you use?", placeholder: "e.g. DIKIDI" },
    bookingConfirmation: {
      label: "How should we confirm the appointment to the customer?",
      options: {
        email: "By email",
        message: "By message to their phone",
        both: "Both",
        "not-needed": "No confirmation needed",
      },
    },

    /* ── Materials ── */
    textsReady: {
      label: "Do you already have the text for the site?",
      help: "We mean service descriptions, the about text and so on.",
      options: {
        all: "Yes, it's all ready",
        some: "I have some of it",
        none: "I don't have it",
        help: "I'd like Vaky to help with the text",
      },
    },
    logoStatus: {
      label: "Do you have a logo?",
      options: {
        have: "Yes, I have one",
        none: "I don't have one",
        redo: "I have one, but I'd like a new version",
      },
    },
    photosStatus: {
      label: "What kind of photos do you have?",
      options: {
        professional: "Professional photos",
        basic: "Ordinary ones, from a phone",
        "not-enough": "I don't have enough",
        "not-sure": "I'm not sure what I need",
      },
    },
    uploadLogo: {
      label: "Logo",
      help: "If you have your logo as a file, send it here.",
    },
    uploadMedia: {
      label: "Photos and video",
      help: "Your place, products, team, work — anything that shows what you do.",
    },
    uploadDocuments: {
      label: "Price list, menu, catalogue, texts",
      help: "PDF, Word, Excel or a photo of your price list — all fine.",
    },

    /* ── Domain and finish ── */
    domainStatus: {
      label: "Do you already have a domain?",
      help: "A domain is the site's address, for example vaky.me.",
      options: { yes: "Yes", no: "No", "not-sure": "I'm not sure" },
    },
    domainName: { label: "Which domain do you have?", placeholder: "your-site.me" },
    domainHelp: {
      label: "Would you like Vaky to help you choose and set up a domain?",
      options: { yes: "Yes, I'd like help", no: "No, we'll handle it" },
    },
    hostingPaying: {
      label: "Are you already paying for an existing site or hosting?",
      help: "If you don't know, pick “I'm not sure” — we'll check together.",
      options: { yes: "Yes", no: "No", "not-sure": "I'm not sure" },
    },
    notes: {
      label: "Is there anything else you'd like us to know before we start?",
      placeholder: "Write anything at all.",
    },
  },

  upload: {
    zones: {
      logo: { hint: "PNG, JPG or PDF." },
      media: { hint: "JPG, PNG, HEIC, MP4 or MOV." },
      documents: { hint: "PDF, Word, Excel, CSV, an image or a ZIP." },
    },
    drop: "Drag files here",
    browse: "Choose from your device",
    limits: "Up to {file} per file, {video} for video, {total} in total.",
    uploading: "Uploading…",
    done: "Uploaded",
    failed: "Not uploaded",
    retry: "Try again",
    remove: "Remove",
    removeLabel: "Remove {name}",
    empty: "Nothing uploaded yet.",
    tooMany: "You've reached the maximum number of files.",
  },

  credentials: {
    title: "Never send passwords",
    body: "Please don't send passwords through this form. If we ever need access to an account, we'll agree a safe way to do that separately.",
  },

  review: {
    title: "Review before sending",
    intro: "Check that everything is right. You can edit any section.",
    edit: "Edit",
    editLabel: "Edit: {section}",
    unanswered: "Not answered",
    files: "Uploaded materials",
    noFiles: "You haven't uploaded any files. That's fine — we'll ask if we need something.",
    submit: "Send project to Vaky",
    sending: "Sending…",
  },

  success: {
    title: "Everything is ready 🚀",
    body: "Thank you! Your answers and materials have been sent to Vaky. We'll review everything and contact you with the next steps.",
    refLabel: "Your project number",
    note: "Keep this number — it helps us find you faster if you write to us.",
    home: "Back to vaky.me",
    tony: "Tony has everything he needs. 🫡",
  },

  errors: {
    required: "This field is required.",
    email: "Please check the email address.",
    url: "Please check the website address.",
    phone: "Please check the phone number.",
    long: "This is too long.",
    option: "Please pick one of the options.",
    many: "You've picked too many options.",
    api: {
      "bad-request": "Something went wrong. Your answers haven't been lost. Please try again.",
      session: "Your session expired. Refresh the page — your answers are saved.",
      "rate-limit": "Too many attempts in a short time. Wait a minute and try again.",
      challenge: "Give the check a second to finish, then send again.",
      link: "This link isn't valid. Write to us and we'll send you a new one.",
      completed: "The questionnaire for this project has already been submitted.",
      "file-type": "We can't accept this kind of file.",
      "file-size": "That file is too large.",
      "file-count": "You've uploaded too many files.",
      "file-total": "Your files are too large in total.",
      answers: "Some fields aren't filled in correctly. Please check the highlighted ones.",
      server: "Something went wrong. Your answers haven't been lost. Please try again.",
    },
  },
};
