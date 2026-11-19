// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=120-1118
// source=packages/ui/src/components/marker.tsx
// component=Marker
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', { default: 'default', separator: 'separator', border: 'border' })
const text = instance.getString('text')
const showIcon = instance.getBoolean('show marker-icon')
let iconCode
const icon = instance.getInstanceSwap('icon')
if (showIcon && icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}
const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''

// For a status note ("Checking the logs…") add role="status" and use a Spinner as the icon.
export default {
  example: figma.code`<Marker${variantAttr}>${iconCode ? figma.code`
  <MarkerIcon>${iconCode}</MarkerIcon>` : ''}
  <MarkerContent>${text}</MarkerContent>
</Marker>`,
  imports: ['import { Marker, MarkerContent, MarkerIcon } from "@workspace/ui/components/marker"'],
  id: 'marker',
  metadata: { nestable: true },
}
