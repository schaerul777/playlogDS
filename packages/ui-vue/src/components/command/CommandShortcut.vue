<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 12/16 muted-foreground, no extra tracking. -->
  <span
    data-slot="command-shortcut"
    :class="cn('ml-auto text-caption text-muted-foreground group-data-[highlighted]/command-item:text-accent-foreground', props.class)"
  >
    <slot />
  </span>
</template>
