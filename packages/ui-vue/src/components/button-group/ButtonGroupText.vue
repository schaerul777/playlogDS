<script setup lang="ts">
// Playlog: a static label or unit ("https://", "USD"): muted fill, 1px --input border, padding 0 12, 14/20 medium.
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Primitive } from "reka-ui"

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="button-group-text"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'flex items-center gap-2 rounded-md border-(length:--pl-border-width) border-input bg-muted px-3 text-body-sm font-medium text-foreground [&_svg]:pointer-events-none [&_svg]:text-muted-foreground [&_svg:not([class*=\'size-\'])]:size-4',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
