// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=63-483
// source=packages/ui/src/components/dropdown-menu.tsx
// component=DropdownMenuLabel
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<DropdownMenuLabel>${label}</DropdownMenuLabel>`,
  imports: ['import { DropdownMenuLabel } from "@workspace/ui/components/dropdown-menu"'],
  id: 'dropdown-menu-label',
  metadata: { nestable: true },
}
