# Vue 3 port of playlogDS: plan (Phase 1)

Status: **draft, waiting for answers**. No code has been written. Branch: `vue-port-plan`.
Facts below were checked on 2026-11-22 (npm registry and the vendors' docs). Items marked **(verify)** are not confirmed by a source I could read and must be checked before Phase 2 relies on them.

## 0. Where the facts differ from the prompt

1. **Code Connect: the HTML parser is legacy.** `@figma/code-connect/html` (`figma.connect(...)` with `html` templates) still lists Vue, but Figma stopped maintaining the framework parsers on 17 Aug 2026. Our React `.figma.ts` files already use the newer **template files** (`import figma from 'figma'`, `figma.selectedInstance`). Vue should use the same template format, not the HTML parser. See section 5.
2. **Language value.** Template config accepts `html`, `typescript`, `javascript` and others. `vue` is not in the documented list. Label can still be `Vue`.
3. **shadcn-vue lists AI Elements.** The component index has 21 AI Elements patterns (copy-in compositions of shadcn-vue components, no package), so they are not "no official Vue port". Vercel's own `ai-elements` repo is React only and will be deprecated at the end of Nov 2026 in favour of the shadcn/ui version.
4. **shadcn-vue already has most of our "exotic" React components**: Attachment, Bubble, Marker, Message, Message Scroller, Trace, Code Block, Item, Empty, Field, Input Group, Kbd, Native Select, Button Group, Spinner.
5. **CLI.** Package `shadcn-vue` 2.9.0 (bin `shadcn-vue`; run `pnpm dlx shadcn-vue@latest`). `-c, --cwd <path>` exists on `init` and `add`; `add` also has `-o/--overwrite` (we will never pass it), `-p/--path`, `-y`. No monorepo page exists in the docs, so the React layout (config in one workspace, `-c <path>`) is by analogy. **(verify in a scratch dir before Phase 2).** `components.json` docs say Tailwind v4 means `tailwind.config` is empty. Docs are inconsistent on `style` (`new-york` on one page, `vega/nova/...` presets on the CLI page).
6. **Icons.** The CLI offers `--icon-library lucide|tabler|hugeicons|phosphor|remixicon` and no "none", the same problem as React. `init` adds `lucide-vue-next` (30 MB unpacked). After each `add` we replace icon imports with our `Icon` and remove `lucide-vue-next`. The same ESLint `no-restricted-imports` rule will fail on `lucide-vue-next`.
7. **Reka UI docs gap.** The pages I could read document only `data-state` (`open | closed`) and do not document `data-disabled`, `data-highlighted` or `onOpenAutoFocus` on the Dialog page. Section 4 therefore marks behavior as **(verify)** until tested in the pilot.
8. **Reddit Mono.** Safety rule 5 says "Reddit Sans only". `BRAND.md` allows Reddit Mono for code only (Code Block). The Vue port follows `BRAND.md`.

## 1. Repo layout

```
packages/
  tokens/        NEW  shared design source (CSS + JSON + icon data). No framework code.
  ui/            React library. Unchanged except import shims (see below), if approved.
  ui-vue/        NEW  Vue library (shadcn-vue + Reka UI), name @workspace/ui-vue
apps/
  web/           React playground. Unchanged.
  web-vue/       NEW  Vue playground, fixed dev port 5174 (web uses Vite's default).
code-connect/        React templates. Unchanged.
code-connect-vue/  NEW  Vue templates.
figma.config.json         React (unchanged)
figma.vue.config.json     NEW
```

### Shared tokens (recommended)

`packages/tokens` (`@workspace/tokens`) holds the one source for colors, type, radii, motion and icons.

| Today | Moves to | Note |
|---|---|---|
| `docs/brand/tokens.json` | `packages/tokens/tokens.json` | `BRAND.md`, `COMPONENT-SPECS.md` stay in `docs/brand/`. Links and `CLAUDE.md` paths updated. |
| `docs/brand/tokens.css` | `packages/tokens/tokens.css` | Today it duplicates the token block of `globals.css`. They are already out of sync (globals has `--font-heading`, extra radii, base layer). |
| `:root`, `.dark`, `@theme inline` (incl. type scale), fonts, `@layer base` in `packages/ui/src/styles/globals.css` | `packages/tokens/theme.css` | Framework-neutral. `globals.css` keeps `@import "tailwindcss"`, `tw-animate-css`, `shadcn/tailwind.css`, `@custom-variant dark`, `@source`, then `@import "@workspace/tokens/theme.css"`. |
| `packages/ui/src/icons/icon-data.ts`, `extra-icons.ts` | `packages/tokens/icons/` | `packages/ui/src/icons/*` become one-line re-exports so no React import changes. |
| `scripts/check-type-tokens.mjs` paths | updated to the new locations | Same checks. |

Files that would change in the React tree: `packages/ui/src/styles/globals.css`, `packages/ui/src/icons/icon-data.ts`, `packages/ui/src/icons/extra-icons.ts`, `packages/ui/package.json` (workspace dep), `scripts/check-type-tokens.mjs`, `CLAUDE.md`. No component, no `apps/web` file changes.

**Proof React output is unchanged** (done before and after the move, on `main` vs the branch): build `apps/web` and compare the emitted CSS and JS bundles byte for byte (`diff -r` of `dist/assets` with hashes normalised, or compare content hashes); if the CSS differs only by rule order, compare computed values for every variable via a script. `git diff --stat` shows only the files listed above.

**Cost:** touches the React package, which needs your approval (safety rule 1). Alternative (b) keeps a copy in `ui-vue`; cheaper now, but two sources drift, and `tokens.css` and `globals.css` already show that drift.

## 2. Tooling

| Item | Version (npm, 2026-11-22) | Unpacked size | Note |
|---|---|---|---|
| `vue` | 3.5.46 | 2.6 MB | 3.5 confirmed |
| `vite` | 8.3.8 | 2.4 MB | same major as `apps/web` |
| `@vitejs/plugin-vue` | 6.0.11 | 77 KB | supports Vite 8 |
| `tailwindcss`, `@tailwindcss/vite` | 4.3.5 | 0.8 MB, 12 KB | same as React |
| `vue-tsc` | 3.3.14 | 7 KB wrapper | peer `typescript >=5`, works with our `~6.0.2` **(verify)** |
| `eslint-plugin-vue` | 10.12.1 | 1.2 MB | peer eslint ^10 ok |
| `@vue/eslint-config-typescript` | 14.9.0 | 86 KB | peer eslint ^10 ok |
| `reka-ui` | 2.11.0 | 9.2 MB | brings `@vueuse/core`, `@floating-ui/vue`, `@internationalized/date`, `@tanstack/vue-virtual` |
| `shadcn-vue` (CLI, dev) | 2.9.0 | 1.5 MB | run with `pnpm dlx`, not a dependency |
| `class-variance-authority` | 0.7.1 | 22 KB | same as React |
| `cn` | 0.5.2 | small | already used by React; reuse it with the same type-scale list so class merging behaves identically (instead of `clsx` + `tailwind-merge` 3.7.1) |

Nothing is installed yet. Each is requested again, with its size, before Phase 2.

- **Scripts** (same names as React): `lint` (`eslint`), `typecheck` (`vue-tsc --noEmit`), `build` (`vue-tsc -b && vite build` for the app), `dev`, `format`.
- **ESLint:** flat config with `eslint-plugin-vue` (`flat/recommended`), `typescript-eslint`, and the same `no-restricted-imports` block extended with `lucide-vue-next`, `lucide-vue`, `@lucide/vue`, `@iconify/*`, `@radix-icons/vue`, plus the Remix entries. Also a rule against literal colors and `font-family` in `.vue` files (type-token check already runs at the root).
- **Turborepo:** `turbo.json` is generic (`build`, `lint`, `typecheck`, `dev`); new workspaces under `packages/*` and `apps/*` are picked up automatically. `pnpm dev` would start two Vite servers, so `web-vue` gets a fixed port.
- **CI:** `.github/workflows/ci.yml` already runs root `pnpm lint`, `pnpm typecheck`, `pnpm build`, so Vue is covered with no workflow edit. Root `lint` already runs the type-token check.
- **Components location:** `packages/ui-vue/src/components/<name>/<Part>.vue` plus `index.ts` (the shadcn-vue layout). Exports map mirrors React (`./components/*`, `./globals.css`, `./lib/*`).

## 3. Component map

Legend: ✅ exists in shadcn-vue under the same name; ➕ exists with a different name or split; ❌ missing, build by hand. "Other lib" = needs something besides Reka UI. All "exists" entries are from the shadcn-vue component index page; the page lists no dependencies, so the **Other lib** column is my understanding **(verify with `shadcn-vue view <name>` before each batch)**.

| React component | shadcn-vue | Other lib |
|---|---|---|
| Button, Input, Label, Dialog | ✅ | none |
| Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button Group, Card, Checkbox, Collapsible, Context Menu, Dropdown Menu, Empty, Field, Hover Card, Input Group, Item, Kbd, Menubar, Native Select, Navigation Menu, Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Skeleton, Slider, Spinner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip | ✅ | none |
| Combobox, Command | ✅ | Reka Combobox / Listbox, none extra |
| Calendar, Date Picker | ✅ (Calendar, Range Calendar, Date Picker) | `@internationalized/date` (comes with Reka) |
| Sidebar | ✅ | `@vueuse/core` (comes with Reka) |
| Input OTP | ➕ Input OTP and Pin Input | Input OTP may use `vue-input-otp` (0.4.0) **(verify)**; Pin Input is Reka only |
| Drawer | ✅ | `vaul-vue` (0.4.1) **(verify)** |
| Sonner / Toast | ✅ | `vue-sonner` (2.9.0 on npm). Its npm metadata lists Nuxt as a peer, so check this before adding |
| Chart (Bar, Line, Area, Pie, Donut, ChartPanel, ChartFrame, tooltip) | ➕ one "Chart" component | React uses Recharts. Vue needs a different lib (shadcn-vue's Chart is Unovis-based **(verify)**, `@unovis/vue` 1.8.1; `vue-chrts` 2.2.4 is another candidate). The Playlog chart specs (series colors, legend interactions, Indonesian number formats) must be rebuilt on top |
| Code Block | ✅ | `shiki` (already a React dep) |
| Attachment, Bubble, Marker, Message, Message Scroller, Trace | ✅ | none expected |
| StatCard | ❌ | none. Playlog only, build by hand from the spec |
| Carousel, Resizable | ✅ in shadcn-vue, **not in our React library**, out of scope | `embla-carousel-vue`, Reka Splitter |
| AI Elements: Chain of Thought, Chat, Checkpoint, Confirmation, Context, Inline Citation, Message, Model Selector, Plan, Prompt Input, Queue, Reasoning, Sources, Subagent, Suggestion, Task, Tool | ✅ all 17 listed as shadcn-vue patterns (copy-in, no package) | none stated |
| shadcn-vue only: Form, Data Table, Number Field, Questionnaire, Stepper, Tags Input, Typography, Toast, Range Calendar, File Tree, Stack Trace, Terminal, Test Results | not in React, out of scope | |

Proposal for AI Elements: take them last, after specs against the shadcn-vue source are reviewed, since our React versions have Playlog-specific specs. Fallback for any that differ too much: build by hand from our specs.

Components that would need a library other than Reka UI: Calendar (uses Reka plus `@internationalized/date`), Chart, Drawer, Input OTP, Sonner. Each needs your approval in its own batch.

## 4. Behavior differences (pilot components)

Reka facts come from the Reka UI v2.11 docs I could read; the rest is my knowledge of Base UI and is marked **(verify)** until tested in the playground.

| Area | Base UI (React, approved) | Reka UI (Vue) | Impact |
|---|---|---|---|
| Composition | `render={<Button/>}` prop | `as-child` (Slot merges props onto its single child) | Close button inside Dialog uses `<DialogClose as-child><Button .../></DialogClose>` |
| State attributes | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-disabled`, `data-checked` **(verify)** | `data-state="open\|closed"` documented; `data-disabled` and `data-highlighted` **(verify)** | All state selectors in classes are rewritten (`data-[state=open]:`) |
| Enter and exit animation | Our Dialog fades with `transition-opacity` plus `data-starting-style` / `data-ending-style` | Reka's Presence suspends unmount while a **CSS animation** runs (documented). A plain CSS transition on unmount is not documented; Vue `<Transition>` works with `forceMount` | Spec says fade at `--pl-duration-fast`, ease-out, no zoom. Plan: `@keyframes` fade in and out driven by `data-[state]`, duration from `--pl-duration-fast`. Reduced-motion handling stays as in React |
| Button | Base UI `Button` (`focusableWhenDisabled`, `nativeButton`) | Reka `Primitive` button with `as` / `as-child`; no `focusableWhenDisabled` | Disabled style still `disabled:` (native). Only affects non-native elements |
| Input | `InputPrimitive` with Field integration | Plain `<input>` with `v-model` via `defineModel` | `aria-invalid`, hover, focus styles are CSS and carry over. No Field-driven validity state |
| Label | plain `<label>` | Reka `Label` primitive (`for` or nesting) | The `required` marker prop is kept as in React |
| Dialog focus | Focus trap, Escape, focus returns to trigger, first focusable gets focus | Trap when modal, Esc closes and focus returns to trigger (documented); initial focus target and `onOpenAutoFocus` / `onCloseAutoFocus` **(verify)** | Spec: "first focusable element gets focus": test on the pilot |
| Title and description | Title and Description optional | Docs: title is for announcement (hide with `VisuallyHidden as-child`); description optional, remove with `:aria-describedby="undefined"` | Always render both in pilot examples. A dev-time warning for a missing title **(verify)** |
| Outside click, Escape | Base UI handlers | `@pointer-down-outside`, `@escape-key-down` with `preventDefault()` | Needed for Alert Dialog (outside click must not close) |
| Scroll lock and inert | Base UI | Reka hides the rest of the page with `aria-hidden` and locks body scroll **(verify)** | Check for layout shift from the scrollbar |
| Portal | `Portal` | `DialogPortal` (Teleport to `body`, optional `to`) | `.dark` is on `html`, so dark tokens still apply |
| Required overlay styles | Backdrop | "Overlay does not cover the viewport by default" | `fixed inset-0 bg-scrim` as in React |

## 5. Figma and Code Connect

- The Figma library stays the single design source.
- **Format:** Vue templates use the same template-file format as our React files (`import figma from 'figma'`). Not the legacy HTML parser (unmaintained since 17 Aug 2026, uses a different `figma.connect` API).
- **Labels and config:** Figma documents "one config file per framework, each with a unique `label`, the matching `language`, and an `include` glob", published with `figma connect publish --config <file>`. Proposal:

```jsonc
// figma.vue.config.json
{ "codeConnect": { "include": ["code-connect-vue/**/*.figma.ts"], "label": "Vue", "language": "html" } }
```

- Folder `code-connect-vue/`, files named like the React ones (`Button.figma.ts`) with the **same `// url=`** as the React file and `// source=packages/ui-vue/src/components/...`.
- Snippets are Vue templates (`<Button variant="outline">…</Button>`) with imports like `import { Button } from "@workspace/ui-vue/components/button"`.
- **Not confirmed:** the docs show a flat config in the migration guide and a nested `codeConnect` key elsewhere; I will mirror the nesting our React config already uses. `language: "vue"` is not documented, so `html` is used.
- **Plan limit:** on Figma Professional plans only one Code Connect framework is active at a time. Organization and Enterprise plans can have several. If you are on Professional, Vue would replace React on the Figma side. Please check this before we publish. I never publish and never touch a token. You run `figma connect publish --config figma.vue.config.json --dry-run` from your terminal.

## 6. Order of work

1. **Pilot (Phase 2):** Button, Input, Label, Dialog. Plus the plumbing they need: tokens package (if approved), `ui-vue` scaffold, `Icon.vue`, `cn`, playground, screenshots, templates.
2. **Forms:** Textarea, Checkbox, Radio Group, Switch, Select, Native Select, Field, Input Group, Toggle, Toggle Group, Slider.
3. **Overlays:** Alert Dialog, Sheet, Popover, Tooltip, Dropdown Menu, Context Menu, Hover Card, Sonner.
4. **Navigation:** Tabs, Breadcrumb, Pagination, Navigation Menu, Menubar, Sidebar, Command, Combobox.
5. **Display:** Badge, Alert, Card, StatCard (by hand), Table, Avatar, Progress, Skeleton, Spinner, Separator, Accordion, Collapsible, Empty, Item, Kbd, Scroll Area, Aspect Ratio, Button Group.
6. **Heavy:** Calendar and Date Picker, Drawer, Input OTP, Charts, Code Block, chat pieces (Attachment, Bubble, Marker, Message, Message Scroller, Trace), then AI Elements.

Each batch follows the React steps: specs against Reka, code, Figma check, Code Connect. 3 to 4 components per batch where possible.

## 7. Phase 2 working rules (restated)

- `pnpm dlx shadcn-vue@latest add <one component> -c packages/ui-vue`, then `git status` and `git diff` after each. No `-o`, no `--overwrite`, no `-f`.
- First a dry run in a scratch folder to confirm `-c` and monorepo behavior **(verify)**.
- After each install: replace icon imports with `Icon`, remove `lucide-vue-next` if added, restyle with tokens only, copy variant and size names from the React files exactly.
- Never touch `packages/ui` or `apps/web` except the approved token move.

## 8. Open questions

See the message that accompanies this plan. Answers will be recorded here:

| # | Topic | Answer |
|---|---|---|
| 1 | Shared tokens | (a) Shared `packages/tokens`, approved. React files may change only as listed in section 1. |
| 2 | `apps/web-vue` role, npm or monorepo | (a) Playground only now; workspace package later; no npm publishing now. |
| 3 | Nuxt | (a) Plain Vue 3 + Vite. |
| 4 | Libraries beyond Reka UI (Chart, Drawer, Input OTP, Sonner) | (a) Ask per batch, with name, version and size. |
| 5 | Figma plan (one active Code Connect framework on Professional) | Open: user to check before publishing. |
| 6 | Class merging | Default: reuse the `cn` package with the same type-scale list, unless told otherwise. |
