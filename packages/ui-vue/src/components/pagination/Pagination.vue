<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: navigation landmark. -->
  <nav data-slot="pagination" role="navigation" aria-label="Pagination" :class="cn('mx-auto flex w-full justify-center', props.class)">
    <slot />
  </nav>
</template>
