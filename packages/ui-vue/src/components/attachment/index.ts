import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Attachment } from "./Attachment.vue"
export { default as AttachmentAction } from "./AttachmentAction.vue"
export { default as AttachmentActions } from "./AttachmentActions.vue"
export { default as AttachmentContent } from "./AttachmentContent.vue"
export { default as AttachmentDescription } from "./AttachmentDescription.vue"
export { default as AttachmentGroup } from "./AttachmentGroup.vue"
export { default as AttachmentMedia } from "./AttachmentMedia.vue"
export { default as AttachmentTitle } from "./AttachmentTitle.vue"
export { default as AttachmentTrigger } from "./AttachmentTrigger.vue"

// Playlog: COMPONENT-SPECS Attachment. Chip: card fill, 1px border, radius 4, padding 8 (sm 6, xs 4), gap 8.
// States: done; idle (dashed border); uploading and processing (put a Spinner in the media tile and name the step in
// the description); error (danger border, tile and description; the description says why, so colour is not the only cue).
export const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-md border-(length:--pl-border-width) border-border bg-card text-card-foreground transition-colors duration-(--pl-duration-fast) ease-out has-[>a,>button]:hover:bg-accent data-[state=error]:border-danger-text data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default: "gap-2 text-body-sm has-data-[slot=attachment-content]:p-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2 text-caption has-data-[slot=attachment-content]:p-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-2 text-caption has-data-[slot=attachment-content]:p-1 has-data-[slot=attachment-media]:p-1",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
      },
    },
    defaultVariants: { size: "default", orientation: "horizontal" },
  },
)
export type AttachmentVariants = VariantProps<typeof attachmentVariants>

// Playlog: media tile 40 (sm 32, xs 24), radius 4, muted fill, icon 16; error tile is danger-surface with danger-text.
export const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-6 group-data-[state=error]/attachment:bg-danger-surface group-data-[state=error]/attachment:text-danger-text [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "group-data-[state=uploading]/attachment:opacity-(--pl-opacity-disabled) group-data-[state=processing]/attachment:opacity-(--pl-opacity-disabled) *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: { variant: "icon" },
  },
)
export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>
