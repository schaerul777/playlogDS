<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: padding 0 24 24; buttons in a row aligned right, gap 8; stacked full width below sm. -->
  <div data-slot="sheet-footer" :class="cn('mt-auto flex flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:justify-end', props.class)">
    <slot />
  </div>
</template>
