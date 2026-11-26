// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-826
// source=packages/ui-vue/src/components/command/CommandInput.vue
// component=CommandInput
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('placeholder')

export default {
  example: figma.code`<CommandInput placeholder="${placeholder}" />`,
  imports: ['import { CommandInput } from "@workspace/ui-vue/components/command"'],
  id: 'command-input',
  metadata: { nestable: true },
}
