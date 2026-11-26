// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=12-121
// source=packages/ui-vue/src/components/input/Input.vue
// component=Input
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('placeholder')
// `state` is Figma-only (CSS :hover / :focus-visible / :disabled), except invalid -> aria-invalid.
const invalid = instance.getEnum('state', {
  default: false,
  hover: false,
  focus: false,
  disabled: false,
  invalid: true,
})

export default {
  example: figma.code`<Input placeholder="${placeholder}"${invalid ? ' aria-invalid="true"' : ''} />`,
  imports: ['import { Input } from "@workspace/ui-vue/components/input"'],
  id: 'input',
  metadata: { nestable: true },
}
