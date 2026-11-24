<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  size?: "default" | "sm"
}>(), {
  size: "default",
})
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :class="cn(
      // Playlog: flat card. Surface + 1px border, 8px radius, no shadow (COMPONENT-SPECS).
      // Playlog: one vertical rhythm: 16 top and between sections (--card-gap), 24 sides and bottom (--card-spacing).
      // Playlog: header 16 24 0 and content 16 24 24 as in the spec; sm is 16 everywhere (dense panels).
      'group/card flex flex-col gap-(--card-gap) overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-card pt-(--card-gap) pb-(--card-spacing) text-body-sm text-card-foreground [--card-gap:--spacing(4)] [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
