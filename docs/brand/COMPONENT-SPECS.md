# Component specs (visual reference)

Source: the component styles in the Playlog Design System (claude.ai artifact). This file lists the sizes, colors and states for the components in scope, written with our shadcn token names (see the mapping table in `BRAND.md`).

How to use:
- These specs are authoritative for the listed values. Check here before asking a brand question.
- shadcn components have parts the Playlog specs don't cover (extra Button sizes, Switch `sm`, Select popup, Card `sm`). For those, extrapolate on the 4px grid, keep to the tokens, and note the choice in your summary.
- Spacing values are px. "Tailwind steps" is fine (for example 12px = `px-3`).

## Shared rules

- Focus: 2px solid `--ring`, 2px offset, on every interactive element. For controls with a wrapper (Input, Select) the ring goes on the wrapper when it has focus within.
- Disabled: opacity 40%, no pointer events.
- Transitions: 150ms (`--pl-duration-fast`) ease-out for background, border and color.
- Font: Reddit Sans. Label text 14/20 semibold unless noted.

## Button

| Playlog variant | shadcn variant | Fill | Text | Border | Hover |
|---|---|---|---|---|---|
| primary | `default` | `primary` | `primary-foreground` | none | `pl-primary-hover` |
| secondary | `outline` | `card` (surface) | `pl-ink-heading` | 1px `input` | `accent` (surface-hover) |
| quiet | `ghost` | transparent | `pl-ink-heading` | none | `accent` (surface-hover) |
| danger | `destructive` | `destructive` | `destructive-foreground` | none | `pl-destructive-hover` (`destructive` at 90%; artifact: brightness 1.08) |
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

## Overlays: shared rules

Applies to Sheet, Dialog, Alert Dialog, Dropdown Menu, Popover, Tooltip and Toast. Values marked "agreed" were proposed for this library and approved; they are not in the Playlog artifact.

- Fill `popover` (surface-raised), text `popover-foreground`, the overlay shadow (`--pl-shadow-overlay`). No border on floating layers (agreed).
- Radius: 4 for anything anchored to a trigger (menus, popovers, tooltips, toasts); 8 for centred dialogs; 0 for edge-attached sheets.
- Layers that dim the page use `--pl-scrim`, no blur.
- Motion: ease-out. Fades use `--pl-duration-fast` (150ms). Panels that slide from an edge use `--pl-duration-slow` (200ms). No zoom.
- Focus: the ring goes on controls inside the overlay, not on the panel. Base UI behavior is kept: focus trap in modal layers, Escape to close, focus returns to the trigger.
- Close buttons: Button `ghost` `icon-sm` (32) with the `close` icon, 16 from the top and right.

## Sheet

- Edge-attached panel, radius 0. Width 75% on small screens, max 384 (`max-w-sm`) from `sm` up (agreed). Top and bottom sheets are full width, height auto.
- Header: padding 24 24 0. Title 16/24 bold `pl-ink-heading`. Description 14/20 `muted-foreground`, 4 below the title (agreed).
- Body: padding 0 24. Footer: padding 0 24 24, buttons in a row aligned right, gap 8; stacked full width below `sm`. Gap 16 between header, body and footer (agreed).
- Motion: scrim fades (fast). The panel slides in from its edge by its full size (slow).
- Escape and a click on the scrim close it.

## Dialog

- Centred. Width: full width minus a 16 gutter on each side, max 512 (`max-w-lg`) (agreed). Radius 8. Padding 24, gap 16 between header, body and footer (agreed).
- Header and footer: as Sheet (title 16/24 bold `pl-ink-heading`, description 14/20 `muted-foreground` 4 below; footer row aligned right with gap 8, stacked below `sm`).
- Motion: scrim and panel fade (fast). No zoom.
- Escape and an outside click close it. Focus is trapped; the first focusable element gets focus.

## Alert Dialog

- Same panel as Dialog. Widths: `sm` 320, `default` 448 (agreed). No close button.
- Text left-aligned at every width (agreed).
- Footer: Cancel is Button `outline`. The action is Button `default`, or `destructive` when it destroys data; everything else stays neutral (agreed). `sm`: the two buttons share the row in equal columns.
- Optional media tile: 32×32, radius 4, `accent` fill, 20px `pl-ink-heading` icon (as the StatCard icon tile).
- An outside click does not close it. Escape cancels.

## Dropdown Menu

- Popup: as the Select popup. Radius 4, padding 4, min width 144, height limited to the available space, 4 from the trigger. Fade (fast), no zoom or slide.
- Item: height 32 (padding 6 8), radius 2, gap 8, 14/20 `foreground`, icons 16 `muted-foreground`. Highlight `accent` with `accent-foreground` (icons too). Disabled 40%.
- Destructive item: `pl-danger-text`, highlight `pl-danger-surface`.
- Checkbox and radio items: the `check` icon 8 from the right (right padding 32).
- Label: 12/16 medium `muted-foreground`, padding 6 8. Separator: 1px `border`, 4 above and below, edge to edge.
- Submenu trigger: `chevron-right` icon at the end; `accent` fill while its submenu is open.
- Shortcut: 12/16 medium (`caption`) `muted-foreground`, no extra tracking. Inset items: left padding 32.
- Keyboard: arrows, typeahead, Enter and Space, Escape, ArrowRight and ArrowLeft for submenus (Base UI).

## Popover

- Radius 4 (anchored). Padding 16, gap 12, default width 288 (`w-72`), 4 from the trigger (agreed). Fade (fast).
- Title 14/20 bold `pl-ink-heading`. Description 14/20 `muted-foreground` (agreed).
- Escape and an outside click close it; focus returns to the trigger.

## Tooltip

- `popover` fill with the overlay shadow, radius 4, padding 6 12, 12/16 medium, max width 320 (`max-w-xs`), 4 from the trigger, no arrow (agreed).
- Opens after 300ms on hover and on keyboard focus (agreed); closes at once. Fade (fast).
- Text only. No interactive content.

## Separator

- 1px (`--pl-border-width`) in `border`. Horizontal: full width. Vertical: stretches to the parent. Decorative by default. No built-in margin.

## Skeleton

- `muted` fill, radius 4 (override per shape). Pulse animation, switched off for reduced motion (agreed).
- Decorative: mark the loading region with `aria-busy` instead.

## Toast (Sonner)

- Position bottom-right, 24 from the viewport edges, 8 between stacked toasts. Shown for 6 seconds (agreed).
- Toast: `popover` fill, overlay shadow, radius 4, padding 12 16, gap 12, width 360 (agreed).
- Title 14/20 bold `foreground`. Description 14/20 `muted-foreground`.
- Status shows as an icon in the matching `pl-*-text` color plus the words of the title (agreed): success `check`, info `info`, warning `warning`, error `alert-circle`, loading uses Sonner's built-in spinner. No new glyphs.
- Action: Button `sm` (32). Close button (optional): Button `ghost` `icon-sm`.
- Motion: Sonner's transitions run at `--pl-duration-slow` (agreed).
- Theme follows the `.dark` class. No `next-themes`.

## Forms: shared rules

Applies to Label, Field, Textarea, Input Group, Combobox, Native Select, Radio Group, Toggle and Toggle Group. Values marked "agreed" were proposed for this library and approved.

- Controls look like Input: height 40 (sm 32), `card` fill, 1px `input` border, radius 4, 14/20 `foreground`, placeholder `muted-foreground`, hover border `foreground`. Flat (no shadow).
- Focus: 2px solid `--ring`, 2px offset (`--pl-focus-ring-width`, `--pl-focus-ring-offset`); on the wrapper for wrapped controls (Input Group, Combobox).
- Disabled: `--pl-opacity-disabled`, no pointer events. The label of a disabled control dims with it.
- Invalid (`aria-invalid`): border `pl-danger-text`; the fill stays `card` and the focus ring stays `--ring`. Message in `pl-danger-text` (agreed).
- Motion: color changes at `--pl-duration-fast` ease-out.

## Label

- 14/20 semibold `foreground`. Gap 8 to an inline icon or marker.
- Required marker: `*` in `muted-foreground` after the label, hidden from screen readers; the control carries `required` (agreed).

## Field

- Vertical (default): label above the control, 6 between label, control and description or error.
- Description: 12/16 medium `muted-foreground`. Error (FieldError): 12/16 medium `pl-danger-text`, text only, shown instead of the description (agreed). `role="alert"`; the control points to it with `aria-describedby`.
- Horizontal (checkbox, switch or radio next to its label): gap 10.
- FieldGroup: 24 between fields. FieldSet: 16 between its children. FieldLegend: 16/24 bold `pl-ink-heading` (variant `label`: 14/20 semibold) (agreed).
- FieldSeparator: 1px `border`, optional centred text 12/16 medium `muted-foreground` on the page background.
- Choice card (FieldLabel wrapping a Field): `card` fill, 1px `border`, radius 4, padding 12 16. Checked: `pl-surface-selected` fill, `primary` border.

## Textarea

- As Input, padding 8 12. Minimum height 80; grows with its content (`field-sizing: content`); no resize handle (agreed).

## Input Group

- Wrapper as Input (40, 1px `input`, radius 4, `card`). Focus ring and invalid border on the wrapper.
- Addons sit inline inside the one border, no dividers (agreed): text and icons `muted-foreground`, 14/20, icons 16; 12 from the edge, gap 8.
- Buttons inside: Button `ghost` `icon-xs` (24) or `xs`.
- Block addons (above or below a Textarea): padding 8 12.

## Combobox

- Input: an Input Group with `chevron-down` at the end. Clear button (Button `ghost` `icon-xs`, `close`) only when there is a value (agreed).
- Popup: as the Select popup (`popover`, radius 4, padding 4, overlay shadow, items 32 high, `check` 8 from the right, fade at `--pl-duration-fast`).
- Single and multiple selection (agreed). Multiple shows chips: height 22, radius 2, `muted` fill, 1px `border`, 12/16 semibold `foreground`, gap 4, with a 12px `close` remove button (agreed).
- Empty: "No results" 14/20 `muted-foreground`, centred, padding 8 12 (agreed).

## Native Select

- As the Select trigger: height 40 (sm 32), padding 0 36 0 12, `chevron-down` 16 `muted-foreground` 10 from the right edge (agreed). Options use the system colours.

## Radio Group

- Item: 18×18 circle (`--pl-radius-full`), 1.5px `input` border, `card` fill. Checked: `primary` fill and border with a 6px `primary-foreground` dot; hover `pl-primary-hover` (agreed, mirrors Checkbox).
- Group: 12 between items; label 10 from the item. Invalid: border `pl-danger-text`.

## Toggle

- Variants `default` (transparent) and `outline` (`card` fill, 1px `input` border). Radius 4. 14/20 semibold, icons 20.
- Sizes `sm` 32 / `default` 40 / `lg` 48, side padding 12 / 16 / 24, as Button (agreed).
- Hover: `accent`. Pressed: `pl-surface-selected` fill with `pl-ink-heading` text (agreed; the Button `aria-pressed` style).

## Toggle Group

- Same variants and sizes as Toggle. `spacing` 0 (default): joined, one outer radius 4, 1px `input` dividers for `outline`. With `spacing`: separate items with that gap (agreed).
- Arrow keys move focus between items (Base UI).

## Avatar

- Circle (`--pl-radius-full`). Sizes `sm` 24 / `default` 32 / `lg` 40 (agreed).
- Fallback initials: `accent` fill, `pl-ink-heading` text, 12/16 semibold (`lg`: 14/20 semibold) (agreed).
- AvatarBadge (status dot): 8 / 10 / 12 at the bottom right, in a status color, ringed in `background` at `--pl-ring-separator-width`. Always paired with screen-reader text (agreed).
- AvatarGroup: avatars overlap by 8, each ringed in `background` at `--pl-ring-separator-width`. AvatarGroupCount as the fallback.

## Progress

- Track `muted`, fill `pl-brand-accent` (BRAND.md), height 8, radius 0 (agreed). The fill eases at `--pl-duration-fast`.
- Label 14/20 semibold `foreground` on the left and value 12/16 medium `muted-foreground` with tabular numbers on the right, 8 above the track. The value is always shown.
- Indeterminate is not styled; use Spinner when progress is unknown (agreed).

## Spinner

- `loader` stroke glyph (three-quarter arc, approved extra glyph), 20 (`--pl-icon-size`), current text color, Tailwind `animate-spin`. Keeps spinning under reduced motion: it is the only loading signal (agreed).
- `role="status"` with `aria-label="Loading"`.

## Navigation: shared rules

Applies to Breadcrumb, Pagination, Accordion, Collapsible, Command, Context Menu, Menubar and Navigation Menu. Values marked "agreed" were proposed for this library and approved.

- Never Green, Blue or secondary colors as text on light grounds. Links use `muted-foreground` and `foreground`; current or active items use `foreground` or `pl-ink-heading`.
- Popups (Context Menu, Menubar, Navigation Menu panel, Command list) follow the Dropdown Menu spec: `popover` fill, radius 4 when anchored, overlay shadow, no border, fade at `--pl-duration-fast`.
- Focus: 2px solid `--ring`, 2px offset. Disabled: `--pl-opacity-disabled`.
- Chevrons: `chevron-right` turned 180° for left, `chevron-down` turned 180° for up (as the Select scroll button). No new glyphs (agreed).
- Current page: `aria-current="page"` on the current breadcrumb and pagination link. Nav regions are labelled `nav` landmarks.

## Breadcrumb

- 14/20, items 8 apart (agreed).
- Link: `muted-foreground`; hover `foreground` with an underline (agreed). Current page: 14/20 semibold `foreground` (agreed).
- Separator: `chevron-right` 16 `muted-foreground` (agreed).
- Collapsed middle: a 24 square `more` button that opens a Dropdown Menu with the hidden items (agreed).

## Pagination

- Page links: Button `ghost` at icon size, 40 (`size="sm"`: 32), 4 apart (agreed).
- Current page: Button `outline` (`card` fill, `input` border, `pl-ink-heading` text) with `aria-current="page"` (agreed).
- Previous and Next: chevron plus "Previous" / "Next"; below `sm` the labels hide and the buttons keep an accessible name (agreed).
- Ellipsis: `more` glyph in `muted-foreground`, hidden from screen readers, with "More pages" for screen readers.
- Compact: below `sm`, "Page 3 of 12" (14/20 `muted-foreground`, tabular numbers) between Previous and Next replaces the page list (agreed).

## Accordion

- Dividers: 1px `border` between items, none above the first or below the last (agreed).
- Trigger: full width, padding 16 0, 14/20 semibold `foreground`; hover `pl-ink-heading`, no underline (agreed). `chevron-down` 16 `muted-foreground` turns 180° when open, at `--pl-duration-fast`. Focus ring with radius 4. Disabled 40%.
- Panel: padding 0 0 16, 14/20 `muted-foreground`. Height animates at `--pl-duration-fast`.
- One item open at a time by default; `multiple` allows more (agreed).

## Collapsible

- Unstyled wrapper: Root, Trigger and Content (Base UI panel). Only the height animation (`--pl-duration-fast`) is styled; use Button or text as the trigger (agreed).

## Command

- Built on the Base UI Combobox in inline mode (no `cmdk`, no Radix), keeping the shadcn names (agreed).
- Surface: `popover`, radius 8 inside CommandDialog and 4 inline, overlay shadow.
- Search row: 48 high, `search` 16 `muted-foreground`, no field border, 1px `border` below, padding 0 12, gap 8.
- List: padding 4, max height 288. Group label 12/16 medium `muted-foreground`, padding 6 8. Items as Dropdown Menu items (32 high, radius 2, `accent` highlight, `check` 8 from the right). Shortcut 12/16 medium `muted-foreground`. Separator 1px `border`. Empty: "No results" 14/20 `muted-foreground`, centred, padding 24 12.
- CommandDialog: our Dialog, max width 512, top edge at a third of the viewport height, padding 0. Cmd/Ctrl+K opens it in the playground (agreed).

## Context Menu and Menubar

- Popups and items: exactly the Dropdown Menu spec (agreed).
- Menubar bar: height 40, `card` fill, 1px `border`, radius 4, padding 4, gap 4. Triggers: height 32, padding 0 12, radius 2, 14/20 semibold `foreground`; hover `accent`; open `pl-surface-selected` with `pl-ink-heading` (agreed).

## Navigation Menu

- Triggers and links: height 40, padding 0 12, radius 4, 14/20 medium `foreground` (the Sidebar nav item, horizontal); hover `accent`. Trigger `chevron-down` 16 turns 180° when open.
- Current page: `pl-ink-heading` text with a 2px `pl-ink-heading` underline at the bottom edge (the Tabs line style) (agreed).
- Panel: `popover`, radius 4, overlay shadow, padding 8. Fade at `--pl-duration-fast`; size changes between panels at `--pl-duration-slow`; no slide.
- Panel links: padding 8 12, radius 2; title 14/20 semibold `pl-ink-heading`, description 12/16 `muted-foreground`; hover `accent`.
- Hidden below `md`; use the Sidebar (Sheet) on small screens (agreed).
