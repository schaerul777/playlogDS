// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-799
// source=packages/ui/src/components/combobox.tsx
// component=ComboboxEmpty
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<ComboboxEmpty>${label}</ComboboxEmpty>`,
  imports: ['import { ComboboxEmpty } from "@workspace/ui/components/combobox"'],
  id: 'combobox-empty',
  metadata: { nestable: true },
}
