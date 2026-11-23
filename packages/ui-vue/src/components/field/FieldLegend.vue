<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; variant?: "legend" | "label" }>(),
  { variant: "legend" },
)
</script>

<template>
  <!-- Playlog: legend 16/24 bold ink-heading; variant label 14/20 semibold foreground. -->
  <legend
    data-slot="field-legend"
    :data-variant="variant"
    :class="cn('mb-2 data-[variant=label]:text-label data-[variant=label]:font-semibold data-[variant=label]:text-foreground data-[variant=legend]:text-h3 data-[variant=legend]:font-bold data-[variant=legend]:text-ink-heading', props.class)"
  >
    <slot />
  </legend>
</template>
