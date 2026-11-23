import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as InputGroup } from "./InputGroup.vue"
export { default as InputGroupAddon } from "./InputGroupAddon.vue"
export { default as InputGroupButton } from "./InputGroupButton.vue"
export { default as InputGroupInput } from "./InputGroupInput.vue"
export { default as InputGroupText } from "./InputGroupText.vue"
export { default as InputGroupTextarea } from "./InputGroupTextarea.vue"

// Playlog: same classes as packages/ui/src/components/input-group.tsx (React).
export const inputGroupAddonVariants = cva(
  // Playlog: inline addons inside the one border, no dividers. Text and icons muted-foreground, icons 16.
  "flex h-auto cursor-text items-center justify-center gap-2 text-body-sm text-muted-foreground select-none [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:pl-2",
        "inline-end": "order-last pr-3 has-[>button]:pr-2",
        "block-start": "order-first w-full justify-start px-3 pt-2",
        "block-end": "order-last w-full justify-start px-3 pb-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
)

export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>

// Playlog: the control drops its own border, fill, hover and ring; the wrapper draws them.
export const inputGroupControl =
  "flex-1 rounded-(--pl-radius-0) border-0 bg-transparent hover:border-transparent focus-visible:outline-none disabled:opacity-100 aria-invalid:border-0"
