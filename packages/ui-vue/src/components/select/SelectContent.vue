<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from "reka-ui"
import SelectScrollDownButton from "./SelectScrollDownButton.vue"
import SelectScrollUpButton from "./SelectScrollUpButton.vue"

defineOptions({
  inheritAttrs: false,
})

// Playlog: React aligns the selected item with the trigger by default (alignItemWithTrigger), which is
// Reka's "item-aligned" position. Use position="popper" for a menu under the trigger.
const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(),
  { position: "item-aligned", sideOffset: 4 },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: menu is surface-raised (--popover) with the overlay shadow, 4px radius, no border (COMPONENT-SPECS).
          // Playlog: functional motion only: 150ms ease-out fade, no zoom or slide (popper only; item-aligned opens in place).
          'relative isolate z-50 max-h-(--reka-select-content-available-height) min-w-36 origin-(--reka-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover text-popover-foreground shadow-(--pl-shadow-overlay) duration-(--pl-duration-fast) ease-out',
          position === 'popper' &&
            'w-(--reka-select-trigger-width) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn(position === 'popper' && 'w-full min-w-(--reka-select-trigger-width)')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
