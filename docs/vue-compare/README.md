# Vue pilot: visual and behavior comparison with React

Pilot components: Button, Input, Label, Dialog. Checked on 2026-11-22 in the Browser pane (Chromium), 1024 px wide.

## How to reproduce

Both pages render the same specimens (same markup, classes and `data-specimen` ids).

```bash
pnpm --filter web-vue dev                      # Vue:   http://localhost:5180/?theme=light  (or dark)
pnpm --filter web exec vite --config ../../docs/vue-compare/react-harness/vite.config.ts   # React: http://localhost:5181/?theme=light
```

- Vue page: `apps/web-vue/src/sections/*.vue`. React page: `docs/vue-compare/react-harness/src/main.tsx`.
- The React harness is not a workspace package and does not change `packages/ui` or `apps/web`. It borrows their `node_modules`.
- `.claude/launch.json` has `web-vue` and `react-compare` entries for the Browser pane.

## Screenshots

| | Light | Dark |
|---|---|---|
| React, page | [react-light](screenshots/react-light.jpg) | [react-dark](screenshots/react-dark.jpg) |
| Vue, page | [vue-light](screenshots/vue-light.jpg) | [vue-dark](screenshots/vue-dark.jpg) |
| React, Dialog open | [react-light-dialog](screenshots/react-light-dialog.jpg) | [react-dark-dialog](screenshots/react-dark-dialog.jpg) |
| Vue, Dialog open | [vue-light-dialog](screenshots/vue-light-dialog.jpg) | [vue-dark-dialog](screenshots/vue-dark-dialog.jpg) |

## Pixel check

44 specimens (Button: 6 variants x 4 sizes, 4 icon sizes, icon start and end, disabled, pressed, invalid, rendered as link; Input: default, value, required, controlled, invalid, disabled, file; Dialog triggers). For each one I compared the position, size and 25 computed styles (padding, border, radius, colors, font, line height, letter spacing, opacity, cursor, gap, shadow, transition) between React and Vue.

- Light mode: **0 differences** in 44 of 44.
- Dark mode: **0 differences** in 44 of 44.
- Open Dialog (default): same position and size (512 x 234 at 1024 wide), same padding (24), gap (16), radius (8), colors, shadow (`--pl-shadow-overlay`), title (16/24, 700), overlay (`--pl-scrim`, full viewport, no blur), close button (32 px ghost, 16 from the top and right).

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Role and name | `role="dialog"`, labelled by title, described by description | same |
| Focus on open | first focusable (the input) | same |
| Tab order | input, Cancel, Save changes, Close (X) | same |
| Focus trap | focus wraps inside | focus wraps inside; ring is 2px solid, 2px offset |
| Escape | closes, focus returns to the trigger | same |
| Outside click | closes | same |
| Page behind | `aria-hidden` on the app root | same |

## Differences found

1. **Text is selected when the dialog opens (decided: keep Reka's default).** Reka UI focuses the first field with its text selected. In React the caret sits at the end of "Roadside reach Q1" and nothing is selected. Both are valid, but React is the approved behavior. Fix if you want parity: `@open-auto-focus.prevent` plus a manual focus without select, or place the caret. Decision (2026-11-23): keep Reka's default.
2. **State attribute.** Reka sets `data-state="open|closed"`. Base UI sets `data-open`. Styling selectors are rewritten (`data-[state=open]:`). No visible difference.
3. **Fade animation.** React fades with a CSS transition on `data-starting-style` and `data-ending-style`. Reka needs a CSS animation for the exit, so Vue uses `animate-in fade-in-0` and `animate-out fade-out-0` from `tw-animate-css`, at `--pl-duration-fast` (computed: 0.15s, `cubic-bezier(0, 0, 0.2, 1)`, the same as `ease-out`). No zoom. Same look. Not checked: `prefers-reduced-motion` (React has no extra rule either).
4. **Body pointer events.** While a Reka modal is open, `<body>` gets `pointer-events: none` (the dialog re-enables it). Base UI leaves `auto`. Not user visible. It matters if something outside the dialog needs clicks while it is open.
5. **Focus guards.** Base UI adds focus-guard `<span>` elements around the dialog, so a Tab can briefly land on a span before wrapping. Reka wraps without them. Not user visible.
6. **Whitespace in the description.** The Vue description text contains leading and trailing spaces from the template. HTML collapses them. No visible difference.
7. **Cancel button `data-slot`.** In Vue, a Button wrapped in `DialogClose as-child` gets `data-slot="dialog-close"` instead of `"button"`, because the wrapper's attribute wins. React keeps `"button"` for the render prop. No style depends on it.
8. **Controlled input API.** React uses `value` and `onChange`. Vue uses `v-model` (native `defineModel`, no `@vueuse/core`) and `default-value` for the uncontrolled case.

## Not verified

- The Browser pane was hidden, so animation frames are paused. React's enter fade showed `opacity: 0` until the page was interacted with, so I could not measure the React fade timing, only compare the declared CSS. Vue's computed fade values were read while it ran (0.15s).
- Hover and focus-visible colors were compared by CSS values only for focus ring (2px solid, 2px offset, checked on the Vue dialog). Hover was not triggered.
- Screen reader output (VoiceOver, NVDA) was not tested.
- Safari and Firefox were not tested.

# Batch 1 (Forms): Textarea, Checkbox, Switch, Radio Group

Same method as the pilot (20 more specimens, same markup on both pages, `FormsSection.vue` and the harness `FormsSection`).

## Pixel check

- Textarea (4), Checkbox (6), Switch (6): **0 differences** in light and dark (position, size, 25+ computed styles, thumb position and size, check mark position and size).
- Radio Group (4): **1 difference**, the cursor. See below.

## Behavior check (keyboard, real key presses)

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Space toggles Checkbox | yes | yes |
| Space toggles Switch | yes | yes |
| Switch focus ring | 2px solid, 2px offset | same |
| Arrow keys in Radio Group | move focus **and select** | Reka alone only moves focus; **fixed to match React** (decision 2026-11-23) |

## Differences found

1. **Radio arrow keys (decided: select like React, implemented).** `RadioGroup` notes arrow key presses and each `RadioGroupItem` selects itself when focused by one (`radio-group/context.ts`). Re-tested: ArrowDown x2 selects the third radio and ArrowDown wraps past the disabled one, as in React. Original finding: In React, ArrowDown or ArrowUp selects the radio it moves to (the WAI-ARIA radio pattern). In Reka, the arrows only move focus; the selection changes on Space or click. Tested: React ArrowDown x2 from the first radio selects the third. Vue leaves the first selected, with focus on the third. Fix if you want parity: select on arrow focus (`@keydown`/`@focus` handler on `RadioGroupItem`), or accept Reka's behavior.
2. **Radio cursor.** Vue shows the pointer cursor on radios (and the default cursor when disabled). React shows `auto`, because Base UI renders a `span` and the base rule in `globals.css` has no `[role="radio"]`. Vue follows the brand rule ("interactive controls use the pointer cursor"). React is the one that is out of line. I did not change React.
3. **API names.** Reka uses `v-model` and `default-value` (`checked` and `defaultChecked` in React). Checkbox and Switch take a boolean model. Radio Group uses `v-model` or `default-value` with `value` on each item. Vue keeps the Reka names so templates stay idiomatic. `size="sm"` on Switch and `aria-invalid` behave as in React.
4. **State attribute.** `data-state="checked|unchecked"` instead of `data-checked` and `data-unchecked`. No visible difference.
5. **Invalid state.** React also styles `data-invalid` (Base UI Field). Vue styles `aria-invalid` only; there is no Field integration yet (Field is in the Forms batch 2).
6. **Indeterminate Checkbox.** Reka supports `indeterminate`; it shows the check mark. Not in the spec, not styled, not used.

# Batch 2: Select, Native Select, Field, Input Group (+ Separator)

Separator came with Field (the CLI installs it as a dependency). Specimens: 5 Select triggers, 4 Native Select, Field (group, set, vertical, error, horizontal, separator), 4 Input Group; React and Vue pages use the same markup.

## Pixel check

- Select (5), Native Select (4), Input Group (4), Field vertical, error state and separator: **0 differences**, light and dark, including the position, size, colors and font of every child element.
- Field group, set and horizontal: the geometry of every child is identical (checkbox 18 x 18 at the same x and y, label at the same x and width). Only the DOM differs: Base UI renders the checkbox as a `span` plus a hidden `input`, Reka renders a `button`.
- Open Select popup (item-aligned, selected Jakarta): same position (28 px above the trigger), same 241 px height, radius 4, shadow `--pl-shadow-overlay`, no border, items 32 high with radius 2, label 12 px muted, disabled item at 40%.

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Popup aligns the selected item over the trigger | yes | yes (`position="item-aligned"`, the default here) |
| Highlight color | `surface-hover` over the selected fill | same (fixed, see 2) |
| Typeahead "m" | highlights Medan | highlights Medan |
| Enter selects, popup closes, focus returns to trigger | yes | yes |
| Escape closes without changing the value, focus returns | yes | yes |

## Differences found

1. **1px narrower popup.** The Reka popup is 191 px wide where React's is 192 (the trigger is 192). Items are 183 instead of 184. Not visible in practice.
2. **Highlight vs selected (fixed).** On first Vue pass the selected item kept its selected fill while highlighted. Added `data-[highlighted]:data-[state=checked]:bg-accent` so the highlight wins, as in React.
3. **API.** Reka `Select` takes `v-model` and `default-value`; there is no `items` prop (the selected label comes from the item text). `SelectContent` has `position` (`item-aligned` default, or `popper`). The React `alignItemWithTrigger`, `side` and `align` props map to `position` plus Reka's `side` and `align`.
4. **State attributes.** `data-state="open|closed|checked|unchecked"`, `data-highlighted`, `data-disabled`, `data-placeholder`; React uses `data-open`, `data-selected` and so on. No visible difference.
5. **Animation.** `item-aligned` opens with no animation in both. `popper` fades with `animate-in` / `animate-out` at `--pl-duration-fast`.
6. **Field and `data-invalid`.** Vue Field is plain markup; set `aria-invalid` on the control and show `FieldError`, as in the React examples. There is no Base UI Field validity state to connect.
7. **`FieldError`** takes an `errors` array or a slot (messages only, one string or a list).
8. **No `v-model` on `InputGroupInput` wrapper work needed:** attributes and `v-model` fall through to `Input`.

## Not verified

- Select keyboard tests in React were unreliable (hidden Browser pane: exit animations stall, so "open" stays true). React's keyboard behavior was taken from the earlier results and Base UI behavior, not re-measured. In Vue, ArrowDown right after a page reload did not move the highlight once; it worked in a fresh session. Not reproduced.
- Scrolling lists (scroll buttons), long lists, `popper` position, RTL, touch.
- Screen readers.

# Batch 3: Toggle, Toggle Group, Slider, Combobox

Specimens: Toggle (2 variants x 3 sizes, pressed, icon, disabled, invalid), 4 Toggle Groups (joined outline, joined default with disabled item, spacing 2, vertical), 4 Sliders (single, range, disabled, vertical), 4 Comboboxes (single, chips, invalid, disabled).

## Pixel check

- Toggle: all 14 match in light and dark. The 2 "pressed" ones differed until I used Reka's `default-value` (not `default-pressed`); now the pressed fill is `surface-selected` as in React.
- Toggle Group (4): **0 differences**, light and dark.
- Combobox chips: **0 differences** (height, chip size, radius, colors, remove button).
- Combobox single, invalid, disabled: the Input Group wrapper and every child (input, clear and chevron buttons) have the same position, size and colors. Only `min-height` computes as `0px` in Vue and `auto` in React (the height is fixed at 40 anyway).
- Slider (4): track, thumb (20 x 20, radius 4, 2px primary border) and the label and value row are at the same positions. Two small differences: the filled range ends 2 px earlier in Vue (it is behind the thumb), and React adds a hidden 16 px `input` inside each thumb (Base UI form support).

## Behavior check (Vue, real key presses)

| Behavior | Result |
|---|---|
| Toggle Group: ArrowRight moves focus, Space toggles, single mode replaces the pressed item | works |
| Slider: arrows (+1), PageUp (+10), End (max); label and value row follow; 2px ring with 2px offset | works |
| Range slider thumbs are named by `thumbLabels` | works |
| Combobox: typing filters ("su" shows Surabaya, highlighted), Enter selects and closes | works |
| Combobox: "No results" row (14/20 muted, centred, 36 high) when nothing matches | works |
| Combobox: clear button only while there is a value; clears the input | works |
| Combobox multiple: Enter adds a chip; typed text clears after a pick; Backspace in an empty input removes the last chip; the x removes a chip | works after the fixes below |

React keyboard behavior was not re-measured (hidden Browser pane); it follows the approved Base UI behavior.

## Differences found

1. **Prop names.** Toggle: `default-value` / `v-model` (React `defaultPressed`). Toggle Group: Reka needs `type="single"` or `"multiple"` (React `multiple` and `defaultValue` array). Slider and Combobox keep Reka's `v-model` / `default-value`.
2. **Combobox API.** Reka has no `items` prop and no render-function children; items are written as `v-for` inside `ComboboxList`. `ComboboxInput` (an Input Group with clear and chevron) and `ComboboxChips` / `ComboboxChip` / `ComboboxChipsInput` keep the React names. Chips need `:value` on each `ComboboxChip`.
3. **Fixed in the wrapper (Reka does not do these):** clear the typed text after a pick in multiple mode, remove the last chip on Backspace in an empty input, show the clear button only while there is a value. All three are in `combobox/`.
4. **Slider label row.** React uses Base UI `Slider.Label` and `Slider.Value`. Vue uses a plain `SliderLabel` and an `<output>` `SliderValue` that follows the model.
5. **Typing into a filled single combobox** appends to the shown text in both (Reka and Base UI). Select the text first to replace it.
6. **Closed popup in the DOM.** Reka keeps a hidden copy of the items while closed; use `aria-expanded` to read the open state.

## Not verified

- Combobox popup geometry and the `popper` position against React (only the input side was compared); long lists and scrolling; `Combobox` with object values (`by`); async items.
- Touch dragging on Slider, RTL, screen readers.
- React Combobox keyboard.

# Batch 4 (Overlays): Alert Dialog, Sheet, Popover, Tooltip

Specimens: Alert Dialog default (media, destructive action) and `sm`, Sheet on all four sides, Popover, Tooltip. For each open panel I compared every element inside it (position inside the panel, size, color, type, radius, padding, gap, shadow, display) plus the overlay (size, `--pl-scrim` color, fixed).

## Pixel check

- Alert Dialog default (8 elements) and `sm` (7): **0 differences**. Same position (centred, 448 and 320 wide), same overlay.
- Sheet right, left, top, bottom (10 elements each): **0 differences**. 384 wide at the sides, full width at top and bottom, same position and overlay.
- Popover (4 elements): **0 differences** after two fixes (below). Same 288 width and position.
- Tooltip: opens after about 300 ms on hover (measured 291 ms after the timer started), 4 px above the trigger, 12 px type, padding 6 12, radius 4, no arrow. React's tooltip box was not measured (see not verified).

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Alert Dialog role, labelled by title, described | `alertdialog`, yes | same |
| First focus | Cancel | Cancel |
| Outside click | does not close | does not close |
| Escape | cancels, focus returns to the trigger | same |
| Click on the action button | **stays open** (the caller closes it) | **stays open** (decided 2026-11-23: matches React; Reka's own action would close it) |
| Popover: Escape, outside click | close, focus back on the trigger | same |
| Popover opens above the trigger when there is no room below | flips | flips |

## Differences found

1. **Alert Dialog action (decided: match React, implemented).** `AlertDialogAction` is now a plain Button that does not close the dialog; use `v-model:open` to close it. Original finding: In React, `AlertDialogAction` is a plain Button; clicking it does nothing to the dialog, and the caller closes it (in the playground nothing closes it). In Reka, `AlertDialogAction` closes the dialog on click. Closing is what most callers want, and `v-model:open` still works for async confirms, but it is a different contract. 2. **Collision padding (fixed).** Base UI keeps overlays 5 px from the viewport edge by default; Reka uses 0. Added `collisionPadding: 5` to Popover, Tooltip, Select and Combobox so the position matches.
3. **Popover title tag (fixed).** Base UI renders the title as `h2`; the Vue title was `h4`. Now `h2`.
4. **Sheet and fade animations.** Base UI slides the sheet with a CSS transition driven by `data-starting-style` / `data-ending-style`; Reka needs keyframes, so Vue uses `animate-in slide-in-from-right` and `animate-out slide-out-to-right` at `--pl-duration-slow` (200 ms), and fades at `--pl-duration-fast`. Same look; timing was not measured (hidden pane).
5. **Tooltip.** Reka's `TooltipProvider` takes `delayDuration` (set to 300 by default here), React's `delay`. The tooltip has no arrow, as in the spec. The tooltip box has no `role` of its own in Reka (the role sits on a hidden copy).
6. **Popover parts.** Reka has no Popover title or description parts, so `PopoverTitle` and `PopoverDescription` are plain elements. `PopoverAnchor` from the CLI was removed (not in React).

## Not verified

- Sheet and Alert Dialog animation timing, tooltip close timing, tooltip skip-delay behavior when moving between triggers, and the React tooltip box.
- Focus trap in Sheet and Alert Dialog (same Reka dialog as the pilot, which was checked), touch, screen readers.
- Scroll lock layout shift with a page scrollbar.

# Batch 5 (Menus): Dropdown Menu, Context Menu, Hover Card

Sonner was left out of this batch: it needs the `vue-sonner` package (2.9.0, 216 KB unpacked), and dependencies need your OK first.

Specimens: a Dropdown Menu with label, icon items, shortcut, disabled item, checkbox items, radio items, submenu and a destructive item; a Context Menu (label, item with shortcut, disabled, destructive); a Hover Card.

## Pixel check

- Dropdown Menu (30 elements: popup, items, label, separators, indicators, submenu trigger): **0 differences**. Same position (60, 658), 144 x 360.
- Hover Card (3 elements): **0 differences**, same position and 256 x 92.
- Context Menu (8 elements): the styles of every element match; only the position differs (below).

## Behavior check (real clicks and key presses)

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Menu role | `menu` | `menu` |
| ArrowDown x2 from a fresh menu | highlights Download | highlights Download |
| Typeahead "s" | highlights Show totals (skips the disabled item) | same |
| Escape | closes, focus returns to the trigger | same |
| Click a plain item | closes | closes |
| Click a checkbox item | **stays open** | **stays open** (fixed, see 1) |
| ArrowRight on "Share" opens the submenu | not re-measured | the submenu did not show after typeahead put the highlight on "Show totals" (the test was on the wrong item); not re-tested |
| Hover Card | opens 300 ms after hover, closes 150 ms after leaving | same delays set; open position and size match |

## Differences found

1. **Checkbox and radio items closed the menu in Vue (fixed).** Base UI keeps the menu open when you pick a checkbox or radio item; Reka closed it. Both items now call `preventDefault` on select unless `close-on-click` is set (same name idea as Base UI's `closeOnClick`).
2. **Context Menu position near the screen edge.** With a right-click at the bottom of the viewport, React flips the menu above the pointer (y 897) and Vue slides it up to fit (y 968). Away from the edges there is no difference expected. The x position is 2 px further right in Vue (312 vs 310).
3. **Focus on open.** After a click, React keeps focus on the trigger and highlights with arrows; Reka moves focus into the menu (`role="menu"`). Same keyboard result, not visible.
4. **Hover Card delays.** Base UI puts `delay` and `closeDelay` on the trigger; Reka puts `open-delay` and `close-delay` on the root. Defaults 300 and 150 are set on `HoverCard`.
5. **Label needs a group.** In React, `DropdownMenuLabel` and `ContextMenuLabel` must sit inside a group (Base UI throws otherwise). In Vue a label works anywhere; use `DropdownMenuGroup` for the same markup.
6. **Collision padding.** 5 px as in the earlier overlays.

## Not verified

- Submenu open and close with the keyboard, the radio item behavior, disabled item behavior with the pointer, long menus and scrolling, touch long-press for Context Menu.
- Animation timing (hidden pane) and screen readers.

# Sonner (Toast)

Added `vue-sonner` **2.0.9** (216 KB unpacked, approved 2026-11-23; earlier notes said 2.9.0 by mistake). It works in plain Vue 3 without Nuxt. Its stylesheet is imported by `Sonner.vue` (`vue-sonner/style.css`), and a one-line type declaration for that import is in `packages/ui-vue/src/env.d.ts`.

## Pixel check

Default, success, info, warning and error toasts, each measured as the front toast: **0 differences** on every element (position 24 px from the bottom and right, 360 wide, heights 44, 66 and 86, radius 4, padding, gap, shadow, title and description type) and on the status icon colors (`success-text`, `info-text`, `warning-text`, `danger-text`).

## Differences and notes

1. **Icons through slots.** vue-sonner takes icons as slots (`#success-icon` and so on) in the Toaster; React takes an `icons` prop. Both use the Playlog `Icon` (check, info, warning, alert-circle, close). Loading keeps the built-in spinner.
2. **Class option name.** vue-sonner calls the class map `toastOptions.classes`; Sonner (React) calls it `classNames`.
3. **Theme.** Follows the `.dark` class on `<html>` through a MutationObserver, like React. No color-mode package.
4. **API.** `toast`, `toast.success`, `toast.info`, `toast.warning`, `toast.error` and `<Toaster />` have the same names; import from `@workspace/ui-vue/components/sonner`.

## Not verified

- The 6 second auto-dismiss, stacking and swipe behavior (the same library family as React, not re-timed), action and cancel buttons, `toast.promise`, loading state, and the dark-mode look.

# Batch 6 (Navigation): Tabs, Breadcrumb, Pagination, Navigation Menu

Specimens: Tabs default, line and vertical (active, idle, disabled), Breadcrumb with ellipsis, Pagination with active page and status, Navigation Menu with two panels, an active link and a plain link.

## Pixel check (closed state)

- Tabs lists and every trigger (default, line, vertical; active, idle, disabled), including the 2px underline: **0 differences**, light and dark.
- Breadcrumb: **0 differences**. Pagination: **0 differences** (the status item is hidden above `sm`).
- Navigation Menu bar and its triggers and links (idle, active): **0 differences**.
- Only the DOM differs for the tab group and nav root: Base UI renders all panels (inactive ones hidden), Reka only the active one.

## Pixel check (open Navigation Menu panel)

The "Reports" panel: size 400 x 144, radius 4, shadow `--pl-shadow-overlay`, no border, link size (190 x 70 and 190 x 54), padding 8 12, radius 2, type and colors, and the open trigger fill (accent): **same**. Position:

- **Left edge (fixed):** Reka centers the panel under the trigger by default; now it starts at the left edge of the bar. React aligns it to the open trigger. For the first trigger these are equal; for later triggers the Vue panel stays at the bar's start (see differences).
- **Vertical (not matched):** React flips the panel above the bar when there is no room below; Reka always opens below (the panel can run off the screen at the bottom).

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Arrow keys in Tabs | move focus only; Space or Enter selects | same (fixed, see 1) |
| Focus ring on a tab | 2px solid, 2px offset | same |
| Arrow past a disabled tab | focus **lands on** the disabled tab | focus **skips** it |
| Navigation Menu: click trigger opens panel, Escape closes it, focus returns to the trigger | yes | yes |

## Differences found

1. **Tabs activation (fixed).** Reka selected a tab as soon as you arrowed to it; Base UI only moves focus. `Tabs` now defaults to `activation-mode="manual"` to match.
2. **Disabled tab focus.** Base UI lets arrow keys focus a disabled tab; Reka skips it. Both are valid ARIA; not changed.
3. **Pagination is presentational.** shadcn-vue's Pagination is data driven (Reka `PaginationRoot` with a page count and list). The React one is markup you assemble, so the Vue version is hand written the same way (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`, `PaginationStatus`). Reka's `PaginationRoot` is not used.
4. **Navigation Menu panel position (decided 2026-11-24: accept for now).** Opens below the bar, aligned to the bar's left edge, no flipping; revisit if the product needs more than a top nav. Base UI anchors the panel to the open trigger with collision flipping; Reka has one shared viewport under the bar with no collision handling. If the product needs the exact behavior later, the viewport would need a small positioning layer.
5. **Navigation Menu morphing.** Base UI resizes the panel between triggers at `--pl-duration-slow`; the Vue viewport resizes with the same transition on width and height, but the movement between triggers was not checked.
6. **Props.** Tabs use `v-model` / `default-value`; `NavigationMenuLink` takes `active`; `PaginationLink` takes `is-active`; `BreadcrumbLink` renders an `a` and takes `as-child`.
7. **`data-specimen` on `NavigationMenuContent` is lost** in Reka (the content is teleported to the viewport); not a library difference, only a test hook.

## Not verified

- Panel movement between triggers, keyboard (arrow keys inside the menu, Tab order), hover opening (the menu opens on click in the test), mobile hiding below `md`.
- Vertical Tabs arrow keys, Breadcrumb ellipsis menu, Pagination below `sm`, animation timing, screen readers.

# Batch 7 (Menubar and Command)

Specimens: a Menubar with three menus (File with label, icon item, shortcut, disabled item, checkbox, radio group, submenu and a destructive item; View; a disabled Help), an inline Command with two groups, and a Command Dialog.

## Pixel check

- Menubar bar and its three triggers (idle, disabled): **0 differences**, light and dark.
- Open File menu (26 elements: popup, label, items, indicators, separators, submenu trigger): **0 differences**; same position (4 px left of the trigger, 8 below) and size 144 x 296.
- Command input row (48 high, search icon, 14/20 text): **0 differences**.
- Command list: group headings (12/16 medium muted), 32 px items, icons, shortcuts, disabled item at 40%: same sizes and colors, total height 240. One visual difference (below).
- "No results": 14/20 muted-foreground, centred, padding 24 12, as in React.

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Open a menu with Enter, first item highlighted | yes | yes |
| ArrowRight inside an open menu opens the next menu, first item focused | yes | yes |
| Escape closes, focus stays in the bar | yes | yes |
| Open with the mouse, then use the keyboard | focus moves into the menu | focus moves into the menu (fixed, see 2) |
| Command: typing filters, groups with no match hide, first match highlighted | yes | yes |
| Command: no match shows "No results" | yes | yes |

## Differences found

1. **First Command item is highlighted on load (Reka).** Reka highlights the first item as soon as the list mounts; React shows no highlight until you type or press an arrow key. Not changed (a first-item highlight is common for palettes).
2. **Mouse-opened menubar menus (decided: match React, implemented).** `MenubarContent` includes a small marker component (`menubar/FocusOnOpen.vue`) that focuses the menu when it opens. Re-tested: click File, ArrowDown, ArrowRight opens View with its first item focused. Original finding: Reka only moves focus into the menu when it is opened from the keyboard (Enter, Space or ArrowDown on the trigger). After a mouse click, the arrow keys do not enter the menu until you press ArrowDown again from the trigger. Base UI focuses the menu after a click. 
3. **Command API.** The React Command is data driven (`items`, `onSelect`, `CommandCollection`, render functions) on top of the Base UI Combobox. shadcn-vue's Command is declarative on Reka `Listbox` (`CommandGroup`, `CommandItem` as children, `@select` on an item, `heading` on a group). There is no `CommandCollection` in Vue. The Vue filter is a `contains` match on the item text.
4. **Command search is not auto-focused** (removed `auto-focus` so an inline Command does not steal focus, as in React). Inside `CommandDialog` the dialog focuses the input.
5. **Disabled on the trigger.** Reka puts `disabled` on `MenubarTrigger`; React puts it on `MenubarMenu`.
6. **`data-specimen` on `MenubarContent` is lost** in Reka (teleported); test hook only.

## Not verified

- Hover switching between menus while one is open, Command Dialog open and close with Cmd or Ctrl K (the shortcut is app code, not in the library), keywords search, scrolling a long list, and screen readers.

# Batch 8 (Sidebar, with Skeleton)

Specimens: a static Sidebar (`collapsible="none"`, every part in flow: header with input, group label and action, nav items default, active with badge, with action, `sm`, `lg`, `outline`, disabled, a parent with a sub menu, separator, skeleton rows, footer) and an interactive Sidebar (`collapsible="icon"` inside a box, trigger, rail, tooltips, inset). Skeleton is installed because `SidebarMenuSkeleton` needs it; it is restyled to the React one (muted fill, radius 4, no pulse for reduced motion).

## Pixel check

- Static sidebar, 27 elements (container, header, input, content, group, label, action, every item variant, badge, menu action, sub menu and its buttons, separator, skeleton row, footer): **0 differences**, light and dark.
- Interactive sidebar expanded (container, trigger, active item): **0 differences**, light and dark (30 of 30 specimens).
- Interactive sidebar collapsed to icons (48 wide, 32 px icon buttons): **0 differences**.
- The skeleton text bar has a random width in React and a width derived from a stable id in Vue; the row height (40) and icon size match.

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Trigger click collapses to icons and back | yes | yes |
| Cmd or Ctrl B toggles; the state is saved in the `sidebar_state` cookie | yes | yes |
| Collapsed: hovering an icon shows a tooltip on the right | yes | yes |
| Below 768 px: the sidebar becomes a left Sheet, titled "Sidebar" (hidden), no close button | yes | yes |
| Controlled (`open` and `onOpenChange` / `v-model:open`) and uncontrolled (`defaultOpen`) | yes | yes |

## Differences found

1. **Mobile sheet width.** React renders the sheet at 75% of the viewport (281 px at 375) because Sheet's `data-[side=left]:w-3/4` outranks the sidebar's `w-(--sidebar-width)`, so the 248 px width in the spec is not applied on phones. Vue renders 248 px as specified. Not changed in React (`packages/ui` is out of scope); the React fix would be `data-[side=left]:w-(--sidebar-width)` on the mobile `SheetContent`.
2. **Provider API.** `v-model:open` instead of `open` and `onOpenChange`. `useSidebar()` returns refs and a computed `state` (use `.value` in scripts). `Sidebar` does not take a `dir` prop.
3. **Tooltip prop.** `SidebarMenuButton` takes `tooltip` as a string or a component; React also accepts the props of `TooltipContent`.
4. **Active state.** `is-active` on `SidebarMenuButton` and `SidebarMenuSubButton`, rendered as `data-active=""` like React.
5. **Own `useIsMobile`.** The shadcn-vue output used `@vueuse/core`; replaced with a small matchMedia composable in `sidebar/utils.ts` (no new dependency).
6. **Tooltip provider.** `SidebarProvider` wraps its content in the library `TooltipProvider` (Reka requires one; delay 300 ms). React needs none.

## Not verified

- Floating and inset variants, right-side sidebar, RTL, the Rail drag target, screen readers, and the open and close animation timing in Vue (the React side stalls while the pane is hidden).

# Batch 9 (Badge, Alert, Card, StatCard)

Specimens (`DisplaySection.vue` and the harness `DisplaySection`): Badge in all 10 variants, with an icon, disabled, invalid and rendered as a link; Alert in 5 variants with icon, title and description, one without an icon and one with an action; Card default (header, title, description, action, content, footer) and `sm`; StatCard with icon and a good delta, a bad delta, a neutral delta and no footer.

## Pixel check

- 106 elements (every specimen and its children: position, size and 40 computed styles): **0 differences**, light and dark.
- Dark mode needed the tab in front: React's color transitions stall in a hidden tab and gave false differences until it was fronted.

## Behavior check

These four are presentational. Not interactive except the Badge as a link (hover, focus ring), which was not exercised.

## Differences found

1. **StatCard is hand built** (no shadcn-vue source). Same prop names as React (`label`, `value`, `delta`, `trend`, `footer`). The React `icon` node is the `icon` slot in Vue; `label`, `value`, `delta` and `footer` can also be slots when they need markup.
2. **Badge as a link** uses `as="a"` (React: `render={<a />}`). It also sets `data-variant`, like React.
3. **Alert** gained `AlertAction` (shadcn-vue has none); `role="alert"` as in React.
4. **Card** `size` is `default | sm`, rendered as `data-size`, as in React.
5. **Optional icon in Badge.** React documents `data-icon="inline-start" | "inline-end"` on the icon; the Vue badge takes the icon as a plain child, same sizing rules (`[&>svg]:size-3!`).

## Not verified

- Badge focus ring and hover when it is a link, long text wrapping in Alert and Card, container-query behavior of `CardHeader`, and screen readers.

# Batch 10 (Table, Avatar, Progress, Spinner)

Specimens (`Display2Section.vue` and the harness `Display2Section`): Table (caption, header with a numeric column, three body rows with one selected, footer, and a dense table); Avatar (3 sizes, with an image, 3 sizes with a status badge, a group with a count); Progress (40% with label and value, 0%, 100% without a label); Spinner (default and a larger one).

## Pixel check

- 126 elements shared with React (every specimen and its children: position, size and 47 computed styles, plus text and slot attributes): **0 style differences**, light and dark.
- React renders one extra element in Progress, a 1 px hidden helper span (Base UI's value announcer); Vue has none.

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Progress: `ProgressValue` shows "40%" | yes | yes |
| Progress: the root is named by the label (`aria-labelledby`) | yes | yes |
| Progress: `aria-valuetext="40%"`, value hidden from assistive tech, label `role="presentation"` | yes | yes (aligned after the first run) |
| Avatar image shows when it loads | yes | yes |
| Spinner: `role="status"`, name "Loading", spins | yes | yes |

## Differences found

1. **`value` is `model-value`.** `Progress` takes Reka's `model-value` (React: `value`). It is display only, no v-model.
2. **Progress state attributes.** React sets `data-progressing`, `data-complete`; Reka sets `data-state="loading|complete"`, `data-value`, `data-max`. Nothing in the library styles them.
3. **Progress root name.** Reka also sets `aria-label="40%"` on the root; with a label present `aria-labelledby` wins, without one the name is the percent. React has no accessible name there, only `aria-valuetext`.
4. **Avatar image role.** Reka adds `role="img"` to the `<img>`; React leaves it out. Styles are identical.
5. **Extra parts.** `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` (not in shadcn-vue) and `Spinner` are hand built. `TableEmpty`, which the CLI adds, was removed because React has no such part.
6. **`Icon` attribute order.** `Icon.vue` now lets attributes passed by the caller override its own `role` and `aria-hidden`, as React's `{...props}` does. `Spinner` needs this (`role="status"`, `aria-hidden="false"`). No other component passed those.

## Not verified

- Progress with no value (indeterminate), Table row hover and selection by keyboard, sticky headers and horizontal scroll at narrow widths, a failing avatar image falling back to initials, and screen readers.

# Batch 11 (Accordion, Collapsible, Empty, Item)

Specimens (`Display3Section.vue` and the harness `Display3Section`): Accordion (three items, the first open by default, one disabled); Collapsible (open by default, Button trigger); Empty (icon media, title, description, two buttons, inside a bordered box); Item in 3 variants x 3 sizes with icon media, title, description and an action, plus an Item as a link with image media, a selected link, a disabled button, a separator, and an Item with header and footer.

## Pixel check

- 61 specimen groups (every specimen and its children: position, size and 41 computed styles): **0 differences**, light and dark, once the fields that differ by design are set aside (below). The `accordion` root group itself is not compared as a whole, because Reka keeps closed panels in the DOM; its items, triggers and panels are compared one by one.
- Fields set aside: `transition-*` on the Accordion and Collapsible panels (React animates `height` with a transition; Reka uses keyframes, same duration and easing), `role` of the Item separator, and `aria-expanded`.

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Accordion: click opens an item and closes the other (single) | yes | yes |
| Accordion: click an open item closes it | yes | yes |
| Accordion: ArrowUp moves focus to the previous trigger | yes | yes |
| Accordion: ArrowDown past the last enabled trigger | stays on it | wraps to the first (see 2) |
| Collapsible: trigger toggles, `aria-expanded` follows | yes | yes |
| Accordion and Collapsible panel animation: 0.15 s, ease-out | yes | yes (set in CSS; timing not measured, the pane throttles animations) |

## Differences found

1. **Accordion props.** Reka: `type="single" | "multiple"`, `collapsible`, `default-value` (a string, or an array for `multiple`), and each item needs a `value`. Base UI: `multiple`, `defaultValue` (an array), item `value` optional. The Vue `Accordion` defaults to `type="single"` and `collapsible` so a click behaves like React.
2. **Arrow keys with a disabled last item.** Base UI's disabled trigger is a native `disabled` button; ArrowDown from the last enabled trigger stays put. Reka skips disabled triggers and wraps to the first. Only matters when the last item is disabled.
3. **Panel markup.** Reka keeps a closed panel in the DOM with `hidden`; Base UI removes it. The accordion trigger carries `data-state`, not `data-open`.
4. **Extra attributes go to the button.** `AccordionTrigger` forwards `id`, `data-*` and the like to the button (as React does) instead of the heading wrapper.
5. **Item separator role.** `ItemSeparator` is the library `Separator`, decorative by default (`role="none"`); React's has `role="separator"`.
6. **Item as link or button.** `as="a" href="..."` or `as="button"` (React: `render={<a />}`). `data-selected="true"` and `aria-disabled` work as in React.
7. **`EmptyMedia` slot name.** Its `data-slot` is `empty-icon` in both (kept to match React).
8. **No Collapsible template.** React has no Code Connect template for Collapsible, so there is none for Vue.

## Not verified

- Accordion with `multiple`, keyboard Home and End, Collapsible with the `disabled` prop, Empty inside a table body, a focus ring on Item links, long text clamping (`line-clamp`) on Item titles and descriptions, and screen readers.

# Batch 12 (Kbd, Scroll Area, Aspect Ratio, Button Group)

Specimens (`Display4Section.vue` and the harness `Display4Section`): Kbd (single key, a group, one with an icon); Scroll Area (vertical with 20 rows, horizontal with an added `ScrollBar`, and a short one with no overflow); Aspect Ratio (16:9 and 1:1); Button Group (outline horizontal, vertical, filled with a separator, with a text label and an Input, and a nested group).

## Pixel check

- Kbd (3 specimens), Aspect Ratio (2), Button Group (all 9, children included, with a text label and an Input): **0 differences**, light and dark.
- Scroll Area root, scroll bar and thumb (vertical and horizontal): **0 differences**, light and dark (37 groups in dark).
- Scroll Area viewport: identical except one computed style (below).

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Hovering the area shows the bar (fades in) | yes | yes (opacity 1) |
| Wheel scrolls, the thumb moves, the bar shows while scrolling and the flag clears afterwards | yes | yes |
| Viewport is focusable (`tabindex="0"`) only while it overflows, `-1` otherwise | yes | yes (set from code, see 2) |
| No bar when the content fits | yes | yes |
| Scroll bar is `aria-hidden` | yes | yes |

## Differences found

1. **Viewport `overflow-x`.** With only a vertical bar, React's viewport computes `overflow-x: scroll`, Reka's `hidden`. There is nothing to scroll sideways, so nothing visible changes.
2. **Two Base UI behaviors added in `ScrollArea.vue`.** Reka has no `data-scrolling` flag and always sets `tabindex="0"` on the viewport (after the attributes you pass, so they cannot override it). The wrapper sets `data-scrolling` for 500 ms after a scroll and writes the tabindex from a ResizeObserver overflow check.
3. **Bar visibility** uses `group-hover` on the root plus `data-scrolling` and focus, instead of Base UI's `data-hovering` and `data-scrolling` on the bar itself. The scroll area uses `type="auto"` (Reka's default is `hover`), so the bar exists only while the content overflows.
4. **Button inside a group has no `tabindex`.** React's Base UI Button renders `tabindex="0"`; the Vue Button does not. Same focus order.
5. **Aspect Ratio is hand built** (React's is a plain div with `--ratio`, not Reka's `AspectRatio`). Prop `ratio` is required, same as React.
6. **Kbd inside a Tooltip.** The shadcn-vue inversion classes were dropped; the Playlog Tooltip is the popover surface, as in React.

## Not verified

- Keyboard scrolling (arrow keys, Page Up and Down) in the viewport, dragging the thumb, scroll area with `type="always"`, RTL, an Input Group inside a Button Group, a Select as the last child, and screen readers.

# Batch 13 (Input OTP)

`input-otp` has no shadcn-vue source, so the CLI's `pin-input` (Reka PinInput) was installed, read, and replaced by an `input-otp` component with the Base UI API of the React one. No new dependency (Reka already ships PinInput).

Specimens (`OtpSection.vue` and the harness `OtpSection`): a 3 + 3 grouped field with a label, a separator and a default value of "123"; an invalid field with `aria-describedby`; a disabled field; a masked field.

## Pixel check

- 11 element groups (root, groups, slots, separator, in every specimen): **0 differences in position, size and 32 computed styles**, light and dark.
- Vue has one extra element per field: Reka's hidden form input.

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Click an empty slot, type digits: slots fill in order, focus follows | yes | yes |
| A letter typed in the numeric field is rejected, the next digits still fill | yes | yes |
| `onValueComplete` / `@value-complete` fires with the full string ("123456") | yes | yes |
| Backspace clears the last filled slot | yes | yes |
| Backspace: focus afterwards | moves back one slot | moves back one slot (matched in the wrapper, see 1) |
| ArrowLeft moves one slot, Home goes to the first | yes | yes |
| Numeric keyboard (`inputmode="numeric"`), `autocomplete="one-time-code"`, masked slots are `type="password"` | yes | yes |
| `invalid` sets `aria-invalid` and the danger border, `aria-describedby` reaches every slot | yes | yes |

## Differences found

1. **Backspace focus (decided: match React).** In React, Backspace on a filled slot clears it and moves focus to the previous slot. Reka clears it and stays. `InputOTPSlot` now moves focus back one slot after Reka clears a filled slot; Backspace on an empty slot is still Reka's (moves back and clears). Checked with real keys: type 123, focus slot 2, Backspace gives 1 and focus on slot 1.
2. **API.** `length`, `validation-type` (`numeric` default, `alpha`, `alphanumeric`, `none`), `mask`, `disabled`, `invalid`, `id`, `name`, `required`; `v-model` and `default-value` are strings; `@value-complete` and `update:modelValue` events. `length` is informational: the slots you render set the real count (it only feeds each slot's accessible name). Slot `index` is its order inside the field, read from the DOM after mount.
3. **Label.** `id` goes on the first slot so `<Label for="...">` names the field. Reka names every slot "pin input N of M"; the Vue slots drop that on the first slot (so the label wins) and say "Character N of M" on the others. React names only the first slot.
4. **`maxlength`.** React sets `maxlength` on every slot; Vue does not.
5. **Character validation.** Reka's own filtering leaves a gap when a multi-character insert (autofill, fast typing, an IME) has a bad character in the middle. `InputOTPSlot` blocks a single bad character before Reka sees it and sends a multi-character insert, filtered, through Reka's paste handling. Pasting through the real paste event is not filtered for `alpha` and `alphanumeric` (it is for `numeric`).
6. **Values.** `numeric` uses Reka's number mode, so the model is converted to and from a string.

## Not verified

- A real clipboard paste, Delete and End keys, one-time-code autofill on a phone, `alpha` and `alphanumeric` modes typed by hand, forms (`name` with a native submit), RTL, and screen readers.

# Batch 14: Drawer

Specimens: Drawer with a form (Field, Input, Slider), long content (scrolling body), no handle and no close button, and a controlled one (`v-model:open`). Code Connect template: `code-connect-vue/DrawerContent.figma.ts` (parsed, not published).

## Dependency

**No new dependency.** The shadcn-vue `drawer` item imports from `reka-ui`: Reka 2.11 has its own Drawer (`DrawerRoot`, `DrawerContent`, `DrawerOverlay`, `DrawerViewport`, `DrawerHandle`), built like the Base UI one. `vaul-vue` (0.4.1, 76 KB unpacked, depends on `@vueuse/core` 10) was approved but is not needed and is not installed. As on every install, the CLI re-added `@lucide/vue` and `@vueuse/core` to `package.json`; both were reverted.

## Pixel check

- Popup, header, title, description, body (up to the Slider), footer, handle and close button: **0 differences in position, size and 34 computed styles** with the React Drawer, light and dark. The scrim and the viewport layer also match (colour, opacity, size, z-index).
- Long content: popup 1066 high (viewport 1114 minus 48), body 898 high, scroll height 1072 in both.
- The Slider inside the form differs only as noted in batch 3 (hidden `input`, `span` instead of `div`).

## Behavior check

| Behavior | React (Base UI) | Vue (Reka UI) |
|---|---|---|
| Opens from the trigger with focus on the popup; Escape closes; focus returns to the trigger | yes | yes |
| Scrim click closes | yes | yes |
| Focus is trapped (8 Tab presses stay inside); the page behind is inert | yes | yes |
| Handle and close button can be turned off (`showSwipeHandle`, `showCloseButton`) | yes | yes (`show-swipe-handle`, `show-close-button`) |
| Controlled: `open` / `onOpenChange` | yes | `v-model:open` works |
| Long body scrolls under a fixed header and footer | yes | yes |
| Handle is hidden from screen readers (`aria-hidden`) | yes | yes |

## Differences found

1. **Initial focus (decided: match React).** React focuses the popup itself; Reka focuses the first control and selects its text. `DrawerContent` now focuses the popup on open (`tabindex="-1"`, in `@open-auto-focus`), so the first Tab goes to the first control. A user handler can still call `preventDefault()` on `@open-auto-focus` to pick another element. Checked: the popup is focused, nothing is selected, Tab reaches the input, Escape returns focus to the trigger.
2. **Motion.** Reka has no `data-starting-style` / `data-ending-style`, so the slide and the scrim fade use `animate-in` / `animate-out` keyframes at the same durations. A swipe that ends in a dismissal is closed by the keyframe from the resting position, not from where the finger left it; React continues from the release point at a speed set by the swipe.
3. **Swipe.** The drag, its threshold and the release logic are Reka's. Not comparable with the tools here: React ignored two-step mouse drags and scripted pointer events, so there is no React baseline. In Vue a 200 px mouse drag dismissed the drawer. A single-step 30 px drag left the panel offset 36 px until it closed a moment later. Real touch swiping has not been tried.
4. **API.** Same names as React: `Drawer`, `DrawerTrigger`, `DrawerClose`, `DrawerContent` (`showCloseButton`), `DrawerHeader`, `DrawerBody`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerOverlay`, `DrawerPortal`, `DrawerSwipeHandle`. `Drawer` takes `showSwipeHandle`, `modal`, `snapPoints`; `swipeDirection` is fixed to `down`. Triggers and closes use `as-child` instead of `render`.
5. **Snap points.** Passed through to Reka (off by default). Not exercised.
6. **Nested drawers.** The scale and brightness effect is dropped, as in React.

## Not verified

- Touch swiping on a device, the release animation after a swipe, snap points, nested drawers, a virtual keyboard (`DrawerVirtualKeyboardProvider`), RTL, and screen readers.

# Batch 15: Calendar, Range Calendar, Date Picker, Date Range Picker

Specimens: seven Calendars (single, range, disabled weekends with booked days, week numbers with booked days, week numbers in a range across the year end, month and year dropdowns, Indonesian), six Date Pickers (launch date with `minDate`, small and clearable, booked days, invalid, disabled, Indonesian) and two Date Range Pickers (with presets and `maxDate`, empty). Code Connect templates: `Calendar`, `DatePicker`, `DateRangePicker` in `code-connect-vue/` (parsed, not published). Not built: the "Calendar in a Drawer" recipe specimen.

## Dependency

**`@internationalized/date` 3.12.4** (approved): Apache-2.0, 1.2 MB unpacked (tree-shaken in a bundle), one dependency of its own (`@swc/helpers`). It was already installed: Reka UI depends on it. It is now a direct dependency of `packages/ui-vue` (the Calendar takes its `DateValue`s) and of `apps/web-vue` (the playground builds `CalendarDate`s). No new package in `node_modules`; the lockfile gains the two direct links. The CLI again added `@lucide/vue` and `@vueuse/core`; both were reverted, and its 25 generated part files were replaced by `Calendar`, `RangeCalendar` and one caption component.

## Pixel check

Collected for every button, weekday cell, caption and select in each calendar (position, size and 29 computed styles, sorted by position), light and dark, with transitions off:

- **Single, range, Indonesian, week numbers and week numbers in a range: identical to React**, cells (`td`) included, light and dark.
- **Disabled/booked and dropdown: identical except the two items below** (booked strike-through; a hidden 1x1 live-region span).
- **All 8 closed pickers: identical** (trigger, value text, clear button, calendar icon), light; in dark the six pickers I had not clicked are identical.
- **Open popovers (Launch date, Report period):** same box (312x376 and 768x376), same 46 and 93 elements, same groups of cells, same focused day. Styles are identical except `cursor` on disabled days and arrows (React shows `default` on days and `pointer` on the disabled arrow, Vue the reverse; neither is visible, both have `pointer-events: none`).

## Behavior check

| Behavior | React (react-day-picker) | Vue (Reka UI) |
|---|---|---|
| Click a day: value set, popover closes, focus returns to the trigger | yes | yes |
| Enter opens; the selected day (else today) is focused; arrows, Up and Down move by day and week and cross months | yes | yes |
| Escape closes, value kept, focus returns | yes | yes |
| `minDate`: earlier days disabled, arrow back disabled, no days drawn for the month before it | yes | yes (matched, see 5) |
| `maxDate` with two months: the last month shown is the `maxDate` month (Oct + Nov) | yes | yes (matched, see 6) |
| Weekends and booked days cannot be picked | yes | yes |
| Range: first click shows one date, second click closes and sets both | yes | yes |
| Presets close the popover and set the range | yes | yes |
| Clear button empties the value and disappears | yes | yes |
| Month and year dropdowns, Indonesian names and arrow labels | yes | yes |
| Week-number column (44 to 49 in Nov 2026; "01" for the 28 Dec 2026 week) | yes | yes |
| `modifiers` on a picker: booked days styled, others not | yes | yes |

## Differences found

1. **API.** `show-week-number`, `modifiers` and `modifiers-class-names` are built (see 4). React has one `Calendar mode="single" | "range"`; Vue has `Calendar` (one date) and `RangeCalendar` (a range), the two Reka roots. Both take `@internationalized/date` DateValues (`CalendarDate`), `v-model`, `default-placeholder` (React `defaultMonth`), `min-value` / `max-value` (React `startMonth` / `endMonth` plus `disabled`), `is-date-disabled`, `is-date-unavailable`, `number-of-months`, `week-starts-on` (default 1, Monday), `locale` as a BCP 47 string (`id-ID`; React takes a react-day-picker `Locale` object), `caption-layout` (`label`, `dropdown`, `dropdown-months`, `dropdown-years`), `labels` (`{ previous, next }`), and `today` (fixes the highlighted day; Reka always uses the real date, so the playground uses it to compare with React).
2. **Pickers.** `DatePicker` and `DateRangePicker` take plain `Date`s (`v-model`, `{ from, to }` for the range), as React does. `locale` is a string; `disabled-dates` is a `Date[]` or a function (React: any react-day-picker matcher); the rest (`min-date`, `max-date`, `clearable`, `size`, `invalid`, `disabled`, `placeholder`, `format-date`, `presets`, `calendar-props`) match. Names are kebab-case in templates.
3. **Booked days (React finding).** The spec says a booked day is struck through. In the React playground the `line-through` class lands on the table cell, and the inline-flex day button does not inherit it, so React shows booked days only dimmed. Vue strikes them through (`is-date-unavailable`, shown with 40% and `line-through` on the button). Not changed in React.
4. **Week numbers and modifiers (built in the wrapper; Reka has neither).** `show-week-number` adds the column (header cell named "Week Number", 40 wide, numbers 12/16 `muted-foreground`). Numbers are written as react-day-picker writes them: date-fns `getWeek` (the week with 1 January is week 1, the week starts on `week-starts-on`), two digits, not ISO 8601, so 28 Dec 2026 is "01". `modifiers` maps a name to a test on the day (`(day: DateValue) => boolean`) and `modifiers-class-names` maps it to classes put on the day button; React takes Date arrays and puts the classes on the table cell. `CalendarDayButton` is not exported (no Code Connect for it).
5. **Hidden days.** react-day-picker draws no button for the part of a neighbouring month before `minDate`'s month or after `maxDate`'s month. Vue does the same (`isHiddenDay`).
6. **Month window.** With `maxDate`, react-day-picker keeps the last shown month at the `maxDate` month. Reka would show November and December for a range ending in November, so the first month is moved back (`clampPlaceholder`). This is applied when the calendar opens.
7. **Weekday names.** react-day-picker writes two letters in English ("Mo") and the locale's short name otherwise ("Sen"). Reka has no two-letter width, so English gets the first two letters of "Mon" and other locales the Intl short name.
8. **Initial focus.** Reka's own `initial-focus` looks for the real today. The Calendar does it itself (selected day, else `today`, else the first enabled day), so a fixed `today` is respected.
9. **Dropdowns.** Month and year dropdowns apply to a single month; with two months the captions are labels. Years run from `min-value` to `max-value` (default 10 years either way; React needs `startMonth` and `endMonth`). The visible parts and positions match; React also has a hidden live-region caption, which Vue now has too (its hidden span differs in a few styles).
10. **Ranges are partial while open.** The Vue range picker reports `{ from }` after the first click (the trigger then shows one date) and closes when `to` is set, as React does.

## Not verified

- Touch use, week numbers with a week start other than Monday, RTL (arrows flip with `rtl:rotate-180`, not tried), other locales, week-start values other than Monday, `v-model:placeholder`, a `min-value` combined with the dropdowns, the one-month range picker on a phone width, screen readers, the dark popovers, and the Drawer recipe (not built).

# Batch 16: Charts (step 1 of 2: Bar chart, Chart Panel, states, number formats)

Step 2 is Line, Area, Pie and Donut. The two steps share `useChartInteraction`, `ChartLegend`, `ChartTooltip` and the Chart Panel, which are built here.

## Dependency (approved: Unovis)

Recharts has no Vue build. Approved on 2026-11-26: **`@unovis/vue` 1.8.1** (1.3 MB on disk) and its peer **`@unovis/ts` 1.8.1** (13 MB on disk, 61 dependencies, Apache-2.0), added to `packages/ui-vue` only, pinned exactly. The lock file grows by 83 packages (685 lines): mostly d3 modules, plus `three`, `leaflet`, `elkjs`, `maplibre-gl` and others that Unovis lists for its map, graph and 3D components.

- **Import from the per-component entry points** (`@unovis/vue/components/axis`, `.../grouped-bar`, `.../stacked-bar`, `@unovis/vue/containers/xy-container`), as `BarChart.vue` does. Importing from `@unovis/vue` itself pulled `maplibre-gl` into the build (an extra 485 KB chunk). Keep this rule for the other charts.
- **Bundle (playground, `pnpm --filter web-vue build`):** 856.98 KB (211.43 KB gzip) before charts, 1,010.42 KB (261.56 KB gzip) with the Bar chart: **+153 KB, +50 KB gzip**. Line, Area and Donut will add a little more; not measured yet.
- As on every install, the shadcn-vue CLI (`add chart`) re-added `@lucide/vue` and `@vueuse/core`, which were reverted. Its generated files (Unovis-specific `ChartContainer`, `ChartTooltipContent`, `ChartLegendContent`) were not kept: they have none of the spec (interactive legend, `id-ID`, keyboard layer, Chart | Table), so the Vue chart is written directly on Unovis.

## Built (`packages/ui-vue/src/components/chart`, `src/lib/chart-format.ts`)

- `BarChart` (same props as React: `data`, `config`, `categoryKey`, `layout`, `stacked`, `showLegend`, `showLabels`, `showTooltip`, `interactiveLegend`, `valueFormatter`, `axisFormatter`; `aria-label` and `class` go to the plot / frame). Grouped, stacked, horizontal (`layout="vertical"`, Recharts naming), single series with value labels.
- `ChartPanel` (props `title`, `description`, `summary`, `state`, `columns`, `rows`, `retryable`, `emptyMessage`, `errorMessage`; slot `actions`; event `retry`). The Chart | Table toggle, loading, empty and error states, `aria-busy`, `summary` linked with `aria-describedby`. React `onRetry` becomes `retryable` + `@retry`.
- `ChartLegend` (interactive: hover dims the others to 30%, press hides, the last visible series cannot be hidden, hidden = 40% with the name struck through), `ChartTooltip` (popover surface, min width 144, padding 8 12 / 6 12, header, swatch rows, `font-semibold` tabular values), `idNumber`, `idRupiah`, `idPercent`, `idCompact` (same output as React).
- The value axis follows Recharts' rounding (0 to a "nice" top, 5 ticks: 0, 150, 300, 450, 600 for a maximum of 503), done in `niceTicks`.
- Specimens: `ChartsSection.vue` and the harness `ChartsSection` (single, grouped, horizontal, stacked, loading, empty, error).

## Pixel check (Bar, light and dark)

Collected for the grouped chart in both apps (tick text, grid lines, bars, legend, swatches):

- **Dark and light colours are identical:** tick text `muted-foreground`, grid `chart-grid` 1px, bars `chart-1` and `chart-2`, legend text and swatches, 12px / 500 Reddit Sans ticks.
- **Value axis identical:** same tick values (0 to 600 by 150; 0 to 6 rb by 1,5 rb; 0 to 8 rb stacked) and grid lines at the same heights to within 1px; x labels 12px below the baseline in both.
- **Layout:** plot left edge 90 and width 728 in both; bar tops match to within 1px.

## Behavior check

| Behavior | React (Recharts) | Vue (Unovis) |
|---|---|---|
| Hover a category: tooltip with header and one row per series, `muted` band behind the bars | yes | yes |
| Focus the plot, ArrowRight twice: third category active, tooltip and band follow | yes | yes (same index) |
| Visible focus ring 2px / 2px offset on the plot | yes (around the plot and its legend) | yes (around the plot) |
| Legend hover dims the other series to 30% | yes | yes |
| Legend press hides a series (`aria-pressed` false, 40%, struck through); the last one stays | yes | yes |
| Chart | Table toggle: same rows and `id-ID` formatting | yes | yes |
| Loading, empty, error (with Try again) | yes | yes |

## Differences found

1. **Bars.** Unovis draws bars of 37.4px where Recharts draws 39px in a group of two (same 4px gap, same 16% each side); a single series is the same width. The group sits about 2px to the left.
2. **Focus ring.** Recharts puts `role="application"` and the ring on the whole SVG, which includes its legend. Vue puts both on the plot area; the legend is a separate group of buttons above it.
3. **Keyboard.** Arrow keys (Left/Right, or Up/Down for horizontal bars), Home, End and Escape move or clear the active category. The accessible layer is hand-built, since Unovis has none: the SVG is `aria-hidden`, the description is `summary` and the Table view.
4. **Tooltip position.** React follows the pointer with its own offset; Vue places the tooltip 12px right of and below the pointer (at the category top for the keyboard). The tooltip is HTML, not drawn by Unovis.
5. **Value labels.** Recharts draws them as SVG text; Vue draws them as positioned HTML (12/16 medium, `foreground`).
6. **Hidden helper nodes.** Unovis leaves five empty `<text>` ticks in the SVG for measuring; they are invisible and the SVG is `aria-hidden`.
7. **Dimming** uses `fill-opacity` through a small `<style>` element, like React's `fillOpacity` on the bars.
8. **Left axis width.** Recharts fixes it at 60px; Unovis sizes it to its labels. A measured margin makes the plot start at the same place.

## Not verified

- Touch hover, screen readers, `prefers-reduced-motion` (marks do not animate: `duration` is 0), very long category names, negative values, 20+ categories, resizing the card after load (a `ResizeObserver` re-measures; checked only by reloading), and the Line, Area, Pie and Donut charts (step 2).

# Batch 16, step 2: Line, Area, Pie and Donut

No new dependency. Line and Area use the same Unovis entry points (`.../components/line`, `.../components/area`); Pie and Donut are plain SVG (a pie needs no charting library). Bundle (playground): 1,063.42 KB (274.82 KB gzip) with all four, +53 KB (+13 KB gzip) over step 1.

## Built

- `LineChart` and `AreaChart` (same props as React; `AreaChart` also takes `stacked`), both thin wrappers over an internal `CartesianChart`. 2px straight lines, flat 20% fill (40% stacked), horizontal grid, 1px `border` cursor, a 6px active point (HTML, series shape, 2px `card` ring) on hover or keyboard focus, shapes (circle, square, diamond) in the legend, the active point and the tooltip when there is more than one series.
- `PieChart` (`donut` by default, `donut={false}` for a pie; `maxSlices`, `centerCaption`, `valueFormatter`, `showTooltip`, `interactiveLegend`). Outer radius 100, inner 64, 2px `card` gap, first slice at 12 o'clock, clockwise, largest first, "Other" in `chart-8`, total in the centre, legend rows with name, value and percent that dim, hide and show slices.
- Specimens: Line (two series, one series in rupiah), Area (single, stacked), Donut and Pie, in `ChartsSection.vue` and the harness. React has no Code Connect for these three, so there are no new templates.

## Pixel check

- **Donut: identical to React** (slice boxes, fills, 2px `card` stroke, legend rows and text, centre total 24px bold), light.
- **Line:** gridlines within 1px vertically; the plot is 720px wide where React's is 722; x labels 1px higher; tick values the same (0 to 600 by 150).
- Colours come from the same tokens as Bar, which were identical in light and dark.

## Behavior check

| Behavior | React | Vue |
|---|---|---|
| Focus the plot, arrow keys move the active point; tooltip, cursor and points follow | yes | yes |
| Two series: shape in legend, point and tooltip | yes | yes |
| Stacked area adds the series up; the top tick follows the stack | yes | yes |
| Pie and donut: hover shows a tooltip with the slice; legend press hides a slice and the total and percentages follow | yes | yes |

## Differences found

1. **Left axis labels.** Recharts wraps a long label ("Rp 280 jt") onto two lines inside its 60px axis; Vue keeps it on one line and widens the margin.
2. **Dimming.** A dimmed Line or Area series is drawn with its colour mixed to 30% (`color-mix`), where React sets `strokeOpacity` and `fillOpacity`; the result looks the same.
3. **Point.** The active point is an HTML element (8px box with a 2px `card` border), not an SVG shape.
4. **Plot width.** Unovis keeps room for the last x label, so the plot is about 2px narrower than React's; a negative right margin makes up most of it.
5. **Donut tooltip and keyboard.** Same as Bar: HTML tooltip at a fixed offset; arrows, Home, End and Escape move between slices (React's accessibility layer was not checked for the pie).

## Not verified

- Dark mode for Line, Area and Pie (colours are the same tokens as Bar), touch, screen readers, a single data point, negative values, very long category names, and a pie with every slice hidden but one at narrow widths.

# Batch 17 (step 1 of 2): Chat pieces: Bubble, Message, Marker, Trace, Attachment

Step 2 is the Message Scroller (needs a decision, see the end). No new dependency: these five are plain markup plus Reka's `Primitive` and `Collapsible`, with the React classes copied as they are.

## Built

- `Bubble` (variants `default | secondary | muted | tinted | outline | ghost | destructive`, `align`), `BubbleContent` (`as="a"` / `as="button"` / `as-child` for an interactive bubble; React `render`), `BubbleGroup`, `BubbleReactions` (`side`, `align`).
- `Message` (`align`), `MessageGroup`, `MessageAvatar`, `MessageContent`, `MessageHeader`, `MessageFooter`.
- `Marker` (`default | separator | border`, `as`), `MarkerIcon`, `MarkerContent`.
- `Trace`, `TraceLine` (`status`: `running | error | pending`), `TraceIcon`, `TraceStatusIcon` (`status`, `icon`), `TraceTitle`, `TraceDescription`, `TraceCollapsible` (`default-open`, `v-model:open`), `TraceCollapsibleTrigger`, `TraceCollapsibleContent`.
- `Attachment` (`state`, `size`, `orientation`), `AttachmentMedia` (`variant`), `AttachmentContent`, `AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction` (Button `ghost` `icon-xs`), `AttachmentTrigger` (`as`), `AttachmentGroup`.
- Specimens: `ChatSection.vue` and the harness `ChatSection` (all seven bubble variants, an interactive bubble, reactions, a two-turn exchange with header and footer actions, three markers, five trace lines including a collapsible, six attachment chips and a vertical group).

## Pixel check

Collected for every element of each specimen (position, size and 29 computed styles), transitions off, light and dark, for the open and closed Trace:

- **Bubbles, Messages and Markers, Attachments: identical to React**, light and dark.
- **Trace: identical**, closed and open, light and dark, except one extra hidden node (below).

## Differences found

1. **API.** React `render={...}` becomes `as` / `as-child` (Bubble content, Marker, Attachment trigger). `TraceCollapsible` takes `v-model:open` where React takes `open` + `onOpenChange`.
2. **Closed Trace content.** Reka keeps the content node in the DOM with `hidden` (zero size); Base UI removes it. It is invisible, and the height animation uses Reka's keyframes (`animate-collapsible-down` / `-up`) instead of `data-starting-style`.
3. **Icon names** in `TraceStatusIcon` are plain strings (checked at runtime by `Icon`).

## Not verified

- Keyboard focus ring on `BubbleContent` as a button, `AttachmentTrigger` and the Trace trigger (same classes as React), hover colours, reduced motion, long titles that truncate, and a screen reader on the Trace status words.

## Batch 17, step 2: Message Scroller (hand port)

Approved: a full hand port of `@shadcn/react/message-scroller` 0.3.1 (MIT, React only) to Vue. **No dependency added.** The scroll state machine is in `message-scroller/scroller.ts` (about 400 lines, same names as the React source: modes `following-bottom`, `free-scrolling`, `settling-jump`, `anchored-to-message`; spacer; anchors; prepend restore; visibility; default position); the components are thin.

### Built

- `MessageScrollerProvider` (renderless; props `auto-scroll`, `default-scroll-position` `start | end | last-anchor`, `scroll-edge-threshold` 8, `scroll-previous-item-peek` 64, `scroll-margin`), `MessageScroller`, `MessageScrollerViewport` (`role="region"`, `aria-label="Messages"`, focusable; `preserve-scroll-on-prepend`), `MessageScrollerContent` (`role="log"`, `aria-relevant="additions"`, hidden spacer; `spacer-class`), `MessageScrollerItem` (`message-id`, `scroll-anchor`), `MessageScrollerButton` (`direction`, `behavior`, `variant`, `size`; inert and faded when there is nothing to scroll to).
- Composables: `useMessageScroller()` (`scrollToEnd`, `scrollToMessage`, `scrollToStart`), `useMessageScrollerScrollable()` and `useMessageScrollerVisibility()` (both return refs).
- Specimen: a 320px panel with six turns, a Send button (adds a person message, the anchor, and a reply that streams in word by word) and Reset, in both playgrounds.

### Check

Same scenario in both apps (fronted tabs, real timers): initial position, send, end of the stream, scroll up with a wheel event, press the button, reset. Compared scroll position, scroll height, spacer height, the anchor's top, the button's `data-active` and the viewport's `data-scrollable`:

- **Identical** at the start (192 / 510 / spacer 102 / anchor 88), at the end of the stream (320 / 638 / 62 / 88), after scrolling up (0 / 638 / 62 / 408, button active), after the button (258 / 576 / 0 / 150) and after Reset (90 / 408 / 0 / 190).
- **Every element** of the initial panel (37 nodes: position, size, 19 styles, role, label, tabindex, inert): identical.

### Differences found

1. **Timing, not result.** 300 ms after Send, React is a few frames behind Vue (React batches the state update); both reach the same position.
2. **API.** React hooks return values; the Vue composables return refs. `render` on the button becomes the Button props; `spacerClassName` becomes `spacer-class`.
3. **Ref order.** The spacer's row gap is read when the height is set (the element is not attached when Vue sets the ref).

### Not verified

- Prepending older messages (`preserve-scroll-on-prepend`), `scroll-to-message`, `default-scroll-position` other than `last-anchor`, two anchors added at once, touch scrolling, keyboard scrolling with the viewport focused, resizing the panel while streaming, `useMessageScrollerVisibility`, reduced motion.

# Batch 18 (step 1): AI Elements: Suggestion, Prompt Input, Reasoning, Sources, Inline Citation, Confirmation

No new dependency. All six are compositions of components already ported (Button, Input Group, Attachment, Trace, Hover Card, Item). They live in `packages/ui-vue/src/components/ai-elements` and are imported from `@workspace/ui-vue/components/ai-elements` (one folder, one `index.ts`; React has one file each). Playground and harness: `AiSection`.

Plan for the rest of AI Elements: step 2 `Message` (AssistantMessage, UserMessage) and `Chat`; step 3 the Phase 2 set (Chain of Thought, Plan, Task, Queue, Context, Checkpoint, Subagent, Model Selector); `Tool` and the error part of `Subagent` wait for the Code Block batch (they render a Code Block, which needs a syntax highlighter).

## Built

- `Suggestions`, `Suggestion` (`suggestion`; event `suggestion-click` with the prompt; a slot replaces the label).
- `PromptInput` (`status`: `ready | streaming | disabled`, `placeholder`, `default-text`, `default-files`; events `submit` with `{ text, files }` and `stop`; the default slot is the toolbar between attach and send, for the Model Selector). Enter sends, Shift+Enter adds a line, Escape stops a running reply; Stop replaces Send while streaming; attached files are Attachment `sm` chips with a remove button.
- `Reasoning` (`running`, `duration`, `default-open`; the slot is the thinking text; open while running, closed after, reopenable).
- `Sources` (`sources`: `{ url, title? }[]`), `InlineCitation` (`source`: `{ url, title, description? }`; 150ms open and close), `Confirmation` (`title`, `description`, `icon`, `deny-label`, `approve-label`, `disabled`; events `deny`, `approve`).

## Pixel check

Every element of the three specimens (position, size, 27 computed styles, role, label, `aria-expanded`, disabled), transitions off, light and dark:

- **Suggestion (3 buttons), Prompt Input (empty, prefilled with a file chip, streaming, disabled; 49 nodes) and the Reasoning, Sources, Citation and Confirmation block (53 nodes): identical to React**, light and dark. Closed Trace content nodes (hidden by Reka, removed by Base UI) were left out of the comparison.

## Behavior check (Vue)

Suggestion click sends its label; Enter in the field submits `hello there` and clears it; Send is disabled while empty; Approve emits once; Sources opens to three links with `target="_blank"` and "(opens in a new tab)"; hovering the citation opens a 256px Hover Card with title, description and link.

## Differences found

1. **Events.** React callback props become emits: `onSuggestionClick` becomes `suggestion-click`, `onSubmit` / `onStop` / `onApprove` / `onDeny` stay `submit` / `stop` / `approve` / `deny`.
2. **Reasoning.** `className` becomes `class` (default `whitespace-pre-wrap`); with no slot it renders the line only, as React does without children.
3. **Closed content.** As in Trace: Reka keeps closed content in the DOM, hidden.

## Not verified

- Shift+Enter, Escape while streaming, IME composition, attaching a real file with the picker, the Reasoning open state after toggling and then finishing, hover card keyboard focus, and a screen reader on Confirmation.

## Batch 18, step 2: Message and Chat

No new dependency. In `ai-elements`: `UserMessage`, `AssistantMessage` (slot `actions` for the footer), `MessageAction` (Button `ghost` `icon-sm`, `aria-label`, Tooltip; emits `click`), `AssistantMessageActions` (copy, good and bad response with `aria-pressed`, retry when `@retry` is passed), `UserMessageActions` (copy, edit when `@edit` is passed), `useCopy` (copied for 2s), and `Chat`, `ChatHeader` (`title`, `description`, slot `action`), `ChatThread` (`busy`; wraps the Message Scroller with `auto-scroll`), `ChatTurn` (`id`, `anchor`), `ChatEmpty` (`title`, `description`, `icon`; the slot sits below) and `ChatFooter`. Specimens: a static thread (turns, reasoning closed and running, citations, a list, sources, a pending approval, a status marker, disabled input) and a live thread with a canned reply streamed from memory.

### Pixel check

Every element of both specimens (position, size, 25 computed styles, role, label, `aria-busy`, `aria-expanded`, disabled, scroll position), transitions off:

- **Live thread (empty state with suggestions): identical.**
- **Static thread: all 104 elements identical** after three fixes found by this check: `aria-busy` was `false` where React omits it (a Boolean prop cast, `busy` now defaults to undefined); the message footer lost its 12px side padding when it held a ghost Button (Vue's Button writes `data-variant="ghost"`, React's does not, so the "ghost bubble" rule now looks for a ghost Bubble only); `aria-pressed="false"` appeared on the copy and edit buttons (same cast).

### Behavior check (Vue)

Suggestion starts a turn; while streaming the Marker says "Thinking…", Stop replaces Send and the log has `aria-busy="true"`; when the reply ends the actions appear (Copy, Good response, Bad response, Retry), `aria-busy` returns to `false` and Send comes back. Good and Bad toggle `aria-pressed` and switch each other off.

### Differences found

1. `MessageAction` has no single root (Tooltip wraps the Button), so it declares and re-emits `click`; clicks on it are not passed through as plain attributes.
2. Vue Buttons write `data-variant` and `data-size` (React's do not); selectors that read them from outside the Button were rewritten as above.
3. **Test artifact:** a timer-driven stream slows to about one tick a second while the browser pane is in the background, so the live thread was checked by waiting.

### Not verified

- Copy to the clipboard (the browser pane may deny it), Escape to stop the stream, Edit and Retry actions, scrolling up while a reply streams, and dark mode for the two threads.
