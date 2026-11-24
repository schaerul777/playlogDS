<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <thead
    data-slot="table-header"
    :class="cn(
      '[&_tr]:border-b-(length:--pl-border-width) [&_tr]:hover:bg-transparent',
      props.class,
    )"
  >
    <slot />
  </thead>
</template>
