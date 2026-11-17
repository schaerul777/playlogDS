# Playlog brand rules for the UI library

Condensed from the Playlog Design System and the 2026 Brand Identity Guideline. Values live in `tokens.json` and `tokens.css`. This file explains how to use them.

## Brand character

- **Clear**: structure first, messages land without ambiguity.
- **Credible**: show sources, periods and methodology next to numbers.
- **Confident**: lead with the finding, then the evidence.

When a design choice is unclear, pick the option that makes the data easier to read and the next decision easier to take. Avoid decoration, extra color, and motion that doesn't explain anything.

## shadcn token mapping

Playlog token names differ from shadcn's. Use this table. Tokens with no shadcn equivalent are prefixed `--pl-` in `tokens.css` and exposed to Tailwind without the prefix (for example `bg-surface-brand`).

| Playlog token | shadcn variable | Notes |
|---|---|---|
| `bg` | `--background` | Light: warm off-white. Dark: deep navy. |
| `ink` | `--foreground` | Body text. |
| `surface` | `--card` | Cards, panels, inputs. Card text uses `--card-foreground`. |
| `surface-raised` | `--popover` | Menus, popovers, dialogs, with the overlay shadow. |
| `primary` / `on-primary` | `--primary` / `--primary-foreground` | Light: Dark Blue + white. Dark: Green + Dark Blue. |
| `surface-sunken` | `--muted` | Table headers, inset areas. Also the sidebar ground. |
| `ink-muted` | `--muted-foreground` | Secondary and helper text. |
| `surface-hover` / `ink-heading` | `--accent` / `--accent-foreground` | shadcn "accent" is the hover fill. It is NOT Playlog Green. |
| `danger-strong` / `on-danger` | `--destructive` / `--destructive-foreground` | Destructive button fill. |
| `border` | `--border` | Hairlines, card outlines. |
| `border-strong` | `--input` | Input, select and checkbox borders. |
| `focus-ring` | `--ring` | 2px solid, 2px offset. |
| `accent` (Playlog Green) | `--pl-brand-accent` | Active tab bar, progress, supergraphic offset. Decorative only. |
| `ink-heading` | `--pl-ink-heading` | Also available by its own name for titles and KPI values. |

Assumptions to confirm: `--secondary` uses `surface-hover` with `ink-heading` text, because the guide defines no separate secondary button. Sidebar tokens map from `surface-sunken`, `surface-selected` and `primary`.

## Color rules

- Primary colors dominate. Secondary colors (teal, red, orange, purple, yellow) are for illustration, diagrams, data and product lines. Never the main color of a screen.
- Never set text in Playlog Green, Playlog Blue or the secondary colors on white or light grey. They fail contrast. Green and Blue work as text only on `surface-brand`.
- Use the `*-text` variants for words (`success-text`, `warning-text`, `danger-text`, `info-text`) and `*-surface` for alert and badge grounds.
- Status is always a word or an icon plus color, never color alone.
- Brand bands (hero, footer, report covers) use `surface-brand` with `ink-on-brand`. Emphasize one word with `ink-on-brand-accent`.
- Statement blocks use `surface-accent` with `ink-on-accent`. One per page at most.
- Charts: `chart-1` to `chart-8` in order. Most charts need two or three series. Label series directly. Product-line breakdowns use `line-*` colors so a channel keeps one color everywhere.

## Typography

- **Reddit Sans** is the only UI and editorial face.
- **Funnel Display** is the logotype face. Use it only inside the logo and product-line lockups. Never for UI or body text.
- App: `h1` page title (32/40, 800), `h2` section (24/32, 700), `h3` card title (16/24, 700), `body-sm` for tables, menus and fields (14/20), `label` for form labels and buttons (14/20, 600), `caption` for meta (12/16, 500).
- Website: `display`, `headline`, `subheadline`, `body-lg`, `body`, `keyword`, `eyebrow`.
- Stat values use `kpi` / `kpi-sm` with tabular numerals (`font-variant-numeric: tabular-nums`).
- Casing: headlines of 1 to 3 words use Title Case. Longer headlines use Sentence case. Buttons, tabs, menu items and labels use Sentence case.

## Shape, spacing, elevation

- Playlog shapes are square-cut. Brand blocks, hero bands and covers use radius 0.
- Product controls: radius 4px for buttons, inputs, selects and menus. Radius 8px for app cards and dialogs. Radius 2px for badges and checkboxes. Full radius only for toggle tracks and avatars.
- Spacing is a 4px base. Cards pad 24px (16px in dense app panels).
- Control height: 40px default, 32px small.
- Cards are flat: `surface` plus a 1px `border`. Only floating layers (menus, dialogs) take the overlay shadow.
- The hard Green offset shadow (`--pl-shadow-offset`) is for marketing feature cards only.

## States and motion

- Motion is functional only: 120 to 200ms ease-out for hover, focus and menus. No bouncing or parallax.
- Hover: `primary-hover` on primary buttons, `surface-hover` on rows, nav items and quiet buttons.
- Selected: `surface-selected` plus `ink-heading`. Active tabs get a 2px underline. The selected sidebar item gets a 3px accent marker.
- Focus: 2px solid `focus-ring` with a 2px offset on every interactive element. Never remove it.
- Disabled: 40% opacity, no pointer events.

## Icons

- Use the Playlog icon set (48 icons, 2pt stroke, rounded joins). Default size 20px in UI, 24px in navigation and empty states.
- Color follows text: `ink-muted` beside labels, `ink-heading` for emphasis, `on-primary` inside primary buttons.
- Pair icons with a text label, except universally known actions (close, search), which need an `aria-label`.
- Missing a glyph? Draw it on the same 24px grid with a 2pt stroke. Do not mix in another icon library.

## Content

- Voice: plain, assured, analytical. Short declarative sentences. Address the user as "you".
- Numbers always carry unit, period and source, for example "Rp 12,4 M · Q1–Q3 2025 · 25 cities".
- UI ships in English and Bahasa Indonesia. Use Indonesian number formatting in Indonesian contexts (`1.284`, `12,4`).
- No emoji in product UI or headlines.

## Components in scope for this library

Build these as shadcn components: Button, Input (TextField), Select, Checkbox, Switch (Toggle), Badge, Tabs, Alert, Card, StatCard, DataTable, BarChart, Sidebar.

Out of scope for now (marketing, brand and document pieces): TopNav, Hero, FeatureCard, Footer, Logo, ProductLineLockup, Supergraphic, Highlight, Slide, ReportCover, ReportPage, SocialPost, Letterhead.

## Fonts

`tokens.css` expects these files under `/fonts/` (the app's public folder):

- `RedditSans-Variable.woff2`
- `RedditSans-Variable-Italic.woff2`
- `FunnelDisplay-Regular.woff2`
- `FunnelDisplay-Medium.woff2`
