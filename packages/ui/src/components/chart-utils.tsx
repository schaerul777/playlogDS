import * as React from "react"

import { CHART_COLORS, type ChartConfig } from "@workspace/ui/components/chart"

// Playlog: COMPONENT-SPECS Charts. Series without a colour get chart-1 to chart-8 in order.
function withSeriesColors(config: ChartConfig): ChartConfig {
  return Object.fromEntries(
    Object.keys(config).map((key, i) => {
      const entry = config[key]!
      return [
        key,
        entry.color || entry.theme ? entry : { ...entry, color: CHART_COLORS[i % CHART_COLORS.length] },
      ]
    })
  ) as ChartConfig
}

type SeriesShape = "circle" | "square" | "diamond"
const SHAPES: SeriesShape[] = ["circle", "square", "diamond"]

// Playlog: with more than one series the active point and the legend swatch also differ by shape (circle, square, diamond),
// so colour is never the only cue.
function shapeFor(index: number): SeriesShape {
  return SHAPES[index % SHAPES.length]!
}

function ShapeGlyph({ shape, color, size = 10 }: { shape: SeriesShape; color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true" className="shrink-0">
      {shape === "circle" ? <circle cx="5" cy="5" r="5" fill={color} /> : null}
      {shape === "square" ? <rect width="10" height="10" rx="2" fill={color} /> : null}
      {shape === "diamond" ? <polygon points="5,0 10,5 5,10 0,5" fill={color} /> : null}
    </svg>
  )
}

// A ChartConfig `icon` for a series: its shape in its colour variable.
function shapeIcon(shape: SeriesShape, key: string): React.ComponentType {
  const Icon = () => <ShapeGlyph shape={shape} color={`var(--color-${key})`} />
  Icon.displayName = `SeriesShape(${shape})`
  return Icon
}

// The 6px active point: the series shape in its colour with a 2px `card` ring.
function ActivePoint({
  cx,
  cy,
  shape,
  color,
}: {
  cx?: number
  cy?: number
  shape: SeriesShape
  color: string
}) {
  if (cx == null || cy == null) return null
  const ring = { stroke: "var(--card)", strokeWidth: 2, fill: color }
  return shape === "circle" ? (
    <circle cx={cx} cy={cy} r={3} {...ring} />
  ) : shape === "square" ? (
    <rect x={cx - 3} y={cy - 3} width={6} height={6} rx={1} {...ring} />
  ) : (
    <polygon points={`${cx},${cy - 4} ${cx + 4},${cy} ${cx},${cy + 4} ${cx - 4},${cy}`} {...ring} />
  )
}

export { withSeriesColors, shapeFor, shapeIcon, ActivePoint, ShapeGlyph }
export type { SeriesShape }
