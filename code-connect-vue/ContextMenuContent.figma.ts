// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-933
// source=packages/ui-vue/src/components/context-menu/ContextMenuContent.vue
// component=ContextMenuContent
import figma from 'figma'
const instance = figma.selectedInstance

// The popup is drawn with the Dropdown Menu item components; in code use the ContextMenu* equivalents.
const items = instance.getSlot('dropdown-menu-content')

export default {
  example: figma.code`<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>${items || ''}</ContextMenuContent>
</ContextMenu>`,
  imports: ['import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@workspace/ui-vue/components/context-menu"'],
  id: 'context-menu-content',
  metadata: { nestable: false },
}
