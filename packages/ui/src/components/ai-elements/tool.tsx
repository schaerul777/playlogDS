import { CodeBlock, CodeBlockContent } from "@workspace/ui/components/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceStatusIcon,
  TraceTitle,
} from "@workspace/ui/components/trace"
import type { IconName } from "@workspace/ui/icons/icon"

type ToolState = "running" | "done" | "error" | "denied" | "pending"

const prefix: Record<ToolState, string> = {
  pending: "Run",
  running: "Running",
  done: "Ran",
  error: "Failed to run",
  denied: "Denied",
}

// Playlog: COMPONENT-SPECS Tool. A Trace line per tool call with the glyph of the tool (default `terminal`): "Running
// pnpm test", "Ran pnpm test", "Failed to run pnpm test", "Denied rm -rf dist". A finished or failed call opens to its
// output in a Code Block (`sm`, max height 256, wrapped); a failed call is open by default. A pending approval is not a
// step the agent took: use Confirmation for it. Place inside a <Trace>.
function Tool({
  state,
  command,
  output,
  icon = "terminal",
  defaultOpen,
}: {
  state: ToolState
  /** What the tool ran, shown after the verb in the title. */
  command: string
  /** The tool's output or error text. */
  output?: string
  icon?: IconName
  defaultOpen?: boolean
}) {
  const status =
    state === "running" ? "running" : state === "error" ? "error" : state === "pending" ? "pending" : undefined
  const line = (
    <TraceLine status={status}>
      <TraceStatusIcon status={status} icon={icon} />
      <TraceTitle>
        {prefix[state]} {command}
      </TraceTitle>
    </TraceLine>
  )

  if ((state === "done" || state === "error") && output) {
    return (
      <TraceCollapsible defaultOpen={defaultOpen ?? state === "error"}>
        <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm" variant={state === "error" ? "destructive" : "default"}>
            <CodeBlockContent wrap className="max-h-64">
              {output}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return line
}

export { Tool }
export type { ToolState }
