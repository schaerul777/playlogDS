// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=63-479
// source=packages/ui-vue/src/components/separator/Separator.vue
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
  imports: ['import { Separator } from "@workspace/ui-vue/components/separator"'],
  id: 'separator',
  metadata: { nestable: true },
}
