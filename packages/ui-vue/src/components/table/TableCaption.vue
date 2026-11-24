<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <caption
    data-slot="table-caption"
    :class="cn(
      // Playlog: caption sits above the table inside the wrapper. Padding 12 16, bold ink-heading.
      'px-4 py-3 text-left font-bold text-ink-heading',
      props.class,
    )"
  >
    <slot />
  </caption>
</template>
