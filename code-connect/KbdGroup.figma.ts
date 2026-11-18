// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=97-869
// source=packages/ui/src/components/kbd.tsx
// component=KbdGroup
import figma from 'figma'
const instance = figma.selectedInstance

const children = instance.getSlot('children')

export default {
  example: figma.code`<KbdGroup>${children || ''}
</KbdGroup>`,
  imports: ['import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"'],
  id: 'kbd-group',
  metadata: { nestable: true },
}
