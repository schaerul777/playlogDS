<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
  defaultValue?: string | number
}>()

// Playlog: native defineModel instead of @vueuse/core useVModel (no extra dependency).
const modelValue = defineModel<string | number>()
if (modelValue.value === undefined && props.defaultValue !== undefined) {
  modelValue.value = props.defaultValue
}
</script>

<template>
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    :class="
      cn(
        // Playlog: COMPONENT-SPECS Textarea. As Input: card fill, 1px --input border, radius 4, body-sm, padding 8 12.
        // Playlog: minimum height 80, grows with its content, no resize handle.
        'flex field-sizing-content min-h-20 w-full resize-none rounded-md border-(length:--pl-border-width) border-input bg-card px-3 py-2 text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out placeholder:text-muted-foreground hover:border-foreground',
        'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        'disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled)',
        // Playlog: error edge is pl-danger-text; the focus ring stays --ring.
        'aria-invalid:border-danger-text',
        props.class,
      )
    "
  />
</template>
