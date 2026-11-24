// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=41-275
// source=packages/ui-vue/src/components/table/TableCell.vue
// component=TableCell
import figma from 'figma'
const instance = figma.selectedInstance

const numeric = instance.getEnum('numeric', { false: false, true: true })
// `dense` is a Table prop in code; the cell picks it up from its Table.
const text = instance.getString('text')

export default {
  example: figma.code`<TableCell${numeric ? ' numeric' : ''}>${text}</TableCell>`,
  imports: ['import { TableCell } from "@workspace/ui-vue/components/table"'],
  id: 'table-cell',
  metadata: { nestable: true },
}
