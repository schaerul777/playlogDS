// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=76-662
// source=packages/ui-vue/src/components/field/Field.vue
// component=Field
import figma from 'figma'
const instance = figma.selectedInstance

const orientation = instance.getEnum('orientation', { vertical: 'vertical', horizontal: 'horizontal' })
// `state` is Figma-only: invalid -> data-invalid on Field and aria-invalid on the control; disabled -> data-disabled.
const state = instance.getEnum('state', { default: 'default', invalid: 'invalid', disabled: 'disabled' })
const description = instance.getString('description')
const showDescription = instance.getBoolean('show field-description')
const error = instance.getString('error')
const control = instance.getSlot('children')

// The label is the exposed nested Label instance (its own label / required props).
let label = 'Label'
let required = false
const labelInstance = instance.findInstance('field-label')
if (labelInstance && labelInstance.type === 'INSTANCE') {
  const props = labelInstance.executeTemplate().metadata.props || {}
  label = props.label ?? label
  required = !!props.required
}

const fieldAttrs =
  (orientation !== 'vertical' ? ` orientation="${orientation}"` : '') +
  (state === 'invalid' ? ' data-invalid="true"' : '') +
  (state === 'disabled' ? ' data-disabled="true"' : '')
const labelCode = figma.code`<FieldLabel for="field-id"${required ? ' required' : ''}>${label}</FieldLabel>`
const messageCode =
  state === 'invalid'
    ? figma.code`
  <FieldError>${error}</FieldError>`
    : showDescription
      ? figma.code`
  <FieldDescription>${description}</FieldDescription>`
      : ''

export default {
  example:
    orientation === 'horizontal'
      ? figma.code`<Field${fieldAttrs}>
  ${control || ''}
  <FieldContent>
    ${labelCode}${messageCode}
  </FieldContent>
</Field>`
      : figma.code`<Field${fieldAttrs}>
  ${labelCode}
  ${control || ''}${messageCode}
</Field>`,
  imports: [
    'import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@workspace/ui-vue/components/field"',
  ],
  id: 'field',
  metadata: { nestable: false },
}
