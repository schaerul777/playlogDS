<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { injectProgressContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { percent } = injectProgressContext()
</script>

<template>
  <!-- Playlog: hidden from assistive tech like Base UI; the root carries aria-valuetext. -->
  <span aria-hidden="true" data-slot="progress-value" :class="cn('ml-auto text-caption text-muted-foreground tabular-nums', props.class)">
    <slot :percent="percent">{{ percent == null ? "" : `${Math.round(percent)}%` }}</slot>
  </span>
</template>
