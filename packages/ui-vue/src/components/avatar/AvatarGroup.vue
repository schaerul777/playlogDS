<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="avatar-group"
    :class="cn(
      // Playlog: overlap 8, each avatar ringed in the page color at --pl-ring-separator-width.
      'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-(length:--pl-ring-separator-width) *:data-[slot=avatar]:ring-background',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
