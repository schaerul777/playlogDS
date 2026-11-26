<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: current page 14/20 semibold foreground. -->
  <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" :class="cn('font-semibold text-foreground', props.class)">
    <slot />
  </span>
</template>
