<script setup lang="ts">
import type { ContextMenuItemEmits, ContextMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ContextMenuItem, useForwardPropsEmits } from "reka-ui"

const props = withDefaults(
  defineProps<ContextMenuItemProps & { class?: HTMLAttributes["class"]; inset?: boolean; variant?: "default" | "destructive" }>(),
  { variant: "default" },
)
const emits = defineEmits<ContextMenuItemEmits>()

const delegatedProps = computed(() => {
  const { class: _class, inset: _inset, variant: _variant, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwarded"
    :class="
      cn(
        'group/context-menu-item',
        // Playlog: shared item look, as the Select item. Height 32 (padding 6 8), radius 2, gap 8, body-sm foreground,
        // 16px icons in muted-foreground. Highlight is surface-hover (--accent). Disabled 40%.
        'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm text-foreground outline-hidden select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled) data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[svg]:text-muted-foreground data-[highlighted]:*:[svg]:text-accent-foreground',
        // Playlog: destructive item uses the danger *-text color for words and danger-surface on highlight.
        'data-[variant=destructive]:text-danger-text data-[variant=destructive]:*:[svg]:text-danger-text data-[variant=destructive]:data-[highlighted]:bg-danger-surface data-[variant=destructive]:data-[highlighted]:text-danger-text data-[variant=destructive]:data-[highlighted]:*:[svg]:text-danger-text',
        props.class,
      )
    "
  >
    <slot />
  </ContextMenuItem>
</template>
