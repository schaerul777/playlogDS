import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Bubble } from "./Bubble.vue"
export { default as BubbleContent } from "./BubbleContent.vue"
export { default as BubbleGroup } from "./BubbleGroup.vue"
export { default as BubbleReactions } from "./BubbleReactions.vue"

// Playlog: COMPONENT-SPECS Bubble. Variant names stay shadcn's; fills are tokens only (no colour maths).
// The person uses `secondary`, the assistant uses `ghost` (no bubble). Interactive bubbles (link or button) hover
// one step on: accent, or surface-selected for the tinted fills.
export const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-hover",
        secondary:
          "*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-surface-selected",
        muted: "*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
        tinted:
          "*:data-[slot=bubble-content]:bg-surface-selected *:data-[slot=bubble-content]:text-ink-heading [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
        outline:
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-card [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent [&>[data-slot=bubble-content]:is(button,a):hover]:text-accent-foreground",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
        destructive: "*:data-[slot=bubble-content]:bg-danger-surface *:data-[slot=bubble-content]:text-danger-text",
      },
    },
    defaultVariants: { variant: "default" },
  },
)
export type BubbleVariants = VariantProps<typeof bubbleVariants>

export const bubbleReactionsVariants = cva(
  // Playlog: radius 2 pill, muted fill, ringed in the page colour at --pl-ring-separator-width (as the avatar status dot).
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-sm bg-muted px-1.5 py-0.5 text-caption ring-(length:--pl-ring-separator-width) ring-background has-[button]:p-0",
  {
    variants: {
      side: { top: "top-0 -translate-y-3/4", bottom: "bottom-0 translate-y-3/4" },
      align: { start: "left-3", end: "right-3" },
    },
    defaultVariants: { side: "bottom", align: "end" },
  },
)
