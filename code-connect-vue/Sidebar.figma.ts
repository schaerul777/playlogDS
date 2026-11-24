// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=43-450
// source=packages/ui-vue/src/components/sidebar/Sidebar.vue
// component=Sidebar
import figma from 'figma'
const instance = figma.selectedInstance

// sidebar-header (brand) -> SidebarHeader, sidebar-content (sections) -> SidebarContent.
const header = instance.getSlot('sidebar-header')
const content = instance.getSlot('sidebar-content')

export default {
  example: figma.code`<Sidebar>
  <SidebarHeader>${header || ''}</SidebarHeader>
  <SidebarContent>${content || ''}</SidebarContent>
</Sidebar>`,
  imports: ['import { Sidebar, SidebarContent, SidebarHeader } from "@workspace/ui-vue/components/sidebar"'],
  id: 'sidebar',
  metadata: { nestable: false },
}
