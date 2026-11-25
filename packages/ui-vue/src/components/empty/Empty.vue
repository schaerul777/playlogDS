<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="empty"
    :class="cn(
      // Playlog: centred column, padding 48 24, 16 between the text block and the actions.
      'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center text-balance',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
