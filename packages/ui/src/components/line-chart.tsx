import * as React from "react"
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import {
  ActivePoint,
  InteractiveLegend,
  legendItems,
  shapeFor,
  shapeIcon,
  useSeriesVisibility,
  withSeriesColors,
} from "@workspace/ui/components/chart-utils"

type LineChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** One object per point, for example `{ week: "W1", completions: 120 }`. */
  data: Record<string, string | number>[]
  /** One entry per series. Series without a colour get chart-1 to chart-8 in order. */
  config: ChartConfig
  /** The key in `data` that holds the category (x axis) value. */
  categoryKey: string
  /** Legend above the plot. Defaults to on when there is more than one series. */
  showLegend?: boolean
  showTooltip?: boolean
  /** Hover a legend item to dim the other series; press it to hide or show that series. Default on. */
  interactiveLegend?: boolean
  /** Formats values in the tooltip (and on the axis unless `axisFormatter` is set). */
  valueFormatter?: (value: number) => string
  /** Shorter form for the value axis, for example `idCompact`. */
  axisFormatter?: (value: number) => string
}

// Playlog: COMPONENT-SPECS Charts, Line. 2px straight segments, no points until hover or keyboard focus, then a 6px point in
// the series shape with a 2px `card` ring. Horizontal gridlines only; vertical 1px `border` cursor. With more than one series
// the shapes differ (circle, square, diamond) on the point and in the legend.
function LineChart({
  data,
  config,
  categoryKey,
  showLegend,
  showTooltip = true,
  interactiveLegend = true,
  valueFormatter,
  axisFormatter,
  ...props
}: LineChartProps) {
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
  const visibility = useSeriesVisibility(series)
  const format = (v: unknown) => (typeof v === "number" && formatAxis ? formatAxis(v) : String(v))

  return (
    <ChartContainer config={colored} {...props}>
      <RechartsLineChart data={data} accessibilityLayer margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={format} />
        {showTooltip ? (
          <ChartTooltip cursor content={<ChartTooltipContent valueFormatter={valueFormatter} />} />
        ) : null}
        {(showLegend ?? multi) ? <ChartLegend
            verticalAlign="top"
            itemSorter={null}
            content={interactiveLegend ? <InteractiveLegend items={legendItems(colored)} visibility={visibility} /> : <ChartLegendContent />}
          /> : null}
        {series.map((key, i) => (
          <Line
            key={key}
            dataKey={key}
            type="linear"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            strokeLinejoin="round"
            dot={false}
            hide={visibility.isHidden(key)}
            strokeOpacity={visibility.opacity(key)}
            activeDot={(p: { cx?: number; cy?: number }) => (
              <ActivePoint cx={p.cx} cy={p.cy} shape={multi ? shapeFor(i) : "circle"} color={`var(--color-${key})`} />
            )}
            isAnimationActive={false}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  )
}

export { LineChart }
export type { LineChartProps }
