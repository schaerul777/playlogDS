// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-873
// source=packages/ui-vue/src/components/combobox/ComboboxChips.vue
// component=ComboboxChips
import figma from 'figma'
const instance = figma.selectedInstance

// Multiple selection. `state` is Figma-only, except invalid -> aria-invalid and disabled -> disabled.
// The chips come from the value in code; the slot only shows example chips.
const placeholder = instance.getString('placeholder')
const state = instance.getEnum('state', { default: '', focus: '', invalid: ' aria-invalid="true"', disabled: ' disabled' })

export default {
  example: figma.code`<Combobox v-model="values" multiple>
  <ComboboxChips>
    <ComboboxChip v-for="value in values" :key="value" :value="value">{{ value }}</ComboboxChip>
    <ComboboxChipsInput placeholder="${placeholder}"${state} />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxEmpty>No results</ComboboxEmpty>
    <ComboboxList>
      <ComboboxItem v-for="item in items" :key="item" :value="item">{{ item }}</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  imports: [
    'import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList } from "@workspace/ui-vue/components/combobox"',
  ],
  id: 'combobox-chips',
  metadata: { nestable: false },
}
