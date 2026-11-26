<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: padding 16 16 0 (sm: 12). -->
  <div
    data-slot="code-block-header"
    :class="
      cn(
        'flex min-w-0 shrink-0 items-center gap-2 px-4 pt-4 text-muted-foreground group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pt-3 group-data-[variant=destructive]/code-block:text-danger-text *:has-[>[data-slot=code-block-title]]:min-w-0',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
