// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=43-426
// source=packages/ui/src/components/sidebar.tsx
// component=SidebarMenuItem
import figma from 'figma'
const instance = figma.selectedInstance

// SidebarNavItem stands in for SidebarMenuItem + SidebarMenuButton (+ SidebarMenuBadge).
// `state` is Figma-only and maps to nothing.
const label = instance.getString('label')
const count = instance.getString('count')
const showCount = instance.getBoolean('show count')

let iconCode
const iconCodeNode = instance.getInstanceSwap('icon')
if (true && iconCodeNode && iconCodeNode.type === 'INSTANCE') {
  iconCode = iconCodeNode.executeTemplate().example
}

const badgeCode = showCount ? figma.code`
  <SidebarMenuBadge>${count}</SidebarMenuBadge>` : ''

export default {
  example: figma.code`<SidebarMenuItem>
  <SidebarMenuButton>
    ${iconCode || ''}
    <span>${label}</span>
  </SidebarMenuButton>${badgeCode}
</SidebarMenuItem>`,
  imports: ['import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@workspace/ui/components/sidebar"'],
  id: 'sidebar-nav-item',
  metadata: { nestable: true },
}
