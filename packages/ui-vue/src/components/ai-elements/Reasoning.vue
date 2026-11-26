<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref, useSlots } from "vue"
import { TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"

// Playlog: COMPONENT-SPECS Reasoning. A Trace line for the agent's thinking: "Thinking" (running, Spinner) then
// "Thought for 5s" (icon `brain`). The thinking text sits in a TraceCollapsible: open while the model thinks, closed
// when it finishes; the person can reopen it and that choice is kept for the turn. Place it inside a <Trace>.
const props = withDefaults(
  defineProps<{
    running?: boolean
    /** Seconds the model thought; shown after it finishes. */
    duration?: number
    defaultOpen?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { running: false, defaultOpen: undefined, duration: undefined, class: undefined },
)
const slots = useSlots()
const open = ref<boolean | undefined>(props.defaultOpen)
const isOpen = computed(() => open.value ?? props.running)
const title = computed(() => (props.running ? "Thinking" : props.duration ? `Thought for ${props.duration}s` : "Thought"))
</script>

<template>
  <TraceLine v-if="!slots.default" :status="running ? 'running' : undefined">
    <TraceStatusIcon :status="running ? 'running' : undefined" icon="brain" />
    <TraceTitle>{{ title }}</TraceTitle>
  </TraceLine>
  <TraceCollapsible v-else :open="isOpen" @update:open="open = $event">
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceStatusIcon :status="running ? 'running' : undefined" icon="brain" />
        <TraceTitle>{{ title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent :class="props.class ?? 'whitespace-pre-wrap'"><slot /></TraceCollapsibleContent>
  </TraceCollapsible>
</template>
