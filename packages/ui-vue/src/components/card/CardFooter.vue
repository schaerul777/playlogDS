<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn(
      'flex items-center rounded-b-lg px-(--card-spacing) [.border-t]:pt-(--card-spacing)',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
