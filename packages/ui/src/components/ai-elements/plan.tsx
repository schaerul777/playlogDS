import * as React from "react"

import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceLine,
  TraceStatusIcon,
  TraceTitle,
  Trace,
} from "@workspace/ui/components/trace"

type PlanStepState = "done" | "running" | "pending" | "error" | "skipped"

type PlanStep = { title: string; state: PlanStepState }

// Playlog: COMPONENT-SPECS Plan. The steps the agent decides on before it starts. Summary line: `clipboard` icon, the title
// and "2 of 4 done" (no bar: Progress would repeat the count). Open by default. Steps are read-only Trace lines: done
// `check`, running Spinner, pending `time`, error `alert-circle` ("Failed to…" in the title), skipped `close` with
// "(skipped)" after the title. Use Task when the steps are not known up front. Place inside a <Trace>.
function Plan({
  title,
  steps,
  description,
  defaultOpen = true,
}: {
  title: string
  steps: PlanStep[]
  /** Optional text above the steps. */
  description?: React.ReactNode
  defaultOpen?: boolean
}) {
  const done = steps.filter((step) => step.state === "done").length
  const running = steps.some((step) => step.state === "running")

  return (
    <TraceCollapsible defaultOpen={defaultOpen}>
      <TraceCollapsibleTrigger>
        <TraceLine status={running ? "running" : undefined}>
          <TraceStatusIcon status={running ? "running" : undefined} icon="clipboard" />
          <TraceTitle>{title}</TraceTitle>
          <TraceDescription>
            {done} of {steps.length} done
          </TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent className="flex flex-col gap-3">
        {description ? <p className="text-foreground">{description}</p> : null}
        <Trace>
          {steps.map((step) => (
            <PlanStepLine key={step.title} step={step} />
          ))}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function PlanStepLine({ step }: { step: PlanStep }) {
  const status =
    step.state === "running"
      ? "running"
      : step.state === "pending"
        ? "pending"
        : step.state === "error"
          ? "error"
          : undefined
  return (
    <TraceLine status={status}>
      <TraceStatusIcon status={status} icon={step.state === "skipped" ? "close" : "check"} />
      <TraceTitle>
        {step.title}
        {step.state === "skipped" ? " (skipped)" : ""}
      </TraceTitle>
    </TraceLine>
  )
}

export { Plan }
export type { PlanStep, PlanStepState }
