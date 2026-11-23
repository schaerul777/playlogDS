// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=63-483
// source=packages/ui-vue/src/components/dropdown-menu/DropdownMenuLabel.vue
// component=DropdownMenuLabel
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<DropdownMenuLabel>${label}</DropdownMenuLabel>`,
  imports: ['import { DropdownMenuLabel } from "@workspace/ui-vue/components/dropdown-menu"'],
  id: 'dropdown-menu-label',
  metadata: { nestable: true },
}
