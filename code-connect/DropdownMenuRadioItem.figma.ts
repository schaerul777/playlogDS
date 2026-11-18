// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=64-605
// source=packages/ui/src/components/dropdown-menu.tsx
// component=DropdownMenuRadioItem
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
// `checked` is Figma-only: the selected item comes from DropdownMenuRadioGroup value.
// `state` is Figma-only (highlighted comes from Base UI); disabled maps to the prop.
const disabled = instance.getEnum('state', {
  default: false,
  highlighted: false,
  disabled: true,
})
const disabledAttr = disabled ? ' disabled' : ''

export default {
  example: figma.code`<DropdownMenuRadioItem value="${label}"${disabledAttr}>${label}</DropdownMenuRadioItem>`,
  imports: ['import { DropdownMenuRadioItem } from "@workspace/ui/components/dropdown-menu"'],
  id: 'dropdown-menu-radio-item',
  metadata: { nestable: true },
}
