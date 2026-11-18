import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Separator } from "@workspace/ui/components/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        // Playlog: items 8 apart at every size.
        "group/item-group flex w-full flex-col gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      // Playlog: a 1px border line; the group gap spaces it.
      className={cn(className)}
      {...props}
    />
  )
}

// Playlog: COMPONENT-SPECS Item. A list row that follows the Table row and Sidebar item: radius 4, gap 12.
// Static by default. Rendered as a link or button it gets hover accent, the focus ring, data-selected
// (surface-selected + ink-heading; pass data-selected="true") and the disabled opacity.
const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center gap-3 rounded-md border-(length:--pl-border-width) text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring [a]:hover:bg-accent [a]:hover:text-accent-foreground [button]:hover:bg-accent [button]:hover:text-accent-foreground [button]:text-left data-selected:bg-surface-selected data-selected:text-ink-heading aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled) disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled)",
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
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size, className })),
      },
      props
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  })
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        // Playlog: 20px muted-foreground icon.
        icon: "text-muted-foreground group-data-selected/item:text-ink-heading [&_svg:not([class*='size-'])]:size-5",
        image:
          // Playlog: 40 square (sm 32, xs 24), radius 4.
          "size-10 overflow-hidden rounded-md group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-0.5 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        // Playlog: 14/20 semibold; inherits foreground (ink-heading when selected).
        "line-clamp-1 flex w-fit items-center gap-2 text-label font-semibold underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        // Playlog: 12/16 muted-foreground, at most two lines; links underlined, never Blue or Green text.
        "line-clamp-2 text-left text-caption font-medium text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
