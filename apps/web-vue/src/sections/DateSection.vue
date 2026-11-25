<script setup lang="ts">
import type { DateValue } from "@internationalized/date"
import { ref, shallowRef } from "vue"
import { CalendarDate } from "@internationalized/date"
import { Calendar, RangeCalendar } from "@workspace/ui-vue/components/calendar"
import { DatePicker, DateRangePicker, getDefaultDateRangePresets } from "@workspace/ui-vue/components/date-picker"
import type { DateRange } from "@workspace/ui-vue/components/date-picker"
import { Field, FieldDescription, FieldError, FieldLabel } from "@workspace/ui-vue/components/field"

// Static example data only: fixed dates, no network.
const TODAY_DATE = new Date(2026, 10, 19)
const TODAY = new CalendarDate(2026, 11, 19)
const BOOKED = [new Date(2026, 10, 24), new Date(2026, 10, 25), new Date(2026, 10, 26)]
const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6
const isBooked = (d: Date) => BOOKED.some((b) => b.getTime() === d.getTime())
const isBookedValue = (d: DateValue) => isBooked(new Date(d.year, d.month - 1, d.day))
const isWeekendOrBooked = (d: Date) => isWeekend(d) || isBooked(d)
const isWeekendOrBookedValue = (d: DateValue) => isWeekendOrBooked(new Date(d.year, d.month - 1, d.day))

const single = shallowRef<DateValue | undefined>(new CalendarDate(2026, 11, 12))
const range = shallowRef<{ start: DateValue | undefined; end: DateValue | undefined }>({ start: new CalendarDate(2026, 11, 10), end: new CalendarDate(2026, 11, 17) })

const date = ref<Date | undefined>()
const reportRange = ref<DateRange | undefined>({ from: new Date(2026, 10, 13), to: new Date(2026, 10, 19) })
const invalidDate = ref<Date | undefined>()
const presets = getDefaultDateRangePresets(TODAY_DATE)
const idLabels = { previous: "Bulan sebelumnya", next: "Bulan berikutnya" }
const card = "w-fit rounded-lg border-(length:--pl-border-width) border-border bg-card"
</script>

<template>
  <section id="date" class="flex flex-col gap-4">
    <p class="text-caption font-medium tracking-wide text-muted-foreground uppercase">Date</p>
    <h2 class="text-h3 font-bold text-ink-heading">Calendar</h2>
    <p class="text-caption text-muted-foreground">
      The month grid. Monday first. Selected is Primary; today has a 1px Primary border; range ends are Primary and the days between use the selected surface;
      days from the next or previous month are muted; disabled days are 40%.
    </p>
    <div class="flex flex-wrap items-start gap-6">
      <div class="flex flex-col gap-2">
        <p class="text-caption text-muted-foreground">Single, today is 19 Nov</p>
        <div :class="card"><Calendar v-model="single" :default-placeholder="TODAY" :today="TODAY" data-specimen="cal-single" /></div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-caption text-muted-foreground">Range</p>
        <div :class="card"><RangeCalendar v-model="range" :default-placeholder="TODAY" :today="TODAY" data-specimen="cal-range" /></div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-caption text-muted-foreground">Disabled weekends, booked days struck through</p>
        <div :class="card">
          <Calendar :default-placeholder="TODAY" :today="TODAY" :is-date-disabled="isWeekendOrBookedValue" :is-date-unavailable="isBookedValue" data-specimen="cal-disabled" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-caption text-muted-foreground">Month and year dropdowns</p>
        <div :class="card">
          <Calendar
            :default-placeholder="TODAY"
            :today="TODAY"
            caption-layout="dropdown"
            :min-value="new CalendarDate(2024, 1, 1)"
            :max-value="new CalendarDate(2028, 12, 31)"
            data-specimen="cal-dropdown"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-caption text-muted-foreground">Indonesian (id-ID)</p>
        <div :class="card">
          <Calendar :default-placeholder="TODAY" :today="TODAY" locale="id-ID" :labels="idLabels" data-specimen="cal-id" />
        </div>
      </div>
    </div>

    <h2 class="text-h3 font-bold text-ink-heading">Date Picker</h2>
    <p class="text-caption text-muted-foreground">
      A button that looks like an Input, with a Popover and the Calendar. Selecting a date closes the popover; Escape closes it too and returns focus to the field.
    </p>
    <div class="grid max-w-3xl gap-6 md:grid-cols-2">
      <Field>
        <FieldLabel for="dp-launch">Launch date</FieldLabel>
        <DatePicker id="dp-launch" v-model="date" :min-date="TODAY_DATE" :calendar-props="{ today: TODAY }" data-specimen="pick-launch" />
        <FieldDescription>The campaign goes live at 00:00 on this day.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="dp-sm">Small, clearable</FieldLabel>
        <DatePicker id="dp-sm" size="sm" clearable :default-value="new Date(2026, 10, 19)" :calendar-props="{ today: TODAY }" data-specimen="pick-sm" />
      </Field>
      <Field>
        <FieldLabel for="dp-booked">Pick-up day</FieldLabel>
        <DatePicker
          id="dp-booked"
          :min-date="TODAY_DATE"
          :disabled-dates="isWeekendOrBooked"
          :calendar-props="{ today: TODAY, isDateUnavailable: isBookedValue }"
          data-specimen="pick-booked"
        />
        <FieldDescription>Weekends and 24 to 26 Nov are not available.</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel for="dp-invalid">Report date</FieldLabel>
        <DatePicker
          id="dp-invalid"
          v-model="invalidDate"
          :invalid="!invalidDate"
          aria-describedby="dp-invalid-error"
          :calendar-props="{ today: TODAY }"
          data-specimen="pick-invalid"
        />
        <FieldError v-if="!invalidDate" id="dp-invalid-error">Choose a report date.</FieldError>
      </Field>
      <Field>
        <FieldLabel for="dp-disabled">Disabled</FieldLabel>
        <DatePicker id="dp-disabled" disabled :default-value="new Date(2026, 10, 19)" data-specimen="pick-disabled" />
      </Field>
      <Field>
        <FieldLabel for="dp-id">Tanggal (id-ID)</FieldLabel>
        <DatePicker
          id="dp-id"
          locale="id-ID"
          placeholder="Pilih tanggal"
          :default-value="new Date(2026, 10, 19)"
          :calendar-props="{ today: TODAY, labels: idLabels }"
          data-specimen="pick-id"
        />
      </Field>
    </div>

    <h2 class="mt-4 text-h4 font-bold text-ink-heading">Date Range Picker</h2>
    <p class="text-caption text-muted-foreground">Two months on wide screens, one on narrow ones. The popover closes when both ends are chosen.</p>
    <div class="grid max-w-3xl gap-6 md:grid-cols-2">
      <Field>
        <FieldLabel for="dr-report">Report period</FieldLabel>
        <DateRangePicker
          id="dr-report"
          v-model="reportRange"
          :presets="presets"
          clearable
          :max-date="TODAY_DATE"
          :calendar-props="{ today: TODAY }"
          data-specimen="range-report"
        />
        <FieldDescription>Reports cover up to today.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="dr-empty">Empty</FieldLabel>
        <DateRangePicker id="dr-empty" :calendar-props="{ today: TODAY }" data-specimen="range-empty" />
      </Field>
    </div>
  </section>
</template>
