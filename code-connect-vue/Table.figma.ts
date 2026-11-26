// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=41-649
// source=packages/ui-vue/src/components/table/Table.vue
// component=Table
import figma from 'figma'
const instance = figma.selectedInstance

const dense = instance.getEnum('dense', { false: false, true: true })
const showCaption = instance.getBoolean('show caption')

// The caption is a TableCaption instance; render it through its own template.
let captionCode
const caption = instance.findInstance('TableCaption')
if (showCaption && caption && caption.type === 'INSTANCE') {
  captionCode = caption.executeTemplate().example
}
// The rows slot holds the header row and the body rows in order. Figma has no
// TableHeader / TableBody parts, so wrap the first row in TableHeader and the rest
// in TableBody by hand when you paste this.
const rows = instance.getSlot('rows')

export default {
  example: figma.code`<Table${dense ? ' dense' : ''}>${captionCode ? figma.code`
  ${captionCode}` : ''}
  ${rows || ''}
</Table>`,
  imports: ['import { Table, TableBody, TableCaption, TableHeader } from "@workspace/ui-vue/components/table"'],
  id: 'table',
  metadata: { nestable: false },
}
