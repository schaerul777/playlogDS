// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=76-595
// source=packages/ui-vue/src/components/field/FieldSeparator.vue
// component=FieldSeparator
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
const showContent = instance.getBoolean('show field-separator-content')

export default {
  example: showContent
    ? figma.code`<FieldSeparator>${label}</FieldSeparator>`
    : figma.code`<FieldSeparator />`,
  imports: ['import { FieldSeparator } from "@workspace/ui-vue/components/field"'],
  id: 'field-separator',
  metadata: { nestable: true },
}
