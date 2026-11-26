<script setup lang="ts">
// Playlog: legend swatch, 10px. A rounded square by default; with several line or area series each one also has a shape
// (circle, square, diamond), so colour is never the only cue.
defineProps<{ color: string; shape?: "circle" | "square" | "diamond" }>()
</script>

<template>
  <svg v-if="shape" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" class="shrink-0">
    <circle v-if="shape === 'circle'" cx="5" cy="5" r="5" :fill="color" />
    <rect v-else-if="shape === 'square'" width="10" height="10" rx="2" :fill="color" />
    <polygon v-else points="5,0 10,5 5,10 0,5" :fill="color" />
  </svg>
  <span v-else class="size-2.5 shrink-0 rounded-sm" :style="{ backgroundColor: color }" aria-hidden="true" />
</template>
