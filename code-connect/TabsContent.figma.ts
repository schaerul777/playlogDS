// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=26-429
// source=packages/ui/src/components/tabs.tsx
// component=TabsContent
import figma from 'figma'
const instance = figma.selectedInstance

// The tabs-content slot holds the panel.
const children = instance.getSlot('tabs-content')

export default {
  example: figma.code`<TabsContent>${children || ''}</TabsContent>`,
  imports: ['import { TabsContent } from "@workspace/ui/components/tabs"'],
  id: 'tabs-content',
  metadata: { nestable: true },
}
