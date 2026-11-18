import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: the delta colour follows `trend`: good = success-text, bad = danger-text, neutral = ink-muted.
const statCardDeltaVariants = cva("font-bold", {
  variants: {
    trend: {
      good: "text-success-text",
      bad: "text-danger-text",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
})

type StatCardProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof statCardDeltaVariants> & {
    /** Metric name, for example "Impressions". */
    label: React.ReactNode
    /** The figure. Rendered with tabular numbers. */
    value: React.ReactNode
    /** Optional icon shown in a 32px tile next to the label. */
    icon?: React.ReactNode
    /** Change versus the comparison period, for example "+8,2%". Coloured by `trend`. */
    delta?: React.ReactNode
    /** Unit, period and source, for example "Q1–Q3 2025 · 25 cities". */
    footer?: React.ReactNode
  }

function StatCard({
  className,
  label,
  value,
  icon,
  delta,
  trend,
  footer,
  ...props
}: StatCardProps) {
  return (
    <div
      data-slot="stat-card"
      // Playlog: COMPONENT-SPECS StatCard. Card fill, 1px border, 8px radius, padding 16 24, gap 8.
      className={cn(
        "flex flex-col gap-2 rounded-lg border-(length:--pl-border-width) border-border bg-card px-6 py-4 text-card-foreground",
        className
      )}
      {...props}
    >
      <div
        data-slot="stat-card-header"
        className="flex items-center justify-between gap-2"
      >
        <span
          data-slot="stat-card-label"
          className="text-label font-semibold text-muted-foreground"
        >
          {label}
        </span>
        {icon ? (
          <span
            data-slot="stat-card-icon"
            aria-hidden="true"
            // Playlog: 32px tile, 4px radius, surface-hover fill, ink-heading icon at 20px.
            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-ink-heading [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--pl-icon-size)"
          >
            {icon}
          </span>
        ) : null}
      </div>
      <div
        data-slot="stat-card-value"
        // Playlog: kpi 36/40 extra-bold with -1% tracking (from the kpi token), tabular numbers.
        className="text-kpi font-extrabold text-ink-heading tabular-nums"
      >
        {value}
      </div>
      {delta != null || footer != null ? (
        <div
          data-slot="stat-card-footer"
          className="flex flex-wrap items-baseline gap-x-2 text-caption font-medium text-muted-foreground"
        >
          {delta != null ? (
            <span
              data-slot="stat-card-delta"
              data-trend={trend ?? "neutral"}
              className={statCardDeltaVariants({ trend })}
            >
              {delta}
            </span>
          ) : null}
          {footer}
        </div>
      ) : null}
    </div>
  )
}

export { StatCard, statCardDeltaVariants }
export type { StatCardProps }
