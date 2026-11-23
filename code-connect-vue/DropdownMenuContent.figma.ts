// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=65-501
// source=packages/ui-vue/src/components/dropdown-menu/DropdownMenuContent.vue
// component=DropdownMenuContent
import figma from 'figma'
const instance = figma.selectedInstance

// The dropdown-menu-content slot holds labels, items, sub triggers and separators.
const children = instance.getSlot('dropdown-menu-content')

export default {
  example: figma.code`<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>${children || ''}</DropdownMenuContent>
</DropdownMenu>`,
  imports: [
    'import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@workspace/ui-vue/components/dropdown-menu"',
    'import { Button } from "@workspace/ui-vue/components/button"',
  ],
  id: 'dropdown-menu-content',
  metadata: { nestable: false },
}
