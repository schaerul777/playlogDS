<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
// Playlog: scrolls sideways, thin scrollbar as Message Scroller, no edge fade.

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="attachment-group" :class="cn(
    'flex min-w-0 snap-x snap-mandatory scroll-px-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
    props.class,
  )">
    <slot />
  </div>
</template>
