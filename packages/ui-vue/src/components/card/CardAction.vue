<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-action"
    :class="cn(
      // Playlog: header actions sit in a row, 8px apart.
      'col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-start justify-self-end',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
