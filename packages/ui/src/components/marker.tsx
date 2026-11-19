import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Marker. A one-line note in the thread: 12/16 medium muted-foreground, icon 16, gap 8.
// `separator` puts the text between two 1px `border` lines (dates); `border` underlines it. For a status note pass
// role="status" and a Spinner (16) as the MarkerIcon.
const markerVariants = cva(
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
    defaultVariants: {
      variant: "default",
    },
  }
)

function Marker({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof markerVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(markerVariants({ variant, className })),
      },
      props
    ),
    render,
    state: {
      slot: "marker",
      variant,
    },
  })
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Marker, MarkerIcon, MarkerContent, markerVariants }
