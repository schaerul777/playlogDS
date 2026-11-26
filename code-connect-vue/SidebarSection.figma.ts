// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=43-427
// source=packages/ui-vue/src/components/sidebar/SidebarGroup.vue
// component=SidebarGroup
import figma from 'figma'
const instance = figma.selectedInstance

// SidebarSection stands in for SidebarGroup + SidebarGroupLabel + SidebarGroupContent + SidebarMenu.
const title = instance.getString('title')
const showTitle = instance.getBoolean('show title')
const items = instance.getSlot('items')

const labelCode = showTitle ? figma.code`
  <SidebarGroupLabel>${title}</SidebarGroupLabel>` : ''

export default {
  example: figma.code`<SidebarGroup>${labelCode}
  <SidebarGroupContent>
    <SidebarMenu>${items || ''}</SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>`,
  imports: ['import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@workspace/ui-vue/components/sidebar"'],
  id: 'sidebar-section',
  metadata: { nestable: true },
}
