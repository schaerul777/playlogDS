import * as React from "react"

import { CodeBlock, CodeBlockContent } from "@workspace/ui/components/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceStatusIcon,
  TraceTitle,
} from "@workspace/ui/components/trace"

type SubagentState = "running" | "done" | "error"

// Playlog: COMPONENT-SPECS Subagent. A Trace line for work handed to a subagent: "Running the research agent" (Spinner),
// "Ran the research agent" (`check`), "Failed to run the research agent" (`alert-circle`). Open while it runs and closed
// when done; the person can reopen it. The content is a nested Trace of the subagent's own tool lines (the Tool component),
// then its result as text, or an error in a destructive Code Block. One level of nesting is designed. Place inside a <Trace>.
function Subagent({
  name,
  state,
  result,
  error,
  defaultOpen,
  children,
}: {
  /** Shown in the title, for example "research agent". */
  name: string
  state: SubagentState
  /** What the subagent found. */
  result?: React.ReactNode
  /** Error text, shown in a destructive Code Block. */
  error?: string
  defaultOpen?: boolean
  /** The subagent's tool lines. */
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState<boolean | undefined>(defaultOpen)
  const status = state === "running" ? "running" : state === "error" ? "error" : undefined
  const title =
    state === "running" ? `Running the ${name}` : state === "error" ? `Failed to run the ${name}` : `Ran the ${name}`

  return (
    <TraceCollapsible open={open ?? (state === "running" || state === "error")} onOpenChange={setOpen}>
      <TraceCollapsibleTrigger>
        <TraceLine status={status}>
          <TraceStatusIcon status={status} />
          <TraceTitle>{title}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent keepMounted className="flex flex-col gap-3">
        {children ? <Trace>{children}</Trace> : null}
        {error ? (
          <CodeBlock size="sm" variant="destructive">
            <CodeBlockContent wrap className="max-h-64">
              {error}
            </CodeBlockContent>
          </CodeBlock>
        ) : null}
        {result ? <div className="text-foreground">{result}</div> : null}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export { Subagent }
export type { SubagentState }
