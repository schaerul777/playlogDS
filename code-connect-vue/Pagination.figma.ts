// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-813
// source=packages/ui-vue/src/components/pagination/Pagination.vue
// component=Pagination
import figma from 'figma'
const instance = figma.selectedInstance

// The pagination-content slot holds PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationStatus and PaginationNext.
const items = instance.getSlot('pagination-content')

export default {
  example: figma.code`<Pagination>
  <PaginationContent>${items || ''}</PaginationContent>
</Pagination>`,
  imports: ['import { Pagination, PaginationContent } from "@workspace/ui-vue/components/pagination"'],
  id: 'pagination',
  metadata: { nestable: false },
}
