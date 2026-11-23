<script setup lang="ts">
import type { SelectValueProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectValue } from "reka-ui"

const props = defineProps<SelectValueProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectValue
    data-slot="select-value"
    :placeholder="props.placeholder"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex flex-1 text-left', props.class)"
  >
    <slot />
  </SelectValue>
</template>
