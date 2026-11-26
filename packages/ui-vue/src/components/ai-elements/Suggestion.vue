<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Suggestion. A prompt you send without typing: Button `outline` `sm`, label only.
const props = defineProps<{
  /** The prompt. It is the label unless you pass a slot, and it is what `suggestion-click` receives. */
  suggestion: string
  class?: HTMLAttributes["class"]
}>()
const emit = defineEmits<{ suggestionClick: [suggestion: string] }>()
</script>

<template>
  <Button data-slot="suggestion" variant="outline" size="sm" :class="cn('shrink-0', props.class)" @click="emit('suggestionClick', suggestion)">
    <slot>{{ suggestion }}</slot>
  </Button>
</template>
