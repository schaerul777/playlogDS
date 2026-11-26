<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ title: string; description?: string; class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="chat-header" :class="cn('flex items-start justify-between gap-4 px-6 pt-4 pb-4', props.class)">
    <div class="flex min-w-0 flex-col gap-0.5">
      <div class="font-heading text-h3 font-bold text-ink-heading">{{ title }}</div>
      <div v-if="description" class="text-caption text-muted-foreground">{{ description }}</div>
    </div>
    <slot name="action" />
  </div>
</template>
