import * as React from "react"

import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

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

// Playlog: interactive legend (agreed after Batch H). Hovering or focusing a legend item dims every other series to 30%;
// pressing it (click, Enter or Space) hides or shows that series. The last visible series cannot be hidden.
function useSeriesVisibility(keys: string[]) {
  const [hidden, setHidden] = React.useState<Set<string>>(() => new Set())
  const [active, setActive] = React.useState<string | null>(null)
  const toggle = React.useCallback(
    (key: string) =>
      setHidden((prev) => {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else if (keys.filter((k) => !next.has(k)).length > 1) next.add(key)
        return next
      }),
    [keys]
  )
  const isHidden = (key: string) => hidden.has(key)
  // 1 normally, 0.3 for the others while a visible item is hovered or focused.
  const opacity = (key: string) => (active && active !== key && !hidden.has(active) ? 0.3 : 1)
  return { hidden, isHidden, active, setActive, toggle, opacity }
}

type LegendItem = { key: string; label: React.ReactNode; swatch: React.ReactNode }

function InteractiveLegend({
  items,
  visibility,
  className,
}: {
  items: LegendItem[]
  visibility: ReturnType<typeof useSeriesVisibility>
  className?: string
}) {
  return (
    <div
      data-slot="chart-legend"
      role="group"
      aria-label="Series"
      // Playlog: as the static legend: 12/16 medium, 4 between items, 12 below it; each item is a button with a 4px radius.
      className={cn("flex flex-wrap items-center justify-start gap-1 pb-3 text-caption text-muted-foreground", className)}
    >
      {items.map((item) => {
        const hidden = visibility.isHidden(item.key)
        return (
          <button
            key={item.key}
            type="button"
            aria-pressed={!hidden}
            onClick={() => visibility.toggle(item.key)}
            onMouseEnter={() => visibility.setActive(item.key)}
            onMouseLeave={() => visibility.setActive(null)}
            onFocus={() => visibility.setActive(item.key)}
            onBlur={() => visibility.setActive(null)}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors duration-(--pl-duration-fast) ease-out outline-none hover:bg-accent hover:text-accent-foreground focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
              hidden && "opacity-(--pl-opacity-disabled)"
            )}
          >
            {item.swatch}
            <span className={cn(hidden && "line-through")}>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// The legend items for a ChartConfig: the series `icon` (its shape) when it has one, else a 10px swatch with radius 2.
function legendItems(config: import("@workspace/ui/components/chart").ChartConfig): LegendItem[] {
  return Object.keys(config).map((key) => {
    const entry = config[key]!
    const Icon = entry.icon
    return {
      key,
      label: entry.label ?? key,
      swatch: Icon ? (
        <Icon />
      ) : (
        <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: `var(--color-${key})` }} aria-hidden="true" />
      ),
    }
  })
}

export { useSeriesVisibility, InteractiveLegend, legendItems, withSeriesColors, shapeFor, shapeIcon, ActivePoint, ShapeGlyph }
export type { SeriesShape }
