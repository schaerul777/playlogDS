// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-815
// source=packages/ui/src/components/combobox.tsx
// component=ComboboxChip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
const showRemove = instance.getBoolean('showRemove')

export default {
  example: figma.code`<ComboboxChip${showRemove ? '' : ' showRemove={false}'}>${label}</ComboboxChip>`,
  imports: ['import { ComboboxChip } from "@workspace/ui/components/combobox"'],
  id: 'combobox-chip',
  metadata: { nestable: true },
}
