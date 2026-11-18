// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=64-627
// source=packages/ui/src/components/dropdown-menu.tsx
// component=DropdownMenuSubTrigger
import figma from 'figma'
const instance = figma.selectedInstance

// `state` (default, highlighted, open) is Figma-only; Base UI sets it while the submenu is open.
const label = instance.getString('label')
const showIcon = instance.getBoolean('show icon')
let iconCode
const icon = instance.getInstanceSwap('icon')
if (showIcon && icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<DropdownMenuSub>
  <DropdownMenuSubTrigger>${iconCode ? figma.code`
    ${iconCode}` : ''}
    ${label}
  </DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`,
  imports: [
    'import { DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@workspace/ui/components/dropdown-menu"',
  ],
  id: 'dropdown-menu-sub-trigger',
  metadata: { nestable: true },
}
