<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span data-slot="attachment-description" :class="cn(
    'block max-w-full min-w-0 truncate text-caption text-muted-foreground group-data-[state=error]/attachment:text-danger-text',
    props.class,
  )">
    <slot />
  </span>
</template>
