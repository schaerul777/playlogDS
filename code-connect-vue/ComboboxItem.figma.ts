// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-798
// source=packages/ui-vue/src/components/combobox/ComboboxItem.vue
// component=ComboboxItem
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only (highlighted and selected come from Reka UI), except disabled -> disabled.
const label = instance.getString('label')
const disabled = instance.getEnum('state', { default: false, highlighted: false, selected: false, disabled: true })

export default {
  example: figma.code`<ComboboxItem value="${label}"${disabled ? ' disabled' : ''}>${label}</ComboboxItem>`,
  imports: ['import { ComboboxItem } from "@workspace/ui-vue/components/combobox"'],
  id: 'combobox-item',
  metadata: { nestable: true },
}
