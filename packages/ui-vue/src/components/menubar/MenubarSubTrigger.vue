<script setup lang="ts">
import type { MenubarSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { MenubarSubTrigger, useForwardProps } from "reka-ui"

const props = defineProps<MenubarSubTriggerProps & { class?: HTMLAttributes["class"]; inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _class, inset: _inset, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <!-- Playlog: accent fill while the submenu is open. -->
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    :data-inset="inset ? '' : undefined"
    v-bind="forwardedProps"
    :class="cn('relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm text-foreground outline-hidden select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled) data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[svg]:text-muted-foreground data-[highlighted]:*:[svg]:text-accent-foreground', 'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground', props.class)"
  >
    <slot />
    <Icon name="chevron-right" class="ml-auto" />
  </MenubarSubTrigger>
</template>
