<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Primitive } from "reka-ui"

const props = withDefaults(defineProps<PrimitiveProps & {
  showOnHover?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'absolute top-2.5 right-2 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-muted-foreground transition-colors duration-(--pl-duration-fast) ease-out group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-2.5 peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1.5 after:absolute after:-inset-2 hover:bg-accent hover:text-sidebar-foreground outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
      showOnHover
        && 'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
