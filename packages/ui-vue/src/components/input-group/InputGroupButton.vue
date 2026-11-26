<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Button, type ButtonVariants } from "@workspace/ui-vue/components/button"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: buttons inside a group are Button ghost at xs (24) or icon-xs; sm and icon-sm (32) also work.
const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"]
    size?: "xs" | "sm" | "icon-xs" | "icon-sm"
    type?: "button" | "submit" | "reset"
    class?: HTMLAttributes["class"]
  }>(),
  { variant: "ghost", size: "xs", type: "button" },
)
</script>

<template>
  <Button :type="props.type" :data-size="props.size" :variant="props.variant" :size="props.size" :class="cn('shrink-0', props.class)">
    <slot />
  </Button>
</template>
