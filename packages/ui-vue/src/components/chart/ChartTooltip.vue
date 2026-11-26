<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import ChartSwatch from "./ChartSwatch.vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

defineProps<{
  label?: string
  rows: { key: string; label: string; color: string; value: string; shape?: "circle" | "square" | "diamond" }[]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Playlog: popover fill, overlay shadow, radius 4, padding 8 12 (6 12 for one row), 12/16 medium, min width 144, no arrow.
       Header = category (foreground, medium); a row per series: 10x10 swatch radius 2, name muted, value 600 tabular right. -->
  <div
    data-slot="chart-tooltip"
    :class="
      cn(
        'grid min-w-36 items-start gap-1.5 rounded-md bg-popover px-3 text-caption text-popover-foreground shadow-(--pl-shadow-overlay)',
        rows.length > 1 ? 'py-2' : 'py-1.5',
        $props.class,
      )
    "
  >
    <div v-if="label" class="font-medium">{{ label }}</div>
    <div class="grid gap-1.5">
      <div v-for="row in rows" :key="row.key" class="flex w-full flex-wrap items-center gap-2">
        <ChartSwatch v-if="row.shape" :color="row.color" :shape="row.shape" />
        <div v-else class="h-2.5 w-2.5 shrink-0 rounded-sm" :style="{ backgroundColor: row.color }" />
        <div class="flex flex-1 items-center justify-between leading-none">
          <span class="text-muted-foreground">{{ row.label }}</span>
          <span class="font-semibold text-popover-foreground tabular-nums">{{ row.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
