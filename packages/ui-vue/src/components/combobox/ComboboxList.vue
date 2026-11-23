<script setup lang="ts">
import type { ComboboxViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxViewport } from "reka-ui"

const props = defineProps<ComboboxViewportProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ComboboxViewport
    data-slot="combobox-list"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('max-h-[min(--spacing(72),var(--reka-combobox-content-available-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1', props.class)"
  >
    <slot />
  </ComboboxViewport>
</template>
