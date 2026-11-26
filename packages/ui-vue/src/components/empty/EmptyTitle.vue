<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="empty-title"
    :class="cn(
      // Playlog: as the Card title. h3 (16/24, 700) in ink-heading.
      'font-heading text-h3 text-ink-heading',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
