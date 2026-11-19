import * as React from "react"
import { id as idLocale } from "react-day-picker/locale"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  DatePicker,
  DateRangePicker,
  getDefaultDateRangePresets,
  type DateRange,
} from "@workspace/ui/components/date-picker"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { Field, FieldDescription, FieldError, FieldLabel } from "@workspace/ui/components/field"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-caption text-muted-foreground">{children}</p>
}

// Static example data only: fixed dates, no network.
const TODAY = new Date(2026, 10, 19)
const BOOKED = [new Date(2026, 10, 24), new Date(2026, 10, 25), new Date(2026, 10, 26)]
const isWeekend = { dayOfWeek: [0, 6] }

function CalendarStates() {
  const [single, setSingle] = React.useState<Date | undefined>(new Date(2026, 10, 12))
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 10, 10),
    to: new Date(2026, 10, 17),
  })
  const card = "w-fit rounded-lg border-(length:--pl-border-width) border-border bg-card"
  return (
    <Section title="Calendar">
      <Caption>
        The month grid. Monday first. Selected is Primary; today has a 1px Primary border; range ends are Primary and the
        days between use the selected surface; days from the next or previous month are muted; disabled days are 40%.
      </Caption>
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex flex-col gap-2">
          <Caption>Single, today is 19 Nov</Caption>
          <div className={card}>
            <Calendar
              mode="single"
              selected={single}
              onSelect={setSingle}
              defaultMonth={TODAY}
              today={TODAY}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Range</Caption>
          <div className={card}>
            <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 10)} today={TODAY} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Disabled weekends, booked days struck through, week numbers</Caption>
          <div className={card}>
            <Calendar
              mode="single"
              defaultMonth={TODAY}
              today={TODAY}
              showWeekNumber
              disabled={[isWeekend, ...BOOKED]}
              modifiers={{ booked: BOOKED }}
              modifiersClassNames={{ booked: "line-through" }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Month and year dropdowns</Caption>
          <div className={card}>
            <Calendar
              mode="single"
              defaultMonth={TODAY}
              today={TODAY}
              captionLayout="dropdown"
              startMonth={new Date(2024, 0)}
              endMonth={new Date(2028, 11)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Indonesian (id-ID)</Caption>
          <div className={card}>
            <Calendar
              mode="single"
              defaultMonth={TODAY}
              today={TODAY}
              locale={idLocale}
              labels={{
                labelPrevious: () => "Bulan sebelumnya",
                labelNext: () => "Bulan berikutnya",
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

function PickerExamples() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 10, 13),
    to: new Date(2026, 10, 19),
  })
  const [invalidDate, setInvalidDate] = React.useState<Date | undefined>()
  const presets = React.useMemo(() => getDefaultDateRangePresets(TODAY), [])
  return (
    <Section title="Date Picker">
      <Caption>
        A button that looks like an Input, with a Popover and the Calendar. Selecting a date closes the popover; Escape
        closes it too and returns focus to the field.
      </Caption>
      <div className="grid max-w-3xl gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="dp-launch">Launch date</FieldLabel>
          <DatePicker
            id="dp-launch"
            value={date}
            onValueChange={setDate}
            minDate={TODAY}
            calendarProps={{ today: TODAY }}
          />
          <FieldDescription>The campaign goes live at 00:00 on this day.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="dp-sm">Small, clearable</FieldLabel>
          <DatePicker
            id="dp-sm"
            size="sm"
            clearable
            defaultValue={new Date(2026, 10, 19)}
            calendarProps={{ today: TODAY }}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="dp-booked">Pick-up day</FieldLabel>
          <DatePicker
            id="dp-booked"
            minDate={TODAY}
            disabledDates={[isWeekend, ...BOOKED]}
            calendarProps={{ today: TODAY, modifiers: { booked: BOOKED }, modifiersClassNames: { booked: "line-through" } }}
          />
          <FieldDescription>Weekends and 24 to 26 Nov are not available.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="dp-invalid">Report date</FieldLabel>
          <DatePicker
            id="dp-invalid"
            invalid={!invalidDate}
            aria-describedby="dp-invalid-error"
            value={invalidDate}
            onValueChange={setInvalidDate}
            calendarProps={{ today: TODAY }}
          />
          {!invalidDate ? <FieldError id="dp-invalid-error">Choose a report date.</FieldError> : null}
        </Field>
        <Field>
          <FieldLabel htmlFor="dp-disabled">Disabled</FieldLabel>
          <DatePicker id="dp-disabled" disabled defaultValue={new Date(2026, 10, 19)} />
        </Field>
        <Field>
          <FieldLabel htmlFor="dp-id">Tanggal (id-ID)</FieldLabel>
          <DatePicker
            id="dp-id"
            locale={idLocale}
            placeholder="Pilih tanggal"
            defaultValue={new Date(2026, 10, 19)}
            calendarProps={{
              today: TODAY,
              labels: { labelPrevious: () => "Bulan sebelumnya", labelNext: () => "Bulan berikutnya" },
            }}
          />
        </Field>
      </div>

      <h3 className="mt-4 text-h4 font-bold text-ink-heading">Date Range Picker</h3>
      <Caption>Two months on wide screens, one on narrow ones. The popover closes when both ends are chosen.</Caption>
      <div className="grid max-w-3xl gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="dr-report">Report period</FieldLabel>
          <DateRangePicker
            id="dr-report"
            value={range}
            onValueChange={setRange}
            presets={presets}
            clearable
            maxDate={TODAY}
            calendarProps={{ today: TODAY }}
          />
          <FieldDescription>Reports cover up to today.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="dr-empty">Empty</FieldLabel>
          <DateRangePicker id="dr-empty" calendarProps={{ today: TODAY }} />
        </Field>
      </div>

      <h3 className="mt-4 text-h4 font-bold text-ink-heading">Small screens: Calendar in a Drawer</h3>
      <Caption>
        The pickers use a popover at every width. Teams that prefer a bottom panel on phones can place the Calendar in a
        Drawer, as here.
      </Caption>
      <DrawerRecipe />
    </Section>
  )
}

function DrawerRecipe() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 19))
  const [open, setOpen] = React.useState(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button variant="outline" className="w-fit" />}>
        {date
          ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date)
          : "Choose a date"}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Choose a date</DrawerTitle>
          <DrawerDescription>Pick the day the report starts.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              today={TODAY}
              onSelect={(next) => {
                setDate(next)
                if (next) setOpen(false)
              }}
            />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export function DateSection() {
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Date</p>
      <CalendarStates />
      <PickerExamples />
    </>
  )
}
