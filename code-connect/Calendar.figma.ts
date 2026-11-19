// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=153-1517
// source=packages/ui/src/components/calendar.tsx
// component=Calendar
import figma from 'figma'
const instance = figma.selectedInstance

// `mode` matches the code prop. Selected days, today and the month are set by `selected`, `defaultMonth` and the
// state of the app, so the day cells in Figma are only an example. Monday is the first day by default.
const mode = instance.getEnum('mode', { single: 'single', range: 'range' })
const selected = mode === 'range' ? 'selected={range} onSelect={setRange}' : 'selected={date} onSelect={setDate}'

export default {
  example: figma.code`<Calendar mode="${mode}" ${selected} />`,
  imports: ['import { Calendar } from "@workspace/ui/components/calendar"'],
  id: 'calendar',
  metadata: { nestable: true },
}
