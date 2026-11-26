<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tbody
    data-slot="table-body"
    :class="cn(
      // Playlog: 1px border between rows, none under the last row.
      '[&_tr:last-child]:border-0',
      props.class,
    )"
  >
    <slot />
  </tbody>
</template>
