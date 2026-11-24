// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-773
// source=packages/ui-vue/src/components/pagination/PaginationLink.vue
// component=PaginationLink
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
const isActive = instance.getEnum('isActive', { false: false, true: true })
const size = instance.getEnum('size', { icon: 'icon', 'icon-sm': 'icon-sm' })
// `state` is Figma-only (hover, focus).
const sizeAttr = size !== 'icon' ? figma.code` size="${size}"` : ''

export default {
  example: figma.code`<PaginationItem>
  <PaginationLink href="#"${sizeAttr}${isActive ? ' is-active' : ''}>${label}</PaginationLink>
</PaginationItem>`,
  imports: ['import { PaginationItem, PaginationLink } from "@workspace/ui-vue/components/pagination"'],
  id: 'pagination-link',
  metadata: { nestable: true },
}
