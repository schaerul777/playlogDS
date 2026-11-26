<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: left-aligned at every width. Description 4 below the title. -->
  <div data-slot="alert-dialog-header" :class="cn('flex flex-col items-start gap-1 text-left', props.class)">
    <slot />
  </div>
</template>
