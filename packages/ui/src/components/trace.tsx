import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import { Spinner } from "@workspace/ui/components/spinner"
import { Icon, type IconName } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Trace. One line per step: icon 16 + title 14/20, gap 8, muted-foreground; interactive lines go
// foreground on hover. Status is icon + colour + a word in the title ("Running pnpm test", "Failed to run pnpm lint").
function Trace({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="trace"
      // Playlog: steps 8 apart; a collapsible trigger takes the 2px focus ring, radius 4.
      className={cn(
        "flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:rounded-md *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:outline-(length:--pl-focus-ring-width) *:has-[>[data-slot=trace-line]]:focus-visible:outline-offset-(--pl-focus-ring-offset) *:has-[>[data-slot=trace-line]]:focus-visible:outline-solid *:has-[>[data-slot=trace-line]]:focus-visible:outline-ring",
        className
      )}
      {...props}
    />
  )
}

type TraceStatus = "running" | "error" | "pending"

function TraceLine({
  className,
  status,
  ...props
}: React.ComponentProps<"span"> & {
  status?: TraceStatus
}) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      // Playlog: error is danger-text; running keeps the text steady (the Spinner is the signal); pending is muted.
      className={cn(
        "flex w-fit max-w-full min-w-0 items-center gap-2 text-body-sm text-muted-foreground transition-colors duration-(--pl-duration-fast) ease-out in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-danger-text data-[status=error]:in-[a:hover,button:hover]:text-danger-text",
        className
      )}
      {...props}
    />
  )
}

function TraceIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [[data-slot=trace-title]~&]:-ml-1",
        className
      )}
      {...props}
    />
  )
}

// Playlog addition: the status glyph for a line. Running: Spinner; error: alert-circle; pending: time; done: check
// (or the glyph of the step, for example `terminal`, passed as `icon`).
function TraceStatusIcon({
  status,
  icon = "check",
  className,
}: {
  status?: TraceStatus
  icon?: IconName
  className?: string
}) {
  return (
    <TraceIcon className={className}>
      {status === "running" ? (
        <Spinner className="size-4" />
      ) : (
        <Icon
          name={status === "error" ? "alert-circle" : status === "pending" ? "time" : icon}
        />
      )}
    </TraceIcon>
  )
}

function TraceTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-title"
      className={cn("min-w-0 truncate", className)}
      {...props}
    />
  )
}

function TraceDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-description"
      className={cn("shrink-0 text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

function TraceCollapsible({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, "open"> &
  (
    | { open?: undefined }
    | {
        open: boolean
        onOpenChange: NonNullable<
          React.ComponentProps<typeof Collapsible>["onOpenChange"]
        >
      }
  )) {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      className={cn("flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  )
}

function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      className={cn(
        "group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-md text-left text-muted-foreground transition-colors duration-(--pl-duration-fast) ease-out outline-none hover:text-foreground focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring has-[[data-status=error]]:text-danger-text",
        className
      )}
      {...props}
    >
      {children}
      {/* Playlog: chevron-right 16 turns 90° when open, at --pl-duration-fast. */}
      <TraceIcon className="transition-transform duration-(--pl-duration-fast) ease-out group-aria-expanded/trace-collapsible-trigger:rotate-90">
        <Icon name="chevron-right" />
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

function TraceCollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      className="h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] duration-(--pl-duration-fast) ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        // Playlog: left border 1px `border`, padding 0 4 0 16, 8 above and 4 below, muted text 14/20.
        className={cn(
          "mt-2 mb-1 ml-[calc(--spacing(2)-1px)] min-w-0 border-l-(length:--pl-border-width) border-border pr-1 pl-4 text-body-sm wrap-break-word text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

export {
  Trace,
  TraceLine,
  TraceIcon,
  TraceStatusIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
}
export type { TraceStatus }
