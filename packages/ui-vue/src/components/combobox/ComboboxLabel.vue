<script setup lang="ts">
import type { ComboboxLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxLabel } from "reka-ui"

const props = defineProps<ComboboxLabelProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ComboboxLabel
    data-slot="combobox-label"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('px-2 py-1.5 text-caption text-muted-foreground', props.class)"
  >
    <slot />
  </ComboboxLabel>
</template>
