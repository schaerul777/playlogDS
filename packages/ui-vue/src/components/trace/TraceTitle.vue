<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span data-slot="trace-title" :class="cn(
    'min-w-0 truncate',
    props.class,
  )">
    <slot />
  </span>
</template>
