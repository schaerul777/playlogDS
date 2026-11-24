<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: landmark labelled "Breadcrumb". -->
  <nav data-slot="breadcrumb" aria-label="Breadcrumb" :class="cn('', props.class)">
    <slot />
  </nav>
</template>
