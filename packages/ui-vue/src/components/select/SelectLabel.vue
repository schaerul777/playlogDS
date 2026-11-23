<script setup lang="ts">
import type { SelectLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectLabel } from "reka-ui"

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    :as="props.as"
    :as-child="props.asChild"
    :for="props.for"
    :class="cn('px-2 py-1.5 text-caption text-muted-foreground', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
