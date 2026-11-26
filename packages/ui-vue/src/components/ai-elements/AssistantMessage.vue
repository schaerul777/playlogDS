<script setup lang="ts">
import { Message, MessageContent, MessageFooter } from "@workspace/ui-vue/components/message"

// Playlog: the assistant's reply is plain full-width text (a `ghost` bubble) on a Message, with actions under it. The slot is
// the reply: reasoning, tool lines, text, sources, in order. Put <AssistantMessageActions /> in the `actions` slot.
</script>

<template>
  <Message>
    <MessageContent>
      <slot />
      <MessageFooter v-if="$slots.actions" class="px-0"><slot name="actions" /></MessageFooter>
    </MessageContent>
  </Message>
</template>
