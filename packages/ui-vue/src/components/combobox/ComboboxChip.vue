<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { comboboxChipsKey } from "./context"

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"]; showRemove?: boolean; value?: unknown }>(), { showRemove: true })
const emit = defineEmits<{ remove: [] }>()
const chips = inject(comboboxChipsKey, undefined)
function remove() {
  if (props.value !== undefined) chips?.remove(props.value)
  emit("remove")
}
</script>

<template>
  <span
    data-slot="combobox-chip"
    :class="
      cn(
        // Playlog: chip as Badge neutral. Height 22, radius 2, muted fill, 1px border, 12/16 semibold, gap 4.
        'flex h-5.5 w-fit items-center justify-center gap-1 rounded-sm border-(length:--pl-border-width) border-border bg-muted px-2 text-caption font-semibold whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:opacity-(--pl-opacity-disabled) has-data-[slot=combobox-chip-remove]:pr-1',
        props.class,
      )
    "
  >
    <slot />
    <button
      v-if="showRemove"
      type="button"
      tabindex="-1"
      aria-label="Remove"
      data-slot="combobox-chip-remove"
      class="flex size-4 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:text-foreground outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
      @click="remove"
    >
      <Icon name="close" class="pointer-events-none size-3" />
    </button>
  </span>
</template>
