<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog addition: the scrolling body, padding 0 24. -->
  <div data-slot="drawer-body" :class="cn('min-h-0 flex-1 overflow-y-auto px-6', props.class)">
    <slot />
  </div>
</template>
