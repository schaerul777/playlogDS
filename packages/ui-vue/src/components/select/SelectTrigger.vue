<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui"

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"]; size?: "sm" | "default" }>(),
  { size: "default" },
)

const delegatedProps = computed(() => {
  const { class: _class, size: _size, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="
      cn(
        // Playlog: like Input. 40px (32px sm), 4px radius, surface fill, border-strong (--input) edge, body-sm, flat.
        // Playlog: gap 8, padding 12 left / 36 right, chevron 10px from the right edge (COMPONENT-SPECS).
        'relative flex w-fit items-center justify-between gap-2 rounded-md border-(length:--pl-border-width) border-input bg-card pr-9 pl-3 text-body-sm whitespace-nowrap text-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:border-foreground data-[placeholder]:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        // Playlog: focus ring, disabled opacity and invalid edge from tokens.
        'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        'disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled)',
        // Playlog: error edge is pl-danger-text; the focus ring stays --ring (COMPONENT-SPECS).
        'aria-invalid:border-danger-text',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <Icon name="chevron-down" class="pointer-events-none absolute right-2.5 size-4 text-muted-foreground" />
    </SelectIcon>
  </SelectTrigger>
</template>
