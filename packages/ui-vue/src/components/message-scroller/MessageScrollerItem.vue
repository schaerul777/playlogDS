<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { injectMessageScroller } from "./context"

const props = withDefaults(defineProps<{ messageId?: string; scrollAnchor?: boolean; class?: HTMLAttributes["class"] }>(), { scrollAnchor: false })
const ctx = injectMessageScroller()
let previous: HTMLElement | null = null
function setRef(node: unknown) {
  const el = node as HTMLElement | null
  const before = previous
  previous = el
  if (props.messageId) ctx.registerMessage(props.messageId, el, before)
}
</script>

<template>
  <div
    :ref="setRef"
    data-slot="message-scroller-item"
    :data-message-id="messageId"
    :data-scroll-anchor="scrollAnchor ? 'true' : 'false'"
    :class="cn('min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]', props.class)"
  >
    <slot />
  </div>
</template>
