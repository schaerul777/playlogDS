# Component specs (visual reference)

Source: the component styles in the Playlog Design System (claude.ai artifact). This file lists the sizes, colors and states for the components in scope, written with our shadcn token names (see the mapping table in `BRAND.md`).

How to use:
- These specs are authoritative for the listed values. Check here before asking a brand question.
- shadcn components have parts the Playlog specs don't cover (extra Button sizes, Switch `sm`, Select popup, Card `sm`). For those, extrapolate on the 4px grid, keep to the tokens, and note the choice in your summary.
- Spacing values are px. "Tailwind steps" is fine (for example 12px = `px-3`).

## Shared rules

- Focus: 2px solid `--ring`, 2px offset, on every interactive element. For controls with a wrapper (Input, Select) the ring goes on the wrapper when it has focus within.
- Disabled: opacity 40%, no pointer events.
- Transitions: 150ms ease-out for background, border and color.
- Font: Reddit Sans. Label text 14/20 semibold unless noted.

## Button

| Playlog variant | shadcn variant | Fill | Text | Border | Hover |
|---|---|---|---|---|---|
| primary | `default` | `primary` | `primary-foreground` | none | `pl-primary-hover` |
| secondary | `outline` | `card` (surface) | `pl-ink-heading` | 1px `input` | `accent` (surface-hover) |
| quiet | `ghost` | transparent | `pl-ink-heading` | none | `accent` (surface-hover) |
| danger | `destructive` | `destructive` | `destructive-foreground` | none | slightly darker (artifact: brightness 1.08) |
| accent | (Playlog-only, optional) | `pl-brand-accent` | `pl-ink-on-accent` | none | `--pl-green-80` |

- Height 40 (sm 32, lg 48). Side padding 16 (sm 12, lg 24). Gap between icon and label 8 (sm 6).
- Radius 4. Border 1px (transparent when there is no visible border).
- Text 14/20 semibold (sm 13px, lg 16px). Icon-only: square, width equals height.
- `secondary` and `link` have no Playlog equivalent. Keep shadcn's `secondary` as surface-hover with `pl-ink-heading` text.

## Input and Select

- Wrapper: height 40 (sm 32), padding 0 12, background `card`, border 1px `input`, radius 4, gap 8.
- Text 14/20 regular, color `foreground`. Placeholder `muted-foreground`.
- Label above: 14/20 semibold `foreground`. Gap between label, control and hint: 6.
- Hint below: 12/16 medium `muted-foreground`. Error hint: `pl-danger-text`, and the border becomes `pl-danger-text`. The input fill stays `card`.
- Select: same as Input, with a chevron on the right (10px from the edge) and 36px right padding. The popup uses `popover` (surface-raised), radius 4, the overlay shadow, and `accent` (surface-hover) on the highlighted item.

## Checkbox

- Box 18×18, radius 2, border 1.5px `input`, background `card`. Box sits 1px below the label's first line.
- Checked: background and border `primary`, check mark `primary-foreground`.
- Gap between box and label 10. Label 14/20 `foreground`. Optional description 12/16 `muted-foreground`.

## Switch (Toggle)

- Track 36×20, fully rounded. Thumb 16×16, 2px inset, fully rounded. Thumb travels 16px.
- Off: track `input`, thumb `card`. On: track `primary`, thumb `primary-foreground`.
- Gap between track and label 10. Label 14/20 `foreground`.
- `sm` size is not in the Playlog spec. Use track 28×16, thumb 12, 2px inset.

## Badge

- Height 22, padding 0 8, radius 2, gap 6. Text 12/16 semibold, no wrapping.
- Neutral: `muted` fill, `foreground` text, inset 1px `border`.
- Brand: `pl-surface-brand` fill, `pl-ink-on-brand` text. Accent: `pl-surface-accent` fill, `pl-ink-on-accent` text.
- Info, success, warning, danger: `pl-*-surface` fill with `pl-*-text` text.
- Optional status dot: 6px circle in the text color.

## Tabs

- Tab row: gap 24, 1px `border` underneath the row.
- Tab: padding 10 0 12, 14/20 semibold. Inactive text `muted-foreground`. Hover and active text `pl-ink-heading`.
- Active underline: 2px, color `pl-ink-heading` (NOT Playlog Green), sitting on the row border (bottom -1px).
- Optional count pill: 12/16, padding 0 6, radius 2, `muted` fill, `muted-foreground` text. On the active tab: `pl-surface-selected` fill, `pl-ink-heading` text.
- Labels: one or two words, Title Case.

## Alert

- Padding 12 16, gap 12, radius 4. Text 14/20. Title bold.
- Info, success, warning, danger: `pl-*-surface` fill with `pl-*-text` text. Icon aligned to the top.
- Neutral alert: text `foreground`.

## Card

- Fill `card`, border 1px `border`, radius 8, flat (no shadow).
- Header: padding 16 24 0, title and action side by side with gap 16.
- Title 16/24 bold, `pl-ink-heading`. Description 12/16 medium `muted-foreground`, 2px below the title.
- Content: padding 16 24 24. Header actions: gap 8.

## StatCard

- Fill `card`, border 1px `border`, radius 8, padding 16 24, gap 8.
- Label 14/20 semibold `muted-foreground`. Optional icon tile 32×32, radius 4, `accent` fill, `pl-ink-heading` icon.
- Value: 36/40 extra-bold, `pl-ink-heading`, tabular numbers, letter spacing -1%.
- Footer: 12/16 medium `muted-foreground`. Delta: bold, `pl-success-text` for good and `pl-danger-text` for bad.

## DataTable

- Wrapper: border 1px `border`, radius 8, fill `card`, horizontal scroll.
- Text 14/20 `foreground`. Caption: padding 12 16, bold, `pl-ink-heading`.
- Header cells: padding 10 16, `muted` fill, `muted-foreground` text, 12/16 semibold, 1px `border` below, no wrapping.
- Body cells: padding 12 16 (dense: 8 16), 1px `border` between rows, none under the last row. Row hover: `accent` fill.
- Numeric columns: right-aligned with tabular numbers.

## BarChart

- Series colors `chart-1` to `chart-8` in order. Gridlines 1px `pl-chart-grid`.
- Axis labels 12px medium `muted-foreground`.
- Legend: 12/16 medium `muted-foreground`, gap 16 between items, 12 below the legend. Swatch 10×10, radius 2, gap 6 to its label.

## Sidebar

- Width 248, fill `sidebar` (surface-sunken), 1px `sidebar-border` on the right, padding 24 12, gap 24 between sections.
- Section title: 12/16 semibold, uppercase, letter spacing 4%, `muted-foreground`, padding 0 12 8.
- Nav item: height 40, padding 0 12, gap 12, radius 4, 14/20 medium, `foreground`. Icon `muted-foreground`. Hover: `accent` (surface-hover).
- Active item: `pl-surface-selected` fill, `pl-ink-heading` text, bold, icon `pl-ink-heading`, plus a 3px `pl-brand-accent` marker on the sidebar's left edge (8px in from the item's top and bottom).
- Count badge: pushed to the right, 12/16 bold, padding 0 6, radius 2, `primary` fill, `primary-foreground` text.

## Menus, popovers and dialogs (when added)

- Fill `popover`, radius 4 for menus and 8 for dialogs, the overlay shadow (`--pl-shadow-overlay`).
