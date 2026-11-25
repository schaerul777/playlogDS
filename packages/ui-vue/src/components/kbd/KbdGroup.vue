<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Playlog: keys 4 apart. (A kbd element, as in React.) -->
  <kbd data-slot="kbd-group" :class="cn('inline-flex items-center gap-1', props.class)">
    <slot />
  </kbd>
</template>
