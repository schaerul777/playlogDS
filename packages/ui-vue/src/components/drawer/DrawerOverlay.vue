<script setup lang="ts">
import type { DrawerOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DrawerOverlay } from "reka-ui"

const props = defineProps<DrawerOverlayProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    :as="props.as"
    :as-child="props.asChild"
    :force-mount="props.forceMount"
    :force-render="props.forceRender"
    :class="
      cn(
        // Playlog: dims the page with --pl-scrim, no blur; fades with the swipe and at --pl-duration-fast.
        // (Reka: keyframes, not data-starting-style / data-ending-style.)
        'fixed inset-0 z-50 min-h-dvh bg-scrim opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] duration-(--pl-duration-fast) ease-out select-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-snap-points:[--drawer-overlay-min-opacity:0.5] supports-[-webkit-touch-callout:none]:absolute',
        props.class,
      )
    "
  >
    <slot />
  </DrawerOverlay>
</template>
