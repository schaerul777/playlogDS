<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tfoot
    data-slot="table-footer"
    :class="cn(
      // Playlog: not in the spec. Totals row on surface-sunken with a 1px top border, semibold.
      'border-t-(length:--pl-border-width) border-border bg-muted font-semibold [&>tr]:last:border-b-0 [&_tr]:hover:bg-transparent',
      props.class,
    )"
  >
    <slot />
  </tfoot>
</template>
