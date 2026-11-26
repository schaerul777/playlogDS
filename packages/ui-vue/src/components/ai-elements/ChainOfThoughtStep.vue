<script setup lang="ts">
import { useSlots } from "vue"
import { TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"
import type { IconName } from "@workspace/ui-vue/icons"

// One step: status icon and a tense-matched title ("Searching…", "Searched…", "Failed to search…"). Detail (a Code Block,
// a Trace of links, ChainOfThoughtBadges) opens below the step.
const props = withDefaults(defineProps<{ title: string; status?: "running" | "error"; icon?: IconName; defaultOpen?: boolean }>(), {
  icon: "check",
  defaultOpen: undefined,
})
const slots = useSlots()
</script>

<template>
  <TraceLine v-if="!slots.default" :status="status">
    <TraceStatusIcon :status="status" :icon="icon" />
    <TraceTitle>{{ title }}</TraceTitle>
  </TraceLine>
  <TraceCollapsible v-else :default-open="props.defaultOpen ?? status === 'error'">
    <TraceCollapsibleTrigger>
      <TraceLine :status="status">
        <TraceStatusIcon :status="status" :icon="icon" />
        <TraceTitle>{{ title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent><slot /></TraceCollapsibleContent>
  </TraceCollapsible>
</template>
