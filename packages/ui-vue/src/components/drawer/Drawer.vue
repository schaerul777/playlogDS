<script setup lang="ts">
import type { DrawerRootEmits, DrawerRootProps } from "reka-ui"
import { computed } from "vue"
import { DrawerRoot, useForwardPropsEmits } from "reka-ui"
import { provideDrawerContext } from "./context"

// Playlog: bottom only (swipe down to close), as the React Drawer: `swipeDirection` is not a prop. `showSwipeHandle` (default true) is ours.
const props = withDefaults(defineProps<Omit<DrawerRootProps, "swipeDirection"> & { showSwipeHandle?: boolean }>(), {
  open: undefined, // keeps Vue from casting an absent Boolean prop to false (that would mean "controlled, closed")
  modal: true,
  snapPoint: undefined,
  showSwipeHandle: true,
})
const emits = defineEmits<DrawerRootEmits>()

const delegatedProps = computed(() => {
  const { showSwipeHandle: _handle, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)

provideDrawerContext({
  hasSnapPoints: () => !!props.snapPoints && props.snapPoints.length > 0,
  showSwipeHandle: () => props.showSwipeHandle,
})
</script>

<template>
  <DrawerRoot v-slot="slotProps" swipe-direction="down" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
