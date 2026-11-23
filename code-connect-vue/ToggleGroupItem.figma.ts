// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=78-764
// source=packages/ui-vue/src/components/toggle-group/ToggleGroupItem.vue
// component=ToggleGroupItem
import figma from 'figma'
const instance = figma.selectedInstance

// `position` and `pressed` are Figma-only: the group joins the items and its value sets which one is pressed.
// `variant` normally comes from the ToggleGroup.
const label = instance.getString('label')

export default {
  example: figma.code`<ToggleGroupItem value="${label.toLowerCase()}">${label}</ToggleGroupItem>`,
  imports: ['import { ToggleGroupItem } from "@workspace/ui-vue/components/toggle-group"'],
  id: 'toggle-group-item',
  metadata: { nestable: true },
}
