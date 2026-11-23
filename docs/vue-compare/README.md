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
