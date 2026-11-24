<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="avatar-group-count"
    :class="cn(
      // Playlog: the +N tile at the end of an avatar group.
      'relative flex size-8 shrink-0 items-center justify-center rounded-(--pl-radius-full) bg-accent text-caption font-semibold text-ink-heading ring-(length:--pl-ring-separator-width) ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:text-label group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
