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
| Backspace: focus afterwards | moves back one slot | stays on the cleared slot (see 1) |
| ArrowLeft moves one slot, Home goes to the first | yes | yes |
| Numeric keyboard (`inputmode="numeric"`), `autocomplete="one-time-code"`, masked slots are `type="password"` | yes | yes |
| `invalid` sets `aria-invalid` and the danger border, `aria-describedby` reaches every slot | yes | yes |

## Differences found

1. **Backspace focus (open question).** In React, Backspace on a filled slot clears it and moves focus to the previous slot. Reka clears it and stays; the next Backspace on the now empty slot moves back and clears that one too. The final values are the same, only where the cursor sits differs.
2. **API.** `length`, `validation-type` (`numeric` default, `alpha`, `alphanumeric`, `none`), `mask`, `disabled`, `invalid`, `id`, `name`, `required`; `v-model` and `default-value` are strings; `@value-complete` and `update:modelValue` events. `length` is informational: the slots you render set the real count (it only feeds each slot's accessible name). Slot `index` is its order inside the field, read from the DOM after mount.
3. **Label.** `id` goes on the first slot so `<Label for="...">` names the field. Reka names every slot "pin input N of M"; the Vue slots drop that on the first slot (so the label wins) and say "Character N of M" on the others. React names only the first slot.
4. **`maxlength`.** React sets `maxlength` on every slot; Vue does not.
5. **Character validation.** Reka's own filtering leaves a gap when a multi-character insert (autofill, fast typing, an IME) has a bad character in the middle. `InputOTPSlot` blocks a single bad character before Reka sees it and sends a multi-character insert, filtered, through Reka's paste handling. Pasting through the real paste event is not filtered for `alpha` and `alphanumeric` (it is for `numeric`).
6. **Values.** `numeric` uses Reka's number mode, so the model is converted to and from a string.

## Not verified

- A real clipboard paste, Delete and End keys, one-time-code autofill on a phone, `alpha` and `alphanumeric` modes typed by hand, forms (`name` with a native submit), RTL, and screen readers.
