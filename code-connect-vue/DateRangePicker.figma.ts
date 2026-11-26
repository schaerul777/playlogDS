// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=154-2333
// source=packages/ui-vue/src/components/date-picker/DateRangePicker.vue
// component=DateRangePicker
import figma from 'figma'
const instance = figma.selectedInstance

// `open` is Figma-only (the popover). The presets column is shown in the open variant: pass `presets` in code,
// for example getDefaultDateRangePresets(). Two months show from 768px up and one below it. The value is `{ from, to }` of Dates.
const open = instance.getEnum('open', { false: 'false', true: 'true' })
const presets = open === 'true' ? ' :presets="getDefaultDateRangePresets()"' : ''

export default {
  example: figma.code`<DateRangePicker v-model="range"${presets} />`,
  imports: ['import { DateRangePicker, getDefaultDateRangePresets } from "@workspace/ui-vue/components/date-picker"'],
  id: 'date-range-picker',
  metadata: { nestable: true },
}
