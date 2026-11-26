<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Chat. A column: an optional header, the thread, then the footer (suggestions and Prompt Input)
// pinned at the bottom. Give Chat a height.
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="chat" :class="cn('flex size-full min-h-0 flex-col', props.class)"><slot /></div>
</template>
