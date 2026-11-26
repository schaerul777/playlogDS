<script setup lang="ts">
import { computed, ref, useSlots } from "vue"
import { CodeBlock, CodeBlockContent } from "@workspace/ui-vue/components/code-block"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"

export type SubagentState = "running" | "done" | "error"

// Playlog: COMPONENT-SPECS Subagent. A Trace line for work handed to a subagent: "Running the research agent" (Spinner),
// "Ran the research agent" (`check`), "Failed to run the research agent" (`alert-circle`). Open while it runs and closed
// when done; the person can reopen it. The content is a nested Trace of the subagent's own tool lines (the default slot),
// then its result as text (slot `result`). One level of nesting is designed. Place inside a <Trace>.
// `error` is shown in a destructive Code Block (`sm`, max height 256, wrapped), before the result.
const props = withDefaults(defineProps<{ /** Shown in the title, for example "research agent". */ name: string; state: SubagentState; error?: string; defaultOpen?: boolean }>(), { defaultOpen: undefined, error: undefined })
const slots = useSlots()
const open = ref<boolean | undefined>(props.defaultOpen)
const status = computed(() => (props.state === "running" ? "running" : props.state === "error" ? "error" : undefined))
const title = computed(() => (props.state === "running" ? `Running the ${props.name}` : props.state === "error" ? `Failed to run the ${props.name}` : `Ran the ${props.name}`))
</script>

<template>
  <TraceCollapsible :open="open ?? (state === 'running' || state === 'error')" @update:open="open = $event">
    <TraceCollapsibleTrigger>
      <TraceLine :status="status">
        <TraceStatusIcon :status="status" />
        <TraceTitle>{{ title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent class="flex flex-col gap-3">
      <Trace v-if="slots.default"><slot /></Trace>
      <CodeBlock v-if="error" size="sm" variant="destructive">
        <CodeBlockContent wrap class="max-h-64">{{ error }}</CodeBlockContent>
      </CodeBlock>
      <div v-if="slots.result" class="text-foreground"><slot name="result" /></div>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
