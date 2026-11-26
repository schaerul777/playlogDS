<script setup lang="ts">
import { Bubble, BubbleContent } from "@workspace/ui-vue/components/bubble"
import { Message, MessageContent, MessageFooter } from "@workspace/ui-vue/components/message"

// Playlog: COMPONENT-SPECS Message (pattern). The person's text is a `secondary` Bubble on a Message with `align="end"`.
// Put <UserMessageActions /> in the `actions` slot to show them under the bubble.
</script>

<template>
  <Message align="end">
    <MessageContent>
      <Bubble align="end" variant="secondary"><BubbleContent><slot /></BubbleContent></Bubble>
      <MessageFooter v-if="$slots.actions"><slot name="actions" /></MessageFooter>
    </MessageContent>
  </Message>
</template>
