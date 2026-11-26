// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=25-152
// source=packages/ui-vue/src/components/select/SelectContent.vue
// component=SelectContent
import figma from 'figma'
const instance = figma.selectedInstance

// The select-content slot holds SelectGroups and SelectSeparators.
const children = instance.getSlot('select-content')

export default {
  example: figma.code`<SelectContent>${children || ''}</SelectContent>`,
  imports: ['import { SelectContent } from "@workspace/ui-vue/components/select"'],
  id: 'select-content',
  metadata: { nestable: false },
}
