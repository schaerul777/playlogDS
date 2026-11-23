<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
  errors?: Array<string | { message?: string } | undefined>
}>()

const content = computed(() => {
  if (!props.errors || props.errors.length === 0) return null
  const messages = [
    ...new Set(
      props.errors
        .map((error) => (typeof error === "string" ? error : error?.message))
        .filter((message): message is string => !!message),
    ),
  ]
  if (messages.length === 0) return null
  return messages.length === 1 ? messages[0] : messages
})
</script>

<template>
  <!-- Playlog: 12/16 medium pl-danger-text, text only (agreed). role="alert". -->
  <div
    v-if="$slots.default || content"
    role="alert"
    data-slot="field-error"
    :class="cn('text-caption text-danger-text', props.class)"
  >
    <slot v-if="$slots.default" />
    <template v-else-if="typeof content === 'string'">{{ content }}</template>
    <ul v-else-if="Array.isArray(content)" class="ml-4 flex list-disc flex-col gap-1">
      <li v-for="(error, index) in content" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>
