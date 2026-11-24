<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 4 between items. -->
  <ul data-slot="pagination-content" :class="cn('flex items-center gap-1', props.class)">
    <slot />
  </ul>
</template>
