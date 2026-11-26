<script setup lang="ts">
import type { TooltipProviderProps } from "reka-ui"
import { TooltipProvider } from "reka-ui"

// Playlog: opens after 300ms; closes at once.
const props = withDefaults(defineProps<TooltipProviderProps>(), { delayDuration: 300 })
</script>

<template>
  <TooltipProvider data-slot="tooltip-provider" v-bind="props">
    <slot />
  </TooltipProvider>
</template>
