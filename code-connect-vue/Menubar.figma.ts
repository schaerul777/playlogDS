// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-925
// source=packages/ui-vue/src/components/menubar/Menubar.vue
// component=Menubar
import figma from 'figma'
const instance = figma.selectedInstance

// The menubar slot holds MenubarTriggers; each menu's popup is the Dropdown Menu.
const menus = instance.getSlot('menubar')

export default {
  example: figma.code`<Menubar>${menus || ''}</Menubar>`,
  imports: ['import { Menubar } from "@workspace/ui-vue/components/menubar"'],
  id: 'menubar',
  metadata: { nestable: false },
}
