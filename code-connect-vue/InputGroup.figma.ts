// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=79-720
// source=packages/ui-vue/src/components/input-group/InputGroup.vue
// component=InputGroup
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('placeholder')
// `state` is Figma-only, except invalid -> aria-invalid and disabled -> disabled on the input.
const state = instance.getEnum('state', { default: '', hover: '', focus: '', invalid: ' aria-invalid="true"', disabled: ' disabled' })
const showStart = instance.getBoolean('show inline-start')
const showEnd = instance.getBoolean('show inline-end')
const start = instance.getSlot('inline-start')
const end = instance.getSlot('inline-end')

const startCode = showStart
  ? figma.code`
  <InputGroupAddon>${start || ''}</InputGroupAddon>`
  : ''
const endCode = showEnd
  ? figma.code`
  <InputGroupAddon align="inline-end">${end || ''}</InputGroupAddon>`
  : ''

export default {
  example: figma.code`<InputGroup>${startCode}
  <InputGroupInput placeholder="${placeholder}"${state} />${endCode}
</InputGroup>`,
  imports: ['import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui-vue/components/input-group"'],
  id: 'input-group',
  metadata: { nestable: false },
}
