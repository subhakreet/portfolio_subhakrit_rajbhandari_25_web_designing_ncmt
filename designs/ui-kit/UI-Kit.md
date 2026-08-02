# UI Kit

Shared design tokens and component specs used across the portfolio.

## Color palette

| Token | Hex | Usage |
| --- | --- | --- |
| `ink-950` | `#06090d` | Deepest background / footer |
| `ink-900` | `#0b0f14` | Primary page background |
| `ink-850` | `#0e141c` | Card surface (gradient) |
| `ink-800` | `#111827` | Elevated surfaces |
| `accent-300` | `#7dd3fc` | Text on accent / highlights |
| `accent-400` | `#38bdf8` | Primary accent (soft blue) |
| `accent-500` | `#0ea5e9` | Buttons, links, active states |
| `accent-600` | `#0284c7` | Button gradient end |
| `glow` | `#22d3ee` | Cyan glow / gradients |

Full palette, including neutrals and semantic colors, lives in `branding/colors/palette.md`.

## Typography

| Role | Family | Weight / Size |
| --- | --- | --- |
| Display / headings | Manrope | Semibold 600 · 30–60px |
| Body | Manrope | Regular 400 · 14–18px |
| Labels / code accents | Geist Mono | 10–13px, uppercase tracking |

## Radius & elevation

- Cards: `12px` / `16px` / `24px` (rounded-xl / 2xl / 3xl)
- Borders: `1px` at `rgba(255,255,255,0.07–0.1)`
- Shadows: `--shadow-soft`, `--shadow-glow`, `--shadow-card` (see `app/globals.css`)

## Glassmorphism (used sparingly)

`.glass`, `.glass-strong` — backdrop blur + translucent gradient + hairline border.
Applied only to the navbar, floating socials, and profile badges.

## Buttons

| Variant | Style |
| --- | --- |
| Primary | Gradient `accent-500 → accent-600`, `shadow-glow`, hover lift `-translate-y-0.5` |
| Outline | `1px` white/10 border, hover accent border |
| Ghost | Muted text, hover accent |

## Motion

- Reveal: fade + rise (`opacity 0 → 1`, `y 28 → 0`), 0.7s, cubic-bezier `(0.22,1,0.36,1)`
- Stagger: parent `staggerChildren` 0.09s
- Hover: `-translate-y` lift + soft glow (`--shadow-glow`)
- Counters: spring `{ stiffness: 55, damping: 22 }`
- Skill bars: width 0 → level% on scroll into view
