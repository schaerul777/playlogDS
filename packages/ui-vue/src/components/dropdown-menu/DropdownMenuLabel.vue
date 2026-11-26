<script setup lang="ts">
import type { DropdownMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DropdownMenuLabel, useForwardProps } from "reka-ui"

const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes["class"]; inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _class, inset: _inset, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <!-- Playlog: as the Select group label. 12/16 medium muted-foreground, padding 6 8. -->
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    :data-inset="inset ? '' : undefined"
    v-bind="forwardedProps"
    :class="cn('px-2 py-1.5 text-caption text-muted-foreground data-[inset]:pl-8', props.class)"
  >
    <slot />
  </DropdownMenuLabel>
</template>
