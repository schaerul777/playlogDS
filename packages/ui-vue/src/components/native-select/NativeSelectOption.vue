<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: options keep the system colors so the native list stays readable on every platform. -->
  <option data-slot="native-select-option" :class="cn('bg-[Canvas] text-[CanvasText]', props.class)">
    <slot />
  </option>
</template>
