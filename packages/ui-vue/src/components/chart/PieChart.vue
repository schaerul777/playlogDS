<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref, toRef } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import ChartTooltip from "./ChartTooltip.vue"
import { CHART_COLORS, useSeriesVisibility } from "./utils"

defineOptions({ inheritAttrs: false })

// Playlog: COMPONENT-SPECS Charts, Pie and Donut. Outer radius 100; donut thickness 36 (inner 64), pie inner 0. Slices run
// clockwise from 12 o'clock, largest first, 2px `card` gap; at most `maxSlices`, the rest summed into "Other" in chart-8.
// Drawn as plain SVG (a pie needs no charting library). The legend carries name, value and percent.
const props = withDefaults(
  defineProps<{
    /** One object per slice, for example `{ name: "Active", value: 62 }`. */
    data: { name: string; value: number }[]
    donut?: boolean
    maxSlices?: number
    centerCaption?: string
    valueFormatter?: (value: number) => string
    showTooltip?: boolean
    interactiveLegend?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { donut: true, maxSlices: 5, centerCaption: "Total", valueFormatter: (v: number) => v.toLocaleString("id-ID"), showTooltip: true, interactiveLegend: true },
)

const percent = (v: number, total: number) => `${((v / total) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`

const slices = computed(() => {
  const sorted = [...props.data].sort((a, b) => b.value - a.value)
  const head = sorted.slice(0, props.maxSlices)
  const rest = sorted.slice(props.maxSlices)
  const list = rest.length ? [...head, { name: "Other", value: rest.reduce((sum, s) => sum + s.value, 0) }] : head
  return list.map((slice, i) => {
    const isOther = rest.length > 0 && i === list.length - 1
    return { key: `s${i}`, ...slice, color: isOther ? "var(--pl-chart-8)" : CHART_COLORS[i % CHART_COLORS.length]! }
  })
})
const visibility = useSeriesVisibility(toRef(() => slices.value.map((s) => s.key)))
const shown = computed(() => slices.value.filter((s) => !visibility.isHidden(s.key)))
const total = computed(() => shown.value.reduce((sum, s) => sum + s.value, 0))

const R = 100
const r0 = computed(() => (props.donut ? 64 : 0))
function point(angle: number, r: number) {
  return [112 + r * Math.sin(angle), 112 - r * Math.cos(angle)] as const // 0 = 12 o'clock, clockwise
}
function arc(a0: number, a1: number) {
  const full = a1 - a0 >= Math.PI * 2 - 1e-6
  const end = full ? a0 + Math.PI * 2 - 1e-4 : a1
  const large = end - a0 > Math.PI ? 1 : 0
  const [x0, y0] = point(a0, R)
  const [x1, y1] = point(end, R)
  let d = `M${x0},${y0}A${R},${R} 0 ${large} 1 ${x1},${y1}`
  if (r0.value > 0) {
    const [x2, y2] = point(end, r0.value)
    const [x3, y3] = point(a0, r0.value)
    d += `L${x2},${y2}A${r0.value},${r0.value} 0 ${large} 0 ${x3},${y3}Z`
  } else d += `L112,112Z`
  return d
}
const paths = computed(() => {
  let a = 0
  return shown.value.map((s) => {
    const span = total.value ? (s.value / total.value) * Math.PI * 2 : 0
    const out = { ...s, d: arc(a, a + span) }
    a += span
    return out
  })
})

const root = ref<HTMLElement | null>(null)
const active = ref<number | null>(null)
const pointer = ref<{ x: number; y: number } | null>(null)
function onMove(event: PointerEvent, i: number) {
  const box = root.value!.getBoundingClientRect()
  pointer.value = { x: event.clientX - box.left, y: event.clientY - box.top }
  active.value = i
}
function onLeave() {
  pointer.value = null
  if (document.activeElement !== root.value) active.value = null
}
function onFocus() {
  if (active.value === null) active.value = 0
}
function onBlur() {
  active.value = null
  pointer.value = null
}
function onKeydown(event: KeyboardEvent) {
  const n = paths.value.length
  if (!n) return
  let i = active.value ?? -1
  if (event.key === "ArrowRight" || event.key === "ArrowDown") i = Math.min(n - 1, i + 1)
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") i = Math.max(0, i - 1)
  else if (event.key === "Home") i = 0
  else if (event.key === "End") i = n - 1
  else if (event.key === "Escape") {
    active.value = null
    return
  } else return
  event.preventDefault()
  pointer.value = null
  active.value = i
}
const tooltip = computed(() => {
  const s = active.value === null ? undefined : paths.value[active.value]
  if (!props.showTooltip || !s) return null
  const at = pointer.value ?? { x: 112, y: 24 }
  return { rows: [{ key: s.key, label: s.name, color: s.color, value: props.valueFormatter(s.value) }], at }
})
</script>

<template>
  <div data-slot="chart" :class="cn('@container flex flex-col items-center gap-6 text-caption @md:flex-row @md:justify-center', $props.class)">
    <div
      ref="root"
      role="application"
      tabindex="0"
      v-bind="$attrs"
      class="relative size-56 shrink-0 outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
    >
      <svg viewBox="0 0 224 224" class="size-full overflow-visible" aria-hidden="true">
        <path
          v-for="(p, i) in paths"
          :key="p.key"
          :d="p.d"
          :fill="p.color"
          :fill-opacity="visibility.opacity(p.key)"
          stroke="var(--card)"
          stroke-width="2"
          @pointermove="onMove($event, i)"
          @pointerleave="onLeave"
        />
      </svg>
      <div v-if="donut" class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-h2 text-foreground tabular-nums">{{ valueFormatter(total) }}</span>
        <span class="text-caption text-muted-foreground">{{ centerCaption }}</span>
      </div>
      <ChartTooltip v-if="tooltip" :rows="tooltip.rows" class="pointer-events-none absolute z-10" :style="{ left: `${tooltip.at.x + 12}px`, top: `${tooltip.at.y + 12}px` }" />
    </div>
    <ul class="flex min-w-48 flex-col gap-1" aria-label="Legend">
      <li v-for="s in slices" :key="s.key">
        <component
          :is="interactiveLegend ? 'button' : 'div'"
          :type="interactiveLegend ? 'button' : undefined"
          :aria-pressed="interactiveLegend ? !visibility.isHidden(s.key) : undefined"
          :class="
            cn(
              'flex w-full items-center gap-1.5 px-1.5 py-0.5 text-left',
              interactiveLegend &&
                'cursor-pointer rounded-md transition-colors duration-(--pl-duration-fast) ease-out outline-none hover:bg-accent focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
              interactiveLegend && visibility.isHidden(s.key) && 'opacity-(--pl-opacity-disabled)',
            )
          "
          @click="interactiveLegend && visibility.toggle(s.key)"
          @mouseenter="interactiveLegend && visibility.setActive(s.key)"
          @mouseleave="interactiveLegend && visibility.setActive(null)"
          @focus="interactiveLegend && visibility.setActive(s.key)"
          @blur="interactiveLegend && visibility.setActive(null)"
        >
          <span class="size-2.5 shrink-0 rounded-sm" :style="{ backgroundColor: s.color }" aria-hidden="true" />
          <span :class="cn('text-muted-foreground', visibility.isHidden(s.key) && 'line-through')">{{ s.name }}</span>
          <span class="ml-auto pl-4 font-semibold text-foreground tabular-nums">{{ valueFormatter(s.value) }}</span>
          <span class="w-12 text-right text-muted-foreground tabular-nums">{{ visibility.isHidden(s.key) ? "–" : percent(s.value, total) }}</span>
        </component>
      </li>
    </ul>
  </div>
</template>
