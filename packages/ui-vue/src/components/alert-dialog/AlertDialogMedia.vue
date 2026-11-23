<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 32px tile like the StatCard icon tile: radius 4, accent fill, ink-heading icon at 20px. -->
  <div data-slot="alert-dialog-media" :class="cn('mb-2 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-ink-heading [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-(--pl-icon-size)', props.class)">
    <slot />
  </div>
</template>
