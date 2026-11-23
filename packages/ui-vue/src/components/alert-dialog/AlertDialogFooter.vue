<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: row aligned right with gap 8, stacked below sm; sm size uses two equal columns. -->
  <div data-slot="alert-dialog-footer" :class="cn('flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end', props.class)">
    <slot />
  </div>
</template>
