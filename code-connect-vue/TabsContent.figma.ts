// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=26-429
// source=packages/ui-vue/src/components/tabs/TabsContent.vue
// component=TabsContent
import figma from 'figma'
const instance = figma.selectedInstance

// The tabs-content slot holds the panel.
const children = instance.getSlot('tabs-content')

export default {
  example: figma.code`<TabsContent>${children || ''}</TabsContent>`,
  imports: ['import { TabsContent } from "@workspace/ui-vue/components/tabs"'],
  id: 'tabs-content',
  metadata: { nestable: true },
}
