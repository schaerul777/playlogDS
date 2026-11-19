"use client"

import * as React from "react"
import type { DateRange, Locale, Matcher } from "react-day-picker"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Date Picker and Date Range Picker. Compositions (shadcn has no registry item for them): an Input-look
// trigger, a Popover and the Calendar. The trigger is a button that looks like Input (not typeable); the value is written with
// Intl.DateTimeFormat ("19 Nov 2026"), so no date library is needed here. Popover at every width.
type CalendarProps = Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect" | "disabled" | "numberOfMonths"
>

type PickerCommon = {
  id?: string
  placeholder?: string
  /** react-day-picker locale, for example `id` from "react-day-picker/locale". Month and day names, and the value format. */
  locale?: Locale
  /** Overrides the default `19 Nov 2026` format. */
  formatDate?: (date: Date) => string
  minDate?: Date
  maxDate?: Date
  /** Any react-day-picker matcher for days that cannot be picked (booked dates, weekends). */
  disabledDates?: Matcher | Matcher[]
  /** Disables the whole field. */
  disabled?: boolean
  /** Invalid state: the border becomes `pl-danger-text`. Pair it with a FieldError and `aria-describedby`. */
  invalid?: boolean
  /** Adds a clear button while a value is set. */
  clearable?: boolean
  size?: "default" | "sm"
  className?: string
  "aria-label"?: string
  "aria-describedby"?: string
  calendarProps?: CalendarProps
}

function useFormat(locale: Locale | undefined, formatDate?: (date: Date) => string) {
  return React.useMemo(() => {
    if (formatDate) return formatDate
    const f = new Intl.DateTimeFormat(locale?.code ?? "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    return (date: Date) => f.format(date)
  }, [locale, formatDate])
}

function limits(minDate?: Date, maxDate?: Date, disabledDates?: Matcher | Matcher[]) {
  const matchers: Matcher[] = []
  if (minDate) matchers.push({ before: minDate })
  if (maxDate) matchers.push({ after: maxDate })
  if (disabledDates) matchers.push(...(Array.isArray(disabledDates) ? disabledDates : [disabledDates]))
  return {
    disabled: matchers.length ? matchers : undefined,
    startMonth: minDate,
    endMonth: maxDate,
  }
}

function useControllable<T>(value: T | undefined, defaultValue: T | undefined, onChange?: (v: T | undefined) => void) {
  const [inner, setInner] = React.useState<T | undefined>(defaultValue)
  const controlled = value !== undefined
  const current = controlled ? value : inner
  const set = React.useCallback(
    (next: T | undefined) => {
      if (!controlled) setInner(next)
      onChange?.(next)
    },
    [controlled, onChange]
  )
  return [current, set] as const
}

// The trigger: looks like Input (40 high, sm 32, card fill, 1px --input border, radius 4, 14/20), calendar icon at the end.
function DatePickerTrigger({
  label,
  placeholder,
  size = "default",
  invalid,
  clearable,
  onClear,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  /** The formatted value, or undefined for the placeholder. */
  label?: string
  placeholder: string
  size?: "default" | "sm"
  invalid?: boolean
  clearable?: boolean
  onClear?: () => void
}) {
  return (
    <div className="relative w-full">
      <PopoverTrigger
        data-slot="date-picker-trigger"
        aria-invalid={invalid || undefined}
        className={cn(
          // Playlog: as Input: 40 (sm 32), card fill, 1px --input border, radius 4, padding 0 12, gap 8, 14/20 foreground.
          "flex w-full min-w-0 items-center gap-2 rounded-md border-(length:--pl-border-width) border-input bg-card px-3 text-left text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out",
          size === "sm" ? "h-8" : "h-10",
          // Playlog: hover and open darken the border to ink; focus ring 2px, 2px offset.
          "hover:border-foreground aria-expanded:border-foreground data-popup-open:border-foreground outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
          // Playlog: disabled 40%; invalid pl-danger-text (the ring stays --ring).
          "disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled) aria-invalid:border-danger-text",
          clearable && label && "pr-16",
          className
        )}
        {...props}
      >
        <span className={cn("min-w-0 flex-1 truncate", !label && "text-muted-foreground")}>
          {label ?? placeholder}
        </span>
        <Icon name="calendar" className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      {clearable && label ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Clear"
          className="absolute top-1/2 right-9 -translate-y-1/2"
          onClick={onClear}
        >
          <Icon name="close" />
        </Button>
      ) : null}
    </div>
  )
}

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  id,
  placeholder = "Select date",
  locale,
  formatDate,
  minDate,
  maxDate,
  disabledDates,
  disabled,
  invalid,
  clearable,
  size,
  className,
  calendarProps,
  ...aria
}: PickerCommon & {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
}) {
  const [date, setDate] = useControllable<Date>(value, defaultValue, onValueChange)
  const [open, setOpen] = React.useState(false)
  const format = useFormat(locale, formatDate)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DatePickerTrigger
        id={id}
        label={date ? format(date) : undefined}
        placeholder={placeholder}
        size={size}
        invalid={invalid}
        clearable={clearable}
        onClear={() => setDate(undefined)}
        disabled={disabled}
        className={className}
        {...aria}
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(next) => {
            setDate(next)
            if (next) setOpen(false)
          }}
          locale={locale}
          autoFocus
          {...limits(minDate, maxDate, disabledDates)}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

type DateRangePreset = { label: string; range: () => DateRange }

// Today, Last 7 days, Last 30 days and This month, in local time. Pass your own array to `presets` to change them.
function getDefaultDateRangePresets(today: Date = new Date()): DateRangePreset[] {
  const day = (offset: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
  return [
    { label: "Today", range: () => ({ from: day(0), to: day(0) }) },
    { label: "Last 7 days", range: () => ({ from: day(-6), to: day(0) }) },
    { label: "Last 30 days", range: () => ({ from: day(-29), to: day(0) }) },
    {
      label: "This month",
      range: () => ({
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
      }),
    },
  ]
}

function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  id,
  placeholder = "Select dates",
  locale,
  formatDate,
  minDate,
  maxDate,
  disabledDates,
  disabled,
  invalid,
  clearable,
  size,
  className,
  calendarProps,
  presets,
  ...aria
}: PickerCommon & {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  /** Optional shortcuts in a column on the left, for example `getDefaultDateRangePresets()`. */
  presets?: DateRangePreset[]
}) {
  const [range, setRange] = useControllable<DateRange>(value, defaultValue, onValueChange)
  const [open, setOpen] = React.useState(false)
  const format = useFormat(locale, formatDate)
  const isMobile = useIsMobile()
  const label = range?.from
    ? range.to
      ? `${format(range.from)} – ${format(range.to)}`
      : format(range.from)
    : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DatePickerTrigger
        id={id}
        label={label}
        placeholder={placeholder}
        size={size}
        invalid={invalid}
        clearable={clearable}
        onClear={() => setRange(undefined)}
        disabled={disabled}
        className={className}
        {...aria}
      />
      <PopoverContent className="flex w-auto flex-row gap-0 p-0" align="start">
        {presets?.length ? (
          // Playlog: presets in a column on the left, ghost sm Buttons, a 1px border between them and the calendar.
          <div
            data-slot="date-range-presets"
            className="flex w-40 shrink-0 flex-col gap-1 border-r-(length:--pl-border-width) border-border p-2 max-md:hidden"
          >
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                className="justify-start"
                onClick={() => {
                  setRange(preset.range())
                  setOpen(false)
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        ) : null}
        <Calendar
          mode="range"
          selected={range}
          defaultMonth={range?.from}
          numberOfMonths={isMobile ? 1 : 2}
          onSelect={(next) => {
            setRange(next)
            if (next?.from && next?.to) setOpen(false)
          }}
          locale={locale}
          autoFocus
          {...limits(minDate, maxDate, disabledDates)}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export {
  DatePicker,
  DateRangePicker,
  DatePickerTrigger,
  getDefaultDateRangePresets,
}
export type { DateRange, DateRangePreset }
