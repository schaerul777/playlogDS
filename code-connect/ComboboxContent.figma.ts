// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-801
// source=packages/ui/src/components/combobox.tsx
// component=ComboboxContent
import figma from 'figma'
const instance = figma.selectedInstance

// The combobox-list slot holds ComboboxItems (or ComboboxEmpty).
const items = instance.getSlot('combobox-list')

export default {
  example: figma.code`<ComboboxContent>
  <ComboboxList>${items || ''}</ComboboxList>
</ComboboxContent>`,
  imports: ['import { ComboboxContent, ComboboxList } from "@workspace/ui/components/combobox"'],
  id: 'combobox-content',
  metadata: { nestable: false },
}
