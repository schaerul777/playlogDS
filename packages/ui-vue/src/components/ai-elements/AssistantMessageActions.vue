<script setup lang="ts">
import { ref } from "vue"
import MessageAction from "./MessageAction.vue"
import { useCopy } from "./useCopy"

// Copy, good response, bad response (aria-pressed), retry. Retry shows only when `@retry` is passed.
const props = defineProps<{ text: string; onRetry?: () => void; onFeedback?: (feedback: "like" | "dislike" | null) => void }>()
const { copied, copy } = useCopy(() => props.text)
const feedback = ref<"like" | "dislike" | null>(null)
function choose(next: "like" | "dislike") {
  const value = feedback.value === next ? null : next
  feedback.value = value
  props.onFeedback?.(value)
}
</script>

<template>
  <MessageAction :label="copied ? 'Copied' : 'Copy'" :icon="copied ? 'check' : 'clipboard'" @click="copy" />
  <MessageAction label="Good response" icon="thumbs-up" :aria-pressed="feedback === 'like'" @click="choose('like')" />
  <MessageAction label="Bad response" icon="thumbs-down" :aria-pressed="feedback === 'dislike'" @click="choose('dislike')" />
  <MessageAction v-if="onRetry" label="Retry" icon="refresh" @click="onRetry" />
</template>
