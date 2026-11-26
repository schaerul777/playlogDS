<script setup lang="ts">
import type { SelectScrollUpButtonProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectScrollUpButton } from "reka-ui"

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectScrollUpButton
    data-slot="select-scroll-up-button"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*=\'size-\'])]:size-4', props.class)"
  >
    <slot>
      <!-- Playlog: the set has no chevron-up; the chevron-down glyph turned 180°. -->
      <Icon name="chevron-down" class="rotate-180" />
    </slot>
  </SelectScrollUpButton>
</template>
