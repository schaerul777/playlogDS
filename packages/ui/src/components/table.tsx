import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS DataTable. Wrapper with 1px border, 8px radius, card fill and horizontal scroll.
// Playlog: `dense` reduces body cell padding to 8 16.
function Table({
  className,
  dense = false,
  ...props
}: React.ComponentProps<"table"> & { dense?: boolean }) {
  return (
    <div
      data-slot="table-container"
      data-dense={dense}
      className="group/table relative w-full overflow-x-auto rounded-lg border-(length:--pl-border-width) border-border bg-card"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-top text-body-sm text-foreground",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b-(length:--pl-border-width) [&_tr]:hover:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      // Playlog: 1px border between rows, none under the last row.
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      // Playlog: not in the spec. Totals row on surface-sunken with a 1px top border, semibold.
      className={cn(
        "border-t-(length:--pl-border-width) border-border bg-muted font-semibold [&>tr]:last:border-b-0 [&_tr]:hover:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      // Playlog: row hover is surface-hover (--accent); selected is surface-selected.
      className={cn(
        "border-b-(length:--pl-border-width) border-border transition-colors duration-150 ease-out hover:bg-accent has-aria-expanded:bg-accent data-[state=selected]:bg-surface-selected",
        className
      )}
      {...props}
    />
  )
}

// Playlog: `numeric` right-aligns a column (header and cells) and uses tabular numbers.
type NumericProp = { numeric?: boolean }

function TableHead({
  className,
  numeric = false,
  ...props
}: React.ComponentProps<"th"> & NumericProp) {
  return (
    <th
      data-slot="table-head"
      data-numeric={numeric || undefined}
      // Playlog: padding 10 16, surface-sunken fill, ink-muted 12/16 semibold, no wrapping.
      className={cn(
        "bg-muted px-4 py-2.5 text-left align-middle text-caption font-semibold whitespace-nowrap text-muted-foreground data-numeric:text-right [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({
  className,
  numeric = false,
  ...props
}: React.ComponentProps<"td"> & NumericProp) {
  return (
    <td
      data-slot="table-cell"
      data-numeric={numeric || undefined}
      // Playlog: padding 12 16 (dense 8 16).
      className={cn(
        "px-4 py-3 align-middle whitespace-nowrap group-data-[dense=true]/table:py-2 data-numeric:text-right data-numeric:tabular-nums [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      // Playlog: caption sits above the table inside the wrapper. Padding 12 16, bold ink-heading.
      className={cn(
        "px-4 py-3 text-left font-bold text-ink-heading",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
