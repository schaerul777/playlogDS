// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-815
// source=packages/ui-vue/src/components/combobox/ComboboxChip.vue
// component=ComboboxChip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
const showRemove = instance.getBoolean('showRemove')

export default {
  example: figma.code`<ComboboxChip${showRemove ? '' : ' :show-remove="false"'}>${label}</ComboboxChip>`,
  imports: ['import { ComboboxChip } from "@workspace/ui-vue/components/combobox"'],
  id: 'combobox-chip',
  metadata: { nestable: true },
}
