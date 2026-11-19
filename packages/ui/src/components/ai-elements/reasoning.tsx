import * as React from "react"

import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceStatusIcon,
  TraceTitle,
} from "@workspace/ui/components/trace"

// Playlog: COMPONENT-SPECS Reasoning. A Trace line for the agent's thinking: "Thinking" (running, Spinner) then
// "Thought for 5s" (icon `brain`). The thinking text sits in a TraceCollapsible: open while the model thinks, closed
// when it finishes; the person can reopen it and that choice is kept for the turn. Place it inside a <Trace>.
function Reasoning({
  children,
  running = false,
  duration,
  defaultOpen,
  className,
}: {
  /** The thinking text. With no text the row is just the line. */
  children?: React.ReactNode
  running?: boolean
  /** Seconds the model thought; shown after it finishes. */
  duration?: number
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState<boolean | undefined>(defaultOpen)

  const line = (
    <TraceLine status={running ? "running" : undefined}>
      <TraceStatusIcon status={running ? "running" : undefined} icon="brain" />
      <TraceTitle>
        {running ? "Thinking" : duration ? `Thought for ${duration}s` : "Thought"}
      </TraceTitle>
    </TraceLine>
  )

  if (!children) {
    return line
  }

  return (
    <TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent className={className ?? "whitespace-pre-wrap"}>
        {children}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export { Reasoning }
