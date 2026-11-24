// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=9-154
// source=packages/ui-vue/src/components/badge/Badge.vue
// component=Badge
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', {
  default: 'default',
  secondary: 'secondary',
  destructive: 'destructive',
  outline: 'outline',
  ghost: 'ghost',
  link: 'link',
  info: 'info',
  success: 'success',
  warning: 'warning',
  accent: 'accent',
})
// `state` (default, hover, focus, disabled) is Figma-only and has no code prop.

const label = instance.getString('label')
const showStart = instance.getBoolean('inline-start')
const showEnd = instance.getBoolean('inline-end')

// Icons are children, as in the code (data-icon="inline-start" | "inline-end" on the icon element).
let iconCode
const icon = instance.getInstanceSwap('icon')
if (showStart && icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}
let iconEndCode
const iconEnd = instance.getInstanceSwap('icon-end')
if (showEnd && iconEnd && iconEnd.type === 'INSTANCE') {
  iconEndCode = iconEnd.executeTemplate().example
}

const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''

export default {
  example: figma.code`<Badge${variantAttr}>${iconCode || ''}${label}${iconEndCode || ''}</Badge>`,
  imports: ['import { Badge } from "@workspace/ui-vue/components/badge"'],
  id: 'badge',
  metadata: { nestable: true },
}
