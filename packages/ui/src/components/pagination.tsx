import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Button } from "@workspace/ui/components/button"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      // Playlog: 4 between items.
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

// Playlog: COMPONENT-SPECS Pagination. Button ghost at icon size (40, or icon-sm 32);
// the current page is Button outline with aria-current="page".
type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn("tabular-nums", className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

// Playlog: chevron plus label; below sm the label hides and aria-label keeps the name.
// size follows the page links: "sm" for 32, "default" for 40.
function PaginationPrevious({
  className,
  text = "Previous",
  size = "default",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={size}
      className={cn("max-sm:px-0 max-sm:w-(--pl-control-height) data-[size=sm]:max-sm:w-(--pl-control-height-sm)", className)}
      data-size={size}
      {...props}
    >
      {/* Playlog: the set has no chevron-left; chevron-right turned 180°. */}
      <Icon name="chevron-right" data-icon="inline-start" className="rotate-180" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  size = "default",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size={size}
      className={cn("max-sm:px-0 max-sm:w-(--pl-control-height) data-[size=sm]:max-sm:w-(--pl-control-height-sm)", className)}
      data-size={size}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <Icon name="chevron-right" data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      // Playlog: `more` glyph in muted-foreground, in a 40 square.
      className={cn(
        "flex size-10 items-center justify-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <Icon name="more" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

// Playlog: compact status for small screens, "Page 3 of 12" (agreed). Put it between Previous and Next
// and hide the page links below sm.
function PaginationStatus({
  className,
  page,
  pageCount,
  ...props
}: React.ComponentProps<"li"> & { page: number; pageCount: number }) {
  return (
    <li
      data-slot="pagination-status"
      aria-live="polite"
      className={cn("px-2 text-body-sm text-muted-foreground tabular-nums sm:hidden", className)}
      {...props}
    >
      Page {page} of {pageCount}
    </li>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStatus,
}
