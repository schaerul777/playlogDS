"use client"

import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"

import {
  CHART_COLORS,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

type BarChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** One object per category, for example `{ city: "Jakarta", roadside: 4.8 }`. */
  data: Record<string, string | number>[]
  /** One entry per series. Series without a colour get chart-1 to chart-8 in order. */
  config: ChartConfig
  /** The key in `data` that holds the category name. */
  categoryKey: string
  /** Recharts naming: "horizontal" draws vertical columns (default), "vertical" draws horizontal bars. */
  layout?: "horizontal" | "vertical"
  /** Stack the series instead of grouping them. */
  stacked?: boolean
  /** Legend above the plot. Defaults to on when there is more than one series. */
  showLegend?: boolean
  /** Value labels on the bars (direct labelling). Defaults to on for a single, unstacked series. */
  showLabels?: boolean
  /** Hover tooltip. Defaults to on. */
  showTooltip?: boolean
  /** Formats values on the axis, the labels and the tooltip. */
  valueFormatter?: (value: number) => string
  /** Shorter form for the value axis only, for example `idCompact`. */
  axisFormatter?: (value: number) => string
}

function BarChart({
  data,
  config,
  categoryKey,
  layout = "horizontal",
  stacked = false,
  showLegend,
  showLabels,
  showTooltip = true,
  valueFormatter,
  axisFormatter,
  ...props
}: BarChartProps) {
  const series = Object.keys(config)
  // Playlog: assign chart-1 to chart-8 in order to series without an explicit colour.
  const colored = React.useMemo<ChartConfig>(
    () =>
      Object.fromEntries(
        series.map((key, i) => {
          const entry = config[key]
          return [
            key,
            entry.color || entry.theme
              ? entry
              : { ...entry, color: CHART_COLORS[i % CHART_COLORS.length] },
          ]
        })
      ) as ChartConfig,
    [config, series]
  )
  const legend = showLegend ?? series.length > 1
  const labels = showLabels ?? (series.length === 1 && !stacked)
  const bars = layout === "vertical" // horizontal bars
  const axis = (v: unknown) =>
    typeof v === "number" && (axisFormatter ?? valueFormatter) ? (axisFormatter ?? valueFormatter)!(v) : String(v)
  const format = (v: unknown) =>
    typeof v === "number" && valueFormatter ? valueFormatter(v) : String(v)

  return (
    <ChartContainer config={colored} {...props}>
      <RechartsBarChart
        data={data}
        layout={layout}
        accessibilityLayer
        // Playlog: 4 between bars in a group, 16% between categories.
        barGap={4}
        barCategoryGap="16%"
      >
        {/* Playlog: gridlines only across the value axis. */}
        <CartesianGrid vertical={bars} horizontal={!bars} />
        {bars ? (
          <>
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={axis}
            />
            <YAxis
              type="category"
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
          </>
        ) : (
          <>
            {/* Playlog: show every category; the value axis keeps Recharts' tick spacing. */}
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis tickLine={false} axisLine={false} tickFormatter={axis} />
          </>
        )}
        {showTooltip ? (
          <ChartTooltip
            cursor
            content={<ChartTooltipContent valueFormatter={valueFormatter} />}
          />
        ) : null}
        {legend ? (
          <ChartLegend verticalAlign="top" itemSorter={null} content={<ChartLegendContent />} />
        ) : null}
        {series.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            stackId={stacked ? "stack" : undefined}
            // Playlog: radius 2 on the data end; stacked bars stay square so the layers meet.
            radius={stacked ? 0 : bars ? [0, 2, 2, 0] : [2, 2, 0, 0]}
            isAnimationActive={false}
          >
            {labels ? (
              <LabelList
                dataKey={key}
                position={bars ? "right" : "top"}
                formatter={format}
              />
            ) : null}
          </Bar>
        ))}
      </RechartsBarChart>
    </ChartContainer>
  )
}

export { BarChart }
export type { BarChartProps }
