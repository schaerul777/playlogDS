<script setup lang="ts">
import type { ComboboxGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxGroup } from "reka-ui"

const props = defineProps<ComboboxGroupProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ComboboxGroup data-slot="combobox-group" :as="props.as" :as-child="props.asChild" :class="cn(props.class)">
    <slot />
  </ComboboxGroup>
</template>
