# VibeLab

**VibeLab is a web studio from Podgorica, Montenegro.** We design fast, distinctive websites for small businesses that need to look credible online and make it easy for customers to take the next step.

Live site: [vibelab.it.com](https://vibelab.it.com)

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

| Package | From | Best for |
|---|---:|---|
| Start | €100 | A clear one-page presence with the essentials |
| Business | €200 | A complete business website with menu/price list, gallery, and contact details |
| Premium | €350+ | A fully custom design, bilingual content, bookings, and tailored functionality |

Every site is responsive and includes direct contact actions, a map/contact area, and the SEO essentials needed for search engines to understand it.

## Work on this site

The **Radovi / Work** section contains interactive design concepts made for real local-business needs:

- Lucky Chopsticks — a modern, menu-led Asian restaurant concept for Podgorica
- Konoba Skadar — restaurant menu and reservation flow
- Titan Gym — memberships, programmes, and class timetable
- Barbershop Stari Grad — prices, opening hours, and easy messaging
- Barber Drina — an accessible price list and booking helper

The demos are concepts, not production websites. They show how a business can present its services clearly and give customers a simple path to contact.

## Contact

Want a concept for your business? Reach VibeLab through [Instagram](https://instagram.com/vibelab.me) or email [vibecodemne@gmail.com](mailto:vibecodemne@gmail.com).

## About this website

This repository contains the VibeLab website. It is bilingual (Montenegrin and English), built as a static Next.js export, and designed to be fast, accessible, and inexpensive to host.

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Useful commands

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run check:mobile
npm run test:security
```

### Content and maintenance

| Need to change | Where |
|---|---|
| Public contact details | `src/config/site.ts` |
| Website copy and package prices | `src/i18n/me.ts` and `src/i18n/en.ts` |
| Landing-page sections | `src/components/landing/` |
| Portfolio demos | `src/app/(me)/demo/` |
| Portfolio thumbnails | `public/work/` |
| Brand assets | `public/` and `src/app/` |

## Deployment

The site is configured for a static export and can be deployed on Vercel or any static host. Run `npm run build` to create the production-ready `out/` directory.
