<script setup lang="ts">
import { computed } from "vue"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"

export type PlanStepState = "done" | "running" | "pending" | "error" | "skipped"
export type PlanStep = { title: string; state: PlanStepState }

// Playlog: COMPONENT-SPECS Plan. The steps the agent decides on before it starts. Summary line: `clipboard` icon, the title
// and "2 of 4 done" (no bar: Progress would repeat the count). Open by default. Steps are read-only Trace lines: done
// `check`, running Spinner, pending `time`, error `alert-circle` ("Failed to…" in the title), skipped `close` with
// "(skipped)" after the title. Use Task when the steps are not known up front. Place inside a <Trace>.
const props = withDefaults(defineProps<{ title: string; steps: PlanStep[]; description?: string; defaultOpen?: boolean }>(), { defaultOpen: true })
const done = computed(() => props.steps.filter((s) => s.state === "done").length)
const running = computed(() => props.steps.some((s) => s.state === "running"))
const statusOf = (s: PlanStep) => (s.state === "running" ? "running" : s.state === "pending" ? "pending" : s.state === "error" ? "error" : undefined)
</script>

<template>
  <TraceCollapsible :default-open="defaultOpen">
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceStatusIcon :status="running ? 'running' : undefined" icon="clipboard" />
        <TraceTitle>{{ title }}</TraceTitle>
        <TraceDescription>{{ done }} of {{ steps.length }} done</TraceDescription>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent class="flex flex-col gap-3">
      <p v-if="description" class="text-foreground">{{ description }}</p>
      <Trace>
        <TraceLine v-for="step in steps" :key="step.title" :status="statusOf(step)">
          <TraceStatusIcon :status="statusOf(step)" :icon="step.state === 'skipped' ? 'close' : 'check'" />
          <TraceTitle>{{ step.title }}{{ step.state === "skipped" ? " (skipped)" : "" }}</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
