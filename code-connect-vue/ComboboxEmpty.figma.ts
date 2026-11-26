// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-799
// source=packages/ui-vue/src/components/combobox/ComboboxEmpty.vue
// component=ComboboxEmpty
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<ComboboxEmpty>${label}</ComboboxEmpty>`,
  imports: ['import { ComboboxEmpty } from "@workspace/ui-vue/components/combobox"'],
  id: 'combobox-empty',
  metadata: { nestable: true },
}
