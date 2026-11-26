<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref, toRef, useId, watch } from "vue"
// Playlog: per-component entry points keep Unovis' map and graph code out of the bundle.
import VisAxis from "@unovis/vue/components/axis"
import VisGroupedBar from "@unovis/vue/components/grouped-bar"
import VisStackedBar from "@unovis/vue/components/stacked-bar"
import VisXYContainer from "@unovis/vue/containers/xy-container"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import ChartLegend from "./ChartLegend.vue"
import ChartTooltip from "./ChartTooltip.vue"
import { type ChartConfig, niceTicks, useSeriesVisibility, withSeriesColors } from "./utils"
import { type Point, useChartInteraction } from "./useChartInteraction"

defineOptions({ inheritAttrs: false })

// Playlog: COMPONENT-SPECS Charts, Bar. Same props as the React BarChart (`layout` keeps Recharts' naming: "horizontal" draws
// columns, "vertical" draws horizontal bars). Unovis draws the marks; hover, the arrow keys, tooltip and legend are ours.
const props = withDefaults(
  defineProps<{
    /** One object per category, for example `{ city: "Jakarta", roadside: 4.8 }`. */
    data: Record<string, string | number>[]
    /** One entry per series. Series without a colour get chart-1 to chart-8 in order. */
    config: ChartConfig
    /** The key in `data` that holds the category name. */
    categoryKey: string
    layout?: "horizontal" | "vertical"
    /** Stack the series instead of grouping them. */
    stacked?: boolean
    /** Legend above the plot. Defaults to on when there is more than one series. */
    showLegend?: boolean
    /** Value labels on the bars. Defaults to on for a single, unstacked series. */
    showLabels?: boolean
    showTooltip?: boolean
    /** Hover a legend item to dim the other series; press it to hide or show that series. Default on. */
    interactiveLegend?: boolean
    valueFormatter?: (value: number) => string
    /** Shorter form for the value axis only, for example `idCompact`. */
    axisFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  { layout: "horizontal", stacked: false, showLegend: undefined, showLabels: undefined, showTooltip: true, interactiveLegend: true },
)

const chartId = `chart-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
const series = computed(() => Object.keys(props.config))
const colored = computed(() => withSeriesColors(props.config))
const visibility = useSeriesVisibility(toRef(() => series.value))
const bars = computed(() => props.layout === "vertical") // horizontal bars
const legend = computed(() => props.showLegend ?? series.value.length > 1)
const labels = computed(() => props.showLabels ?? (series.value.length === 1 && !props.stacked))
const items = computed(() => series.value.map((key) => ({ key, label: colored.value[key]!.label ?? key, color: colored.value[key]!.color })))
const visible = computed(() => visibility.visibleKeys.value)
// Horizontal bars grow from the bottom of the category scale, so the first category takes the top slot (index n-1-i).
const x = (_d: unknown, i: number) => (bars.value ? props.data.length - 1 - i : i)
const y = computed(() => visible.value.map((key) => (d: Record<string, string | number>) => Number(d[key])))
const color = computed(() => visible.value.map((key) => colored.value[key]!.color))
// Value axis: 0 to a nice top, five ticks. Stacked bars add the series up.
const ticks = computed(() => {
  const max = Math.max(
    0,
    ...props.data.map((d) => {
      const values = visible.value.map((k) => Number(d[k]) || 0)
      return props.stacked ? values.reduce((a, b) => a + b, 0) : Math.max(...values)
    }),
  )
  return niceTicks(max)
})
// Domains: categories run from -0.5 to n-0.5 (so each index sits in the middle of its band), values from 0 to the top tick.
// Unovis keeps the x scale for the category accessor, so for horizontal bars the value domain is on x.
const catDomain = computed<[number, number]>(() => [-0.5, props.data.length - 0.5])
const valDomain = computed<[number, number]>(() => [0, ticks.value[ticks.value.length - 1]!])
const xDomain = computed(() => (bars.value ? valDomain.value : catDomain.value))
const yDomain = computed(() => (bars.value ? catDomain.value : valDomain.value))
const categories = computed(() => props.data.map((d) => String(d[props.categoryKey])))
const format = (v: number) => props.valueFormatter?.(v) ?? v.toLocaleString()
const axis = (v: number | Date) => (props.axisFormatter ?? props.valueFormatter)?.(Number(v)) ?? String(v)

const root = ref<HTMLElement | null>(null)
const axisDir = computed(() => (bars.value ? "y" : "x"))
// One anchor per category: the centre of its bar group.
function getAnchors(): Point[] {
  const el = root.value
  if (!el) return []
  const box = el.getBoundingClientRect()
  return Array.from(el.querySelectorAll<SVGGElement>("g[class*='barGroup']")).map((g) => {
    const r = g.getBoundingClientRect()
    return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
  })
}
const ui = useChartInteraction(root, getAnchors, axisDir)
watch([() => props.data, visible, () => props.layout, () => props.stacked], () => ui.scheduleMeasure(), { deep: true })

// Recharts gives the left axis a fixed 60px (plus a 5px margin); Unovis sizes it to its labels. Margin makes up the difference so
// the plot starts at the same place.
const leftMargin = computed(() => Math.max(5, 65 - ui.labelWidth.value - 6))

// Value labels: placed from the measured bars (above a column, right of a horizontal bar).
const barLabels = computed(() => {
  if (!labels.value) return []
  void ui.anchors.value // re-run after each measure
  const el = root.value
  if (!el) return []
  const box = el.getBoundingClientRect()
  const key = visible.value[0]
  if (!key) return []
  return Array.from(el.querySelectorAll<SVGPathElement>("path[class*='-bar']")).map((p, i) => {
    const r = p.getBoundingClientRect()
    return {
      text: format(Number(props.data[i]?.[key])),
      style: bars.value
        ? { left: `${r.right - box.left + 4}px`, top: `${r.top - box.top + r.height / 2}px`, transform: "translateY(-50%)" }
        : { left: `${r.left - box.left + r.width / 2}px`, top: `${r.top - box.top - 4}px`, transform: "translate(-50%, -100%)" },
    }
  })
})

// The band under the active category (Recharts' rectangle cursor, `muted` fill).
const band = computed(() => {
  const i = ui.active.value
  const a = i === null ? undefined : ui.anchors.value[i]
  if (!a) return null
  const p = ui.plot.value
  const n = props.data.length || 1
  return bars.value
    ? { left: p.left, top: a.y - p.height / n / 2, width: p.width, height: p.height / n }
    : { left: a.x - p.width / n / 2, top: p.top, width: p.width / n, height: p.height }
})
const tooltip = computed(() => {
  const i = ui.active.value
  if (!props.showTooltip || i === null || !ui.anchors.value[i]) return null
  const a = ui.anchors.value[i]!
  const at = ui.pointer.value ?? { x: a.x, y: ui.plot.value.top + 8 }
  return {
    label: categories.value[i],
    rows: visible.value.map((key) => ({
      key,
      label: colored.value[key]!.label ?? key,
      color: colored.value[key]!.color,
      value: format(Number(props.data[i]?.[key])),
    })),
    at,
  }
})
// Dim every series but the active legend item to 30% (Unovis numbers the visible series from 0).
const dimCss = computed(() => {
  const k = visibility.active.value
  if (!k || visibility.isHidden(k)) return ""
  const i = visible.value.indexOf(k)
  return i < 0 ? "" : `[data-chart=${chartId}] [unovis-series-key]:not([unovis-series-key="index:${i}"]){fill-opacity:.3}`
})
</script>

<template>
  <div data-slot="chart" :data-chart="chartId" :class="cn('flex aspect-video w-full flex-col text-caption', $props.class)">
    <component :is="'style'" v-if="dimCss">{{ dimCss }}</component>
    <!-- Playlog: the React legend sits inside the chart's 5px margin. -->
    <ChartLegend v-if="legend" class="mt-[5px] ml-[5px]" :items="items" :visibility="interactiveLegend ? visibility : undefined" />
    <div
      ref="root"
      role="application"
      tabindex="0"
      v-bind="$attrs"
      class="relative min-h-0 w-full flex-1 outline-none [&_[data-vis-xy-container]]:h-full [&_svg]:overflow-visible focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
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
      <div v-if="band" class="pointer-events-none absolute z-0 bg-muted" :style="{ left: `${band.left}px`, top: `${band.top}px`, width: `${band.width}px`, height: `${band.height}px` }" />
      <div class="relative z-[1] h-full w-full [&_.tick_text]:font-medium [&_.tick_tspan]:font-[family-name:var(--font-sans)]">
        <VisXYContainer :data="data" :margin="{ top: legend ? -8 : -3, right: 5, bottom: 15, left: leftMargin }" :x-domain="xDomain" :y-domain="yDomain" :duration="0">
          <component
            :is="stacked ? VisStackedBar : VisGroupedBar"
            :x="x"
            :y="y"
            :color="color"
            :rounded-corners="stacked ? 0 : 2"
            :duration="0"
            :orientation="bars ? 'horizontal' : 'vertical'"
            :group-padding="0.16"
            :bar-padding="stacked ? 0.16 : visible.length < 2 ? 0.03 : 0.1"
          />
          <VisAxis
            :type="bars ? 'y' : 'x'"
            :tick-format="(i: number | Date) => categories[bars ? data.length - 1 - Number(i) : Number(i)] ?? ''"
            :num-ticks="data.length"
            :duration="0"
            :tick-padding="0"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
          />
          <VisAxis :type="bars ? 'x' : 'y'" :duration="0" :tick-values="ticks" :tick-padding="0" :tick-format="axis" :tick-line="false" :domain-line="false" :grid-line="true" />
        </VisXYContainer>
      </div>
      <span v-for="(l, i) in barLabels" :key="i" class="pointer-events-none absolute z-[2] font-medium text-foreground" :style="l.style">{{ l.text }}</span>
      <ChartTooltip
        v-if="tooltip"
        :label="tooltip.label"
        :rows="tooltip.rows"
        class="pointer-events-none absolute z-10"
        :style="{ left: `${tooltip.at.x + 12}px`, top: `${tooltip.at.y + 12}px` }"
      />
    </div>
  </div>
</template>
