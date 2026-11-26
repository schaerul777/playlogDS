<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="bubble-group" :class="cn(
    'flex min-w-0 flex-col gap-2',
    props.class,
  )">
    <slot />
  </div>
</template>
