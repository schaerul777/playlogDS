<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    role="list"
    data-slot="item-group"
    :class="cn(
      // Playlog: items 8 apart at every size.
      'group/item-group flex w-full flex-col gap-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
