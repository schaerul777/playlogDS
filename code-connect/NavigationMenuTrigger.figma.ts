// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-959
// source=packages/ui/src/components/navigation-menu.tsx
// component=NavigationMenuTrigger
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only (hover, open, focus).
const label = instance.getString('label')

export default {
  example: figma.code`<NavigationMenuItem>
  <NavigationMenuTrigger>${label}</NavigationMenuTrigger>
  <NavigationMenuContent>
    <NavigationMenuLink href="#">Link</NavigationMenuLink>
  </NavigationMenuContent>
</NavigationMenuItem>`,
  imports: ['import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@workspace/ui/components/navigation-menu"'],
  id: 'navigation-menu-trigger',
  metadata: { nestable: true },
}
