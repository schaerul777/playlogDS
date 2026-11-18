import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        // Playlog: flat card. Surface + 1px border, 8px radius, no shadow (COMPONENT-SPECS).
        // Playlog: one vertical rhythm: 16 top and between sections (--card-gap), 24 sides and bottom (--card-spacing).
        // Playlog: header 16 24 0 and content 16 24 24 as in the spec; sm is 16 everywhere (dense panels).
        "group/card flex flex-col gap-(--card-gap) overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-card pt-(--card-gap) pb-(--card-spacing) text-body-sm text-card-foreground [--card-gap:--spacing(4)] [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Playlog: title and action 16 apart; description 2px below the title.
        "group/card-header @container/card-header grid auto-rows-min items-start gap-x-4 gap-y-0.5 rounded-t-lg px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        // Playlog: card title is h3 (16/24, 700) in ink-heading.
        "font-heading text-h3 font-bold text-ink-heading group-data-[size=sm]/card:text-label",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      // Playlog: description is caption (12/16 medium) in ink-muted.
      className={cn("text-caption font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        // Playlog: header actions sit in a row, 8px apart.
        "col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col gap-3 px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-lg px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
