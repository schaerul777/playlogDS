<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
// Playlog: footer actions are Button ghost icon-sm, 4 apart.

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="message-footer" :class="cn(
    'flex max-w-full min-w-0 items-center gap-1 px-3 text-caption text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
    props.class,
  )">
    <slot />
  </div>
</template>
