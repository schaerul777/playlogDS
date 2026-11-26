<script setup lang="ts">
import { MessageScrollerItem } from "@workspace/ui-vue/components/message-scroller"

// Each turn is a Message inside a ChatTurn; mark the person's turn `anchor` so a new question settles near the top and the
// reply streams in under it.
withDefaults(defineProps<{ id: string; anchor?: boolean }>(), { anchor: false })
</script>

<template>
  <MessageScrollerItem :message-id="id" :scroll-anchor="anchor"><slot /></MessageScrollerItem>
</template>
