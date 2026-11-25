<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: padding 0 24 24, Buttons stacked full width with gap 8 below sm, a row aligned right from sm (as Sheet). -->
  <div data-slot="drawer-footer" :class="cn('mt-auto flex shrink-0 flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:justify-end', props.class)">
    <slot />
  </div>
</template>
