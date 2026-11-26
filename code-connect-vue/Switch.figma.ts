// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=24-189
// source=packages/ui-vue/src/components/switch/Switch.vue
// component=Switch
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('size', { default: 'default', sm: 'sm' })
const checked = instance.getEnum('checked', { false: false, true: true })
// `state` is Figma-only (CSS :hover / :focus-visible / disabled), except invalid -> aria-invalid.
const invalid = instance.getEnum('state', {
  default: false,
  hover: false,
  focus: false,
  disabled: false,
  invalid: true,
})

const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''

export default {
  example: figma.code`<Switch${sizeAttr}${checked ? ' :default-value="true"' : ''}${invalid ? ' aria-invalid="true"' : ''} />`,
  imports: ['import { Switch } from "@workspace/ui-vue/components/switch"'],
  id: 'switch',
  metadata: { nestable: true },
}
