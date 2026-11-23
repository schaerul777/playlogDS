// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-683
// source=packages/ui-vue/src/components/native-select/NativeSelect.vue
// component=NativeSelect
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('size', { default: 'default', sm: 'sm' })
// `state` is Figma-only, except invalid -> aria-invalid and disabled -> disabled.
const state = instance.getEnum('state', { default: '', hover: '', focus: '', invalid: ' aria-invalid="true"', disabled: ' disabled' })
const value = instance.getString('value')
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''

export default {
  example: figma.code`<NativeSelect${sizeAttr}${state} default-value="${value}">
  <NativeSelectOption value="${value}">${value}</NativeSelectOption>
</NativeSelect>`,
  imports: ['import { NativeSelect, NativeSelectOption } from "@workspace/ui-vue/components/native-select"'],
  id: 'native-select',
  metadata: { nestable: true },
}
