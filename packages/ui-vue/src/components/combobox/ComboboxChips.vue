<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxAnchor } from "reka-ui"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ComboboxAnchor as-child>
    <div
      data-slot="combobox-chips"
      :class="
        cn(
          // Playlog: looks like Input (min height 40, card fill, 1px --input border, radius 4); chips 4 apart, padding 8 8.
          'flex min-h-10 flex-wrap items-center gap-1 rounded-md border-(length:--pl-border-width) border-input bg-card px-3 py-2 text-body-sm transition-colors duration-(--pl-duration-fast) ease-out hover:border-foreground has-data-[slot=combobox-chip]:px-2',
          'focus-within:outline-(length:--pl-focus-ring-width) focus-within:outline-offset-(--pl-focus-ring-offset) focus-within:outline-solid focus-within:outline-ring has-aria-invalid:border-danger-text',
          props.class,
        )
      "
    >
      <slot />
    </div>
  </ComboboxAnchor>
</template>
