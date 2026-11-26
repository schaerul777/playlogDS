<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref, toRef, watch } from "vue"
// Playlog: per-component entry points keep Unovis' map and graph code out of the bundle.
import VisArea from "@unovis/vue/components/area"
import VisAxis from "@unovis/vue/components/axis"
import VisLine from "@unovis/vue/components/line"
import VisXYContainer from "@unovis/vue/containers/xy-container"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import ChartLegend from "./ChartLegend.vue"
import ChartTooltip from "./ChartTooltip.vue"
import { type ChartConfig, niceTicks, useSeriesVisibility, withSeriesColors } from "./utils"
import { type Point, useChartInteraction } from "./useChartInteraction"

defineOptions({ inheritAttrs: false })

// Playlog: COMPONENT-SPECS Charts, Line and Area (shared by LineChart and AreaChart). 2px straight segments, points only on
// hover or keyboard focus (6px, series shape, 2px `card` ring), 1px `border` cursor, flat 20% area fill (40% stacked).
const props = withDefaults(
  defineProps<{
    area?: boolean
    stacked?: boolean
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
  { area: false, stacked: false, showLegend: undefined, showTooltip: true, interactiveLegend: true },
)

const SHAPES = ["circle", "square", "diamond"] as const
const series = computed(() => Object.keys(props.config))
const multi = computed(() => series.value.length > 1)
const colored = computed(() => withSeriesColors(props.config))
const visibility = useSeriesVisibility(toRef(() => series.value))
const visible = computed(() => visibility.visibleKeys.value)
const legend = computed(() => props.showLegend ?? multi.value)
const shapeOf = (key: string) => (multi.value ? SHAPES[series.value.indexOf(key) % SHAPES.length]! : "circle")
const items = computed(() =>
  series.value.map((key) => ({
    key,
    label: colored.value[key]!.label ?? key,
    color: colored.value[key]!.color,
    shape: multi.value ? shapeOf(key) : undefined,
  })),
)
const n = computed(() => props.data.length)
const x = (_d: unknown, i: number) => i
const stack = computed(() => props.area && props.stacked)
// Cumulative value of a series at a point (stacked) or its own value.
function valueAt(i: number, key: string) {
  const d = props.data[i]!
  if (!stack.value) return Number(d[key]) || 0
  let sum = 0
  for (const k of visible.value) {
    sum += Number(d[k]) || 0
    if (k === key) break
  }
  return sum
}
const ticks = computed(() => {
  let max = 0
  for (let i = 0; i < n.value; i++) for (const k of visible.value) max = Math.max(max, valueAt(i, k))
  return niceTicks(max)
})
const top = computed(() => ticks.value[ticks.value.length - 1]!)
const categories = computed(() => props.data.map((d) => String(d[props.categoryKey])))
const format = (v: number) => props.valueFormatter?.(v) ?? v.toLocaleString()
const axis = (v: number | Date) => (props.axisFormatter ?? props.valueFormatter)?.(Number(v)) ?? String(v)
const dim = (key: string) => visibility.opacity(key)

const root = ref<HTMLElement | null>(null)
function getAnchors(plot: { left: number; top: number; width: number }): Point[] {
  return Array.from({ length: n.value }, (_, i) => ({ x: plot.left + (n.value > 1 ? (i / (n.value - 1)) * plot.width : plot.width / 2), y: plot.top }))
}
const ui = useChartInteraction(root, getAnchors, ref("x"))
watch([() => props.data, visible, () => props.stacked, () => props.area], () => ui.scheduleMeasure(), { deep: true })
// Recharts: chart margin 8, left axis 60 wide and labels 8 from the axis (6 more than Bar).
const leftMargin = computed(() => Math.max(5, 68 - ui.labelWidth.value - 12))

const cursor = computed(() => {
  const i = ui.active.value
  const a = i === null ? undefined : ui.anchors.value[i]
  return a ? { left: a.x, top: ui.plot.value.top, height: ui.plot.value.height } : null
})
const points = computed(() => {
  const i = ui.active.value
  const a = i === null ? undefined : ui.anchors.value[i]
  if (!a) return []
  const p = ui.plot.value
  return visible.value.map((key) => ({
    key,
    shape: shapeOf(key),
    color: colored.value[key]!.color,
    left: a.x,
    top: p.top + (1 - valueAt(i!, key) / top.value) * p.height,
  }))
})
const tooltip = computed(() => {
  const i = ui.active.value
  if (!props.showTooltip || i === null || !ui.anchors.value[i]) return null
  const a = ui.anchors.value[i]!
  return {
    label: categories.value[i],
    rows: visible.value.map((key) => ({ key, label: colored.value[key]!.label ?? key, color: colored.value[key]!.color, shape: multi.value ? shapeOf(key) : undefined, value: format(Number(props.data[i]?.[key])) })),
    at: ui.pointer.value ?? { x: a.x, y: ui.plot.value.top + 8 },
  }
})
const lineY = computed(() => visible.value.map((key) => (_d: unknown, i: number) => valueAt(i, key)))
</script>

<template>
  <div data-slot="chart" :class="cn('flex aspect-video w-full flex-col text-caption', $props.class)">
    <ChartLegend v-if="legend" class="mt-2 ml-2" :items="items" :visibility="interactiveLegend ? visibility : undefined" />
    <div
      ref="root"
      role="application"
      tabindex="0"
      v-bind="$attrs"
      class="relative min-h-0 w-full flex-1 outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring [&_[data-vis-xy-container]]:h-full [&_svg]:overflow-visible"
      :style="{
        '--vis-axis-tick-label-color': 'var(--muted-foreground)',
        '--vis-axis-grid-color': 'var(--color-chart-grid)',
        '--vis-axis-grid-line-width': 'var(--pl-border-width)',
      }"
      @pointermove="ui.onPointerMove"
      @pointerleave="ui.onPointerLeave"
      @focus="ui.onFocus"
      @blur="ui.onBlur"
      @keydown="ui.onKeydown"
    >
      <div v-if="cursor" class="pointer-events-none absolute z-0 w-(--pl-border-width) bg-border" :style="{ left: `${cursor.left}px`, top: `${cursor.top}px`, height: `${cursor.height}px` }" />
      <div class="relative z-[1] h-full w-full [&_.tick_text]:font-medium [&_.tick_tspan]:font-[family-name:var(--font-sans)]">
        <VisXYContainer :data="data" :margin="{ top: legend ? -8 : 0, right: -2, bottom: 5, left: leftMargin }" :x-domain="[0, Math.max(n - 1, 1)]" :y-domain="[0, top]" :duration="0">
          <template v-if="area">
            <template v-if="stacked">
              <VisArea :x="x" :y="visible.map((k) => (d: Record<string, string | number>) => Number(d[k]) || 0)" :color="visible.map((k) => colored[k]!.color)" :opacity="0.4" :duration="0" curve-type="linear" />
            </template>
            <template v-else>
              <VisArea v-for="k in visible" :key="k" :x="x" :y="(d: Record<string, string | number>) => Number(d[k]) || 0" :color="colored[k]!.color" :opacity="0.2 * dim(k)" :duration="0" curve-type="linear" />
            </template>
          </template>
          <template v-for="(k, i) in visible" :key="`l-${k}`">
            <VisLine :x="x" :y="lineY[i]!" :color="`color-mix(in srgb, ${colored[k]!.color} ${dim(k) * 100}%, transparent)`" :line-width="2" curve-type="linear" :duration="0" />
          </template>
          <VisAxis type="x" :tick-values="Array.from({ length: n }, (_, i) => i)" :tick-format="(i: number | Date) => categories[Math.round(Number(i))] ?? ''" :tick-line="false" :domain-line="false" :grid-line="false" :tick-padding="6" :duration="0" />
          <VisAxis type="y" :tick-values="ticks" :tick-format="axis" :tick-line="false" :domain-line="false" :grid-line="true" :tick-padding="6" :duration="0" />
        </VisXYContainer>
      </div>
      <div
        v-for="p in points"
        :key="p.key"
        class="pointer-events-none absolute z-[2] size-2 -translate-x-1/2 -translate-y-1/2 border-2 border-card"
        :class="p.shape === 'circle' ? 'rounded-full' : p.shape === 'square' ? 'rounded-[1px]' : 'rotate-45 scale-110'"
        :style="{ left: `${p.left}px`, top: `${p.top}px`, backgroundColor: p.color }"
      />
      <ChartTooltip v-if="tooltip" :label="tooltip.label" :rows="tooltip.rows" class="pointer-events-none absolute z-10" :style="{ left: `${tooltip.at.x + 12}px`, top: `${tooltip.at.y + 12}px` }" />
    </div>
  </div>
</template>
