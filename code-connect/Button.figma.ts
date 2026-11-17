// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=10-1022
// source=packages/ui/src/components/button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', {
  default: 'default',
  outline: 'outline',
  secondary: 'secondary',
  ghost: 'ghost',
  destructive: 'destructive',
  link: 'link',
})
const size = instance.getEnum('size', {
  default: 'default',
  xs: 'xs',
  sm: 'sm',
  lg: 'lg',
  icon: 'icon',
  'icon-xs': 'icon-xs',
  'icon-sm': 'icon-sm',
  'icon-lg': 'icon-lg',
})
// `state` is Figma-only (CSS :hover / :focus-visible / :disabled), except pressed -> aria-pressed.
const pressed = instance.getEnum('state', {
  default: false,
  hover: false,
  focus: false,
  disabled: false,
  pressed: true,
})
const iconOnly = instance.getEnum('size', {
  default: false,
  xs: false,
  sm: false,
  lg: false,
  icon: true,
  'icon-xs': true,
  'icon-sm': true,
  'icon-lg': true,
})

const label = instance.getString('label')
const showStart = instance.getBoolean('inline-start')
const showEnd = instance.getBoolean('inline-end')

// Icons are children, as in the code (data-icon="inline-start" | "inline-end" on the icon element).
let iconCode
const icon = instance.getInstanceSwap('icon')
if ((iconOnly || showStart) && icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}
let iconEndCode
const iconEnd = instance.getInstanceSwap('icon-end')
if (!iconOnly && showEnd && iconEnd && iconEnd.type === 'INSTANCE') {
  iconEndCode = iconEnd.executeTemplate().example
}

const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''
const pressedAttr = pressed ? ' aria-pressed' : ''

export default {
  example: iconOnly
    ? figma.code`<Button${variantAttr}${sizeAttr}${pressedAttr}>${iconCode || ''}</Button>`
    : figma.code`<Button${variantAttr}${sizeAttr}${pressedAttr}>${iconCode || ''}${label}${iconEndCode || ''}</Button>`,
  imports: ['import { Button } from "@workspace/ui/components/button"'],
  id: 'button',
  metadata: { nestable: true },
}
