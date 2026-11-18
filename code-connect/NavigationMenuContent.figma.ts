// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-1007
// source=packages/ui/src/components/navigation-menu.tsx
// component=NavigationMenuContent
import figma from 'figma'
const instance = figma.selectedInstance

// The navigation-menu-content slot holds panel NavigationMenuLinks.
const links = instance.getSlot('navigation-menu-content')

export default {
  example: figma.code`<NavigationMenuContent>${links || ''}</NavigationMenuContent>`,
  imports: ['import { NavigationMenuContent } from "@workspace/ui/components/navigation-menu"'],
  id: 'navigation-menu-content',
  metadata: { nestable: true },
}
