import * as React from "react"
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import { ActivePoint, shapeFor, shapeIcon, withSeriesColors } from "@workspace/ui/components/chart-utils"

type AreaChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  data: Record<string, string | number>[]
  config: ChartConfig
  categoryKey: string
  /** Stack the series instead of overlaying them. */
  stacked?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  valueFormatter?: (value: number) => string
  /** Shorter form for the value axis, for example `idCompact`. */
  axisFormatter?: (value: number) => string
}

// Playlog: COMPONENT-SPECS Charts, Area. A flat fill at 20% of the series colour (no gradient; 40% when stacked, so the
// layers read apart) with the 2px line of the line chart on top. Same axes, grid, cursor and point as Line.
function AreaChart({
  data,
  config,
  categoryKey,
  stacked = false,
  showLegend,
  showTooltip = true,
  valueFormatter,
  axisFormatter,
  ...props
}: AreaChartProps) {
  const series = Object.keys(config)
  const multi = series.length > 1
  const colored = React.useMemo(() => {
    const base = withSeriesColors(config)
    if (series.length < 2) return base
    return Object.fromEntries(
      series.map((key, i) => [key, { ...base[key], icon: shapeIcon(shapeFor(i), key) }])
    ) as ChartConfig
  }, [config, series])
  const formatAxis = axisFormatter ?? valueFormatter
  const format = (v: unknown) => (typeof v === "number" && formatAxis ? formatAxis(v) : String(v))

  return (
    <ChartContainer config={colored} {...props}>
      <RechartsAreaChart data={data} accessibilityLayer margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={format} />
        {showTooltip ? (
          <ChartTooltip cursor content={<ChartTooltipContent valueFormatter={valueFormatter} />} />
        ) : null}
        {(showLegend ?? multi) ? <ChartLegend verticalAlign="top" itemSorter={null} content={<ChartLegendContent />} /> : null}
        {series.map((key, i) => (
          <Area
            key={key}
            dataKey={key}
            type="linear"
            stackId={stacked ? "stack" : undefined}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            fill={`var(--color-${key})`}
            fillOpacity={stacked ? 0.4 : 0.2}
            activeDot={(p: { cx?: number; cy?: number }) => (
              <ActivePoint cx={p.cx} cy={p.cy} shape={multi ? shapeFor(i) : "circle"} color={`var(--color-${key})`} />
            )}
            isAnimationActive={false}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  )
}

export { AreaChart }
export type { AreaChartProps }
