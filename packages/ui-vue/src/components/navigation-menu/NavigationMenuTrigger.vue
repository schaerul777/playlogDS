<script setup lang="ts">
import type { NavigationMenuTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { NavigationMenuTrigger, useForwardProps } from "reka-ui"
import { navigationMenuTriggerStyle } from "."

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="forwardedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
  >
    <slot />
    <!-- Playlog: chevron-down 16 turns 180° while the panel is open. -->
    <Icon
      name="chevron-down"
      aria-hidden="true"
      class="size-4 text-muted-foreground transition-transform duration-(--pl-duration-fast) ease-out group-data-[state=open]/navigation-menu-trigger:rotate-180"
    />
  </NavigationMenuTrigger>
</template>
