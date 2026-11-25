<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <p
    data-slot="item-description"
    :class="cn(
      // Playlog: 12/16 muted-foreground, at most two lines; links underlined, never Blue or Green text.
      'line-clamp-2 text-left text-caption text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground',
      props.class,
    )"
  >
    <slot />
  </p>
</template>
