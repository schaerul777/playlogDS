<script setup lang="ts">
// Playlog: hand built. COMPONENT-SPECS Spinner: the approved `loader` stroke glyph at 20 (--pl-icon-size) in the
// current text color, Tailwind animate-spin. It keeps spinning under reduced motion: it is the only loading signal.
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
  size?: number
  title?: string
}>()
</script>

<template>
  <Icon
    name="loader"
    data-slot="spinner"
    role="status"
    aria-label="Loading"
    aria-hidden="false"
    :size="size"
    :title="title"
    :class="cn('size-(--pl-icon-size) shrink-0 animate-spin', props.class)"
  />
</template>
