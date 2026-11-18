// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-807
// source=packages/ui/src/components/pagination.tsx
// component=PaginationNext
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('text')
const size = instance.getEnum('size', { default: 'default', sm: 'sm' })
// `state` is Figma-only: disabled -> aria-disabled on the first or last page.
const disabled = instance.getEnum('state', { default: false, disabled: true })
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''
const textAttr = text !== 'Next' ? figma.code` text="${text}"` : ''

export default {
  example: figma.code`<PaginationItem>
  <PaginationNext href="#"${sizeAttr}${textAttr}${disabled ? ' aria-disabled' : ''} />
</PaginationItem>`,
  imports: ['import { PaginationItem, PaginationNext } from "@workspace/ui/components/pagination"'],
  id: 'pagination-next',
  metadata: { nestable: true },
}
