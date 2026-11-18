// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-1018
// source=packages/ui/src/components/navigation-menu.tsx
// component=NavigationMenu
import figma from 'figma'
const instance = figma.selectedInstance

// Hidden below md (use the Sidebar there). The slot holds NavigationMenuTriggers and top-level NavigationMenuLinks.
const items = instance.getSlot('navigation-menu-list')

export default {
  example: figma.code`<NavigationMenu>
  <NavigationMenuList>${items || ''}</NavigationMenuList>
</NavigationMenu>`,
  imports: ['import { NavigationMenu, NavigationMenuList } from "@workspace/ui/components/navigation-menu"'],
  id: 'navigation-menu',
  metadata: { nestable: false },
}
