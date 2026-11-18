// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-873
// source=packages/ui/src/components/combobox.tsx
// component=ComboboxChips
import figma from 'figma'
const instance = figma.selectedInstance

// Multiple selection. `state` is Figma-only, except invalid -> aria-invalid and disabled -> disabled.
// The chips come from the value in code; the slot only shows example chips.
const placeholder = instance.getString('placeholder')
const state = instance.getEnum('state', { default: '', focus: '', invalid: ' aria-invalid="true"', disabled: ' disabled' })

export default {
  example: figma.code`<Combobox multiple items={items}>
  <ComboboxChips ref={anchor}>
    <ComboboxValue>
      {(values) => (
        <>
          {values.map((value) => (
            <ComboboxChip key={value}>{value}</ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="${placeholder}"${state} />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxContent anchor={anchor}>
    <ComboboxEmpty>No results</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  imports: [
    'import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@workspace/ui/components/combobox"',
  ],
  id: 'combobox-chips',
  metadata: { nestable: false },
}
