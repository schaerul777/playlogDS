<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Button, type ButtonVariants } from "@workspace/ui-vue/components/button"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Pagination. Button ghost at icon size (40, or icon-sm 32);
// the current page is Button outline with aria-current="page".
const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; isActive?: boolean; size?: ButtonVariants["size"] }>(),
  { isActive: false, size: "icon" },
)
</script>

<template>
  <Button
    as="a"
    :variant="isActive ? 'outline' : 'ghost'"
    :size="size"
    :class="cn('tabular-nums', props.class)"
    :aria-current="isActive ? 'page' : undefined"
    data-slot="pagination-link"
    :data-active="isActive ? 'true' : undefined"
  >
    <slot />
  </Button>
</template>
