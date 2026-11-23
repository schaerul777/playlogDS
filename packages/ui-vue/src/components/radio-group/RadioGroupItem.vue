<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui"

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        // Playlog: COMPONENT-SPECS Radio Group. 18px circle, 1.5px --input edge, card fill, flat, mirrors Checkbox.
        'group/radio-group-item peer relative flex size-4.5 shrink-0 items-center justify-center rounded-(--pl-radius-full) border-(length:--pl-checkbox-border-width) border-input bg-card transition-colors duration-(--pl-duration-fast) ease-out after:absolute after:-inset-x-3 after:-inset-y-2',
        // Playlog: checked is primary with a primary-foreground dot; hover primary-hover. (Reka: data-state.)
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:hover:border-primary-hover data-[state=checked]:hover:bg-primary-hover',
        'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        'data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)',
        // Playlog: error edge is pl-danger-text, also when checked.
        'aria-invalid:border-danger-text aria-invalid:data-[state=checked]:border-danger-text',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="flex items-center justify-center"
    >
      <!-- Playlog: 6px dot. -->
      <span class="size-1.5 rounded-(--pl-radius-full) bg-primary-foreground" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
