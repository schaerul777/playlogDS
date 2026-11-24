<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Primitive } from "reka-ui"

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), { as: "a" })
</script>

<template>
  <!-- Playlog: muted-foreground link; hover foreground with an underline. Focus ring from tokens. -->
  <Primitive
    data-slot="breadcrumb-link"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'rounded-sm text-muted-foreground underline-offset-4 transition-colors duration-(--pl-duration-fast) ease-out hover:text-foreground hover:underline outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
