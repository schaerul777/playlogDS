<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span data-slot="trace-description" :class="cn(
    'shrink-0 text-muted-foreground tabular-nums',
    props.class,
  )">
    <slot />
  </span>
</template>
