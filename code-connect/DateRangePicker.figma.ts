// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=154-2333
// source=packages/ui/src/components/date-picker.tsx
// component=DateRangePicker
import figma from 'figma'
const instance = figma.selectedInstance

// `open` is Figma-only (the popover). The presets column is shown in the open variant: pass `presets` in code,
// for example getDefaultDateRangePresets(). Two months show from 768px up and one below it.
const open = instance.getEnum('open', { false: 'false', true: 'true' })
const presets = open === 'true' ? ' presets={getDefaultDateRangePresets()}' : ''

export default {
  example: figma.code`<DateRangePicker value={range} onValueChange={setRange}${presets} />`,
  imports: ['import { DateRangePicker, getDefaultDateRangePresets } from "@workspace/ui/components/date-picker"'],
  id: 'date-range-picker',
  metadata: { nestable: true },
}
