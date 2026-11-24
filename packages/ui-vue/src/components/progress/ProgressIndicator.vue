<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ProgressIndicator } from "reka-ui"
import { injectProgressContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { percent } = injectProgressContext()
</script>

<template>
  <!-- Playlog: fill Playlog Green (--pl-brand-accent, BRAND.md), eased at --pl-duration-fast. -->
  <ProgressIndicator
    data-slot="progress-indicator"
    :style="{ insetInlineStart: 0, width: percent == null ? undefined : `${percent}%` }"
    :class="cn('h-full bg-brand-accent transition-all duration-(--pl-duration-fast) ease-out', props.class)"
  />
</template>
