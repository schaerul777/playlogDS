// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=64-549
// source=packages/ui-vue/src/components/dropdown-menu/DropdownMenuItem.vue
// component=DropdownMenuItem
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', {
  default: 'default',
  destructive: 'destructive',
})
const inset = instance.getEnum('inset', {
  false: false,
  true: true,
})
// `state` is Figma-only: highlighted comes from Reka UI (data-highlighted); disabled maps to the prop.
const disabled = instance.getEnum('state', {
  default: false,
  highlighted: false,
  disabled: true,
})
const label = instance.getString('label')
const showIcon = instance.getBoolean('show icon')
const showShortcut = instance.getBoolean('show dropdown-menu-shortcut')
const shortcut = instance.getString('shortcut')

let iconCode
const icon = instance.getInstanceSwap('icon')
if (showIcon && icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''
const insetAttr = inset ? ' inset' : ''
const disabledAttr = disabled ? ' disabled' : ''
const shortcutCode = showShortcut
  ? figma.code`
  <DropdownMenuShortcut>${shortcut}</DropdownMenuShortcut>`
  : ''

export default {
  example: figma.code`<DropdownMenuItem${variantAttr}${insetAttr}${disabledAttr}>${iconCode ? figma.code`
  ${iconCode}` : ''}
  ${label}${shortcutCode}
</DropdownMenuItem>`,
  imports: ['import { DropdownMenuItem, DropdownMenuShortcut } from "@workspace/ui-vue/components/dropdown-menu"'],
  id: 'dropdown-menu-item',
  metadata: { nestable: true },
}
