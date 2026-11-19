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
| `accent` (Playlog Green) | `--pl-brand-accent` | Progress, supergraphic offset. Decorative only. |
| `ink-heading` | `--pl-ink-heading` | Also available by its own name for titles and KPI values. |

Assumptions to confirm: `--secondary` uses `surface-hover` with `ink-heading` text, because the guide defines no separate secondary button. Sidebar tokens map from `surface-sunken`, `surface-selected` and `primary`.

## Color rules

- Primary colors dominate. Secondary colors (teal, red, orange, purple, yellow) are for illustration, diagrams, data and product lines. Never the main color of a screen.
- Never set text in Playlog Green, Playlog Blue or the secondary colors on white or light grey. They fail contrast. Green and Blue work as text only on `surface-brand`.
- Use the `*-text` variants for words (`success-text`, `warning-text`, `danger-text`, `info-text`) and `*-surface` for alert and badge grounds.
- Status is always a word or an icon plus color, never color alone.
- Brand bands (hero, footer, report covers) use `surface-brand` with `ink-on-brand`. Emphasize one word with `ink-on-brand-accent`.
- Statement blocks use `surface-accent` with `ink-on-accent`. One per page at most.
- Code syntax colours: `syntax-keyword`, `syntax-string`, `syntax-number`, `syntax-comment` (`--pl-syntax-*`), aliased to `info-text`, `success-text`, `warning-text` and `muted-foreground` in light and dark; everything else in code is `foreground`. They are for code only, never for status or text elsewhere.
- Charts: `chart-1` to `chart-8` in order. Most charts need two or three series. Label series directly. Product-line breakdowns use `line-*` colors so a channel keeps one color everywhere.

## Typography

- **Reddit Sans** is the only UI and editorial face.
- **Reddit Mono** is for code only (Code Block, inline code): the one stated exception to "Reddit Sans only" (`--font-mono`; the system mono stack is the fallback).
- **Funnel Display** is the logotype face. Use it only inside the logo and product-line lockups. Never for UI or body text.
- App: `h1` page title (32/40, 800), `h2` section (24/32, 700), `h3` card title (16/24, 700), `body-sm` for tables, menus and fields (14/20), `label` for form labels and buttons (14/20, 600), `label-sm` for small buttons (13/16, 600), `caption` for meta (12/16, 500).
- Website: `display`, `headline`, `subheadline`, `body-lg`, `body`, `keyword`, `eyebrow`.
- Stat values use `kpi` / `kpi-sm` with tabular numerals (`font-variant-numeric: tabular-nums`). `kpi` carries -1% letter spacing (`--text-kpi--letter-spacing`).
- Casing: headlines of 1 to 3 words use Title Case. Longer headlines use Sentence case. Buttons, tabs, menu items and labels use Sentence case.

## Shape, spacing, elevation

- Playlog shapes are square-cut. Brand blocks, hero bands and covers use radius 0.
- Product controls: radius 4px for buttons, inputs, selects and menus. Radius 8px for app cards and dialogs. Radius 2px for badges and checkboxes. Full radius only for toggle tracks, avatars and radio buttons (the circle is how a radio is recognised).
- Checkboxes use a 1.5px border (`--pl-checkbox-border-width`); other controls use 1px (`--pl-border-width`).
- Spacing is a 4px base. Cards pad 24px (16px in dense app panels).
- Control height: 40px default, 32px small.
- Cards are flat: `surface` plus a 1px `border` (`--pl-border-width`). Only floating layers (menus, dialogs) take the overlay shadow.
- Modal sheets and dialogs dim the page with `--pl-scrim` (Dark Blue at 24% in light mode, black at 60% in dark mode), no blur.
- The hard Green offset shadow (`--pl-shadow-offset`) is for marketing feature cards only.

## States and motion

- Motion is functional only: 120 to 200ms ease-out for hover, focus and menus. No bouncing or parallax. Durations: `--pl-duration-fast` (150ms) for hover, focus and colour changes; `--pl-duration-slow` (200ms) for panels (Sheet, Sidebar collapse).
- Hover: `primary-hover` on primary buttons, `destructive-hover` (`--pl-destructive-hover`, `destructive` at 90%) on destructive buttons, `surface-hover` on rows, nav items and quiet buttons.
- Selected: `surface-selected` plus `ink-heading`. Active tabs get a 2px `ink-heading` underline (not Green, which fails contrast on light grounds). The selected sidebar item gets a 3px accent marker.
- Focus: 2px solid `focus-ring` with a 2px offset on every interactive element (`--pl-focus-ring-width`, `--pl-focus-ring-offset`). Never remove it.
- Disabled: 40% opacity (`--pl-opacity-disabled`), no pointer events.
- Invalid: border and message in `danger-text` (not `destructive`, which is the destructive button fill).
- Separation ring: overlapping avatars and the avatar status dot sit in a 2px ring of the page colour (`--pl-ring-separator-width`).

## Figma-only variables and styles

These exist in the Figma library only. They are not in `tokens.css` and need no `--pl-` variable, because CSS gets the same values from Tailwind or from an existing token. Each Figma variable's code syntax is the CSS it resolves to. Values are listed under `figmaOnly` in `tokens.json`.

- Spacing steps from the Tailwind scale (code syntax `calc(var(--spacing) * n)`, or `1px`):
  - `spacing-px` (1px): Switch inset, vertical Tabs trigger.
  - `spacing-0-5` (2px), `spacing-1-5` (6px), `spacing-2-5` (10px): small paddings and gaps, the tab underline, the line-tab top padding, chart legend swatches.
  - `spacing-0-75` (3px): the active Sidebar nav item marker.
  - `spacing-3` (12px), `spacing-3-5` (14px), `spacing-4` (16px): icon sizes, the checkbox check mark.
  - `spacing-4-5` (18px): Checkbox box. `spacing-5` (20px): Switch height. `spacing-5-5` (22px): Badge height.
  - `spacing-6` (24px), `spacing-7` (28px), `spacing-9` (36px), `spacing-12` (48px): Button `xs` / `lg` heights, Switch widths, Select right padding, nav icons, chart tick labels.
  - `spacing-8` (32px): StatCard icon tile.
  - `spacing-36` (144px): Select popup and chart tooltip minimum width.
  - `spacing-56` (224px): Sidebar nav item width (248px sidebar minus 12px padding each side) and the StatCard drawing width.
  - `spacing-160` (640px): demo width of the Table, TableRow and BarChart drawings (full width in code).
  - `spacing-72` (288px): Popover default width (`w-72`). `spacing-90` (360px): Toast width.
  - `spacing-10` (40px): Avatar `lg`. `spacing-20` (80px): Textarea minimum height.
- Container widths from the Tailwind scale (code syntax `var(--container-*)`): `container-xs` (320px, Tooltip max width and Alert Dialog `sm`), `container-sm` (384px, Sheet left/right), `container-md` (448px, Alert Dialog default), `container-lg` (512px, Dialog max width).
- `pl-shadow-overlay-color`: the colour of `--pl-shadow-overlay`, split out so the `pl-shadow-overlay` effect style can switch with the mode. Light `#004d9f` at 14%, Dark black at 45%.
- Text styles for Tailwind class combinations:
  - `caption-semibold` (12/16, 600): `text-caption font-semibold` (Badge, Button `xs`, Table header).
  - `body-semibold` (16/24, 600): `text-body font-semibold` (Button `lg`).
  - `caption-bold` (12/16, 700): `text-caption font-bold` (StatCard delta, Sidebar count badge).
  - `body-sm-medium` (14/20, 500): `text-body-sm font-medium` (Sidebar nav item).
  - `body-sm-bold` (14/20, 700): `text-body-sm font-bold` (Alert title, Table caption, active nav item).
  - `eyebrow-uppercase` (12/16, 600, 4%, uppercase): `text-eyebrow uppercase` (Sidebar section title).
- The `kpi` text style in Figma carries -1% letter spacing, the same as `--text-kpi--letter-spacing` in code and `kpi` in `tokens.json`. This is a token, not a Figma-only value.

If one of these becomes a brand decision, promote it to a `--pl-` token in `tokens.css` and remove it from this list.

## Icons

- Icons come from the `Icon` component only (`@workspace/ui/icons/icon`, `<Icon name="…" />`). No other icon library.
- The Playlog set is 48 icons on a 24px grid, drawn as filled outline shapes (`fill="currentColor"`, `fill-rule="evenodd"`). Path data lives in `packages/ui/src/icons/icon-data.ts`, generated from the design system; do not edit it by hand.
- Five stroke glyphs fill gaps in the set (check, chevron-down, chevron-right, close, search): 2px stroke, round caps and joins. Approved extra stroke glyphs in the same style live in `packages/ui/src/icons/extra-icons.ts` (sidebar, plus, trash, more, warning, alert-circle, info, users, loader, and for AI Elements stop, thumbs-down, terminal, arrow-up-right).
- Default size 20px in UI, 24px in navigation and empty states.
- Color follows text: `ink-muted` beside labels, `ink-heading` for emphasis, `on-primary` inside primary buttons.
- Pair icons with a text label, except universally known actions (close, search), which need an `aria-label`.
- Missing a glyph? Ask first, then draw it on the same 24px grid as a 2px round stroke and add it to `extra-icons.ts`. Do not mix in another icon library.

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
- `RedditMono-Variable.woff2` (code only)
