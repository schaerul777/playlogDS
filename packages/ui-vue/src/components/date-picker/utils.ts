import type { DateValue } from "reka-ui"
import { CalendarDate } from "@internationalized/date"
import { computed } from "vue"
import type { Ref } from "vue"

// Playlog: the pickers take and give plain JavaScript `Date`s (as the React ones do); the Calendar inside speaks DateValue.
export type DateRange = { from?: Date; to?: Date }
export type DateRangePreset = { label: string; range: () => DateRange }

export function toCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}
export function fromCalendarDate(value: DateValue): Date {
  return new Date(value.year, value.month - 1, value.day)
}

/** `19 Nov 2026` with Intl.DateTimeFormat (en-GB by default), or the caller's own format. */
export function useDateFormat(locale: Ref<string | undefined>, formatDate: Ref<((date: Date) => string) | undefined>) {
  return computed(() => {
    if (formatDate.value) return formatDate.value
    const f = new Intl.DateTimeFormat(locale.value ?? "en-GB", { day: "numeric", month: "short", year: "numeric" })
    return (date: Date) => f.format(date)
  })
}

export type DateMatcher = Date[] | ((date: Date) => boolean)
export function matchesDate(matcher: DateMatcher | undefined, date: Date) {
  if (!matcher) return false
  if (typeof matcher === "function") return matcher(date)
  return matcher.some((d) => d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate())
}

/** Today, Last 7 days, Last 30 days and This month, in local time. Pass your own array to `presets` to change them. */
export function getDefaultDateRangePresets(today: Date = new Date()): DateRangePreset[] {
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

