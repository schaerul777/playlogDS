// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-1006
// source=packages/ui/src/components/navigation-menu.tsx
// component=NavigationMenuLink
import figma from 'figma'
const instance = figma.selectedInstance

// `placement` and `state` are Figma-only: top uses navigationMenuTriggerStyle(); current -> active (aria-current="page").
const title = instance.getString('title')
const description = instance.getString('description')
const placement = instance.getEnum('placement', { top: 'top', panel: 'panel' })
const active = instance.getEnum('state', { default: false, hover: false, current: true })

export default {
  example:
    placement === 'top'
      ? figma.code`<NavigationMenuItem>
  <NavigationMenuLink href="#"${active ? ' active' : ''} className={navigationMenuTriggerStyle()}>
    ${title}
  </NavigationMenuLink>
</NavigationMenuItem>`
      : figma.code`<NavigationMenuLink href="#"${active ? ' active' : ''}>
  <span className="font-semibold text-ink-heading">${title}</span>
  <span className="text-caption text-muted-foreground">${description}</span>
</NavigationMenuLink>`,
  imports: ['import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@workspace/ui/components/navigation-menu"'],
  id: 'navigation-menu-link',
  metadata: { nestable: true },
}
