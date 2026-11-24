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
  <th
    data-slot="table-head"
    :data-numeric="numeric || undefined"
    :class="cn(
      // Playlog: padding 10 16, surface-sunken fill, ink-muted 12/16 semibold, no wrapping.
      'bg-muted px-4 py-2.5 text-left align-middle text-caption font-semibold whitespace-nowrap text-muted-foreground data-[numeric]:text-right [&:has([role=checkbox])]:pr-0',
      props.class,
    )"
  >
    <slot />
  </th>
</template>
