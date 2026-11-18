// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=25-142
// source=packages/ui/src/components/select.tsx
// component=SelectGroup
import figma from 'figma'
const instance = figma.selectedInstance

// The select-group slot holds a SelectLabel and SelectItems.
const children = instance.getSlot('select-group')

export default {
  example: figma.code`<SelectGroup>${children || ''}</SelectGroup>`,
  imports: ['import { SelectGroup } from "@workspace/ui/components/select"'],
  id: 'select-group',
  metadata: { nestable: true },
}
