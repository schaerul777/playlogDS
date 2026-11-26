<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="item-title"
    :class="cn(
      // Playlog: 14/20 semibold; inherits foreground (ink-heading when selected).
      'line-clamp-1 flex w-fit items-center gap-2 text-label underline-offset-4',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
