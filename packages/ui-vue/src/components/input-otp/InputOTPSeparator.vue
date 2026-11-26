<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Playlog: a 12x1px --input line between groups, no glyph. -->
  <div
    data-slot="input-otp-separator"
    role="separator"
    :class="cn('h-(--pl-border-width) w-3 shrink-0 bg-input', props.class)"
  />
</template>
