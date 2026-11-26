<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxItem, ComboboxItemIndicator, useForwardPropsEmits } from "reka-ui"

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxItem
    data-slot="combobox-item"
    v-bind="forwarded"
    :class="
      cn(
        // Playlog: as the Select item. Height 32, radius 2, body-sm; highlight accent; selected surface-selected + ink-heading.
        'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-body-sm text-foreground outline-hidden select-none data-[state=checked]:bg-surface-selected data-[state=checked]:text-ink-heading data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:data-[state=checked]:bg-accent data-[highlighted]:data-[state=checked]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <slot />
    <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      <ComboboxItemIndicator>
        <Icon name="check" class="pointer-events-none" />
      </ComboboxItemIndicator>
    </span>
  </ComboboxItem>
</template>
