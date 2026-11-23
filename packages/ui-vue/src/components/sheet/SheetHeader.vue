<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: padding 24 24 0; description 4 below the title. -->
  <div data-slot="sheet-header" :class="cn('flex flex-col gap-1 px-6 pt-6', props.class)">
    <slot />
  </div>
</template>
