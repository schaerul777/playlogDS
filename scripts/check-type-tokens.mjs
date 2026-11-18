// Fails when a type token in docs/brand/tokens.json has no complete, matching --text-* definition in the
// stylesheets that carry the theme (packages/ui/src/styles/globals.css and docs/brand/tokens.css).
// "Complete" means size, line height and weight, plus letter spacing when tokens.json sets one.
// Also fails on a --text-* token the stylesheet defines that tokens.json does not know about.
// Run by `pnpm lint`; run alone with `pnpm check:type-tokens`.
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join, relative } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const tokens = JSON.parse(readFileSync(join(root, "docs/brand/tokens.json"), "utf8")).type.styles
const files = ["packages/ui/src/styles/globals.css", "docs/brand/tokens.css"]

const PROPS = {
  fontSize: { suffix: "", label: "font-size" },
  lineHeight: { suffix: "--line-height", label: "line-height" },
  fontWeight: { suffix: "--font-weight", label: "font-weight" },
  letterSpacing: { suffix: "--letter-spacing", label: "letter-spacing", optional: true },
}
const norm = (v) => String(v).trim().toLowerCase().replace(/^(-?)0\./, "$1.")

const errors = []
for (const file of files) {
  const css = readFileSync(join(root, file), "utf8")
  const defined = new Map() // "--text-caption--font-weight" -> "500"
  for (const m of css.matchAll(/(--text-[a-z0-9-]+?)\s*:\s*([^;]+);/g)) defined.set(m[1], m[2].trim())

  for (const [name, spec] of Object.entries(tokens)) {
    for (const [key, { suffix, label, optional }] of Object.entries(PROPS)) {
      const variable = `--text-${name}${suffix}`
      const want = spec[key]
      const got = defined.get(variable)
      if (want === undefined) {
        if (optional && got !== undefined) errors.push(`${file}: ${variable}: ${got} is set but tokens.json has no ${label} for "${name}"`)
        continue
      }
      if (got === undefined) errors.push(`${file}: ${variable} is missing (tokens.json ${label}: ${want})`)
      else if (norm(got) !== norm(want)) errors.push(`${file}: ${variable}: ${got} does not match tokens.json ${label}: ${want}`)
    }
  }
  for (const variable of defined.keys()) {
    const m = variable.match(/^--text-(.+?)(--(?:line-height|font-weight|letter-spacing))?$/)
    if (m && !(m[1] in tokens)) errors.push(`${file}: ${variable} has no token "${m[1]}" in tokens.json`)
  }
}

if (errors.length) {
  console.error(`check-type-tokens: ${errors.length} problem(s)\n` + errors.map((e) => `  - ${e}`).join("\n"))
  console.error(`\nFix the stylesheet (tokens.json and Figma win), then run: pnpm check:type-tokens`)
  process.exit(1)
}
console.log(`check-type-tokens: ${Object.keys(tokens).length} type tokens complete in ${files.map((f) => relative(root, join(root, f))).join(", ")}`)
