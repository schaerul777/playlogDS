<script setup lang="ts">
import type { NavigationMenuIndicatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { NavigationMenuIndicator, useForwardProps } from "reka-ui"

const props = defineProps<NavigationMenuIndicatorProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <!-- Playlog: not part of the Playlog look (no arrows on popups); kept for API parity. -->
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    v-bind="forwardedProps"
    :class="cn('top-full z-1 flex h-1.5 items-end justify-center overflow-hidden', props.class)"
  >
    <div class="relative top-1 size-2 rotate-45 rounded-sm bg-popover" />
  </NavigationMenuIndicator>
</template>
