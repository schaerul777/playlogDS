import type { DateValue } from "reka-ui"
import { getLocalTimeZone, isSameDay, today as todayDate } from "@internationalized/date"
import { buttonVariants } from "@workspace/ui-vue/components/button"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Calendar. Shared by Calendar and RangeCalendar so the two cannot drift.
// Root: no fill, border or shadow of its own, padding 16, day cell 40x40 (--cell-size), radius 4 (--cell-radius).
export const calendarRootClass = "group/calendar w-fit p-4 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(10)]"
// 16 between two months; the nav arrows sit over the first and last caption.
export const calendarMonthsClass = "relative flex flex-col gap-4 md:flex-row"
export const calendarNavClass = "pointer-events-none absolute inset-x-0 top-0 z-10 flex h-10 w-full items-center justify-between gap-1"
export const calendarNavButtonClass = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "pointer-events-auto select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled)",
)
export const calendarMonthClass = "flex w-full flex-col gap-2"
export const calendarGridClass = "w-full border-collapse"
// Playlog: weekday row 32 high, 12/16 medium muted-foreground.
export const calendarWeekdayClass = "flex h-8 w-(--cell-size) items-center justify-center text-caption text-muted-foreground select-none"
// Playlog: 4 between weeks.
export const calendarWeekClass = "mt-1 flex w-full"
// Playlog: the cell. At a week's first and last day a selected cell rounds its outer corners (important, so it also beats the
// square middle of a range).
export const calendarCellClass =
  "group/day relative size-(--cell-size) p-0 text-center select-none [&:first-child:has([data-selected])_button]:rounded-l-(--cell-radius)! [&:last-child:has([data-selected])_button]:rounded-r-(--cell-radius)!"
// Playlog: 14/20 regular foreground (not the Button's ink-heading); the cell fills the 40x40 button. Outside days are
// muted-foreground; disabled and unavailable days are 40% with no pointer events; an unavailable (booked) day is also struck through.
export const calendarDayClass = cn(
  buttonVariants({ variant: "ghost", size: "icon" }),
  "relative isolate size-auto aspect-square w-full min-w-(--cell-size) rounded-(--cell-radius) p-0 text-body-sm font-normal text-foreground focus-visible:z-20",
  "data-[outside-view]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-default data-[disabled]:opacity-(--pl-opacity-disabled) data-[unavailable]:pointer-events-none data-[unavailable]:cursor-default data-[unavailable]:line-through data-[unavailable]:opacity-(--pl-opacity-disabled)",
)
// Playlog: today = 1px primary border and semibold.
export const calendarTodayClass = "border-primary font-semibold"
// Playlog: selected is primary with primary-foreground (Green with Dark Blue text in dark mode).
export const calendarSelectedClass =
  "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary-hover data-[selected]:hover:text-primary-foreground"

// Playlog: `today` can be set so the highlighted day is fixed (Reka always uses the real date).
export function isTodayValue(day: DateValue, override?: DateValue) {
  return isSameDay(day, override ?? todayDate(getLocalTimeZone()))
}

// Playlog: weekday names as react-day-picker writes them: two letters in English ("Mo"), the locale's short name otherwise ("Sen").
export function shortWeekday(day: string, locale: string) {
  return locale.toLowerCase().startsWith("en") ? day.slice(0, 2) : day
}

// Playlog: react-day-picker draws no day for the part of a neighbouring month that lies before the first or after the last
// month that can be shown (`minDate` / `maxDate`); it leaves an empty cell. Same here.
export function isHiddenDay(day: DateValue, min?: DateValue, max?: DateValue) {
  const m = day.year * 12 + day.month
  if (min && m < min.year * 12 + min.month) return true
  if (max && m > max.year * 12 + max.month) return true
  return false
}

// Playlog: `initialFocus`: the selected day, else today (the `today` prop when set), else the first enabled day of the first month.
// Reka looks for its own `data-today`, which always means the real date, so the focus is done here.
export function focusInitialDay(root: HTMLElement | null | undefined) {
  if (!root) return
  const days = Array.from(root.querySelectorAll<HTMLElement>("[data-slot=calendar-day]:not([data-outside-view]):not([data-disabled]):not([data-unavailable])"))
  const target = days.find((d) => d.hasAttribute("data-selected")) ?? days.find((d) => d.hasAttribute("data-pl-today")) ?? days[0]
  target?.focus()
}

// Playlog: react-day-picker keeps the shown months inside `startMonth` / `endMonth`: with two months and a `maxDate` in
// November it shows October and November. Reka would show November and December, so the first visible month is moved back.
export function clampPlaceholder(placeholder: DateValue, months: number, min?: DateValue, max?: DateValue): DateValue {
  let p = placeholder
  const idx = (d: DateValue) => d.year * 12 + d.month
  if (max && idx(p) + months - 1 > idx(max)) p = p.subtract({ months: idx(p) + months - 1 - idx(max) })
  if (min && idx(p) < idx(min)) p = p.add({ months: idx(min) - idx(p) })
  return p
}
