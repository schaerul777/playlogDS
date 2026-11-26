<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 14/20 medium in Reddit Sans (sm: 12/16). -->
  <div
    data-slot="code-block-title"
    :class="
      cn(
        'min-w-0 truncate font-sans text-body-sm font-medium text-foreground group-data-[size=sm]/code-block:text-caption group-data-[variant=destructive]/code-block:text-danger-text [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle [&_svg:not([class*=\'size-\'])]:size-4 group-data-[size=sm]/code-block:[&_svg:not([class*=\'size-\'])]:size-3 *:[svg]:me-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
