// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=26-297
// source=packages/ui/src/components/tabs.tsx
// component=TabsTrigger
import figma from 'figma'
const instance = figma.selectedInstance

// `variant` and `orientation` belong to TabsList and Tabs in code, so they don't map here.
// `state` is Figma-only; active comes from the Tabs value in code, not a TabsTrigger prop.
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

export default {
  example: figma.code`<TabsTrigger>${iconCode || ''}${label}${iconEndCode || ''}</TabsTrigger>`,
  imports: ['import { TabsTrigger } from "@workspace/ui/components/tabs"'],
  id: 'tabs-trigger',
  metadata: { nestable: true },
}
