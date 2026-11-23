<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { sliderValuesKey } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const values = inject(sliderValuesKey, undefined)
</script>

<template>
  <output data-slot="slider-value" :class="cn('ml-auto text-caption text-muted-foreground tabular-nums', props.class)">
    <slot>{{ values?.join(" – ") }}</slot>
  </output>
</template>
