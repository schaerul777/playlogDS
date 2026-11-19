// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=154-2055
// source=packages/ui/src/components/date-picker.tsx
// component=DatePicker
import figma from 'figma'
const instance = figma.selectedInstance

// `state` and `open` are Figma-only. Disabled and invalid are props; hover and focus come from the browser and
// the popover opens on click. The placeholder is the text of the nested Input.
const state = instance.getEnum('state', { default: 'default', hover: 'hover', focus: 'focus', disabled: 'disabled', invalid: 'invalid' })
const input = instance.findInstance('input')
const placeholder = input && 'getString' in input ? input.getString('placeholder') : 'Select date'
const placeholderAttr = placeholder && placeholder !== 'Select date' ? ` placeholder="${placeholder}"` : ''
const stateAttr = state === 'disabled' ? ' disabled' : state === 'invalid' ? ' invalid aria-describedby="date-error"' : ''

export default {
  example: figma.code`<DatePicker value={date} onValueChange={setDate}${placeholderAttr}${stateAttr} />`,
  imports: ['import { DatePicker } from "@workspace/ui/components/date-picker"'],
  id: 'date-picker',
  metadata: { nestable: true },
}
