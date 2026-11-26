<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Suggestion. The row wraps (no hidden suggestions, no edge fade); put it above the Prompt Input.
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="suggestions" :class="cn('flex flex-wrap gap-2', props.class)">
    <slot />
  </div>
</template>
