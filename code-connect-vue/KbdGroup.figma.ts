// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=97-869
// source=packages/ui-vue/src/components/kbd/KbdGroup.vue
// component=KbdGroup
import figma from 'figma'
const instance = figma.selectedInstance

const children = instance.getSlot('children')

export default {
  example: figma.code`<KbdGroup>${children || ''}
</KbdGroup>`,
  imports: ['import { Kbd, KbdGroup } from "@workspace/ui-vue/components/kbd"'],
  id: 'kbd-group',
  metadata: { nestable: true },
}
