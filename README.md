# Vaky

**Vaky is a web studio from Podgorica, Montenegro.** We design fast, distinctive websites for small businesses that need to look credible online and make it easy for customers to take the next step.

Production domain: [vaky.me](https://vaky.me), served by Cloudflare Pages.

## What we do

We make websites for local businesses: restaurants, salons, barbers, gyms, services, and teams with a good product but no clear online home.

Each site is designed around the questions customers actually ask:

- What do you offer and how much does it cost?
- Where are you and when are you open?
- How do I book, order, call, or send a message?
- Can I trust this business?

The result is a site that is quick on a phone, easy to understand, and made to turn interest into messages, calls, bookings, and visits.

## How we work

1. **You tell us about the business.** Send an Instagram profile, existing site, menu, price list, or a short message about what you need.
2. **We make a free concept.** You see a real direction before committing to the project.
3. **We build the site.** Design, copy, photos, responsive layout, and technical setup are handled together.
4. **You go live.** The site is published on your domain and ready to share.

Most projects are ready within 10 days once we have the necessary content.

## Packages

| Package | Price | Best for |
|---|---:|---|
| Start | €250 | One scrolling page covering the essentials — one revision round |
| Business | €500 | Up to five pages, Montenegrin and English, two revision rounds; an admin panel is a one-off €150 extra |
| Project | From €800 | A custom build — shop, admin panel, integrations, more languages; scope and final price agreed per project |

Two optional add-ons sit beside the packages: a yearly care plan with the
domain included (€200 for Start, €300 for Business, agreed per Project; paid
once a year), and three motion design videos for social media (20+ seconds
each; one announces the new site, the client picks the subject of the other
two) for a one-off €50. Mobile apps (iPhone and Android, published to the App Store and
Google Play or shipped as a PWA) are a separate service with no list price —
each is quoted on what the business needs the app to do. Package and price are agreed with Vaky directly through
Instagram or email before any work starts — there is no checkout on the site
itself.

Every site is responsive and includes direct contact actions, a map/contact area, and the SEO essentials needed for search engines to understand it.

## Work on this site

The **Radovi / Work** section contains interactive design concepts made for real local-business needs:

- Lucky Chopsticks — a modern, menu-led Asian restaurant concept for Podgorica
- Konoba Skadar — restaurant menu and reservation flow
- Titan Gym — memberships, programmes, and class timetable
- Barbershop Stari Grad — prices, opening hours, and easy messaging
- Barber Drina — an accessible price list and booking helper

Alongside them sit the outreach concepts, made for specific Montenegrin
businesses and reachable only by their own link: Soul Studio, KraftArt,
LavLav, Telo Pilates, Pilates by Maja, Skyline Tattoo, Dental Clinic
Kovačević, Andrea Beauty House, Studio ljepote Mila, and Studio ljepote i
zdravlja. They are unlisted and carry `noindex`.

The demos are concepts, not production websites. They show how a business can present its services clearly and give customers a simple path to contact.

## Contact

Want a concept for your business? Reach Vaky on [Instagram](https://instagram.com/vaky.me)
or at [vakymne@gmail.com](mailto:vakymne@gmail.com).

## About this website

This repository contains the Vaky website. It is bilingual (Montenegrin and English), built as a static Next.js export, and designed to be fast, accessible, and inexpensive to host.

The homepage is cut as a film ("kadar po kadar"): opening titles on the
first page of a visit, a poster-style title card, a showreel in a camera
viewfinder that grows as it is scrolled into, a credits marquee, a statement
that darkens word by word, three stacked expertise cards, the process as a
pinned editing timeline with a playhead, a filterable work grid and a red
closing scene. The scroll choreography is GSAP (ScrollTrigger, SplitText,
Flip) with Lenis smooth scrolling, in the client components under
`src/components/landing/`; every scene is server-rendered and readable
without it, and none of it runs under reduced motion.

The films are [Remotion](https://www.remotion.dev) compositions in
`src/components/motion/films/`, played live by `@remotion/player`: the
showreel of the real client work, the websites and apps genres, a motion
design format, and the pavletosic.com portfolio. Each loads only near the
screen, pauses off it, has a pause button, and rests on a still frame under
reduced motion. Their sizes live in `src/components/motion/specs.ts`, so the
page reserves their space before Remotion arrives.

The brand is red and white on the studio's original red: the tokens are the
`@theme` block in `src/app/globals.css`, the mark is `BrandMark` in
`src/components/BrandWordmark.tsx`, `node scripts/brand-assets.mjs` redraws
the favicons from it and `node scripts/work-thumbs.mjs` cuts the work grid's
tiles from the phone captures.
