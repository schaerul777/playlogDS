<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
// Playlog: optional avatar slot. Put our Avatar (`sm`) inside; the wrapper only aligns it.

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="message-avatar" :class="cn(
    'flex w-fit shrink-0 items-center justify-center self-end group-has-data-[slot=message-footer]/message:-translate-y-8',
    props.class,
  )">
    <slot />
  </div>
</template>
