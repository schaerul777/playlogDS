<script setup lang="ts">
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui-vue/components/empty"
import { Icon, type IconName } from "@workspace/ui-vue/icons"

// The empty thread: our Empty with the `lightbulb` tile by default. The slot (suggestions) goes below.
withDefaults(defineProps<{ title?: string; description?: string; icon?: IconName }>(), {
  title: "What should we ask?",
  description: "Ask about your campaigns, screens and reach, or start from a suggestion.",
  icon: "lightbulb",
})
</script>

<template>
  <Empty class="h-full">
    <EmptyHeader>
      <EmptyMedia variant="icon"><Icon :name="icon" /></EmptyMedia>
      <EmptyTitle>{{ title }}</EmptyTitle>
      <EmptyDescription>{{ description }}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent v-if="$slots.default"><slot /></EmptyContent>
  </Empty>
</template>
