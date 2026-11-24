// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=40-289
// source=packages/ui-vue/src/components/alert/Alert.vue
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', {
  default: 'default',
  destructive: 'destructive',
  info: 'info',
  success: 'success',
  warning: 'warning',
})
const title = instance.getString('title')
const description = instance.getString('description')
const showIcon = instance.getBoolean('show icon')
const showDescription = instance.getBoolean('show description')

// The icon is an svg child in code, placed before the title.
let iconCode
const iconCodeNode = instance.getInstanceSwap('icon')
if (showIcon && iconCodeNode && iconCodeNode.type === 'INSTANCE') {
  iconCode = iconCodeNode.executeTemplate().example
}

const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''
const descriptionCode = showDescription
  ? figma.code`
  <AlertDescription>${description}</AlertDescription>`
  : ''

export default {
  example: figma.code`<Alert${variantAttr}>${iconCode ? figma.code`
  ${iconCode}` : ''}
  <AlertTitle>${title}</AlertTitle>${descriptionCode}
</Alert>`,
  imports: ['import { Alert, AlertDescription, AlertTitle } from "@workspace/ui-vue/components/alert"'],
  id: 'alert',
  metadata: { nestable: true },
}
