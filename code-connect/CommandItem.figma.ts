// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-851
// source=packages/ui/src/components/command.tsx
// component=CommandItem
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only (highlighted comes from Base UI), except disabled -> disabled.
const label = instance.getString('label')
const showIcon = instance.getBoolean('show icon')
const showShortcut = instance.getBoolean('show command-shortcut')
const shortcut = instance.getString('shortcut')
const disabled = instance.getEnum('state', { default: false, highlighted: false, disabled: true })
let iconCode
const icon = instance.getInstanceSwap('icon')
if (showIcon && icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}
const shortcutCode = showShortcut
  ? figma.code`
  <CommandShortcut>${shortcut}</CommandShortcut>`
  : ''

export default {
  example: figma.code`<CommandItem value={item}${disabled ? ' disabled' : ''}>${iconCode ? figma.code`
  ${iconCode}` : ''}
  ${label}${shortcutCode}
</CommandItem>`,
  imports: ['import { CommandItem, CommandShortcut } from "@workspace/ui/components/command"'],
  id: 'command-item',
  metadata: { nestable: true },
}
