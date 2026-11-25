<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui"

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes["class"] }>(), {
  orientation: "vertical",
})

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    aria-hidden="true"
    :data-orientation="orientation"
    v-bind="delegatedProps"
    :class="cn(
      // Playlog: COMPONENT-SPECS Scroll Area. Track 10 with 2 padding (thumb 6). Shown on hover, while scrolling
      // and while the viewport has keyboard focus (extrapolated, so keyboard users see their position);
      // fades at --pl-duration-fast.
      'flex touch-none p-0.5 opacity-0 transition-opacity duration-(--pl-duration-fast) ease-out select-none group-hover/scroll-area:opacity-100 group-data-[scrolling]/scroll-area:opacity-100 group-has-[>[data-slot=scroll-area-viewport]:focus-visible]/scroll-area:opacity-100 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5',
      props.class,
    )"
  >
    <!-- Playlog: fully round, border colour; input colour on hover or drag. -->
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      class="relative flex-1 rounded-(--pl-radius-full) bg-border transition-colors duration-(--pl-duration-fast) ease-out hover:bg-input active:bg-input"
    />
  </ScrollAreaScrollbar>
</template>
