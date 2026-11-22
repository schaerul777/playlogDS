# Playlog UI Library

A shared UI library for our front-end team, built on shadcn/ui and customized to the Playlog brand (product UI for the Playlog analytics platform).

## Stack

- Template: Vite (React + TypeScript)
- Base: Base UI (`@base-ui/react`). Do NOT use Radix UI or React Aria imports.
- Styling: Tailwind CSS with CSS variables as design tokens
- Structure: monorepo. `packages/ui` is the library, `apps/web` is the playground/demo app.
  (Verify these paths after init and correct this section if they differ.)

## Brand source files

All brand values live in `docs/brand/`. Read them before changing any styling.

- `docs/brand/BRAND.md`: brand rules, shadcn token mapping, component scope. Read this first.
- `packages/tokens/tokens.css` and `packages/tokens/theme.css`: the tokens as CSS variables (light and dark), mapped to shadcn variable names. `theme.css` is the shared theme (tokens, `@theme inline`, base rules) that both `packages/ui` and `packages/ui-vue` import.
- `packages/tokens/tokens.json`: the same values as data. Use it when creating Figma variables.
- `docs/brand/COMPONENT-SPECS.md`: sizes, colors and states for each in-scope component. Check it before asking a brand question. For parts it doesn’t cover (extra sizes, popups), extrapolate on the 4px grid with tokens and note the choice.

Do not invent brand values. If a value is missing, ask.

## Core principles

1. **Tokens first.** The brand look lives in CSS variables, not in component code. Never hardcode colors, radius, spacing, font sizes or shadows in a component. Use tokens (`bg-primary`, `text-muted-foreground`, `rounded-md`, and so on).
2. **We own the components.** shadcn components are copied source. Edit them directly to match the brand, but keep the public API (prop names, variant names) stable.
3. **Small, reviewable changes.** Work in batches of 3 to 4 components. Stop for review before continuing.
4. **Code is the source of truth for tokens and names** until the team agrees to hand off to Figma (see "Figma sync").

## Brand summary

- Primary: Playlog Dark Blue `#004d9f`. Accent: Playlog Green `#36f1cd`. Page ground: warm off-white `#faf9f6` (light), deep navy `#061a36` (dark).
- In dark mode, primary flips to Green with Dark Blue text.
- Font: Reddit Sans for all UI. Funnel Display only inside logos. No other fonts.
- Square-cut look: radius 4px for buttons, inputs, selects and menus; 8px for cards and dialogs; 2px for badges and checkboxes.
- Never put Green, Blue or the secondary colors as text on white or light grey. Status is always color plus a word or icon.
- Icons come from the `Icon` component only (`@workspace/ui/icons/icon`). No other icon library. The shadcn CLI still adds Remix imports (`iconLibrary` in `components.json` has no "none" option): after `shadcn add`, replace them with `Icon` and remove `@remixicon/react` if the CLI added it back.
- Lint enforces the icon rule: `no-restricted-imports` in `packages/ui` and `apps/web` fails on `@remixicon/react` and `remixicon` imports.
- Interactive controls use the pointer cursor via the base rule in globals.css.

## Token rules

- The shadcn variable names stay as they are. Playlog values are assigned to them using the mapping table in `docs/brand/BRAND.md`. Important: shadcn's `--accent` is the hover fill (Playlog `surface-hover`), not Playlog Green. Playlog Green is `--pl-brand-accent`.
- Playlog tokens with no shadcn equivalent are prefixed `--pl-` and exposed to Tailwind without the prefix (`bg-surface-brand`, `text-ink-heading`, `bg-success-surface`, `text-danger-text`).
- Components use semantic tokens only, never the raw palette (`--pl-dark-blue` and similar).
- Adding a token: add it to `tokens.css`, `theme.css` and `tokens.json`, expose it in `@theme inline` (in `theme.css`), and note it in `docs/brand/BRAND.md`.
- Dark mode uses the `.dark` class.

## Component rules

- Components live in `packages/ui/src/components`. Add new ones with `npx shadcn@latest add <name>`, then customize.
- Radius is per component, not a single value. After adding a component, check its radius classes against the rules above (shadcn's defaults differ from Playlog's).
- Variants use `cva`. Variant and size names must match Figma component property names exactly (for example `variant: default | secondary | outline | ghost | destructive`, `size: sm | default | lg`).
- Control height: 40px default, 32px for `sm`.
- Every component must support: keyboard navigation, a visible focus ring (2px solid `--ring`, 2px offset), a disabled state (40% opacity), and dark mode.
- Keep Base UI behavior intact. Change styling and composition, not accessibility behavior.
- Mark brand-specific changes with a short comment so we can re-apply them when pulling shadcn updates.
- In scope: Button, Input, Select, Checkbox, Switch, Badge, Tabs, Alert, Card, StatCard, DataTable, BarChart, Sidebar. Marketing and document components (Hero, Slide, Letterhead and similar) are out of scope for now.

## Figma sync

Current phase: **bootstrap, code to Figma.** After the team signs off, switch to **Figma to code**. Never edit the same thing in both places.

When writing to Figma through the MCP:

- Create variables from `packages/tokens/tokens.json`: a palette collection and a semantic collection, with Light and Dark modes. Variable names mirror the CSS variable names.
- Build real components, not look-alike frames:
  - Use auto layout. No fixed-size layouts.
  - Use component properties and variants. No duplicated frames per state.
  - Bind fills, strokes, radius and typography to variables. No hardcoded values.
- Name components, variants and properties exactly as in code.
- Work in batches (3 to 4 components), then pause for review.
- After components are approved, link them to code with Code Connect where our Figma plan allows it.

## Workflow

1. Put the font files in the app's `apps/web/public/fonts/` folder (names are listed at the end of `docs/brand/BRAND.md`).
2. Import `@workspace/tokens/theme.css` in the library's global stylesheet. Check the app in light and dark.
3. Customize core components: Button, Input, Card, Badge.
4. Review in the playground: every variant and state, light and dark.
5. Mirror tokens and the approved components into Figma.
6. Expand to the remaining components in batches.

## Commands

- Install: `pnpm install`
- Dev (playground): `pnpm dev` (run from the repo root; Turborepo starts `apps/web`)
- Build: `pnpm build`
- Lint / typecheck: `pnpm lint` / `pnpm typecheck` (`pnpm lint` also runs `pnpm check:type-tokens`: every type token in `tokens.json` needs size, line height, weight and, if set, letter spacing in `globals.css`)
- CI (`.github/workflows/ci.yml`) runs `pnpm lint`, `pnpm typecheck` and `pnpm build` on every pull request; the type-token check and the Remix import block run inside `pnpm lint`.
- Add a component: `pnpm dlx shadcn@latest add <name> -c apps/web` (run from the repo root; components are written into `packages/ui/src/components`)
- Global stylesheet: `packages/ui/src/styles/globals.css`
- Fonts: `apps/web/public/fonts/`

## Do not

- Do not hardcode brand values in components.
- Do not rename variants or props without updating Figma and the docs.
- Do not mix Radix or React Aria into this library.
- Do not rename shadcn token variables.
- Do not use any font other than Reddit Sans (and Funnel Display inside logos).
- Do not run large changes across many components in one pass. Ask first.
