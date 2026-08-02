# Subhakrit Rajbhandari — Portfolio

A single-page portfolio site for a cybersecurity penetration tester. Dark theme, minimal and clean, with a subtle cyber/terminal feel.

## Tech Stack

- Plain HTML + CSS + JavaScript — no frameworks, no build step
- Content loaded from JSON files in `/data`
- Google Fonts (CDN)
- Fully static, host it anywhere (GitHub Pages, Netlify, etc.)

## Design

- **Design style:** Modern minimal, dark, with a subtle terminal/cyber aesthetic (nothing too "hacker movie")
- **Theme:** Charcoal dark base with soft blue/cyan accents
- **Fonts:** Manrope (body/headings) + Geist Mono (code/terminal bits)

## Folder Structure

```text
.
├── index.html                          # main page
├── CNAME                               # custom domain → subhakrit.com.np
├── favicon.ico                         # favicon
├── favicon.svg                         # favicon (vector)
│
├── assets/
│   ├── css/
│   │   └── style.css                   # all styling
│   ├── js/
│   │   └── main.js                     # interactions (loader, reveals, cursor, particles, contact form)
│   ├── fonts/                          # local fonts
│   └── images/
│       ├── profile/
│       │   └── avatar.svg              # profile picture
│       ├── icons/                      # icons
│       ├── backgrounds/                # background graphics
│       └── projects/                   # project screenshots
│
├── data/
│   ├── profile.json                    # name, headline, intro, links, stats
│   ├── skills.json                     # skill categories & levels
│   ├── experience.json                 # roles, highlights, responsibilities
│   ├── projects.json                   # featured projects
│   └── education.json                  # education stages
│
└── designs/                            # design deliverables
    ├── branding/
    │   ├── colors/
    │   │   └── palette.md              # color palette
    │   ├── typography/
    │   │   └── typography.md           # font system
    │   └── logo/
    │       └── logo.md                 # logo specs
    ├── ui-kit/
    │   └── UI-Kit.md                   # UI kit
    ├── wireframes/
    ├── mockups/
    │   └── home-page.html              # home page mockup
    ├── figma-exports/
    └── references/
```

## Live Site

Hosted on GitHub Pages and live at **http://subhakrit.com.np**

No build needed — fully static, just open `index.html`.
