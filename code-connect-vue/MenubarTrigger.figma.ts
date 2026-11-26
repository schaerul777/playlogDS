// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-924
// source=packages/ui-vue/src/components/menubar/MenubarTrigger.vue
// component=MenubarTrigger
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only, except disabled -> disabled on the MenubarTrigger (Reka puts it on the trigger).
const label = instance.getString('label')
const disabled = instance.getEnum('state', { default: false, hover: false, open: false, focus: false, disabled: true })

export default {
  example: figma.code`<MenubarMenu>
  <MenubarTrigger${disabled ? ' disabled' : ''}>${label}</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>Item</MenubarItem>
  </MenubarContent>
</MenubarMenu>`,
  imports: ['import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui-vue/components/menubar"'],
  id: 'menubar-trigger',
  metadata: { nestable: true },
}
