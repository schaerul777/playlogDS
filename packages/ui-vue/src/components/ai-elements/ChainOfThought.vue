<script setup lang="ts">
import { ref, useSlots } from "vue"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"
import { countChildren } from "./countChildren"

// Playlog: COMPONENT-SPECS Chain of Thought. A thin composition over Trace, not a new look: a summary line that opens into
// the steps the agent took ("Researching" while running, "Researched in 3 steps", "Researched in 3 steps, 1 failed").
// Open while the steps run, closed when the reply starts; the person can reopen it and that choice is kept for the turn.
// Place inside a <Trace>. The slot holds the ChainOfThoughtStep elements.
const props = withDefaults(
  defineProps<{
    running?: boolean
    /** Number of steps for the summary. Defaults to the number of children. */
    steps?: number
    failed?: number
    defaultOpen?: boolean
  }>(),
  { running: false, steps: undefined, failed: 0, defaultOpen: undefined },
)
const slots = useSlots()
const open = ref<boolean | undefined>(props.defaultOpen)
const status = () => (props.running ? "running" : props.failed > 0 ? "error" : undefined)
const title = () => {
  const count = props.steps ?? countChildren(slots.default?.())
  return props.running ? "Researching" : `Researched in ${count} ${count === 1 ? "step" : "steps"}${props.failed > 0 ? `, ${props.failed} failed` : ""}`
}
</script>

<template>
  <TraceCollapsible :open="open ?? running" @update:open="open = $event">
    <TraceCollapsibleTrigger>
      <TraceLine :status="status()">
        <TraceStatusIcon :status="status()" />
        <TraceTitle>{{ title() }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent><Trace><slot /></Trace></TraceCollapsibleContent>
  </TraceCollapsible>
</template>
