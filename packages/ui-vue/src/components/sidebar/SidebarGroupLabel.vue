<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Primitive } from "reka-ui"

const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Primitive
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    :class="cn(
      // Playlog: section title. eyebrow 12/16 semibold with 4% tracking, uppercase, ink-muted, padding 0 12 8.
      'flex shrink-0 items-center rounded-md px-3 pb-2 text-eyebrow text-muted-foreground uppercase group-data-[collapsible=icon]:hidden outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring [&>svg]:size-4 [&>svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
