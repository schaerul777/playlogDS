<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="empty-content"
    :class="cn(
      // Playlog: actions centred, 8 apart (Button default + Button outline).
      'flex w-full max-w-sm min-w-0 flex-wrap items-center justify-center gap-2 text-body-sm text-balance',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
