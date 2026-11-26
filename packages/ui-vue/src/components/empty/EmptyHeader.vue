<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="empty-header"
    :class="cn(
      // Playlog: text block max width 384; description 4 below the title.
      'flex max-w-sm flex-col items-center gap-1',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
