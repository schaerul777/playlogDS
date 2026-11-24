<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: item. -->
  <li data-slot="breadcrumb-item" :class="cn('inline-flex items-center gap-2', props.class)">
    <slot />
  </li>
</template>
