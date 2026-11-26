<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { CollapsibleContent } from "@workspace/ui-vue/components/collapsible"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <CollapsibleContent data-slot="trace-collapsible-content" class="min-w-0 overflow-hidden">
    <div
      data-slot="trace-collapsible-content-inner"
      :class="
        // Playlog: left border 1px `border`, padding 0 4 0 16, 8 above and 4 below, muted text 14/20.
        cn(
          'mt-2 mb-1 ml-[calc(--spacing(2)-1px)] min-w-0 border-l-(length:--pl-border-width) border-border pr-1 pl-4 text-body-sm wrap-break-word text-muted-foreground',
          props.class,
        )
      "
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
