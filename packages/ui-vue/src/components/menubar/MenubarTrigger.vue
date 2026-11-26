<script setup lang="ts">
import type { MenubarTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { MenubarTrigger, useForwardProps } from "reka-ui"

const props = defineProps<MenubarTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        // Playlog: triggers 32 high, padding 0 12, radius 2, 14/20 semibold; hover accent; open surface-selected + ink-heading.
        'flex h-8 items-center rounded-sm px-3 text-label text-foreground transition-colors duration-(--pl-duration-fast) ease-out select-none hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-surface-selected data-[state=open]:text-ink-heading outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled)',
        props.class,
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>
