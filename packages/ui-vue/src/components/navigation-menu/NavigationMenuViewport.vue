<script setup lang="ts">
import type { NavigationMenuViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { NavigationMenuViewport, useForwardProps } from "reka-ui"

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <!-- Playlog: the panel starts at the left edge of the bar (React aligns it to the open trigger; Reka centers it
         under the trigger and does not flip near the viewport edge). -->
  <div class="absolute top-full left-0 isolate z-50 flex justify-start">
    <!-- Playlog: surface-raised, radius 4 (anchored), overlay shadow, no border, 4 below the bar. Fades at
         --pl-duration-fast; resizes between panels at --pl-duration-slow. -->
    <NavigationMenuViewport
      data-slot="navigation-menu-viewport"
      v-bind="forwardedProps"
      :class="
        cn(
          'relative mt-1 h-(--reka-navigation-menu-viewport-height) w-full origin-top-left overflow-hidden rounded-md bg-popover text-popover-foreground shadow-(--pl-shadow-overlay) outline-none md:w-(--reka-navigation-menu-viewport-width) [transition:opacity_var(--pl-duration-fast)_ease-out,width_var(--pl-duration-slow)_ease-out,height_var(--pl-duration-slow)_ease-out] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    />
  </div>
</template>
