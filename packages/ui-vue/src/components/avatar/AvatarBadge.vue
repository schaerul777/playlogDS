<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="avatar-badge"
    :class="cn(
      // Playlog: status dot 8 / 10 / 12, success by default (pass a bg-* status class to change it), ringed in the page color.
      // Playlog: pair it with screen-reader text so status is never color alone.
      'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-(--pl-radius-full) bg-success text-primary-foreground ring-(length:--pl-ring-separator-width) ring-background select-none',
      'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
      'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
      'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
