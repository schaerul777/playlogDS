<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Message. A presentational row: `align="end"` for the person, `align="start"` for the assistant.
// Text 14/20; header and footer are 12/16 medium muted-foreground.
const props = withDefaults(defineProps<{ align?: "start" | "end"; class?: HTMLAttributes["class"] }>(), { align: "start" })
</script>

<template>
  <div
    data-slot="message"
    :data-align="align"
    :class="cn('group/message relative flex w-full min-w-0 gap-2 text-body-sm data-[align=end]:flex-row-reverse', props.class)"
  >
    <slot />
  </div>
</template>
