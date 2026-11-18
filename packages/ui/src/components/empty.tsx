import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Empty. Reuses the StatCard icon tile, the Card title and our Button.
// No border of its own: place it in a Card or a table body.
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      // Playlog: centred column, padding 48 24, 16 between the text block and the actions.
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center text-balance",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      // Playlog: text block max width 384; description 4 below the title.
      className={cn("flex max-w-sm flex-col items-center gap-1", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  // Playlog: 12 below the media (16 to the title with the header gap). Extrapolated on the 4px grid.
  "mb-3 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        // Playlog: 40 tile, radius 4, accent (surface-hover) fill, 24px ink-heading icon.
        icon: "size-10 rounded-md bg-accent text-ink-heading [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      // Playlog: as the Card title. h3 (16/24, 700) in ink-heading.
      className={cn("font-heading text-h3 font-bold text-ink-heading", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      // Playlog: 14/20 muted-foreground; links underlined, never Blue or Green text.
      className={cn(
        "text-body-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      // Playlog: actions centred, 8 apart (Button default + Button outline).
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-wrap items-center justify-center gap-2 text-body-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
