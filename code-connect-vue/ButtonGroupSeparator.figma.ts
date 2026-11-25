// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=139-1300
// source=packages/ui-vue/src/components/button-group/ButtonGroupSeparator.vue
// component=ButtonGroupSeparator
import figma from 'figma'
const instance = figma.selectedInstance

// A 1px divider in the page colour between filled buttons. The default orientation is vertical (a row of buttons).
const orientation = instance.getEnum('orientation', { vertical: 'vertical', horizontal: 'horizontal' })
const orientationAttr = orientation === 'horizontal' ? figma.code` orientation="horizontal"` : ''

export default {
  example: figma.code`<ButtonGroupSeparator${orientationAttr} />`,
  imports: ['import { ButtonGroupSeparator } from "@workspace/ui-vue/components/button-group"'],
  id: 'button-group-separator',
  metadata: { nestable: true },
}
