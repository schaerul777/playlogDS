<script setup lang="ts">
import type { SelectItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from "reka-ui"

const props = defineProps<SelectItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="forwardedProps"
    :class="
      cn(
        // Playlog: 2px item radius, body-sm. Highlight is surface-hover (--accent); selected is surface-selected + ink-heading.
        // Reka: data-state=checked for the selected item, data-highlighted for the keyboard or pointer highlight.
        // Playlog: as in React, the highlight wins over the selected fill while the item is highlighted.
        'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-body-sm outline-hidden select-none data-[state=checked]:bg-surface-selected data-[state=checked]:text-ink-heading focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:data-[state=checked]:bg-accent data-[highlighted]:data-[state=checked]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
        props.class,
      )
    "
  >
    <SelectItemText class="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
      <slot />
    </SelectItemText>
    <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      <SelectItemIndicator>
        <slot name="indicator-icon">
          <Icon name="check" class="pointer-events-none" />
        </slot>
      </SelectItemIndicator>
    </span>
  </SelectItem>
</template>
