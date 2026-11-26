// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=76-594
// source=packages/ui-vue/src/components/field/FieldLegend.vue
// component=FieldLegend
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', { legend: 'legend', label: 'label' })
const label = instance.getString('label')
const variantAttr = variant !== 'legend' ? figma.code` variant="${variant}"` : ''

export default {
  example: figma.code`<FieldLegend${variantAttr}>${label}</FieldLegend>`,
  imports: ['import { FieldLegend } from "@workspace/ui-vue/components/field"'],
  id: 'field-legend',
  metadata: { nestable: true },
}
