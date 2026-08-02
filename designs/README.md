# Designs

Design deliverables for the Subhakrit Rajbhandari portfolio — dark, premium, minimal cybersecurity aesthetic.

## Contents

| Folder | Purpose |
| --- | --- |
| `wireframes/` | Low-fidelity structural layout notes (block-level). |
| `mockups/` | **Mid-fidelity mockup of the Home page** — open [`mockups/home-page.html`](mockups/home-page.html) in a browser. |
| `ui-kit/` | Reusable design tokens, component specs, and patterns. |
| `figma-exports/` | Exports/links for the Figma source (when synced). |
| `references/` | Inspiration & reference links. |
| `branding/` | Logo, color palette, and typography system. |

## Mapping to the built site

The mid-fidelity mockup maps 1:1 to the implemented Next.js sections:

| Mockup block | Implemented section |
| --- | --- |
| Navbar + scroll progress | `components/Navbar.tsx`, `components/ScrollProgress.tsx` |
| Hero | `components/Hero.tsx` |
| About | `components/About.tsx` |
| Education | `components/Education.tsx` |
| Experience (timeline) | `components/Experience.tsx` |
| Core Expertise (cards) | `components/Expertise.tsx` |
| Featured Projects | `components/Highlights.tsx` |
| Skills (progress) | `components/Skills.tsx` |
| Certifications & Recognition | `components/Certifications.tsx` |
| Contact (split + form) | `components/Contact.tsx` |
| Footer | `components/Footer.tsx` |

> **Note on the design tool:** the assignment allows Figma *or a similar UI design tool*.
> This repo ships the mid-fidelity mockup as a self-contained HTML file so it can be reviewed
> directly in a browser; it can also be imported into Figma/Excalidraw as reference. A Figma
> source can be added under `figma-exports/` and linked here later.
