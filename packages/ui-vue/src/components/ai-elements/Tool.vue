<script setup lang="ts">
import { computed } from "vue"
import { CodeBlock, CodeBlockContent } from "@workspace/ui-vue/components/code-block"
import { TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"

export type ToolState = "running" | "done" | "error" | "denied" | "pending"

const prefix: Record<ToolState, string> = { pending: "Run", running: "Running", done: "Ran", error: "Failed to run", denied: "Denied" }

// Playlog: COMPONENT-SPECS Tool. A Trace line per tool call with the glyph of the tool (default `terminal`): "Running
// pnpm test", "Ran pnpm test", "Failed to run pnpm test", "Denied rm -rf dist". A finished or failed call opens to its
// output in a Code Block (`sm`, max height 256, wrapped); a failed call is open by default. A pending approval is not a
// step the agent took: use Confirmation for it. Place inside a <Trace>.
const props = withDefaults(
  defineProps<{
    state: ToolState
    /** What the tool ran, shown after the verb in the title. */
    command: string
    /** The tool's output or error text. */
    output?: string
    icon?: string
    defaultOpen?: boolean
  }>(),
  { icon: "terminal", defaultOpen: undefined, output: undefined },
)
const status = computed(() => (props.state === "running" ? "running" : props.state === "error" ? "error" : props.state === "pending" ? "pending" : undefined))
const hasOutput = computed(() => (props.state === "done" || props.state === "error") && !!props.output)
</script>

<template>
  <TraceCollapsible v-if="hasOutput" :default-open="defaultOpen ?? state === 'error'">
    <TraceCollapsibleTrigger>
      <TraceLine :status="status">
        <TraceStatusIcon :status="status" :icon="icon" />
        <TraceTitle>{{ prefix[state] }} {{ command }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm" :variant="state === 'error' ? 'destructive' : 'default'">
        <CodeBlockContent wrap class="max-h-64">{{ output }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else :status="status">
    <TraceStatusIcon :status="status" :icon="icon" />
    <TraceTitle>{{ prefix[state] }} {{ command }}</TraceTitle>
  </TraceLine>
</template>
