// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-852
// source=packages/ui-vue/src/components/command/CommandEmpty.vue
// component=CommandEmpty
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<CommandEmpty>${label}</CommandEmpty>`,
  imports: ['import { CommandEmpty } from "@workspace/ui-vue/components/command"'],
  id: 'command-empty',
  metadata: { nestable: true },
}
