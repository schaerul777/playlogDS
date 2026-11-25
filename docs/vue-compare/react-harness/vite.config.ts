// Visual-comparison harness for the Vue pilot. NOT a workspace package: it renders the React pilot
// components (packages/ui) with the same specimens as apps/web-vue, so both can be compared side by side.
// It does not change packages/ui or apps/web; it borrows their node_modules.
// Run from the repo root: pnpm --filter web exec vite --config ../../docs/vue-compare/react-harness/vite.config.ts
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, "../../..")
const requireFromWeb = createRequire(resolve(repo, "apps/web/package.json"))
const react = requireFromWeb("@vitejs/plugin-react")
const tailwindcss = requireFromWeb("@tailwindcss/vite")
const { defineConfig } = requireFromWeb("vite")

export default defineConfig({
  root: here,
  publicDir: resolve(repo, "apps/web/public"),
  plugins: [(react.default ?? react)(), (tailwindcss.default ?? tailwindcss)()],
  server: { port: 5181, strictPort: true, fs: { allow: [repo] } },
  resolve: {
    alias: [
      { find: /^@workspace\/ui\//, replacement: resolve(repo, "packages/ui/src") + "/" },
      { find: /^react(\/.*)?$/, replacement: resolve(repo, "packages/ui/node_modules/react") + "$1" },
      { find: /^react-day-picker(\/.*)?$/, replacement: resolve(repo, "packages/ui/node_modules/react-day-picker") + "$1" },
      { find: /^react-dom(\/.*)?$/, replacement: resolve(repo, "packages/ui/node_modules/react-dom") + "$1" },
    ],
  },
})
