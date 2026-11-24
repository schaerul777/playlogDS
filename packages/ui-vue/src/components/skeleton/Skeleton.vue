<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Playlog: muted fill, radius 4. Pulse stops for reduced motion. Decorative: set aria-busy on the loading region. -->
  <div
    data-slot="skeleton"
    :class="cn('animate-pulse rounded-md bg-muted motion-reduce:animate-none', props.class)"
  />
</template>
