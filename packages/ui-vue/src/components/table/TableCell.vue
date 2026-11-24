<script setup lang="ts">
// Playlog: `numeric` right-aligns a column (header and cells) and uses tabular numbers.
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  numeric?: boolean
}>(), {
  numeric: false,
})
</script>

<template>
  <td
    data-slot="table-cell"
    :data-numeric="numeric || undefined"
    :class="cn(
      // Playlog: padding 12 16 (dense 8 16).
      'px-4 py-3 align-middle whitespace-nowrap group-data-[dense=true]/table:py-2 data-[numeric]:text-right data-[numeric]:tabular-nums [&:has([role=checkbox])]:pr-0',
      props.class,
    )"
  >
    <slot />
  </td>
</template>
