import { createCn } from "cn/config"

// Playlog: register the brand type scale (`text-label`, `text-body-sm`, ...) as font sizes.
// Without this, the merger reads them as text colours and drops either the size or the colour.
// Keep in sync with the `--text-*` entries in `packages/tokens/theme.css` and with `packages/ui/src/lib/utils.ts` (React).
export const cn = createCn({
  extend: {
    theme: {
      text: [
        "display",
        "headline",
        "keyword",
        "h1",
        "h2",
        "subheadline",
        "h3",
        "section-number",
        "body-lg",
        "body",
        "body-sm",
        "label",
        "label-sm",
        "caption",
        "eyebrow",
        "kpi",
        "kpi-sm",
        "line-category",
        "line-product",
      ],
    },
  },
})
