// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=152-5934
// source=packages/ui-vue/src/components/calendar/Calendar.vue
// component=CalendarDayButton
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only. In Vue there is no separate day-button component to swap in: Calendar renders each day
// with Reka's CalendarCell and CalendarCellTrigger, and the look comes from their data attributes (data-today,
// data-selected, data-outside-view, data-disabled and the range modifiers). So this snippet is the Calendar itself;
// the `day` text is only the example number.
export default {
  example: figma.code`<Calendar v-model="date" />`,
  imports: ['import { Calendar } from "@workspace/ui-vue/components/calendar"'],
  id: 'calendar-day-button',
  metadata: { nestable: true },
}
