// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=25-138
// source=packages/ui-vue/src/components/select/SelectLabel.vue
// component=SelectLabel
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<SelectLabel>${label}</SelectLabel>`,
  imports: ['import { SelectLabel } from "@workspace/ui-vue/components/select"'],
  id: 'select-label',
  metadata: { nestable: true },
}
