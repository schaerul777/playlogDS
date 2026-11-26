// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=64-580
// source=packages/ui-vue/src/components/dropdown-menu/DropdownMenuCheckboxItem.vue
// component=DropdownMenuCheckboxItem
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
const checked = instance.getEnum('checked', { true: true, false: false })
const checkedAttr = checked ? ' :model-value="true"' : ' :model-value="false"'
// `state` is Figma-only (highlighted comes from Reka UI); disabled maps to the prop.
const disabled = instance.getEnum('state', {
  default: false,
  highlighted: false,
  disabled: true,
})
const disabledAttr = disabled ? ' disabled' : ''

export default {
  example: figma.code`<DropdownMenuCheckboxItem${checkedAttr}${disabledAttr}>${label}</DropdownMenuCheckboxItem>`,
  imports: ['import { DropdownMenuCheckboxItem } from "@workspace/ui-vue/components/dropdown-menu"'],
  id: 'dropdown-menu-checkbox-item',
  metadata: { nestable: true },
}
