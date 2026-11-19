"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Button, buttonVariants } from "@workspace/ui/components/button"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Calendar, on react-day-picker 10. No fill, border or shadow of its own (it sits in a Popover or a
// Card), padding 16. Day cell 40x40 (--cell-size), no column gap, 4 between weeks. Week starts on Monday (`weekStartsOn`).
// Selected = primary fill; today = 1px primary border in semibold; range ends primary, range middle pl-surface-selected;
// outside days muted-foreground; disabled 40%. Nav arrows are Button ghost icon-sm. Focus ring 2px, offset 2.
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  weekStartsOn = 1, // Playlog: Monday (agreed).
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={weekStartsOn}
      className={cn(
        // Playlog: padding 16, cell 40 (spacing scale), radius 4.
        "group/calendar p-4 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(10)]",
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        // Playlog: 16 between two months.
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex h-10 w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        // Playlog: arrows are Button ghost icon-sm (32).
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon-sm" }),
          "select-none aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled)",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon-sm" }),
          "select-none aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled)",
          defaultClassNames.button_next
        ),
        // Playlog: header 40 high, month and year centred.
        month_caption: cn(
          "flex h-10 w-full items-center justify-center px-10",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-10 w-full items-center justify-center gap-2",
          defaultClassNames.dropdowns
        ),
        // Playlog: dropdown captions look like Select sm (32 high, 1px --input border, radius 4, 14/20 medium).
        dropdown_root: cn(
          "relative rounded-md border-(length:--pl-border-width) border-input bg-card has-focus-visible:outline-(length:--pl-focus-ring-width) has-focus-visible:outline-offset-(--pl-focus-ring-offset) has-focus-visible:outline-solid has-focus-visible:outline-ring",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 cursor-pointer bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "text-label text-foreground select-none",
          captionLayout !== "label" &&
            "flex h-8 items-center gap-1 rounded-md px-2 text-body-sm font-medium [&>svg]:size-4 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        // Playlog: weekday row 32 high, 12/16 medium muted-foreground.
        weekday: cn(
          "flex h-8 w-(--cell-size) items-center justify-center text-caption text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        // Playlog: 4 between weeks.
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-caption text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        // Playlog: the cell. At a week's first and last day a selected cell rounds its outer corners.
        day: cn(
          "group/day relative size-(--cell-size) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn("relative isolate z-0", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("relative isolate z-0", defaultClassNames.range_end),
        today: cn(defaultClassNames.today),
        outside: cn(defaultClassNames.outside),
        disabled: cn(defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation }) => {
          // Playlog: chevron-left, chevron-right and chevron-down at 16; the side arrows flip for RTL.
          if (orientation === "left") {
            return <Icon name="chevron-left" className={cn("size-4 rtl:rotate-180", className)} />
          }

          if (orientation === "right") {
            return <Icon name="chevron-right" className={cn("size-4 rtl:rotate-180", className)} />
          }

          return <Icon name="chevron-down" className={cn("size-4", className)} />
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-today={modifiers.today || undefined}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Playlog: 14/20 regular foreground (not the Button's ink-heading); the cell fills the 40x40 button.
        "relative isolate size-auto w-full min-w-(--cell-size) aspect-square rounded-(--cell-radius) p-0 text-body-sm font-normal text-foreground focus-visible:z-20",
        // Playlog: today = 1px primary border and semibold.
        "data-[today=true]:border-primary data-[today=true]:font-semibold",
        // Playlog: outside days muted-foreground, disabled days 40% with no pointer events.
        "group-data-[outside=true]/day:text-muted-foreground group-data-[disabled=true]/day:pointer-events-none group-data-[disabled=true]/day:opacity-(--pl-opacity-disabled)",
        // Playlog: selected and range ends are primary (the outer side keeps radius 4, the inner side is square);
        // the range middle is pl-surface-selected with pl-ink-heading.
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:hover:bg-primary-hover data-[selected-single=true]:hover:text-primary-foreground",
        "data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:rounded-r-none data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:hover:bg-primary-hover data-[range-start=true]:hover:text-primary-foreground",
        "data-[range-end=true]:rounded-l-none data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:hover:bg-primary-hover data-[range-end=true]:hover:text-primary-foreground",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-surface-selected data-[range-middle=true]:text-ink-heading data-[range-middle=true]:hover:bg-surface-selected data-[range-middle=true]:hover:text-ink-heading",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
