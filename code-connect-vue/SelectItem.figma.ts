// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=25-137
// source=packages/ui-vue/src/components/select/SelectItem.vue
// component=SelectItem
import figma from 'figma'
const instance = figma.selectedInstance

// `state` (default, highlighted, selected, disabled) is Figma-only; Reka UI sets these from the select.
const label = instance.getString('label')

export default {
  example: figma.code`<SelectItem>${label}</SelectItem>`,
  imports: ['import { SelectItem } from "@workspace/ui-vue/components/select"'],
  id: 'select-item',
  metadata: { nestable: true },
}
