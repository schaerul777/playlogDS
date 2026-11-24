<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn(
      'flex flex-col gap-3 px-(--card-spacing)',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
