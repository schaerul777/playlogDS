import * as React from "react"

import { Badge } from "@workspace/ui/components/badge"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceStatusIcon,
  TraceTitle,
  Trace,
} from "@workspace/ui/components/trace"
import type { IconName } from "@workspace/ui/icons/icon"

// Playlog: COMPONENT-SPECS Chain of Thought. A thin composition over Trace, not a new look: a summary line that opens into
// the steps the agent took ("Researching" while running, "Researched in 3 steps", "Researched in 3 steps, 1 failed").
// Open while the steps run, closed when the reply starts; the person can reopen it and that choice is kept for the turn.
// Place inside a <Trace>.
function ChainOfThought({
  children,
  running = false,
  steps,
  failed = 0,
  defaultOpen,
}: {
  /** The steps: ChainOfThoughtStep elements. */
  children: React.ReactNode
  running?: boolean
  /** Number of steps for the summary. Defaults to the number of children. */
  steps?: number
  failed?: number
  defaultOpen?: boolean
}) {
  const [open, setOpen] = React.useState<boolean | undefined>(defaultOpen)
  const count = steps ?? React.Children.count(children)
  const status = running ? "running" : failed > 0 ? "error" : undefined

  return (
    <TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
      <TraceCollapsibleTrigger>
        <TraceLine status={status}>
          <TraceStatusIcon status={status} />
          <TraceTitle>
            {running
              ? "Researching"
              : `Researched in ${count} ${count === 1 ? "step" : "steps"}${failed > 0 ? `, ${failed} failed` : ""}`}
          </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      {/* keepMounted: each step keeps its own open state when the summary closes. */}
      <TraceCollapsibleContent keepMounted>
        <Trace>{children}</Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

// One step: status icon and a tense-matched title ("Searching…", "Searched…", "Failed to search…"). Detail (a Code Block,
// a Trace of links, ChainOfThoughtBadges) opens below the step.
function ChainOfThoughtStep({
  title,
  status,
  icon = "check",
  defaultOpen,
  children,
}: {
  title: string
  status?: "running" | "error"
  icon?: IconName
  defaultOpen?: boolean
  children?: React.ReactNode
}) {
  const line = (
    <TraceLine status={status}>
      <TraceStatusIcon status={status} icon={icon} />
      <TraceTitle>{title}</TraceTitle>
    </TraceLine>
  )

  if (!children) {
    return line
  }

  return (
    <TraceCollapsible defaultOpen={defaultOpen ?? status === "error"}>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent>{children}</TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

// Hostnames or file names as Badge `secondary` (radius 2), wrapping.
function ChainOfThoughtBadges({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  )
}

export { ChainOfThought, ChainOfThoughtStep, ChainOfThoughtBadges }
