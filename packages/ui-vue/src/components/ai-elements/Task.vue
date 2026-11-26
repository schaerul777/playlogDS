<script setup lang="ts">
import { ref } from "vue"
import { TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"

// Playlog: COMPONENT-SPECS Task. Work the agent is doing: a status icon and a title in the present tense while it runs
// ("Updating the page metadata"), the past tense when done ("Updated…") and "Failed to update…" on error. The running task
// is open and closes when it is done; the person can reopen it. Steps appear only once taken (no pending steps). Several
// tasks sit in one <Trace>. Use Plan when every step is known up front. The slot holds TaskStep elements.
const props = withDefaults(defineProps<{ title: string; status?: "running" | "error"; defaultOpen?: boolean }>(), { defaultOpen: undefined })
const open = ref<boolean | undefined>(props.defaultOpen)
</script>

<template>
  <TraceCollapsible :open="open ?? status === 'running'" @update:open="open = $event">
    <TraceCollapsibleTrigger>
      <TraceLine :status="status">
        <TraceStatusIcon :status="status" />
        <TraceTitle>{{ title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent class="flex flex-col gap-2"><slot /></TraceCollapsibleContent>
  </TraceCollapsible>
</template>
