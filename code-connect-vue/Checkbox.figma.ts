// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=24-144
// source=packages/ui-vue/src/components/checkbox/Checkbox.vue
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

const checked = instance.getEnum('checked', { false: false, true: true })
// `state` is Figma-only (CSS :hover / :focus-visible / disabled), except invalid -> aria-invalid.
const invalid = instance.getEnum('state', {
  default: false,
  hover: false,
  focus: false,
  disabled: false,
  invalid: true,
})

export default {
  example: figma.code`<Checkbox${checked ? ' :default-value="true"' : ''}${invalid ? ' aria-invalid="true"' : ''} />`,
  imports: ['import { Checkbox } from "@workspace/ui-vue/components/checkbox"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
