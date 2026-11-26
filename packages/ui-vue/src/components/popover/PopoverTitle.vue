<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 14/20 bold ink-heading. -->
  <h2 data-slot="popover-title" :class="cn('font-bold text-ink-heading', props.class)">
    <slot />
  </h2>
</template>
