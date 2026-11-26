// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=40-320
// source=packages/ui-vue/src/components/stat-card/StatCard.vue
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

// The show toggles map to leaving the optional props out. The icon is the `icon` slot in Vue.
const iconSlot = iconCode ? figma.code`
  <template #icon>${iconCode}</template>` : ''
const deltaAttr = showDelta ? figma.code`
  delta="${delta}"` : ''
const trendAttr = showDelta && trend !== 'neutral' ? figma.code`
  trend="${trend}"` : ''
const footerAttr = showFooter ? figma.code`
  footer="${footer}"` : ''

export default {
  example: iconCode
    ? figma.code`<StatCard
  label="${label}"
  value="${value}"${deltaAttr}${trendAttr}${footerAttr}>${iconSlot}
</StatCard>`
    : figma.code`<StatCard
  label="${label}"
  value="${value}"${deltaAttr}${trendAttr}${footerAttr}
/>`,
  imports: ['import { StatCard } from "@workspace/ui-vue/components/stat-card"'],
  id: 'stat-card',
  metadata: { nestable: true },
}
