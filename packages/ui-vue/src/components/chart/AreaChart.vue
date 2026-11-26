<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import CartesianChart from "./CartesianChart.vue"
import type { ChartConfig } from "./utils"

// Playlog: COMPONENT-SPECS Charts, Area. Same props as the React AreaChart (`stacked` stacks the series).
defineOptions({ inheritAttrs: false })
withDefaults(
  defineProps<{
    data: Record<string, string | number>[]
    config: ChartConfig
    categoryKey: string
    stacked?: boolean
    showLegend?: boolean
    showTooltip?: boolean
    interactiveLegend?: boolean
    valueFormatter?: (value: number) => string
    axisFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  { stacked: false, showLegend: undefined, showTooltip: true, interactiveLegend: true },
)
</script>

<template>
  <CartesianChart v-bind="{ ...$props, ...$attrs }" area />
</template>
