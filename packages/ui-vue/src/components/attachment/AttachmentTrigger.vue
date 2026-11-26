<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Primitive } from "reka-ui"

// Covers the chip; use `as="a"` or `as-child` for a link.
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), { as: "button" })
</script>

<template>
  <Primitive
    data-slot="attachment-trigger"
    :as="as"
    :as-child="asChild"
    :type="as === 'button' ? 'button' : undefined"
    :class="
      // Playlog: covers the chip; focus ring 2px offset 2, radius 4.
      cn(
        'absolute inset-0 z-10 rounded-md outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
