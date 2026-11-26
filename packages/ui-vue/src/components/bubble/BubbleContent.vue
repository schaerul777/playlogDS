<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Primitive } from "reka-ui"

// Renders a div; use `as="a"` / `as="button"` or `as-child` for an interactive bubble (React `render`).
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), { as: "div" })
</script>

<template>
  <Primitive
    data-slot="bubble-content"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        // Playlog: padding 8 12, radius 8, text 14/20; 1px border slot for `outline`; focus ring on links and buttons.
        'w-fit max-w-full min-w-0 overflow-hidden rounded-lg border-(length:--pl-border-width) border-transparent px-3 py-2 text-body-sm wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:duration-(--pl-duration-fast) [button,a]:ease-out [button,a]:outline-none [button,a]:focus-visible:outline-(length:--pl-focus-ring-width) [button,a]:focus-visible:outline-offset-(--pl-focus-ring-offset) [button,a]:focus-visible:outline-solid [button,a]:focus-visible:outline-ring',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
