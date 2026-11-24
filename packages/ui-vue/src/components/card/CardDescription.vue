<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-description"
    :class="cn(
      // Playlog: description is caption (12/16 medium) in ink-muted.
      'text-caption text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
