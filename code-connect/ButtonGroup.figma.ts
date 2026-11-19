// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=139-1295
// source=packages/ui/src/components/button-group.tsx
// component=ButtonGroup
import figma from 'figma'
const instance = figma.selectedInstance

// `orientation` matches the code prop. The button-group slot holds the buttons; the group never sets a size or variant.
// Between filled buttons add <ButtonGroupSeparator />. Give the group an aria-label when it needs a name.
const orientation = instance.getEnum('orientation', { horizontal: 'horizontal', vertical: 'vertical' })
const buttons = instance.getSlot('button-group')
const orientationAttr = orientation === 'vertical' ? ' orientation="vertical"' : ''

export default {
  example: figma.code`<ButtonGroup${orientationAttr} aria-label="">${buttons || ''}
</ButtonGroup>`,
  imports: ['import { ButtonGroup } from "@workspace/ui/components/button-group"'],
  id: 'button-group',
  metadata: { nestable: true },
}
