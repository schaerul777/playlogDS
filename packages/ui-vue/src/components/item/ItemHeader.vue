<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="item-header"
    :class="cn(
      'flex basis-full items-center justify-between gap-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
