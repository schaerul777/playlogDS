import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Alert } from "./Alert.vue"
export { default as AlertAction } from "./AlertAction.vue"
export { default as AlertDescription } from "./AlertDescription.vue"
export { default as AlertTitle } from "./AlertTitle.vue"

export const alertVariants = cva(
  [
    // Playlog: COMPONENT-SPECS. Padding 12 16, 4px radius, 14/20 text, 12px gap to the icon.
    // Playlog: the icon is 20px (--pl-icon-size) in the text colour and aligns to the top.
    "group/alert relative grid w-full gap-0.5 rounded-md px-4 py-3 text-left text-body-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-(--pl-icon-size)",
  ],
  {
    variants: {
      variant: {
        // Playlog: neutral alert. foreground text on card with a 1px border (fill and border not in the spec).
        default: "border-(length:--pl-border-width) border-border bg-card text-foreground",
        // Playlog: status alerts use the *-surface fill with *-text words, no border. destructive = danger.
        destructive: "bg-danger-surface text-danger-text",
        info: "bg-info-surface text-info-text",
        success: "bg-success-surface text-success-text",
        warning: "bg-warning-surface text-warning-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
