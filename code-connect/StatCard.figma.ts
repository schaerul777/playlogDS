// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=40-320
// source=packages/ui/src/components/stat-card.tsx
// component=StatCard
import figma from 'figma'
const instance = figma.selectedInstance

const trend = instance.getEnum('trend', { good: 'good', bad: 'bad', neutral: 'neutral' })
const label = instance.getString('label')
const value = instance.getString('value')
const delta = instance.getString('delta')
const footer = instance.getString('footer')
const showIcon = instance.getBoolean('show icon')
const showDelta = instance.getBoolean('show delta')
const showFooter = instance.getBoolean('show footer')

let iconCode
const iconCodeNode = instance.getInstanceSwap('icon')
if (showIcon && iconCodeNode && iconCodeNode.type === 'INSTANCE') {
  iconCode = iconCodeNode.executeTemplate().example
}

// The show toggles map to leaving the optional props out.
const iconAttr = iconCode ? figma.code`
  icon={${iconCode}}` : ''
const deltaAttr = showDelta ? figma.code`
  delta="${delta}"` : ''
const trendAttr = showDelta && trend !== 'neutral' ? figma.code`
  trend="${trend}"` : ''
const footerAttr = showFooter ? figma.code`
  footer="${footer}"` : ''

export default {
  example: figma.code`<StatCard
  label="${label}"${iconAttr}
  value="${value}"${deltaAttr}${trendAttr}${footerAttr}
/>`,
  imports: ['import { StatCard } from "@workspace/ui/components/stat-card"'],
  id: 'stat-card',
  metadata: { nestable: true },
}
