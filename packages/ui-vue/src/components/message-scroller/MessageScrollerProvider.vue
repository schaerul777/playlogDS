<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from "vue"
import { provideMessageScroller } from "./context"
import { createMessageScroller, type DefaultScrollPosition } from "./scroller"

// Playlog: renderless; holds the scroll state for the Root, Viewport, Content, Items and Buttons inside it.
const props = withDefaults(
  defineProps<{
    /** Follow the live edge (new content scrolls into view) until the person scrolls up. */
    autoScroll?: boolean
    defaultScrollPosition?: DefaultScrollPosition
    scrollEdgeThreshold?: number
    scrollPreviousItemPeek?: number
    scrollMargin?: number
  }>(),
  { autoScroll: false, defaultScrollPosition: "end", scrollEdgeThreshold: 8, scrollPreviousItemPeek: 64, scrollMargin: 0 },
)

const ctx = createMessageScroller({
  autoScroll: () => props.autoScroll,
  defaultScrollPosition: () => props.defaultScrollPosition,
  scrollEdgeThreshold: () => props.scrollEdgeThreshold,
  scrollPreviousItemPeek: () => props.scrollPreviousItemPeek,
  scrollMargin: () => props.scrollMargin,
})
provideMessageScroller(ctx)
onMounted(() => ctx.onProviderMounted())
watch(() => props.defaultScrollPosition, () => ctx.notePropChange())
watch(() => props.autoScroll, () => ctx.onProviderMounted())
onBeforeUnmount(() => ctx.dispose())
</script>

<template>
  <slot />
</template>
