<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
// Playlog: 14/20 medium (sm and xs: 12/16 semibold).

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span data-slot="attachment-title" :class="cn(
    'block max-w-full min-w-0 truncate text-body-sm font-medium group-data-[size=sm]/attachment:text-caption group-data-[size=sm]/attachment:font-semibold group-data-[size=xs]/attachment:text-caption group-data-[size=xs]/attachment:font-semibold',
    props.class,
  )">
    <slot />
  </span>
</template>
