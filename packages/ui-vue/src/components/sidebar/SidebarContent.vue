<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    :class="cn('no-scrollbar flex min-h-0 flex-1 flex-col gap-6 overflow-auto px-3 py-6 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:px-2', props.class)"
  >
    <slot />
  </div>
</template>
