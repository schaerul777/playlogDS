<script setup lang="ts">
import type { SelectSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectSeparator } from "reka-ui"

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('pointer-events-none -mx-1 my-1 h-(--pl-border-width) bg-border', props.class)"
  />
</template>
