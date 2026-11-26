<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import PaginationLink from "./PaginationLink.vue"

// Playlog: chevron plus label; below sm the label hides and aria-label keeps the name.
// size follows the page links: "sm" for 32, "default" for 40.
const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; text?: string; size?: ButtonVariants["size"] }>(),
  { text: "Previous", size: "default" },
)
</script>

<template>
  <PaginationLink
    aria-label="Go to previous page"
    :size="size"
    :class="cn('max-sm:px-0 max-sm:w-(--pl-control-height) data-[size=sm]:max-sm:w-(--pl-control-height-sm)', props.class)"
    :data-size="size"
  >
    <Icon name="chevron-right" data-icon="inline-start" class="rotate-180" />
    <span class="hidden sm:block">{{ text }}</span>
  </PaginationLink>
</template>
