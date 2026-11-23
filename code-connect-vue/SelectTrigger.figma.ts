// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=25-275
// source=packages/ui-vue/src/components/select/SelectTrigger.vue
// component=SelectTrigger
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('size', { default: 'default', sm: 'sm' })
// `state` is Figma-only, except invalid -> aria-invalid. `placeholder` is Figma-only (Reka UI data-placeholder).
const invalid = instance.getEnum('state', {
  default: false,
  hover: false,
  focus: false,
  disabled: false,
  invalid: true,
})
const value = instance.getString('value')

const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''

export default {
  example: figma.code`<SelectTrigger${sizeAttr}${invalid ? ' aria-invalid="true"' : ''}>
  <SelectValue placeholder="${value}" />
</SelectTrigger>`,
  imports: ['import { SelectTrigger, SelectValue } from "@workspace/ui-vue/components/select"'],
  id: 'select-trigger',
  metadata: { nestable: true },
}
