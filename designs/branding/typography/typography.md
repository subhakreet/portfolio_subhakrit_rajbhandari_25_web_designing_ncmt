# Typography

## Font stack

| Role | Family | Source |
| --- | --- | --- |
| Display & body | **Manrope** | Google Fonts (via `next/font`) |
| Labels, code accents, tags | **Geist Mono** | Google Fonts (via `next/font`) |

Both fonts are self-hosted at build time by Next.js — no runtime requests, no layout shift.

## Type scale

| Token | Size / Line-height | Weight | Usage |
| --- | --- | --- | --- |
| Display | 60px / 1.08 | 600 | Hero name |
| H1 section | 40px / 1.15 | 600 | Section titles |
| H3 | 18–20px / 1.3 | 600 | Card titles |
| Body large | 18px / 1.7 | 400 | Hero/About intro |
| Body | 15–16px / 1.6 | 400 | Default text |
| Caption | 12–13px / 1.5 | 400 | Muted copy |
| Mono label | 10–11px / 1.4 | 500 | Eyebrows, tags, tracking `0.3em` uppercase |

## Spacing

- Section padding: `96–128px` vertical (`py-24` / `py-32`)
- Max content width: `1152px` (`max-w-6xl`)
- Card padding: `20–32px`
- Large whitespace between groups of cards: `48px` (`mt-12`)

## Readability

- Body text color `slate-400` on `ink-900` → contrast ≈ 7:1 (WCAG AA/AAA)
- Headings `slate-50`/`slate-100` → contrast > 12:1
- Min tap/click target sizes 40px+
