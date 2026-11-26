<script setup lang="ts">
// Playlog: COMPONENT-SPECS DataTable. Wrapper with 1px border, 8px radius, card fill and horizontal scroll.
// Playlog: `dense` reduces body cell padding to 8 16.
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  dense?: boolean
}>(), {
  dense: false,
})
</script>

<template>
  <div
    data-slot="table-container"
    :data-dense="dense"
    class="group/table relative w-full overflow-x-auto rounded-lg border-(length:--pl-border-width) border-border bg-card"
  >
    <table
      data-slot="table"
      :class="cn('w-full caption-top text-body-sm text-foreground', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>
