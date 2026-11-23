<script setup lang="ts">
import type { ContextMenuRadioItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ContextMenuRadioItem, ContextMenuItemIndicator, useForwardProps } from "reka-ui"

const props = defineProps<ContextMenuRadioItemProps & { class?: HTMLAttributes["class"]; inset?: boolean; closeOnClick?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _class, inset: _inset, closeOnClick: _close, ...delegated } = props
  return delegated
})
const forwarded = useForwardProps(delegatedProps)

// Playlog: as in React (Base UI), picking a checkbox or radio item keeps the menu open unless closeOnClick is set.
function onSelect(event: Event) {
  if (!props.closeOnClick) event.preventDefault()
}
</script>

<template>
  <!-- Playlog: check mark 8 from the right, right padding 32. The selected radio item shows the same check mark (no new glyph). -->
  <ContextMenuRadioItem
    data-slot="context-menu-radio-item"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    @select="onSelect"
    :class="cn('relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm text-foreground outline-hidden select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled) data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[svg]:text-muted-foreground data-[highlighted]:*:[svg]:text-accent-foreground', 'pr-8', props.class)"
  >
    <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center" data-slot="context-menu-radio-item-indicator">
      <ContextMenuItemIndicator>
        <Icon name="check" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
