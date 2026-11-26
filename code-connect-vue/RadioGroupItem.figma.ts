// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=78-636
// source=packages/ui-vue/src/components/radio-group/RadioGroupItem.vue
// component=RadioGroupItem
import figma from 'figma'
const instance = figma.selectedInstance

// `checked` and `state` are Figma-only: checked comes from the RadioGroup value; invalid -> aria-invalid; disabled -> disabled.
const state = instance.getEnum('state', { default: '', hover: '', focus: '', invalid: ' aria-invalid="true"', disabled: ' disabled' })

export default {
  example: figma.code`<RadioGroupItem value="option" id="option"${state} />`,
  imports: ['import { RadioGroupItem } from "@workspace/ui-vue/components/radio-group"'],
  id: 'radio-group-item',
  metadata: { nestable: true },
}
