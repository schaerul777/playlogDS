// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=41-280
// source=packages/ui/src/components/table.tsx
// component=TableHead
import figma from 'figma'
const instance = figma.selectedInstance

const numeric = instance.getEnum('numeric', { false: false, true: true })
const text = instance.getString('text')

export default {
  example: figma.code`<TableHead${numeric ? ' numeric' : ''}>${text}</TableHead>`,
  imports: ['import { TableHead } from "@workspace/ui/components/table"'],
  id: 'table-head',
  metadata: { nestable: true },
}
