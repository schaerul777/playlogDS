// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=63-479
// source=packages/ui/src/components/separator.tsx
// component=Separator
import figma from 'figma'
const instance = figma.selectedInstance

const orientation = instance.getEnum('orientation', {
  horizontal: 'horizontal',
  vertical: 'vertical',
})
const orientationAttr = orientation !== 'horizontal' ? figma.code` orientation="${orientation}"` : ''

export default {
  example: figma.code`<Separator${orientationAttr} />`,
  imports: ['import { Separator } from "@workspace/ui/components/separator"'],
  id: 'separator',
  metadata: { nestable: true },
}
