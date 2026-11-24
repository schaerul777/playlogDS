// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=26-476
// source=packages/ui-vue/src/components/tabs/Tabs.vue
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance

const orientation = instance.getEnum('orientation', { horizontal: 'horizontal', vertical: 'vertical' })

// Tabs has no slot: it composes a TabsList and a TabsContent instance, rendered by their own templates.
let listCode
const list = instance.findConnectedInstance('tabs-list')
if (list && list.type === 'INSTANCE') {
  listCode = list.executeTemplate().example
}
let contentCode
const content = instance.findConnectedInstance('tabs-content')
if (content && content.type === 'INSTANCE') {
  contentCode = content.executeTemplate().example
}

const orientationAttr = orientation !== 'horizontal' ? figma.code` orientation="${orientation}"` : ''

export default {
  example: figma.code`<Tabs${orientationAttr}>
  ${listCode || ''}
  ${contentCode || ''}
</Tabs>`,
  imports: ['import { Tabs } from "@workspace/ui-vue/components/tabs"'],
  id: 'tabs',
  metadata: { nestable: false },
}
