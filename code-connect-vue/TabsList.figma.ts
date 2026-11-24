// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=26-428
// source=packages/ui-vue/src/components/tabs/TabsList.vue
// component=TabsList
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', { default: 'default', line: 'line' })
// `orientation` is a Tabs prop in code, so it doesn't map here. The tabs-list slot holds TabsTriggers.
const children = instance.getSlot('tabs-list')

const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''

export default {
  example: figma.code`<TabsList${variantAttr}>${children || ''}</TabsList>`,
  imports: ['import { TabsList } from "@workspace/ui-vue/components/tabs"'],
  id: 'tabs-list',
  metadata: { nestable: true },
}
