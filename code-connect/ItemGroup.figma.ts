// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=98-1165
// source=packages/ui/src/components/item.tsx
// component=ItemGroup
import figma from 'figma'
const instance = figma.selectedInstance

const children = instance.getSlot('children')

export default {
  example: figma.code`<ItemGroup>${children || ''}
</ItemGroup>`,
  imports: ['import { ItemGroup } from "@workspace/ui/components/item"'],
  id: 'item-group',
  metadata: { nestable: false },
}
