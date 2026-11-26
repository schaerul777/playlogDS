<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerProvider, MessageScrollerViewport } from "@workspace/ui-vue/components/message-scroller"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// The thread. `busy` is true while a reply streams: the live region waits for the finished row.
const props = withDefaults(defineProps<{ busy?: boolean; class?: HTMLAttributes["class"] }>(), { busy: undefined })
</script>

<template>
  <MessageScrollerProvider auto-scroll>
    <div data-slot="chat-thread" :class="cn('min-h-0 flex-1', props.class)">
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent :aria-busy="busy" class="mx-auto w-full max-w-3xl py-4"><slot /></MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </div>
  </MessageScrollerProvider>
</template>
