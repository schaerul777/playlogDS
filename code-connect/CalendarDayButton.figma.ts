// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=152-5934
// source=packages/ui/src/components/calendar.tsx
// component=CalendarDayButton
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only: in code the day cell gets its look from react-day-picker (data-today, data-selected,
// data-outside, data-disabled and the range modifiers), so the Calendar passes the day and its modifiers. The
// `day` text is the day number. Use this snippet only when customising the Calendar's `components.DayButton`.
const day = instance.getString('day')

export default {
  example: figma.code`<CalendarDayButton day={day} modifiers={modifiers}>${day}</CalendarDayButton>`,
  imports: ['import { CalendarDayButton } from "@workspace/ui/components/calendar"'],
  id: 'calendar-day-button',
  metadata: { nestable: true },
}
