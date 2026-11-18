// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=65-501
// source=packages/ui/src/components/dropdown-menu.tsx
// component=DropdownMenuContent
import figma from 'figma'
const instance = figma.selectedInstance

// The dropdown-menu-content slot holds labels, items, sub triggers and separators.
const children = instance.getSlot('dropdown-menu-content')

export default {
  example: figma.code`<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>Open</DropdownMenuTrigger>
  <DropdownMenuContent>${children || ''}</DropdownMenuContent>
</DropdownMenu>`,
  imports: [
    'import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"',
    'import { Button } from "@workspace/ui/components/button"',
  ],
  id: 'dropdown-menu-content',
  metadata: { nestable: false },
}
