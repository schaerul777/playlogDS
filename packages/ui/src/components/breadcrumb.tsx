import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      // Playlog: COMPONENT-SPECS Breadcrumb. 14/20 muted-foreground, items 8 apart.
      className={cn(
        "flex flex-wrap items-center gap-2 text-body-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        // Playlog: muted-foreground link; hover foreground with an underline. Focus ring from tokens.
        className: cn(
          "rounded-sm text-muted-foreground underline-offset-4 transition-colors duration-(--pl-duration-fast) ease-out hover:text-foreground hover:underline outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      // Playlog: current page 14/20 semibold foreground.
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      // Playlog: chevron-right 16 in muted-foreground.
      className={cn("flex text-muted-foreground [&>svg]:size-4", className)}
      {...props}
    >
      {children ?? <Icon name="chevron-right" />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      // Playlog: 24 square with the `more` glyph. Wrap it in a DropdownMenuTrigger to list the hidden items.
      className={cn(
        "flex size-6 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <Icon name="more" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
