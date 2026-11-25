<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: padding 24 24 0, left-aligned at every width; description 4 below the title (as Sheet). -->
  <div data-slot="drawer-header" :class="cn('flex shrink-0 flex-col gap-1 px-6 pt-6', props.class)">
    <slot />
  </div>
</template>
