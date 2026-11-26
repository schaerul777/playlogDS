<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 14/20 muted-foreground. -->
  <p data-slot="popover-description" :class="cn('text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
