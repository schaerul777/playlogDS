// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=78-765
// source=packages/ui-vue/src/components/toggle-group/ToggleGroup.vue
// component=ToggleGroup
import figma from 'figma'
const instance = figma.selectedInstance

// The toggle-group slot holds ToggleGroupItems. The joined outline look is variant="outline" with the default spacing (0).
const items = instance.getSlot('toggle-group')

export default {
  example: figma.code`<ToggleGroup variant="outline" type="single">${items || ''}</ToggleGroup>`,
  imports: ['import { ToggleGroup } from "@workspace/ui-vue/components/toggle-group"'],
  id: 'toggle-group',
  metadata: { nestable: false },
}
