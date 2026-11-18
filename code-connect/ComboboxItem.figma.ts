// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-798
// source=packages/ui/src/components/combobox.tsx
// component=ComboboxItem
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only (highlighted and selected come from Base UI), except disabled -> disabled.
const label = instance.getString('label')
const disabled = instance.getEnum('state', { default: false, highlighted: false, selected: false, disabled: true })

export default {
  example: figma.code`<ComboboxItem value="${label}"${disabled ? ' disabled' : ''}>${label}</ComboboxItem>`,
  imports: ['import { ComboboxItem } from "@workspace/ui/components/combobox"'],
  id: 'combobox-item',
  metadata: { nestable: true },
}
