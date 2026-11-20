import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle, EmptyContent } from "@workspace/ui/components/empty"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui/components/toggle-group"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

type ChartPanelState = "ready" | "loading" | "empty" | "error"

type ChartPanelColumn = {
  key: string
  label: string
  /** Format the cell, for example with `idNumber`. Numbers are right-aligned. */
  format?: (value: number) => string
}

// Playlog: COMPONENT-SPECS Charts, frame and states. Our Card around a chart: title, description, optional actions and a
// "Chart | Table" toggle (the accessible table of the same data) in the header. `summary` is one sentence for screen readers,
// linked to the plot. States replace the plot: loading (Skeleton blocks, `aria-busy`), empty (Empty) and error (Empty with
// "Try again"); the toggle stays available when there is data.
function ChartPanel({
  title,
  description,
  summary,
  state = "ready",
  columns,
  rows,
  onRetry,
  emptyMessage = "No data for this period",
  errorMessage = "The chart could not be loaded",
  actions,
  className,
  children,
}: {
  title: string
  description?: string
  /** One sentence describing the chart for screen readers. */
  summary: string
  state?: ChartPanelState
  /** The data for the Table view. Without them there is no toggle. */
  columns?: ChartPanelColumn[]
  rows?: Record<string, string | number>[]
  onRetry?: () => void
  emptyMessage?: string
  errorMessage?: string
  /** Extra header actions, left of the toggle. */
  actions?: React.ReactNode
  className?: string
  /** The chart. */
  children: React.ReactNode
}) {
  const [view, setView] = React.useState<"chart" | "table">("chart")
  const summaryId = React.useId()
  const hasTable = Boolean(columns?.length && rows?.length)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {actions || hasTable ? (
          <CardAction>
            {actions}
            {hasTable ? (
              <ToggleGroup
                variant="outline"
                size="sm"
                value={[view]}
                onValueChange={(next) => {
                  if (next[0]) setView(next[0] as "chart" | "table")
                }}
                aria-label={`${title}: view`}
              >
                <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
                <ToggleGroupItem value="table">Table</ToggleGroupItem>
              </ToggleGroup>
            ) : null}
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent aria-busy={state === "loading" || undefined}>
        {state === "loading" ? (
          <ChartSkeleton />
        ) : state === "empty" ? (
          <Empty className="min-h-64">
            <EmptyHeader>
              <EmptyTitle>{emptyMessage}</EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : state === "error" ? (
          <Empty className="min-h-64">
            <EmptyHeader>
              <EmptyTitle className="text-danger-text">{errorMessage}</EmptyTitle>
              <EmptyDescription>Check your connection and try again.</EmptyDescription>
            </EmptyHeader>
            {onRetry ? (
              <EmptyContent>
                <Button variant="outline" size="sm" onClick={onRetry}>
                  Try again
                </Button>
              </EmptyContent>
            ) : null}
          </Empty>
        ) : view === "table" && hasTable ? (
          <div className="overflow-hidden rounded-lg border-(length:--pl-border-width) border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns!.map((column, i) => (
                    <TableHead key={column.key} className={cn(i > 0 && "text-right")}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows!.map((row, ri) => (
                  <TableRow key={ri}>
                    {columns!.map((column, i) => {
                      const value = row[column.key]
                      return (
                        <TableCell key={column.key} className={cn(i > 0 && "text-right tabular-nums")}>
                          {typeof value === "number" && column.format ? column.format(value) : String(value ?? "")}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div role="group" aria-label={title} aria-describedby={summaryId}>
            <p id={summaryId} className="sr-only">
              {summary}
            </p>
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// A few Skeleton bars standing in for a chart (decorative; the region carries aria-busy).
function ChartSkeleton() {
  const heights = ["h-24", "h-40", "h-32", "h-48", "h-36", "h-44"]
  return (
    <div className="flex h-64 items-end gap-4" aria-hidden="true">
      {heights.map((h, i) => (
        <Skeleton key={i} className={cn("flex-1", h)} />
      ))}
    </div>
  )
}

export { ChartPanel }
export type { ChartPanelState, ChartPanelColumn }
