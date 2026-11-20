import * as React from "react"
import { Cell, Pie, PieChart as RechartsPieChart } from "recharts"

import {
  CHART_COLORS,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
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
  const total = slices.reduce((sum, s) => sum + s.value, 0)
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
              data={slices}
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
              {slices.map((s) => (
                <Cell key={s.key} fill={s.fill} />
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
      <ul className="flex min-w-48 flex-col gap-2 text-caption" aria-label="Legend">
        {slices.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} aria-hidden="true" />
            <span className="text-muted-foreground">{s.name}</span>
            <span className="ml-auto pl-4 font-semibold text-foreground tabular-nums">{valueFormatter(s.value)}</span>
            <span className="w-12 text-right text-muted-foreground tabular-nums">{percent(s.value, total)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { PieChart }
export type { PieChartProps }
