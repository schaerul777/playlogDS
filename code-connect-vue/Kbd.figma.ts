// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=97-867
// source=packages/ui-vue/src/components/kbd/Kbd.vue
// component=Kbd
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<Kbd>${label}</Kbd>`,
  imports: ['import { Kbd } from "@workspace/ui-vue/components/kbd"'],
  id: 'kbd',
  metadata: { nestable: true },
}
