# Subhakrit Rajbhandari — Portfolio

Premium, modern, minimal portfolio for a **full-time Cybersecurity Penetration Tester**.
Dark, elegant, security-focused aesthetic — charcoal base, soft blue/cyan accents, subtle
cyber-inspired details (no "hacker clichés").

> Tagline: **Securing Applications. Strengthening Trust.**

---

## Tech Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Framer Motion** (scroll reveals, staggered cards, counters, micro-interactions)
- **Lucide Icons** + custom brand SVGs
- **Manrope** & **Geist Mono** fonts (self-hosted via `next/font`)
- Fully responsive · dark by default · SEO + Open Graph metadata

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve production build
npm run lint       # ESLint
```

## Features

- Modern loading screen (brand monogram + progress shimmer)
- Sticky glassmorphic navbar with scroll-spy active links & mobile menu
- Scroll progress indicator
- Minimal custom cursor (fine-pointer devices only)
- Animated particle + grid background (low opacity)
- **Hero** — profile card, animated counters, three CTAs, floating badges
- **About** — biography, highlight cards, sticky profile snapshot
- **Education** — Bachelor's in Cyber Security & Networking (Lincoln University College)
- **Experience** — clean timeline + responsibility chips
- **Core Expertise** — 8 animated capability cards
- **Featured Projects / Professional Highlights** — enterprise assessments + WebSec Hall of Fame
- **Skills** — categorized cards with animated progress indicators
- **Certifications & Recognition** — elegant recognition cards
- **Contact** — split layout, channel cards, form with success animation
- **Footer** — tagline, socials, copyright, back-to-top
- Floating social icons · smooth scrolling · hover lift + glow micro-interactions

## Folder Structure

```
portfolio/
├── app/                  # Next.js app router (layout, page, globals.css, favicon)
├── components/           # React/TS section components
├── data/                 # Content: profile, skills, experience, projects, education
├── designs/              # Design deliverables (wireframes, mockups, ui-kit, branding)
│   ├── mockups/home-page.html   # Mid-fidelity mockup (open in a browser)
│   ├── ui-kit/UI-Kit.md
│   └── branding/{logo,colors,typography}
├── assets/               # Reference asset structure (README per folder)
│   ├── css/ js/ images/{profile,projects,icons,backgrounds}/ fonts/ files/
├── public/               # Runtime-served assets (images, files/resume.pdf)
├── README.md
└── package.json
```

> The assignment's reference structure lists a root `index.html` and `assets/css`, `assets/js`.
> This project intentionally follows the equivalent **modern Next.js structure** (the reference
> is "reference only"). Data lives in `data/*.json`, design work in `designs/`, and assets in
> `public/` (mirrored under `assets/` with per-folder READMEs).

## Content sources

Content lives in `data/*.json` and the section components. Most text follows the provided
prompt (LinkedIn-derived experience, WebSec Hall of Fame, contact channels).

## Placeholders to replace before publishing

- `public/images/profile/avatar.svg` → professional headshot (update `components/Hero.tsx`)
- `public/files/resume.pdf` → the real resume (a generated placeholder ships now)
- `data/projects.json` + `components/Certifications.tsx` → real WebSec Hall of Fame URL (currently `https://www.websec.nl/`)
- `data/profile.json` → `stats` numbers (currently indicative estimates)
- `app/layout.tsx` → `metadataBase` URL for the deployed domain

## Mid-Fidelity Design

See `designs/` — the Home page mid-fidelity mockup is at
[`designs/mockups/home-page.html`](designs/mockups/home-page.html), plus UI kit and branding docs.
# portfolio_subhakrit_rajbhandari_25_web_designing_ncmt
