<script setup lang="ts">
import type { DrawerHandleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DrawerHandle } from "reka-ui"

const props = defineProps<DrawerHandleProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 40x4 handle, radius 2, --input colour, 8 from the top, centred; a 24px-high grab area. Hidden from screen readers. -->
  <DrawerHandle
    data-slot="drawer-swipe-handle"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute inset-x-0 top-0 z-10 flex h-6 cursor-grab justify-center pt-2 after:block after:h-1 after:w-10 after:rounded-sm after:bg-input active:cursor-grabbing', props.class)"
  />
</template>
