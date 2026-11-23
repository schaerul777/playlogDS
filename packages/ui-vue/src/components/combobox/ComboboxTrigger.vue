<script setup lang="ts">
import type { ComboboxTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxTrigger } from "reka-ui"

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: icon-only button needs a name; callers can override it. -->
  <ComboboxTrigger
    data-slot="combobox-trigger"
    aria-label="Show options"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('[&_svg:not([class*=\'size-\'])]:size-4', props.class)"
  >
    <slot />
    <Icon name="chevron-down" class="pointer-events-none size-4 text-muted-foreground" />
  </ComboboxTrigger>
</template>
