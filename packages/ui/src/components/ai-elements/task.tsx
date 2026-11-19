import * as React from "react"

import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceStatusIcon,
  TraceTitle,
} from "@workspace/ui/components/trace"
import type { IconName } from "@workspace/ui/icons/icon"

// Playlog: COMPONENT-SPECS Task. Work the agent is doing: a status icon and a title in the present tense while it runs
// ("Updating the page metadata"), the past tense when done ("Updated…") and "Failed to update…" on error. The running task
// is open and closes when it is done; the person can reopen it. Steps appear only once taken (no pending steps). Several
// tasks sit in one <Trace>. Use Plan when every step is known up front.
function Task({
  title,
  status,
  defaultOpen,
  children,
}: {
  title: string
  /** `running` while a step runs, `error` when one failed, none when done. */
  status?: "running" | "error"
  defaultOpen?: boolean
  /** The steps: TaskStep elements. */
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState<boolean | undefined>(defaultOpen)

  return (
    <TraceCollapsible open={open ?? status === "running"} onOpenChange={setOpen}>
      <TraceCollapsibleTrigger>
        <TraceLine status={status}>
          <TraceStatusIcon status={status} />
          <TraceTitle>{title}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent keepMounted className="flex flex-col gap-2">
        {children}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

// One step, glyph `search`, `sticky-note` (file) or `edit`. With `href` it is a link: trailing `arrow-up-right` and
// "(opens in a new tab)" for screen readers.
function TaskStep({
  title,
  icon = "search",
  status,
  href,
}: {
  title: string
  icon?: IconName
  status?: "running" | "error"
  href?: string
}) {
  const line = (
    <TraceLine status={status}>
      <TraceStatusIcon status={status} icon={icon} />
      <TraceTitle>
        {title}
        {href ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </TraceTitle>
      {href ? <TraceStatusIcon icon="arrow-up-right" /> : null}
    </TraceLine>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="w-fit rounded-md outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring">
      {line}
    </a>
  ) : (
    line
  )
}

export { Task, TaskStep }
