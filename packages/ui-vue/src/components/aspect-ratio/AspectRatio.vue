<script setup lang="ts">
// Playlog: hand built. COMPONENT-SPECS Aspect Ratio. A wrapper only, no styling. No Figma component.
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  ratio: number
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="aspect-ratio"
    :style="{ '--ratio': ratio }"
    :class="cn('relative aspect-(--ratio)', props.class)"
  >
    <slot />
  </div>
</template>
