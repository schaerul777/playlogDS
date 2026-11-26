// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-722
// source=packages/ui-vue/src/components/breadcrumb/BreadcrumbEllipsis.vue
// component=BreadcrumbEllipsis
import figma from 'figma'

// The hidden levels open from a Dropdown Menu.
export default {
  example: figma.code`<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger aria-label="Show hidden levels">
      <BreadcrumbEllipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Hidden level</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`,
  imports: [
    'import { BreadcrumbEllipsis, BreadcrumbItem } from "@workspace/ui-vue/components/breadcrumb"',
    'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui-vue/components/dropdown-menu"',
  ],
  id: 'breadcrumb-ellipsis',
  metadata: { nestable: true },
}
