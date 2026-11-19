import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Button } from "@workspace/ui/components/button"

// Playlog: COMPONENT-SPECS Attachment. Chip: card fill, 1px border, radius 4, padding 8 (sm 6, xs 4), gap 8.
// States: done; idle (dashed border); uploading and processing (put a Spinner in the media tile and name the step in
// the description); error (danger border, tile and description; the description says why, so colour is not the only cue).
const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-md border-(length:--pl-border-width) border-border bg-card text-card-foreground transition-colors duration-(--pl-duration-fast) ease-out has-[>a,>button]:hover:bg-accent data-[state=error]:border-danger-text data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default:
          "gap-2 text-body-sm has-data-[slot=attachment-content]:p-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2 text-caption has-data-[slot=attachment-content]:p-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-2 text-caption has-data-[slot=attachment-content]:p-1 has-data-[slot=attachment-media]:p-1",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
      },
    },
  }
)

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

// Playlog: media tile 40 (sm 32, xs 24), radius 4, muted fill, icon 16; error tile is danger-surface with danger-text.
const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-6 group-data-[state=error]/attachment:bg-danger-surface group-data-[state=error]/attachment:text-danger-text [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "group-data-[state=uploading]/attachment:opacity-(--pl-opacity-disabled) group-data-[state=processing]/attachment:opacity-(--pl-opacity-disabled) *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        "max-w-full min-w-0 flex-1 group-data-[orientation=vertical]/attachment:px-1",
        className
      )}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      // Playlog: 14/20 medium (sm and xs: 12/16 semibold).
      className={cn(
        "block max-w-full min-w-0 truncate text-body-sm font-medium group-data-[size=sm]/attachment:text-caption group-data-[size=sm]/attachment:font-semibold group-data-[size=xs]/attachment:text-caption group-data-[size=xs]/attachment:font-semibold",
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "block max-w-full min-w-0 truncate text-caption text-muted-foreground group-data-[state=error]/attachment:text-danger-text",
        className
      )}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
        className
      )}
      {...props}
    />
  )
}

// Playlog: remove and similar actions are Button ghost icon-xs (24); give each one an aria-label.
function AttachmentAction({
  className,
  variant,
  size = "icon-xs",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "ghost"}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: render ? type : (type ?? "button"),
        // Playlog: covers the chip; focus ring 2px offset 2, radius 4.
        className: cn(
          "absolute inset-0 z-10 rounded-md outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "attachment-trigger",
    },
  })
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      // Playlog: scrolls sideways, thin scrollbar as Message Scroller, no edge fade.
      className={cn(
        "flex min-w-0 snap-x snap-mandatory scroll-px-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        className
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
