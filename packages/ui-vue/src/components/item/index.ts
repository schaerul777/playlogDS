import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Item } from "./Item.vue"
export { default as ItemActions } from "./ItemActions.vue"
export { default as ItemContent } from "./ItemContent.vue"
export { default as ItemDescription } from "./ItemDescription.vue"
export { default as ItemFooter } from "./ItemFooter.vue"
export { default as ItemGroup } from "./ItemGroup.vue"
export { default as ItemHeader } from "./ItemHeader.vue"
export { default as ItemMedia } from "./ItemMedia.vue"
export { default as ItemSeparator } from "./ItemSeparator.vue"
export { default as ItemTitle } from "./ItemTitle.vue"

// Playlog: COMPONENT-SPECS Item. A list row that follows the Table row and Sidebar item: radius 4, gap 12.
// Static by default. Rendered as a link or button it gets hover accent, the focus ring, data-selected
// (surface-selected + ink-heading; pass data-selected="true") and the disabled opacity.
export const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center gap-3 rounded-md border-(length:--pl-border-width) text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring [a]:hover:bg-accent [a]:hover:text-accent-foreground [button]:hover:bg-accent [button]:hover:text-accent-foreground [button]:text-left data-[selected]:bg-surface-selected data-[selected]:text-ink-heading aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled) disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled)",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted",
      },
      size: {
        // Playlog: padding 12 16 / 8 12 / 6 8.
        default: "px-4 py-3",
        sm: "px-3 py-2",
        xs: "px-2 py-1.5 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        // Playlog: 20px muted-foreground icon.
        icon: "text-muted-foreground group-data-[selected]/item:text-ink-heading [&_svg:not([class*='size-'])]:size-5",
        image:
          // Playlog: 40 square (sm 32, xs 24), radius 4.
          "size-10 overflow-hidden rounded-md group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type ItemVariants = VariantProps<typeof itemVariants>
export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>
