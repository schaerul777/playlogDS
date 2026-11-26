<script setup lang="ts">
import type { ComboboxSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxSeparator } from "reka-ui"

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ComboboxSeparator
    data-slot="combobox-separator"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('-mx-1 my-1 h-(--pl-border-width) bg-border', props.class)"
  />
</template>
