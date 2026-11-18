// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-924
// source=packages/ui/src/components/menubar.tsx
// component=MenubarTrigger
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only, except disabled -> disabled on the MenubarMenu.
const label = instance.getString('label')
const disabled = instance.getEnum('state', { default: false, hover: false, open: false, focus: false, disabled: true })

export default {
  example: figma.code`<MenubarMenu${disabled ? ' disabled' : ''}>
  <MenubarTrigger>${label}</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>Item</MenubarItem>
  </MenubarContent>
</MenubarMenu>`,
  imports: ['import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui/components/menubar"'],
  id: 'menubar-trigger',
  metadata: { nestable: true },
}
