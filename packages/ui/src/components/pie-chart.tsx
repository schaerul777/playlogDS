import * as React from "react"
import { Cell, Pie, PieChart as RechartsPieChart } from "recharts"

import {
  CHART_COLORS,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import { useSeriesVisibility } from "@workspace/ui/components/chart-utils"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

type PieChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** One object per slice, for example `{ name: "Active", value: 62 }`. */
  data: { name: string; value: number }[]
  /** Donut (default) or a full pie. */
  donut?: boolean
  /** Slices shown before the rest are summed into "Other". Default 5. */
  maxSlices?: number
  /** Small text under the total in the donut centre. Default "Total". */
  centerCaption?: string
  /** Formats the total, the slice values and the tooltip. */
  valueFormatter?: (value: number) => string
  showTooltip?: boolean
  /** Hover a legend row to dim the other slices; press it to hide or show that slice. Default on. */
  interactiveLegend?: boolean
}

const percent = (v: number, total: number) =>
  `${((v / total) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`

// Playlog: COMPONENT-SPECS Charts, Pie and Donut. Outer radius 100; donut thickness 36 (inner 64), pie inner 0. Slices run
// clockwise from 12 o'clock, largest first, 2px `card` gap between them; at most `maxSlices`, the rest summed into "Other"
// in chart-8. No labels on slices: the legend (right on wide cards, below on narrow ones) carries name, value and percent.
// The donut centre shows the total in 24/32 bold with a 12/16 caption.
function PieChart({
  data,
  donut = true,
  maxSlices = 5,
  centerCaption = "Total",
  valueFormatter = (v) => v.toLocaleString("id-ID"),
  showTooltip = true,
  interactiveLegend = true,
  className,
  ...props
}: PieChartProps) {
  const slices = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => b.value - a.value)
    const head = sorted.slice(0, maxSlices)
    const rest = sorted.slice(maxSlices)
    const list = rest.length
      ? [...head, { name: "Other", value: rest.reduce((sum, s) => sum + s.value, 0) }]
      : head
    return list.map((slice, i) => {
      const isOther = rest.length > 0 && i === list.length - 1
      const key = `s${i}`
      const color = isOther ? "var(--pl-chart-8)" : CHART_COLORS[i % CHART_COLORS.length]!
      return { key, ...slice, color, fill: `var(--color-${key})` }
    })
  }, [data, maxSlices])
  const visibility = useSeriesVisibility(React.useMemo(() => slices.map((s) => s.key), [slices]))
  const shown = slices.filter((s) => !visibility.isHidden(s.key))
  const total = shown.reduce((sum, s) => sum + s.value, 0)
  const config = React.useMemo(
    () =>
      Object.fromEntries(slices.map((s) => [s.key, { label: s.name, color: s.color }])) as ChartConfig,
    [slices]
  )

  return (
    <div className={cn("@container flex flex-col items-center gap-6 @md:flex-row @md:justify-center", className)}>
      <div className="relative size-56 shrink-0">
        <ChartContainer config={config} className="aspect-square size-full" {...props}>
          <RechartsPieChart accessibilityLayer>
            {showTooltip ? (
              <ChartTooltip
                content={<ChartTooltipContent hideLabel nameKey="key" valueFormatter={valueFormatter} />}
              />
            ) : null}
            <Pie
              data={shown}
              dataKey="value"
              nameKey="key"
              innerRadius={donut ? 64 : 0}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              stroke="var(--card)"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {shown.map((s) => (
                <Cell key={s.key} fill={s.fill} fillOpacity={visibility.opacity(s.key)} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
        {donut ? (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-h2 text-foreground tabular-nums">{valueFormatter(total)}</span>
            <span className="text-caption text-muted-foreground">{centerCaption}</span>
          </div>
        ) : null}
      </div>
      <ul className="flex min-w-48 flex-col gap-1 text-caption" aria-label="Legend">
        {slices.map((s) => {
          const hidden = visibility.isHidden(s.key)
          const row = (
            <>
              <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} aria-hidden="true" />
              <span className={cn("text-muted-foreground", hidden && "line-through")}>{s.name}</span>
              <span className="ml-auto pl-4 font-semibold text-foreground tabular-nums">{valueFormatter(s.value)}</span>
              <span className="w-12 text-right text-muted-foreground tabular-nums">{hidden ? "–" : percent(s.value, total)}</span>
            </>
          )
          return (
            <li key={s.key}>
              {interactiveLegend ? (
                <button
                  type="button"
                  aria-pressed={!hidden}
                  onClick={() => visibility.toggle(s.key)}
                  onMouseEnter={() => visibility.setActive(s.key)}
                  onMouseLeave={() => visibility.setActive(null)}
                  onFocus={() => visibility.setActive(s.key)}
                  onBlur={() => visibility.setActive(null)}
                  // Playlog: a row is a button, radius 4, accent on hover, focus ring; hidden rows go to 40% with the name struck through.
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-0.5 text-left transition-colors duration-(--pl-duration-fast) ease-out outline-none hover:bg-accent focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
                    hidden && "opacity-(--pl-opacity-disabled)"
                  )}
                >
                  {row}
                </button>
              ) : (
                <div className="flex items-center gap-1.5 px-1.5 py-0.5">{row}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { PieChart }
export type { PieChartProps }
