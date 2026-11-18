// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=78-739
// source=packages/ui/src/components/toggle.tsx
// component=Toggle
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', { default: 'default', outline: 'outline' })
const size = instance.getEnum('size', { sm: 'sm', default: 'default', lg: 'lg' })
// `state` is Figma-only, except pressed -> defaultPressed and disabled -> disabled.
const stateAttr = instance.getEnum('state', { default: '', pressed: ' defaultPressed', focus: '', disabled: ' disabled' })
const label = instance.getString('label')
const showLabel = instance.getBoolean('show label')
const showIcon = instance.getBoolean('show icon')
let iconCode
const icon = instance.getInstanceSwap('icon')
if (showIcon && icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}
const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''
const ariaLabel = showLabel ? '' : figma.code` aria-label="${label}"`

export default {
  example: figma.code`<Toggle${variantAttr}${sizeAttr}${stateAttr}${ariaLabel}>${iconCode ? figma.code`
  ${iconCode}` : ''}${showLabel ? figma.code`
  ${label}` : ''}
</Toggle>`,
  imports: ['import { Toggle } from "@workspace/ui/components/toggle"'],
  id: 'toggle',
  metadata: { nestable: true },
}
