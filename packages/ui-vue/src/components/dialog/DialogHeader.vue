<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Playlog: description sits 4 below the title; text stays left-aligned. -->
  <div data-slot="dialog-header" :class="cn('flex flex-col gap-1', props.class)">
    <slot />
  </div>
</template>
