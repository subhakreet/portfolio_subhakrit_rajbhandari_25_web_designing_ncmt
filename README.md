# Subhakrit Rajbhandari — Portfolio

Premium, modern, minimal portfolio for a **Cybersecurity Penetration Tester**.
Dark, elegant, security-focused aesthetic — charcoal base, soft blue/cyan accents,
subtle cyber-inspired details (no "hacker clichés").

## Run

A fully static website — no build step, no dependencies.

```bash
# just open it
open index.html

# or serve the folder
python3 -m http.server 8000   # http://localhost:8000
```

## Structure

```
index.html              # single-page site
favicon.ico / .svg      # favicons
assets/
  css/style.css         # full design system
  js/main.js            # interactions (loader, reveals, cursor, particles, form)
  images/               # avatar, icons, backgrounds
data/                   # content JSONs (profile, skills, experience, projects, education)
designs/                # design deliverables (wireframes, mockups, ui-kit, branding)
```

Fonts: Manrope + Geist Mono (Google Fonts CDN). Fully responsive, dark by default.
