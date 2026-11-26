<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="progress-track"
    :class="cn(
      // Playlog: track muted, 8 high, square-cut (radius 0).
      'relative flex h-2 w-full items-center overflow-x-hidden bg-muted',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
