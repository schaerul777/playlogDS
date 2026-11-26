<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tr
    data-slot="table-row"
    :class="cn(
      // Playlog: row hover is surface-hover (--accent); selected is surface-selected.
      'border-b-(length:--pl-border-width) border-border transition-colors duration-(--pl-duration-fast) ease-out hover:bg-accent has-aria-expanded:bg-accent data-[state=selected]:bg-surface-selected',
      props.class,
    )"
  >
    <slot />
  </tr>
</template>
