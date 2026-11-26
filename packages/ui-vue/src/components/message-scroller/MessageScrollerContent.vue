<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { onBeforeUnmount, onMounted, ref } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { injectMessageScroller } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"]; spacerClass?: HTMLAttributes["class"] }>()
const ctx = injectMessageScroller()
const el = ref<HTMLElement | null>(null)

let mutation: MutationObserver | undefined
let resize: ResizeObserver | undefined
let frame = 0
onMounted(() => {
  const node = el.value
  if (!node) return
  ctx.handleContentChange()
  if (typeof MutationObserver !== "undefined") {
    mutation = new MutationObserver(() => ctx.handleContentChange())
    mutation.observe(node, { childList: true })
  }
  if (typeof ResizeObserver !== "undefined") {
    resize = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(ctx.handleResize)
    })
    resize.observe(node)
  }
})
onBeforeUnmount(() => {
  window.cancelAnimationFrame(frame)
  mutation?.disconnect()
  resize?.disconnect()
})
</script>

<template>
  <!-- Playlog: padding 0 24, gap 24 between turns. -->
  <div
    :ref="(node) => { el = node as HTMLElement | null; ctx.setContent(el) }"
    data-slot="message-scroller-content"
    role="log"
    aria-relevant="additions"
    :class="cn('flex h-max min-h-full flex-col gap-6 px-6', props.class)"
  >
    <slot />
    <div :ref="(node) => ctx.setSpacer(node as HTMLElement | null)" aria-hidden="true" data-message-scroller-spacer="" hidden :class="spacerClass" />
  </div>
</template>
