// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-787
// source=packages/ui-vue/src/components/combobox/ComboboxInput.vue
// component=ComboboxInput
import figma from 'figma'
const instance = figma.selectedInstance

// `value` and `state` are Figma-only: the clear button shows on its own once there is a value.
const text = instance.getString('text')
const showTrigger = instance.getBoolean('showTrigger')
const state = instance.getEnum('state', { default: '', focus: '', invalid: ' aria-invalid="true"', disabled: ' disabled' })

export default {
  example: figma.code`<Combobox>
  <ComboboxInput placeholder="${text}"${showTrigger ? '' : ' :show-trigger="false"'}${state} />
  <ComboboxContent>
    <ComboboxEmpty>No results</ComboboxEmpty>
    <ComboboxList>
      <ComboboxItem v-for="item in items" :key="item" :value="item">{{ item }}</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  imports: [
    'import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@workspace/ui-vue/components/combobox"',
  ],
  id: 'combobox-input',
  metadata: { nestable: false },
}
