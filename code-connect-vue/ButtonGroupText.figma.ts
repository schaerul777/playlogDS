// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=139-1296
// source=packages/ui-vue/src/components/button-group/ButtonGroupText.vue
// component=ButtonGroupText
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('text')

export default {
  example: figma.code`<ButtonGroupText>${text}</ButtonGroupText>`,
  imports: ['import { ButtonGroupText } from "@workspace/ui-vue/components/button-group"'],
  id: 'button-group-text',
  metadata: { nestable: true },
}
