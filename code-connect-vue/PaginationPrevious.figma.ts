// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-790
// source=packages/ui-vue/src/components/pagination/PaginationPrevious.vue
// component=PaginationPrevious
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('text')
const size = instance.getEnum('size', { default: 'default', sm: 'sm' })
// `state` is Figma-only: disabled -> aria-disabled on the first or last page.
const disabled = instance.getEnum('state', { default: false, disabled: true })
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''
const textAttr = text !== 'Previous' ? figma.code` text="${text}"` : ''

export default {
  example: figma.code`<PaginationItem>
  <PaginationPrevious href="#"${sizeAttr}${textAttr}${disabled ? ' aria-disabled' : ''} />
</PaginationItem>`,
  imports: ['import { PaginationItem, PaginationPrevious } from "@workspace/ui-vue/components/pagination"'],
  id: 'pagination-previous',
  metadata: { nestable: true },
}
