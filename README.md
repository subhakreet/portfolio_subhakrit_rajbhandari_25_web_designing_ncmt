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

```
index.html                 # main page
assets/
  css/style.css            # all styling
  js/main.js               # interactions (loader, reveals, cursor, particles, contact form)
  images/                  # profile, icons, backgrounds
data/                      # content as JSON (profile, skills, experience, projects, education)
designs/                   # design deliverables (wireframes, mockups, ui-kit, branding)
favicon.ico / favicon.svg
```

## Run

No build needed. Just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000
