# shadcn/ui monorepo template

This is a Vite monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```

## Vue library (`packages/ui-vue`)

A Vue 3 port of the same design, built on shadcn-vue and Reka UI. The React library stays the reference; `docs/brand/COMPONENT-SPECS.md` is the shared contract. Prop, variant and size names match the React components. Status and plan: `docs/VUE-PORT-PLAN.md`. Pilot comparison: `docs/vue-compare/README.md`.

- Shared design source: `packages/tokens` (tokens, theme, icon data). Both libraries import it.
- Run the Vue playground: `pnpm --filter web-vue dev` (http://localhost:5180). `pnpm dev` starts it next to the React app.
- Check: `pnpm --filter @workspace/ui-vue lint`, `pnpm --filter @workspace/ui-vue typecheck`, `pnpm --filter web-vue build`. Root `pnpm lint`, `pnpm typecheck` and `pnpm build` cover both libraries.
- Add a component: run the CLI **from `packages/ui-vue`** (`-c` did not pick the right `components.json` in a test), one component at a time, and answer **no** to every overwrite question:

  ```bash
  cd packages/ui-vue
  yes n | pnpm dlx shadcn-vue@latest add dialog -y
  ```

  Never pass `--overwrite`. Then check `git status` and `git diff`, restyle with tokens only, replace the icon imports with `Icon`, and remove `@lucide/vue` and `@vueuse/core` if the CLI added them to `package.json`.
- Use components: `import { Button } from "@workspace/ui-vue/components/button"`, `import { Icon } from "@workspace/ui-vue/icons"`.

## Contributing

1. Branch from an up-to-date `main` (`git switch main && git pull && git switch -c my-change`).
2. Make your change, then run the three checks from the repo root:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm build
   ```

   `pnpm lint` also runs the type-token check and blocks Remix icon imports.
3. Push the branch and open a pull request. The template lists what to check. CI runs the same three checks on every pull request.
