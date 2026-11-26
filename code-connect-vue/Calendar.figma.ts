// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=153-1517
// source=packages/ui-vue/src/components/calendar/Calendar.vue
// component=Calendar
import figma from 'figma'
const instance = figma.selectedInstance

// In Vue the two modes are two components: Calendar (one date) and RangeCalendar (a range). Values are
// `@internationalized/date` DateValues; selected days, today and the month come from `v-model` and `default-placeholder`,
// so the day cells in Figma are only an example. Monday is the first day by default.
const mode = instance.getEnum('mode', { single: 'single', range: 'range' })

export default {
  example: mode === 'range'
    ? figma.code`<RangeCalendar v-model="range" />`
    : figma.code`<Calendar v-model="date" />`,
  imports: ['import { Calendar, RangeCalendar } from "@workspace/ui-vue/components/calendar"'],
  id: 'calendar',
  metadata: { nestable: true },
}
