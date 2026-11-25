<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { EmptyMediaVariants } from "."
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { emptyMediaVariants } from "."

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  variant?: EmptyMediaVariants["variant"]
}>(), {
  variant: "default",
})
</script>

<template>
  <!-- data-slot is "empty-icon" in the React component too; kept so the two match. -->
  <div
    data-slot="empty-icon"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
