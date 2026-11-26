<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="empty-description"
    :class="cn(
      // Playlog: 14/20 muted-foreground; links underlined, never Blue or Green text.
      'text-body-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
