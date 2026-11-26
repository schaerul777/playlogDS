<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from "reka-ui"
import { HoverCardRoot, useForwardPropsEmits } from "reka-ui"

// Playlog: opens after 300ms (hover or keyboard focus), closes after 150ms. In Reka the delays live on the root.
const props = withDefaults(defineProps<HoverCardRootProps>(), { openDelay: 300, closeDelay: 150 })
const emits = defineEmits<HoverCardRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <HoverCardRoot v-slot="slotProps" data-slot="hover-card" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </HoverCardRoot>
</template>
