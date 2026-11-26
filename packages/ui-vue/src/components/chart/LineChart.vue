<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import CartesianChart from "./CartesianChart.vue"
import type { ChartConfig } from "./utils"

// Playlog: COMPONENT-SPECS Charts, Line. Same props as the React LineChart.
defineOptions({ inheritAttrs: false })
withDefaults(
  defineProps<{
    data: Record<string, string | number>[]
    config: ChartConfig
    categoryKey: string
    showLegend?: boolean
    showTooltip?: boolean
    interactiveLegend?: boolean
    valueFormatter?: (value: number) => string
    axisFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  { showLegend: undefined, showTooltip: true, interactiveLegend: true },
)
</script>

<template>
  <CartesianChart v-bind="{ ...$props, ...$attrs }" />
</template>
