<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: COMPONENT-SPECS Breadcrumb. 14/20 muted-foreground, items 8 apart. -->
  <ol data-slot="breadcrumb-list" :class="cn('flex flex-wrap items-center gap-2 text-body-sm wrap-break-word text-muted-foreground', props.class)">
    <slot />
  </ol>
</template>
