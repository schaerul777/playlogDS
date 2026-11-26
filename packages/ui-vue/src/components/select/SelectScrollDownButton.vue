<script setup lang="ts">
import type { SelectScrollDownButtonProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectScrollDownButton } from "reka-ui"

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectScrollDownButton
    data-slot="select-scroll-down-button"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*=\'size-\'])]:size-4', props.class)"
  >
    <slot>
      <Icon name="chevron-down" />
    </slot>
  </SelectScrollDownButton>
</template>
