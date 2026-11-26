import { computed, ref, type Ref } from "vue"

// Playlog: series colours in brand order (chart-1 to chart-8). Use them in order; most charts need two or three.
export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--pl-chart-6)",
  "var(--pl-chart-7)",
  "var(--pl-chart-8)",
] as const

export type ChartConfig = Record<string, { label?: string; color?: string }>

// Series without a colour get chart-1 to chart-8 in order.
export function withSeriesColors(config: ChartConfig): Record<string, { label?: string; color: string }> {
  return Object.fromEntries(
    Object.keys(config).map((key, i) => [key, { ...config[key], color: config[key]!.color ?? CHART_COLORS[i % CHART_COLORS.length]! }]),
  )
}

// Playlog: interactive legend (agreed after Batch H). Hovering or focusing a legend item dims every other series to 30%;
// pressing it (click, Enter or Space) hides or shows that series. The last visible series cannot be hidden.
export function useSeriesVisibility(keys: Ref<string[]>) {
  const hidden = ref<Set<string>>(new Set())
  const active = ref<string | null>(null)
  function toggle(key: string) {
    const next = new Set(hidden.value)
    if (next.has(key)) next.delete(key)
    else if (keys.value.filter((k) => !next.has(k)).length > 1) next.add(key)
    hidden.value = next
  }
  const isHidden = (key: string) => hidden.value.has(key)
  // 1 normally, 0.3 for the others while a visible item is hovered or focused.
  const opacity = (key: string) => (active.value && active.value !== key && !hidden.value.has(active.value) ? 0.3 : 1)
  const visibleKeys = computed(() => keys.value.filter((k) => !hidden.value.has(k)))
  return { hidden, isHidden, active, setActive: (key: string | null) => (active.value = key), toggle, opacity, visibleKeys }
}
export type SeriesVisibility = ReturnType<typeof useSeriesVisibility>

// Playlog: the value axis starts at 0 and ends on a "nice" tick, with five ticks, the way Recharts rounds it in the React charts
// (step = ceil(raw / (0.05 * 10^digits)) * 0.05 * 10^digits). Returns the five tick values.
export function niceTicks(max: number, count = 5): number[] {
  if (!(max > 0)) return Array.from({ length: count }, (_, i) => i)
  const raw = max / (count - 1)
  const digits = Math.floor(Math.log10(raw)) + 1
  const unit = 10 ** digits
  const scale = digits !== 1 ? 0.05 : 0.1
  let step = Math.ceil(raw / unit / scale - 1e-9) * scale * unit
  // Round-off guard, then make sure the last tick reaches the data.
  step = Number(step.toPrecision(12))
  while (step * (count - 1) < max) step += scale * unit
  return Array.from({ length: count }, (_, i) => Number((i * step).toPrecision(12)))
}
