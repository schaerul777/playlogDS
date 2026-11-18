// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=97-883
// source=packages/ui/src/components/empty.tsx
// component=EmptyMedia
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', { default: 'default', icon: 'icon' })
let content
if (variant === 'icon') {
  const icon = instance.getInstanceSwap('icon')
  if (icon && icon.type === 'INSTANCE') content = icon.executeTemplate().example
} else {
  content = instance.getSlot('children')
}

export default {
  example: figma.code`<EmptyMedia${variant === 'icon' ? ' variant="icon"' : ''}>
  ${content || ''}
</EmptyMedia>`,
  imports: ['import { EmptyMedia } from "@workspace/ui/components/empty"'],
  id: 'empty-media',
  metadata: { nestable: true },
}
