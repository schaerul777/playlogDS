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

## Display: shared rules

Applies to Empty, Kbd, Item, Hover Card, Scroll Area and Aspect Ratio. Values marked "agreed" were proposed for this library and approved.

- Reuse before inventing: Empty uses the Card title style, the StatCard icon tile and Button; Hover Card uses the Popover surface; Item follows the Table row and Sidebar item.
- Links never use Blue or Green text on light grounds; use `muted-foreground` / `foreground` with an underline, or the `link` token inside body copy.
- Focus: 2px solid `--ring`, 2px offset. Disabled: `--pl-opacity-disabled`. Motion: `--pl-duration-fast`.

## Empty

- Centred column, padding 48 24, no border of its own; place it in a Card or a table body (agreed).
- Media tile: 40×40, radius 4, `accent` fill, 24px `pl-ink-heading` icon (BRAND: 24px icons in empty states) (agreed). 16 from the media to the title (extrapolated on the 4px grid).
- Title 16/24 bold `pl-ink-heading` (as the Card title). Description 14/20 `muted-foreground`, 4 below the title. Text block max width 384 (agreed).
- Actions: centred, 16 below the text, 8 apart; primary Button `default`, secondary Button `outline` (agreed).

## Kbd

- Key: height 20, min width 20, padding 0 4, radius 2, `muted` fill, 1px `border`, Reddit Sans 12/16 medium `muted-foreground` (no monospace) (agreed).
- KbdGroup: keys 4 apart.
- Menus (Command, Dropdown Menu) keep their plain-text shortcuts; Kbd is for standalone hints (agreed).

## Item

- Variants: `default` transparent; `outline` 1px `border`; `muted` `muted` fill. Radius 4 for all (agreed).
- Sizes: `default` padding 12 16, `sm` 8 12, `xs` 6 8 (agreed). Gap 12 between media, content and actions.
- Media: `icon` 20px `muted-foreground`; `image` 40 square (`sm` 32, `xs` 24), radius 4.
- Title 14/20 semibold `foreground` (agreed). Description 12/16 `muted-foreground`, at most two lines. Actions at the end, 8 apart.
- ItemGroup: items 8 apart; ItemSeparator is a 1px `border`.
- Static by default. Rendered as a link or button: hover `accent`, focus ring, `data-selected="true"` gives `pl-surface-selected` with `pl-ink-heading`; disabled (`aria-disabled` or `disabled`) 40% (agreed).

## Hover Card

- Popover surface: `popover`, radius 4, padding 16, overlay shadow, no border, 4 from the trigger. Width 256 by default (agreed).
- Opens after 300ms (as Tooltip) on hover or keyboard focus of the trigger; closes after 150ms (agreed). Fades at `--pl-duration-fast`. Not opened on touch: a tap follows the link (Base UI). Defaults are set on `HoverCardTrigger` (`delay`, `closeDelay`); align offset 0.

## Scroll Area

- Viewport keeps the parent's radius and gets the focus ring, so the region is reachable and scrollable by keyboard.
- Scrollbar: track 10 with 2 padding; thumb 6 wide, fully round, `border`, `input` on hover or drag (agreed).
- The scrollbar shows on hover and while scrolling and fades at `--pl-duration-fast` (agreed). It also stays visible while the viewport has keyboard focus, so keyboard users see their position (extrapolated).

## Aspect Ratio

- A wrapper only: `aspect-ratio` from the `ratio` prop, no styling. No Figma component (agreed).

# AI Elements (Phase 1)

Source: shadcn/ui AI Elements, Base UI variant (`ui.shadcn.com/docs/ai-elements/base/*` and the `base-vega` registry items). Patterns are compositions, so most of the look comes from components we already own. Values the brand or an earlier spec does not define were proposed and approved on review; those marked "(agreed)" were answered individually. Nothing here adds a font, a gradient or a new radius.

## AI Elements: shared rules

- Reuse before inventing: Message Scroller buttons, Attachment actions and Suggestion are our Button; Prompt Input is our Input Group and Textarea; Trace is our Collapsible; Inline Citation is our Hover Card; Confirmation is our Item; the empty thread is our Empty; row menus are our Dropdown Menu; tooltips are our Tooltip.
- Type: message text 14/20 (`body-sm`); meta (headers, footers, markers, descriptions) 12/16 medium (`caption`) `muted-foreground`; step lines 14/20 `muted-foreground`. Reddit Sans only (code: see Code Block).
- Radius: bubbles and cards 8, attachment chips, buttons, inputs and code blocks as the existing rules (4 for controls, 8 for panels). No `rounded-full` except Avatar. (shadcn uses 12 and full on bubbles, send buttons and chips; the brand has neither).
- Focus: 2px solid `--ring`, 2px offset, on triggers, links, the scroll viewport and the code viewport. Disabled: `--pl-opacity-disabled`. Motion: `--pl-duration-fast`; nothing animates under reduced motion except Spinner.
- Status is a word or an icon plus colour: icon `loader` (running), `check` (done), `alert-circle` (error), `time` (pending); the title says it too ("Running pnpm build", "Failed to run pnpm lint") (agreed).
- Streaming: Spinner (16) beside the text, steady text, `aria-busy` on the thread; no shimmer, no gradient, no dots (agreed).
- New glyphs, drawn as 2px round strokes in `extra-icons.ts`: `stop`, `thumbs-down`, `terminal`, `arrow-up-right` (agreed). Everything else reuses the Playlog set; the file chip media uses `sticky-note`, the empty thread `lightbulb`, the scroll button `chevron-down`.

## Message Scroller

- Unstyled scroll behaviour from `@shadcn/react`: the person's message is the scroll anchor, the reply streams in below it, and auto-scroll follows the live edge until the person scrolls up.
- Viewport: `role="region"`, `aria-label="Messages"`, focusable, focus ring as Scroll Area. Content: `role="log"`, `aria-relevant="additions"`, `aria-busy` while streaming.
- Content padding 0 24, gap 24 between turns. Scrollbar as Scroll Area (thumb `border`, 6 wide); no edge fade.
- Scroll-to-end button: Button `outline` `icon-sm` (32), `card` fill, `chevron-down` 16, overlay shadow, centred 16 above the input; fades and slides 8 at `--pl-duration-fast`; hidden and `inert` at the live edge (agreed). No edge fade (agreed).

## Message

- Row: `align="start"` (assistant) or `align="end"` (person). Optional MessageAvatar uses our Avatar (`sm`); none by default.
- MessageHeader and MessageFooter: 12/16 medium `muted-foreground`; footer actions are Button `ghost` `icon-sm`, gap 4, each with `aria-label` and a Tooltip. Actions: copy (`clipboard`, then `check`), good and bad response (`thumbs-up`, `thumbs-down`, `aria-pressed`), retry (`refresh`), edit (`edit`).
- Gap 8 between a bubble and its header or footer; gap 10 between parts of one turn (reasoning, tool lines, text, sources).

## Bubble

- Variants keep shadcn's names. Padding 8 12, radius 8, text 14/20, max width 80%, long words wrap.
  - `default`: `primary` fill, `primary-foreground` text. `secondary`: `secondary` fill, `foreground` text. `muted`: `muted` fill. `tinted`: `pl-surface-selected` fill, `pl-ink-heading` text (replaces shadcn's colour maths). `outline`: `card` fill, 1px `border`. `ghost`: no fill, no padding, full width. `destructive`: `pl-danger-surface` fill, `pl-danger-text` text.
- Person: `secondary` bubble, right-aligned. Assistant: `ghost`, no bubble, full-width text (agreed).
- Interactive bubbles (link or button): hover one step darker (`accent`), focus ring. BubbleReactions: radius 2 pill, `muted` fill, ringed in `background` at `--pl-ring-separator-width`.

## Marker

- A one-line note inside the thread. 12/16 medium `muted-foreground`, icon 16, gap 8, min height 16 (agreed).
- Variants: `default`; `separator` (text between two 1px `border` lines, for dates); `border` (1px `border` below, padding 0 0 8).
- Status marker: `role="status"`, Spinner 16 plus the text ("Checking the logs…") (agreed).

## Trace

- One line per step: icon 16 + title 14/20, gap 8, `muted-foreground`, links and triggers go `foreground` on hover. Steps 8 apart.
- Status (set on TraceLine): none (done, `check`), `running` (Spinner, present-tense title), `error` (`pl-danger-text`, `alert-circle`, "Failed to…"), `pending` (`time`, `muted-foreground`) (agreed).
- Collapsible trigger: the line plus `chevron-right` 16 that turns 90° at `--pl-duration-fast`; focus ring radius 4.
- Content: left border 1px `border`, padding 0 4 0 16, 8 above and 4 below, `muted-foreground`, height animates at `--pl-duration-fast`.

## Reasoning

- A Trace line "Thinking" (running) then "Thought for 5s", icon `brain`, with the thinking text in a TraceCollapsible. Open while the model thinks and closes when it finishes; the person can reopen it, and that choice is kept for the turn (agreed).

## Sources

- A Trace line "Used 3 sources" (icon `globe`) opening into one Trace link per source: title, or hostname, with a trailing `arrow-up-right` glyph (new, proposed) and "(opens in a new tab)" for screen readers. Links are underlined on hover.

## Inline Citation

- Button `secondary` `xs` (24) showing the hostname, inside the sentence it supports, on a Hover Card (surface as Hover Card; width 256): title 14/20 semibold, description 14/20 `muted-foreground`, link 12/16 underlined.
- Opens after 150ms on hover or focus and closes after 150ms (agreed; the Hover Card default is 300ms, citations are quick references).

## Tool

- A Trace line per tool call, icon `terminal` (new, proposed): "Running pnpm test" / "Ran pnpm test" / "Failed to run pnpm test" / "Denied rm -rf dist". Finished and failed calls open to their output in a Code Block (`size="sm"`, max height 256, wrap). A failed call is open by default.
- A pending approval is not a step the agent took: it sits outside Trace as a Confirmation.

## Confirmation

- Our Item, `outline`, `sm`: `terminal` icon media, title "Run pnpm build?", description, actions Button `outline` `sm` "Deny" and Button `default` `sm` "Approve", 8 apart. After the answer it becomes a Tool line.

## Code Block

- Container: radius 8, 1px `border`, `muted` fill (surface-sunken, an inset area), text `foreground`; `destructive` variant uses `pl-danger-text` border and text.
- Header: padding 16 16 0 (`sm`: 12), title 14/20 medium, actions right. Copy button: Button `ghost` `icon-xs` (24), `clipboard` then `check` for 2s, labelled "Copy"/"Copied" with a polite live region. Floating actions show on hover and on focus-within, always on touch.
- Content: `pre` with `tabIndex=0` and the viewport focus ring, padding 16 (`sm`: 12), `dir="ltr"`. Size: 14/20 (`sm`: 12/16), weight 400. Line numbers `muted-foreground`, hidden from screen readers.
- Font: Reddit Mono (agreed). `--font-mono` becomes `"Reddit Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace`; `tokens.css` gets the `@font-face` and the file goes in `apps/web/public/fonts/`. Code is the one stated exception to "Reddit Sans only" and is noted in `BRAND.md`.
- Syntax colours: four new tokens aliased to existing values (agreed), highlighted by shiki with a CSS-variable theme (no hex themes), contrast measured on `muted`:

| Token | Light | Dark | Contrast light / dark |
|---|---|---|---|
| `--pl-syntax-keyword` | `#004d9f` (= `pl-info-text`) | `#92d1f8` | 7.3 / 10.0 |
| `--pl-syntax-string` | `#00726b` (= `pl-success-text`) | `#5ef4d7` | 5.2 / 12.1 |
| `--pl-syntax-number` | `#a8451d` (= `pl-warning-text`) | `#ffa27c` | 5.3 / 8.4 |
| `--pl-syntax-comment` | `#606060` (= `muted-foreground`) | `#99b8d9` | 5.6 / 8.0 |

  Everything else is `foreground`. Diff: added lines `pl-success-surface` fill, removed lines `pl-danger-surface` fill, each with a `+` or `−` marker in `pl-success-text` or `pl-danger-text`, so colour is never the only cue; syntax colours keep 5.2:1 or more on both fills in both modes. Highlighted lines `pl-surface-selected`.

## Attachment

- Chip: `card` fill, 1px `border`, radius 4, padding 8 (`sm` 6, `xs` 4), gap 8; media tile 40 (`sm` 32, `xs` 24), radius 4, `muted` fill, icon 16; title 14/20 medium (`sm`, `xs`: 12/16 semibold), description 12/16 `muted-foreground`; remove action Button `ghost` `icon-xs` with `aria-label`.
- States (`state` is Figma-only for hover): `done`; `idle` (1px dashed `border`); `uploading` and `processing` (Spinner in the media tile, description names the step); `error` (`pl-danger-text` border, `pl-danger-surface` tile, `pl-danger-text` description that says why).
- AttachmentGroup scrolls sideways with focusable items; vertical orientation (width 96) is kept for image previews.

## Prompt Input

- Our Input Group around a Textarea (agreed layout): `card` fill, 1px `input`, radius 4, focus ring and invalid state on the wrapper (as Input Group). Textarea 14/20, grows to 8 lines (160) then scrolls; placeholder `muted-foreground`.
- Attachment chips (`sm`) in a block-start addon above the text; toolbar in a block-end addon, padding 8: attach Button `outline` `icon-sm` (32, square, `attachment`), the Model Selector slot (Phase 2, empty for now), send Button `default` `icon-sm` (`send`) at the end.
- Keys: Enter sends, Shift+Enter adds a line, Escape stops a running reply. While streaming the send button becomes Stop (`stop`), still a real button with `aria-label` (agreed).
- States: empty (send disabled), filled, streaming (Stop shown, text kept), disabled (whole group 40%).

## Suggestion

- Button `outline` `sm`, label only, gap 8, in a row that wraps (no hidden suggestions, no edge fade). Click sends the label as the message.

## Chat

- Column: optional header (title 16/24 bold `pl-ink-heading`, description 12/16 `muted-foreground`, reset Button `outline` `icon`), the Message Scroller, then suggestions and the Prompt Input pinned at the bottom with 16 around them; content column centred, max width 768.
- Empty thread: our Empty (`lightbulb` tile, "What should we ask?"), suggestions below.

# Controls (Batch E)

Button Group, Slider, Input OTP and Drawer, on Base UI. Values the brand or an earlier spec does not define were proposed and answered one by one; those marked "(agreed)" were approved individually.

## Controls: shared rules

- Reuse before inventing: Button Group wraps our Button (sizes, colours, focus untouched); Slider follows Progress for the track and Switch for the thumb and focus; Input OTP slots look like Input; Drawer reuses the Sheet and Dialog surface, scrim and motion.
- Focus: 2px solid `--ring`, 2px offset (`--pl-focus-ring-width`, `--pl-focus-ring-offset`). Disabled: `--pl-opacity-disabled`, no pointer events. Invalid: border `pl-danger-text`, the ring stays `--ring` (the same token as Input, Button and Badge). Motion: `--pl-duration-fast`; panels `--pl-duration-slow`.
- Names: every Slider thumb, the OTP field and a Button Group of icon buttons needs an accessible name.

## Button Group

- A row (or column) of attached controls. Joined with no gap: one outer radius 4 at the two ends, inner corners 0 (agreed). Each child keeps its own Button size (32 / 40 / 48) and variant; the group sets none.
- Outline children share one 1px `input` edge (no double border). A focused child sits above its neighbours so the 2px ring is not clipped. Same joining rule as Toggle Group `spacing={0}`.
- Filled children (`default`, `secondary`, `destructive`) are split by ButtonGroupSeparator: 1px (`--pl-border-width`) in the `background` colour, so it works on every fill in light and dark (agreed).
- ButtonGroupText: a static label such as "https://" or a unit. `muted` fill, 1px `input` border, padding 0 12, 14/20 medium `foreground`, icons 16 `muted-foreground` **proposed**.
- May hold Button, ButtonGroupText, Input, Select trigger and a Dropdown Menu trigger (a Button). An Input fills the free width. Nested groups sit 8 apart (agreed).
- Vertical (`orientation="vertical"`): same rules turned 90°.
- Not Toggle Group (that holds selection state and roving arrow keys) and not Input Group (that draws one border around a borderless control plus addons). Button Group has no state: `role="group"`, an `aria-label` when it needs a name, and every child is a normal tab stop.

## Slider

- Track: `muted` fill, height 8, radius 0 (as Progress). Range: `primary` fill (Dark Blue; Green in dark mode), eased at `--pl-duration-fast` except while dragging, when it follows the thumb with no easing (agreed). Progress uses Green because its fill is decoration with the value written beside it; a control's fill has to read against `muted`.
- Thumb: 20×20, radius 4, `card` fill, 2px `primary` border (agreed). Hit area 40×40 (an `after` layer, 12 past the thumb because the 2px border is outside the layer). Hover: `accent` fill. Focus: 2px ring, 2px offset. The thumb stays inside the track (`thumbAlignment="edge"`).
- Single value, or range with two thumbs (Base UI keeps them from crossing; `minStepsBetweenValues` is available). Each range thumb is named ("Minimum price", "Maximum price") through `thumbLabels` (`getAriaLabel`) (agreed). A single slider with no label row is named by its `aria-label`, which the thumb also takes.
- Optional row above, as Progress: SliderLabel 14/20 semibold `foreground`; SliderValue 12/16 medium `muted-foreground`, tabular numerals, right-aligned, 8 above the track (agreed). No value tooltip and no tick marks (agreed).
- Vertical (`orientation="vertical"`): track 8 wide, minimum height 160 (agreed).
- Keyboard (Base UI): arrows ±step, PageUp and PageDown ±large step, Home and End. Disabled: 40%.

## Input OTP

- Built on the Base UI OTP Field (stable in `@base-ui/react` 1.9.0), not the `input-otp` package (agreed; no new dependency). The API follows Base UI: `length`, `validationType`, `onValueComplete`. A slot takes no `index`: its position is its order. `invalid` and `aria-describedby` are props of InputOTP (our Field is a plain wrapper, so they cannot come from a Field context) and reach every slot. Export names stay shadcn's: InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator.
- Slot: 40×40, radius 4, `card` fill, 1px `input` border, 14/20 `foreground` centred; hover border `foreground`; separate slots 8 apart (each looks like an Input) (agreed). Active slot: the 2px ring, 2px offset; native caret (real inputs, no fake caret).
- Invalid (`aria-invalid`): every slot border `pl-danger-text`. Disabled: 40%, no pointer events.
- Groups: slots are grouped (for example 3 + 3) with a separator that is a 12×1px `input` line, no glyph (agreed). Not masked by default; `mask` is available.
- Behaviour (Base UI): numeric by default (`validationType`), `autoComplete="one-time-code"`, paste fills the slots, Backspace moves back, arrows, Home and End move between slots, one tab stop, `onValueComplete` when full, optional `mask`.
- Label: the field's Label names the first slot (Field or a `<label>`); required.

## Drawer

- A bottom panel for small screens on the Base UI Drawer (`@base-ui/react/drawer`, stable in 1.9.0). It does not use Vaul, so no new package. Bottom only, swipe down to close (agreed); Sheet stays for left, right and top.
- Surface as Sheet: `popover` fill, `popover-foreground` text, the overlay shadow, no border (shadcn adds a border). Scrim `--pl-scrim`, no blur (shadcn uses black 10% and a blur).
- Radius 8 on the top corners only (agreed). Full width. Maximum height: the viewport minus 48, the body scrolls (agreed).
- Handle: 40×4, radius 2, `input` colour, 8 from the top, centred (agreed); it is the swipe affordance and is hidden from screen readers.
- Header, body, footer as Sheet: header padding 24 24 0 (title 16/24 bold `pl-ink-heading`, description 14/20 `muted-foreground`, left-aligned at every width), body padding 0 24, footer padding 0 24 24 with the Buttons stacked full width, gap 8, gap 16 between the three. Close button as Sheet: Button `ghost` `icon-sm`, `close`, 16 from the top and right (agreed).
- Motion: panel slides at `--pl-duration-slow` ease-out; scrim fades at `--pl-duration-fast`; no transition while dragging; the release speed follows the swipe (Base UI). The nested-drawer scale and brightness effect is dropped.
- Behaviour (Base UI): Escape, a scrim click or a swipe down closes; focus is trapped and returns to the trigger.
- Snap points: supported by the primitive, off by default. `DrawerBody` (padding 0 24, scrolls) is added so a long body scrolls under a fixed header and footer. `showSwipeHandle` (default true) and `showCloseButton` (default true) can be turned off.
- Versus Sheet `side="bottom"`: Sheet already gives the same surface, scrim and slide, closed by Escape, scrim or the close button. Drawer adds swipe-to-dismiss with touch physics, the handle and optional snap points. On a desktop pointer the two look the same.

# Date (Batch F)

Calendar, Date Picker and Date Range Picker. The Calendar is the shadcn Calendar on `react-day-picker`; Date Picker and Date Range Picker are compositions (the shadcn docs have no registry item for them): Input-look trigger, Popover, Calendar. Values the brand or an earlier spec does not define were proposed and answered one by one; those marked "(agreed)" were approved individually.

## Date: shared rules

- Library: `react-day-picker` 10.0.2, pinned (agreed). It is not Base UI; it is the one new dependency (its own `date-fns` 4 and `@date-fns/tz` come with it, tree-shaken). About 20 KB gzip (68 KB minified) with the default locale, +1.4 to 1.9 KB gzip for the Indonesian locale. No other date library: dates are formatted with `Intl.DateTimeFormat`.
- Reuse before inventing: Popover for the surface, Button for the nav arrows and the day buttons, Select for the month and year dropdowns, Input for the trigger look, Field for the label, hint and error, Drawer for small screens if chosen.
- Focus: 2px solid `--ring`, 2px offset (`--pl-focus-ring-width`, `--pl-focus-ring-offset`). Disabled: `--pl-opacity-disabled`, no pointer events. Invalid: trigger border `pl-danger-text`, the ring stays `--ring` (the same token as Input and Select). Motion: colour changes at `--pl-duration-fast` ease-out; no slide between months.
- Never Green, Blue or a secondary colour as text on a light ground: day numbers are `foreground`, `muted-foreground` or `primary-foreground` on a `primary` fill.

## Calendar

- No fill, border or shadow of its own: it sits in a Popover (`popover`) or a Card (`card`), padding 16.
- Header: height 40; month and year 14/20 semibold `foreground`, centred; the previous and next arrows are Button `ghost` `icon-sm` (32) with the `chevron-left` and `chevron-right` glyphs at 16 and the library's own accessible names ("Go to the previous month"). `chevron-left` is a new glyph: a 2px round stroke, the mirror of `chevron-right` (agreed). Arrows only by default (agreed).
- Weekday row: height 32, 12/16 medium `muted-foreground`, short names. Week starts on Monday, `weekStartsOn` is a prop (agreed). Week numbers off by default (`showWeekNumber`), column 40 wide, 12/16 `muted-foreground` (agreed).
- Day cell 40×40 (agreed), no column gap, 4 between weeks, radius 4 (control height 40). 14/20 regular `foreground`, tabular numerals. Built on Button `ghost` `icon` (hover `accent`).
- Selected: `primary` fill with `primary-foreground` text (Green with Dark Blue text in dark mode) (agreed). Today: a 1px `primary` inner border and 600 weight, no fill; if today is also selected it is simply filled (agreed). Hover: `accent`. Focus: the 2px ring, 2px offset, above its neighbours.
- Range (agreed): start and end are `primary` with `primary-foreground`, radius 4 on their outer side and 0 on the inner side. Middle days are `pl-surface-selected` with `pl-ink-heading`, radius 0 so the band is continuous, with radius 4 at the left of each week's first day and the right of its last. A middle day keeps its fill on hover.
- Outside days are shown in `muted-foreground` and stay clickable (agreed). Disabled days are 40% with no pointer events; a booked day also gets a line-through so it is not only dimmed (agreed).
- Dropdown captions (`captionLayout="dropdown"`) use the native month and year selects looking like Select `sm`: 32 high, 1px `input` border, radius 4, 14/20 medium. Dropdowns are set by the `captionLayout="dropdown"` prop, off by default (agreed).
- Locale: `locale` prop (English by default; Indonesian from `react-day-picker/locale`), `dir` for RTL flips the arrows (agreed).
- Keyboard and ARIA (library): the month is a `grid`; arrows move by day and week, Page Up and Page Down by month, Shift with them by year, Home and End to the start and end of the week, Enter and Space select. Today, selected and disabled days are announced; the focused day has the ring.

## Date Picker

- Trigger: looks like Input: a button 40 high (sm 32), `card` fill, 1px `input` border, radius 4, padding 0 12, gap 8, 14/20 `foreground`; placeholder "Select date" in `muted-foreground`; `calendar` icon 16 `muted-foreground` at the end; hover border `foreground`; open (`aria-expanded`) border `foreground`. Input-look button, not typeable (agreed). Invalid and disabled as Input.
- Value shown as `19 Nov 2026` (day, short month, year) with `Intl.DateTimeFormat`, so no date library is needed in our code; `formatDate` overrides it (agreed).
- Optional clear: `clearable` adds a Button `ghost` `icon-xs` (`close`, "Clear date") before the calendar icon while a date is set; off by default (agreed).
- Popover: `w-auto p-0`, aligned to the start, 4 below the trigger, fade; the Calendar inside has padding 16. It closes when a date is picked; Escape closes it and focus returns to the trigger.
- Limits: `minDate` and `maxDate` disable the days outside them and stop the month navigation there; `disabled` takes any react-day-picker matcher (booked dates, weekends) (agreed).
- Name: a Field label (`htmlFor` the trigger's id); error text in FieldError with `aria-describedby`; the value is part of the trigger's text, so it is announced.

## Date Range Picker

- Same trigger and Popover. The value reads `19 Nov 2026 – 26 Nov 2026` (en dash), a single date while only the first end is picked; placeholder "Select dates".
- Two months side by side from `md`, one month below; 16 between months. The popover closes once both ends are chosen (agreed).
- Presets (Today, Last 7 days, Last 30 days, This month): optional `presets` prop, Buttons `ghost` `sm` in a column on the left, separated by a 1px `border` (agreed).

## Date: small screens

- Popover at every width (agreed). A single month (312 wide) fits a 360 screen; the range picker falls back to one month below `md`. The playground shows the same Calendar inside a Drawer as a recipe for apps that prefer a bottom panel; the components do not switch on their own.

## Date: implementation notes (Batch F)

- Files: `calendar.tsx` (Calendar, CalendarDayButton), `date-picker.tsx` (DatePicker, DateRangePicker, DatePickerTrigger, `getDefaultDateRangePresets`). Playground: `apps/web/src/date-section.tsx`.
- Date Picker props: `value`, `defaultValue`, `onValueChange`, `placeholder` ("Select date"), `locale`, `formatDate`, `minDate`, `maxDate`, `disabledDates` (any react-day-picker matcher), `disabled`, `invalid`, `clearable`, `size` (`default` | `sm`), `calendarProps`. Date Range Picker adds `presets` and uses the same props with a `DateRange` value (placeholder "Select dates").
- The trigger is a Popover trigger styled as Input. The clear button is a sibling Ghost icon button (`aria-label="Clear"`), not nested inside the trigger button.
- The popover closes on select (single) or when both ends are set (range). Escape closes it and returns focus to the trigger (Base UI behavior, checked in the playground).
- Range picker shows two months from 768px up and one below it (`useIsMobile`). The presets column is hidden below 768px.
- Value format uses `Intl.DateTimeFormat` (`19 Nov 2026`; `id` locale gives `19 Nov 2026` with Indonesian month names). Pass `formatDate` to change it.
- `apps/web` pins `react-day-picker` 10.0.2 as well, only for the `react-day-picker/locale` import in the playground.
- The Icon set gains `chevron-left` (see BRAND.md). No new tokens.

# AI Elements (Phase 2)

Source: shadcn/ui AI Elements, Base UI variant (`ui.shadcn.com/docs/ai-elements/base/*`), checked on 19 Nov 2026. All eight names exist unchanged. Every value below was approved on review (answer "a" to all eleven questions); nothing here adds a font, a gradient, a radius or (so far) a token or a glyph.

## AI Elements Phase 2: shared rules

- No new component files from the CLI: five of the eight patterns are compositions of our `Trace` (Chain of Thought, Plan, Task, Queue, Subagent), one of `Hover Card` and `Progress` (Context), one of `Marker` and `Button` (Checkpoint), one of `Dropdown Menu` and `Input Group` (Model Selector). Each becomes one file in `packages/ui/src/components/ai-elements/`: `chain-of-thought.tsx`, `plan.tsx`, `task.tsx`, `queue.tsx`, `context.tsx`, `checkpoint.tsx`, `subagent.tsx`, `model-selector.tsx`.
- Packages: none. The docs demos use `ai`, `@ai-sdk/react` and `@/lib/ai` (`createChat`) only to script a fake reply; the playground uses static mock data instead, so none of the three is added.
- Status, streaming, focus, disabled, motion: exactly as AI Elements Phase 1 (Trace status icons `check`, Spinner, `alert-circle`, `time`; running is Spinner plus a present-tense title; no shimmer, dots or gradient; focus ring 2px with 2px offset; disabled 40%; `--pl-duration-fast`; nothing animates under reduced motion except Spinner).
- Type: step lines 14/20 `muted-foreground`; meta 12/16 medium; summaries 14/20. Radius: 4 on triggers and buttons, 2 on badges, 8 on cards. All as Trace, Marker and Badge already are.

## Chain of Thought

- A thin composition over Trace, not a new look: `Trace` + `TraceCollapsible`; the summary is a `TraceLine` ("Researching" while running, "Researched in 3 steps", "Researched in 3 steps, 1 failed").
- Open while the steps run, closes when the reply starts, the person can reopen it and that choice is kept for the turn (as Reasoning). `keepMounted` on the content so each step keeps its own open state.
- Each step is a Tool-style line: status icon, tense-matched title ("Searching…", "Searched…", "Failed to search…"). Detail opens below a step: a Code Block (`sm`, max height 256, wrap) for output, a Trace of links for results, Badge `secondary` per hostname for web search or file names (Badge radius 2).
- Relation to Reasoning: Reasoning is one block of the model's thinking text; Chain of Thought is the list of steps the agent took. Same Trace look, two files.

## Plan

- Trace + collapsible. Summary line: icon `clipboard`, title ("Plan: migrate to Base UI"), `TraceDescription` "2 of 4 done" (12/16 medium, no bar: Progress would repeat the count). Open by default; `status="running"` on the summary while any step runs.
- Steps are Trace lines: done (`check`), running (Spinner), pending (`time`, `muted-foreground`), error (`alert-circle`, `pl-danger-text`, "Failed to…"), skipped (`close`, `muted-foreground`, title ends "(skipped)"). Steps are read-only, not checkable.
- Optional description above the steps, inside the content, 14/20 `foreground`.
- Use Plan when every step is known up front; use Task when the next step comes from the last.

## Task

- Trace + collapsible per task. Summary has no icon of its own: the status icon and a title in the present tense while running ("Updating the page metadata"), past tense when done, "Failed to update…" on error.
- The running task is open; each task closes when it is done. Several tasks sit in one Trace, 8 apart. Steps appear only once taken (no pending steps). Step glyphs: `search`, `sticky-note` (file), `edit`; a step that links out is an anchor (`arrow-up-right`, "(opens in a new tab)").

## Queue

- The agent's todo list, read-only. Trace with two collapsibles: "n to do" (open) and "n completed" (closed). Section icons: `clipboard` and `check`.
- A todo is a Trace line: pending `time`, in progress Spinner, completed `check`. A todo with a description is a collapsible that opens to 14/20 `muted-foreground` text; without one it stays a line.
- A todo moves between sections as its status changes; empty section is hidden; an empty queue renders nothing. No reorder, remove or maximum height (a long list scrolls with the page).

## Context

- A Hover Card (spec as Hover Card, width 256) opened from a Button `outline` `sm`: label "7% context". Opens on hover and keyboard focus; the trigger carries an `aria-label` with the full sentence ("Context window 7% used, 9.7k of 128k tokens").
- Content: header "Context" 14/20 medium and "9.7k / 128k" 12/16 medium `muted-foreground`, tabular numbers; our Progress track (8 high, radius 0) with `aria-label="Context used"`; optional rows Input, Output, Reasoning (12/16, label left, value right, tabular numbers).
- Levels (`level` is Figma-only): low under 75% (fill `pl-brand-accent`), medium 75–89% (fill `pl-warning`, `warning` icon in the trigger, line "Getting full" in `pl-warning-text`), near-full 90% and above (fill `pl-danger`, `alert-circle` icon, line "Nearly full: the oldest messages may be dropped" in `pl-danger-text`). Colour is never the only cue: icon and words.
- Token counts are formatted `9.7k`, `128k`; the limit is a prop (the model's window), never read from a provider.

## Checkpoint

- Our Marker `separator` after a turn: label 12/16 medium `muted-foreground` ("Button renamed"), then Button `outline` `xs` (24) "Restore", 8 apart, between two 1px `border` lines.
- Restore keeps that turn and drops every later message. Because it removes messages it asks first: an Alert Dialog "Restore to “Button renamed”?" / "Later messages are removed." with Cancel and Restore (Button `default`). Focus returns to the checkpoint button after Cancel.

## Subagent

- Trace + collapsible. Line: "Running the research agent" (Spinner), "Ran the research agent" (`check`), "Failed to run the research agent" (`alert-circle`). Open while running, closed when done, reopenable, `keepMounted`.
- Content: a nested Trace of the subagent's tool lines (the existing Tool lines), then its result as 14/20 `foreground` text; an error opens a destructive Code Block (`sm`). Nesting uses Trace's own left border (1px `border`) and 16 indent; one level of nesting is supported and designed (a subagent inside a subagent is not).
- The subagent's own status is the line; there is no extra Badge.

## Model Selector

- The docs version is two Dropdown Menus in the Prompt Input toolbar (the slot Phase 1 left between attach and send): a model menu and an effort menu. It has no search, badges or disabled models.
- Triggers: Input Group Button `sm` (32) with the current value and `chevron-down` 16; `aria-label` "Model" and "Effort". Menu as Dropdown Menu (radius 4, padding 4, width 192 model / 144 effort): provider groups with a `DropdownMenuLabel` (12/16 medium), radio items with the `check` on the right, separators between providers. Items close the menu on click.
- Keys (Base UI menu): Enter and Space open, arrows move, typing jumps to an item, Escape closes and returns focus to the trigger.
- Static list only: three example providers, two or three models each; disabled item at 40% with "(unavailable)" in its text; optional Badge `secondary` ("New") at the end of an item.

## Phase 2: playground and Figma (for after approval)

- Playground: a new "Agent" section next to Chat with static data: a Plan with every step state, a Task list, a Chain of Thought open and closed, a Queue, a Context meter at low, medium and near-full, a Checkpoint with its confirm, a Subagent running and done inside a message, and a Model Selector closed, open, with a disabled item.
- Figma sets: Plan, Task, Chain of Thought, Queue (and QueueItem), Context (`level`), Checkpoint, Subagent (`state`), ModelSelector (trigger, menu, item `state`), all built from existing Trace, Marker, Hover Card, Progress, Dropdown Menu and Button instances.

## AI Elements Phase 2: implementation notes

- Files in `packages/ui/src/components/ai-elements/`; playground `apps/web/src/agent-section.tsx` ("Agent"). Nothing was installed from the CLI, so no existing file changed and no package was added.
- APIs (all data-driven, place inside a `<Trace>` except Context, Checkpoint and Model Selector):
  - `ChainOfThought` (`running`, `steps`, `failed`, `defaultOpen`) with `ChainOfThoughtStep` (`title`, `status`, `icon`) and `ChainOfThoughtBadges` (`items`).
  - `Plan` (`title`, `steps: { title, state: done | running | pending | error | skipped }[]`, `description`, `defaultOpen`).
  - `Task` (`title`, `status`) with `TaskStep` (`title`, `icon`, `status`, `href`).
  - `Queue` (`todos: { id, title, description?, status: pending | in-progress | completed }[]`).
  - `Context` (`used`, `limit`, `usage`); levels from `getContextLevel`. The fill colour changes through the Progress `indicator` slot, so Progress itself is unchanged.
  - `Checkpoint` (`label`, `onRestore`, `restoreLabel`), with an Alert Dialog confirm.
  - `Subagent` (`name`, `state: running | done | error`, `result`, `error`, `defaultOpen`).
  - `ModelSelector` (`providers`, `model`, `onModelChange`, `efforts`, `effort`, `onEffortChange`, `disabled`): two Dropdown Menus, placed inside the Prompt Input toolbar slot.
- Checked in the playground (light and dark): Model Selector opens, selects, shows a disabled item and returns focus on Escape; Context opens on focus with the three levels; Checkpoint confirm opens and Cancel returns focus.

# Charts (Batch H)

Starting point (checked 20 Nov 2026): the shadcn Chart wrapper is already in the repo (`chart.tsx`: `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartConfig`, plus `CHART_COLORS`), and so is a branded `BarChart` (`bar-chart.tsx`: grouped, stacked, horizontal, value labels, legend, tooltip, `valueFormatter`, `accessibilityLayer`). `recharts` 3.8.0 is already a dependency. The current shadcn docs (Recharts v3, `var(--chart-1)` colours, `accessibilityLayer`) match what we have; they only show bar charts in full, so Line, Area, Pie and Donut are our own compositions. No library other than Recharts is needed. Every value below was approved on review (answer "a" to all fifteen questions).

## Charts: shared rules

- Frame: our Card (header title 16/24 bold `pl-ink-heading`, description 12/16 medium `muted-foreground`, header actions on the right, content padding 16 24 24). The chart sits in the Card content; default plot height 256, never less than 160.
- Type: Reddit Sans only; ticks, legend and labels 12/16 medium. Tick and legend text `muted-foreground`; value labels on marks `foreground`. Mark colours are fine for fills and strokes, never for text.
- Axes: no tick lines; no axis line on the value axis; the category axis has no line either (the gridline at zero is enough). Ticks 8 from the plot.
- Grid: horizontal lines only (vertical for horizontal bars), solid, 1px `pl-chart-grid`.
- Series colours: `chart-1` to `chart-8` in order (existing tokens, light and dark). Product lines keep `line-*`.
- Motion: marks do not animate on mount; the tooltip cursor follows the pointer without easing; nothing needs a reduced-motion branch.
- Accessibility: Recharts `accessibilityLayer` on every chart (arrow keys move between data points); `ChartContainer` gets a visible focus ring (2px, 2px offset), an `aria-label` and a one-sentence summary linked with `aria-describedby`; a "Chart | Table" toggle in the Card header swaps the plot for our Table with the same data.
- Colour contrast of marks (3:1 against the card, measured):

| Token | Light on `#ffffff` | Dark on `#0b2547` |
|---|---|---|
| chart-1 | 8.2 | 6.6 |
| chart-2 (Green) | **1.4** | 10.7 |
| chart-3 | **2.3** | 9.3 |
| chart-4 | 3.5 | 6.9 |
| chart-5 (orange) | **2.6** | 5.8 |
| chart-6 | 3.2 | 6.9 |
| chart-7 | 4.2 | 6.1 |
| chart-8 | **2.1** | 4.8 |

- Colour-blind check (Machado simulation, smallest perceptual distance between two series in the first 3 / first 5, CIE ΔE; about 20 or more reads as clearly different): normal vision light 44 / 35, dark 19 / 19; protanopia light 38 / 32, dark 18 / 18; deuteranopia light 36 / 30, dark 21 / 18; tritanopia light 22 / 16, dark 12 / 9. The weak spots are chart-1 against chart-3 in dark mode and chart-3 against chart-4 for tritanopia.

## Line

- 2px stroke, round joins, straight segments between points (proposed: honest for a trend). Points hidden by default; on hover or keyboard focus the active point is a 6px dot in the series colour with a 2px `card` ring. More than one series: different point shapes (circle, square, diamond) on the active point and in the legend.
- Cursor: 1px `border` vertical line.

## Area

- Flat fill at 20% of the series colour, no gradient, with the 2px line of the line chart on top. Stacked areas use 40% fill; the 2px line on each layer is what separates them (no extra separator).

## Bar (exists)

- Keep the current BarChart. Proposed additions only: corner radius 2 on the data end, 4 between bars in a group, 16% between categories, value labels as today.

## Pie and Donut

- Donut: outer radius 100, thickness 36 (inner 64); Pie is the same with inner 0. 2px `card` gap between slices, first slice at 12 o'clock, clockwise, largest first.
- Centre label (donut): the total in 24/32 bold `foreground` with a 12/16 medium `muted-foreground` caption under it.
- No labels on the slices; the legend (right on wide cards, below on narrow ones) carries name, value and percent. At most 5 slices; the rest are summed into "Other" in `chart-8`.

## Tooltip

- The Tooltip surface: `popover` fill, overlay shadow, radius 4, padding 8 12 (6 12 for one row), 12/16 medium, min width 144, no arrow. Header row (category) `foreground` medium; one row per series: 10×10 swatch with radius 2, name `muted-foreground`, value 600 weight tabular numbers right-aligned.
- Cursor: band (`muted` fill) for bars, 1px `border` line for line and area.
- Numbers: Indonesian locale (`id-ID`): thousands separator ".", decimal ","; rupiah "Rp 1.250.000"; percent "12,5%"; compact "1,2 jt" on axes. One `valueFormatter` per chart, as today.

## Legend

- Above the plot, left aligned, 12/16 medium `muted-foreground`, 16 between items, swatch 10×10 radius 2 (as today). Interactive (changed after Batch H, on request): each item is a button (`aria-pressed`, radius 4, `accent` on hover, focus ring). Hovering or focusing an item dims every other series to 30%; pressing it (click, Enter or Space) hides or shows that series, which then shows at 40% with its name struck through. The last visible series cannot be hidden. The value axis rescales to the visible series. Turn it off with `interactiveLegend={false}`. In Pie and Donut the legend rows do the same and the total and percentages follow the visible slices.

## States

- Empty: our Empty in the plot area ("No data for this period"). Loading: Skeleton blocks in the plot area (axis ticks and a few bars or a line), `aria-busy` on the Card content. Error: Empty with a "Try again" Button, `pl-danger-text` title; the toggle stays available.
- Focus: container ring; the active mark is also highlighted (bar `muted` band, line point dot).

## Charts: Figma (for after approval)

- A Chart Frame component (title, description, header actions, legend, plot slot), the chart Tooltip, and one static example per type drawn with vector shapes bound to the chart variables. Illustrative only: the data, shapes and curves; real behaviour (hover, keyboard, animation) is code.

## Charts: implementation notes

- New: `line-chart.tsx`, `area-chart.tsx`, `pie-chart.tsx` (Donut by default, `donut={false}` for Pie), `chart-panel.tsx` (Card frame with the Chart | Table toggle, summary and the loading, empty and error states), `chart-utils.tsx` (series colours, shapes) and `lib/chart-format.ts` (`idNumber`, `idRupiah`, `idPercent`, `idCompact`). Playground: `apps/web/src/charts-section.tsx`.
- Changed (small, agreed): `bar-chart.tsx` (radius 2 on the data end, 4 between bars, 16% between categories, legend in series order, `axisFormatter`) and `chart.tsx` (tooltip padding 8 12 and min width 144, a visible focus ring on the plot). `recharts` 3.8.0 was already installed; no package added.
- Shared props: `data`, `config`, `categoryKey`, `valueFormatter`, `axisFormatter`, `showLegend`, `showTooltip`; Area also takes `stacked`. Pass `aria-label` on a chart and a one-sentence `summary` on its `ChartPanel`.
- Legends list series in the order of `config` (Recharts sorts them alphabetically unless told not to).

- Interactive legend: `useSeriesVisibility`, `InteractiveLegend` and `legendItems` in `chart-utils.tsx`; `interactiveLegend` (default on) on `BarChart`, `LineChart`, `AreaChart` and `PieChart`.
