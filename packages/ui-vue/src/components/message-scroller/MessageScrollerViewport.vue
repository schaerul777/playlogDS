<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { onBeforeUnmount, onMounted, watchEffect } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { injectMessageScroller } from "./context"

const props = withDefaults(defineProps<{ preserveScrollOnPrepend?: boolean; class?: HTMLAttributes["class"] }>(), { preserveScrollOnPrepend: true })
const ctx = injectMessageScroller()
const pending = ctx.pendingDefaultScroll.value
watchEffect(() => {
  ctx.preserveScrollOnPrepend.current = props.preserveScrollOnPrepend
})

const KEYS = new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "])
// Wheel, touch and scrolling keys mean the person took over: stop following the live edge.
const onKeydown = (e: KeyboardEvent) => KEYS.has(e.key) && ctx.userScrollIntent()

let observer: ResizeObserver | undefined
let frame = 0
onMounted(() => {
  const el = ctx.getViewport()
  if (!el || typeof ResizeObserver === "undefined") return
  observer = new ResizeObserver(() => {
    window.cancelAnimationFrame(frame)
    frame = window.requestAnimationFrame(ctx.handleResize)
  })
  observer.observe(el)
})
onBeforeUnmount(() => {
  window.cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <!-- Playlog: COMPONENT-SPECS Message Scroller. A labelled, focusable region with the focus ring; thin scrollbar, thumb `border`, no edge fade. -->
  <div
    :ref="(el) => ctx.setViewport(el as HTMLElement | null)"
    data-slot="message-scroller-viewport"
    role="region"
    aria-label="Messages"
    tabindex="0"
    :data-pending-scroll="pending ? '' : undefined"
    :class="
      cn(
        'size-full min-h-0 min-w-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent data-pending-scroll:invisible',
        props.class,
      )
    "
    @scroll="ctx.syncAfterScroll"
    @wheel.passive="ctx.userScrollIntent"
    @touchmove.passive="ctx.userScrollIntent"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
