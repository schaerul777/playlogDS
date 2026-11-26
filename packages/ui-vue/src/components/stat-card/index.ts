import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as StatCard } from "./StatCard.vue"

// Playlog: the delta colour follows `trend`: good = success-text, bad = danger-text, neutral = ink-muted.
export const statCardDeltaVariants = cva("font-bold", {
  variants: {
    trend: {
      good: "text-success-text",
      bad: "text-danger-text",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
})

export type StatCardDeltaVariants = VariantProps<typeof statCardDeltaVariants>
