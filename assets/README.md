# Assets

Static asset folders (reference structure).

**How this maps to the Next.js runtime app:**
- Next.js serves public assets from `public/` at the site root (e.g. `/images/profile/avatar.svg`, `/files/resume.pdf`).
- This `assets/` folder mirrors the reference structure for the assignment. Prefer adding runtime assets under `public/` and keep documentation/notes here.

| Folder | Purpose |
| --- | --- |
| `css/` | (Runtime styles live in `app/globals.css` under Tailwind CSS) |
| `js/` | (Runtime scripts are bundled by Next.js; source lives in `components/`) |
| `images/profile/` | Profile photo / avatar |
| `images/projects/` | Project & engagement imagery |
| `images/icons/` | Iconography |
| `images/backgrounds/` | Background textures |
| `fonts/` | Font files (fonts are auto-served via `next/font`; add local files here if needed) |
| `files/resume.pdf` | Resume for download (mirrored to `public/files/resume.pdf`) |
