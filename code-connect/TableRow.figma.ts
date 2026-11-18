// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=41-314
// source=packages/ui/src/components/table.tsx
// component=TableRow
import figma from 'figma'
const instance = figma.selectedInstance

// `state` (default, hover, selected) and `show divider` are Figma-only (CSS hover, data-state, last-child).
const cells = instance.getSlot('table-row')

export default {
  example: figma.code`<TableRow>${cells || ''}</TableRow>`,
  imports: ['import { TableRow } from "@workspace/ui/components/table"'],
  id: 'table-row',
  metadata: { nestable: true },
}
