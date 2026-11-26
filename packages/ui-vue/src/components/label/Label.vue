<script setup lang="ts">
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Label } from "reka-ui"

// Playlog: COMPONENT-SPECS Label. 14/20 semibold foreground; dims with a disabled control.
// Playlog: `required` adds the agreed marker: `*` in muted-foreground, hidden from screen readers
// (put `required` on the control itself so assistive tech announces it).
const props = withDefaults(
  defineProps<LabelProps & { class?: HTMLAttributes["class"]; required?: boolean }>(),
  { required: false }
)
</script>

<template>
  <Label
    data-slot="label"
    :for="props.for"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        'flex items-center gap-2 text-label text-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-(--pl-opacity-disabled) peer-disabled:opacity-(--pl-opacity-disabled) peer-data-disabled:opacity-(--pl-opacity-disabled)',
        props.class,
      )
    "
  >
    <slot />
    <span
      v-if="required"
      aria-hidden="true"
      data-slot="label-required"
      class="-ml-1 text-muted-foreground"
    >
      *
    </span>
  </Label>
</template>
