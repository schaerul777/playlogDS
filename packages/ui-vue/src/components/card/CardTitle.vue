<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-title"
    :class="cn(
      // Playlog: card title is h3 (16/24, 700) in ink-heading.
      'font-heading text-h3 font-bold text-ink-heading group-data-[size=sm]/card:text-label',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
