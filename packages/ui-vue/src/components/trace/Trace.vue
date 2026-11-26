<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
// Playlog: COMPONENT-SPECS Trace. One line per step: icon 16 + title 14/20, gap 8, muted-foreground; steps 8 apart; a collapsible trigger takes the 2px focus ring, radius 4.

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="trace" :class="cn(
    'flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:rounded-md *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:outline-(length:--pl-focus-ring-width) *:has-[>[data-slot=trace-line]]:focus-visible:outline-offset-(--pl-focus-ring-offset) *:has-[>[data-slot=trace-line]]:focus-visible:outline-solid *:has-[>[data-slot=trace-line]]:focus-visible:outline-ring',
    props.class,
  )">
    <slot />
  </div>
</template>
