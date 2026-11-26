<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="
      cn(
        // Playlog: 18px box, 2px radius, 1.5px border-strong (--input) edge, surface fill, flat, 150ms ease-out (COMPONENT-SPECS).
        'peer relative flex size-4.5 shrink-0 items-center justify-center rounded-sm border-(length:--pl-checkbox-border-width) border-input bg-card transition-colors duration-(--pl-duration-fast) ease-out after:absolute after:-inset-x-3 after:-inset-y-2',
        'hover:border-foreground',
        // Playlog: checked uses primary; hover uses primary-hover. (Reka: data-state, not data-checked.)
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:hover:border-primary-hover data-[state=checked]:hover:bg-primary-hover',
        // Playlog: focus ring from --pl-focus-ring-width / --pl-focus-ring-offset.
        'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        // Playlog: disabled uses --pl-opacity-disabled.
        'data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)',
        // Playlog: error edge is pl-danger-text, also when checked; the focus ring stays --ring.
        'aria-invalid:border-danger-text aria-invalid:data-[state=checked]:border-danger-text',
        props.class,
      )
    "
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none [&>svg]:size-3.5"
    >
      <slot v-bind="slotProps">
        <Icon name="check" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
