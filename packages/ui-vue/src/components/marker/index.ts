import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Marker } from "./Marker.vue"
export { default as MarkerContent } from "./MarkerContent.vue"
export { default as MarkerIcon } from "./MarkerIcon.vue"

// Playlog: COMPONENT-SPECS Marker. A one-line note in the thread: 12/16 medium muted-foreground, icon 16, gap 8.
// `separator` puts the text between two 1px `border` lines (dates); `border` underlines it. For a status note pass
// role="status" and a Spinner (16) as the MarkerIcon.
export const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-caption text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-4 [a]:hover:text-foreground [a]:transition-colors [a]:duration-(--pl-duration-fast) [a]:outline-none [a]:focus-visible:outline-(length:--pl-focus-ring-width) [a]:focus-visible:outline-offset-(--pl-focus-ring-offset) [a]:focus-visible:outline-solid [a]:focus-visible:outline-ring",
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:mr-1 before:h-(--pl-border-width) before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-(--pl-border-width) after:min-w-0 after:flex-1 after:bg-border",
        border: "border-b-(length:--pl-border-width) border-border pb-2",
      },
    },
    defaultVariants: { variant: "default" },
  },
)
export type MarkerVariants = VariantProps<typeof markerVariants>
