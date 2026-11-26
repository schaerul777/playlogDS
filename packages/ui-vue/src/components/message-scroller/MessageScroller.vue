<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { injectMessageScroller } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const ctx = injectMessageScroller()
const pending = ctx.pendingDefaultScroll.value
</script>

<template>
  <div
    :ref="(el) => ctx.setRoot(el as HTMLElement | null)"
    data-slot="message-scroller"
    :data-pending-scroll="pending ? '' : undefined"
    :class="cn('group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden', props.class)"
  >
    <slot />
  </div>
</template>
