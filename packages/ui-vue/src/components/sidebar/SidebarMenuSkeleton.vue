<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Skeleton } from "@workspace/ui-vue/components/skeleton"
import { useId } from "reka-ui"
import { computed } from "vue"

const props = defineProps<{
  showIcon?: boolean
  class?: HTMLAttributes["class"]
}>()

// Width 50-90%, derived from a stable id so server and client render the same value (React picks it at random).
const id = useId()
const width = computed(() => {
  let hash = 0
  for (const char of id)
    hash = Math.imul(hash, 31) + char.charCodeAt(0)
  hash = Math.imul(hash ^ (hash >>> 16), 0x45D9F3B)
  hash ^= hash >>> 16
  return `${((hash >>> 0) % 40) + 50}%`
})
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    :class="cn('flex h-10 items-center gap-3 rounded-md px-3', props.class)"
  >
    <Skeleton
      v-if="showIcon"
      class="size-6 rounded-md"
      data-sidebar="menu-skeleton-icon"
    />

    <Skeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
