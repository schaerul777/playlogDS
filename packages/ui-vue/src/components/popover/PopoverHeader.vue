<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: description 4 below the title, as Dialog. -->
  <div data-slot="popover-header" :class="cn('flex flex-col gap-1 text-body-sm', props.class)">
    <slot />
  </div>
</template>
