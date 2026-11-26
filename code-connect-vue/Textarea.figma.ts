// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=77-616
// source=packages/ui-vue/src/components/textarea/Textarea.vue
// component=Textarea
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('placeholder')
// `state` is Figma-only, except invalid -> aria-invalid and disabled -> disabled.
const state = instance.getEnum('state', { default: '', hover: '', focus: '', invalid: ' aria-invalid="true"', disabled: ' disabled' })

export default {
  example: figma.code`<Textarea placeholder="${placeholder}"${state} />`,
  imports: ['import { Textarea } from "@workspace/ui-vue/components/textarea"'],
  id: 'textarea',
  metadata: { nestable: true },
}
