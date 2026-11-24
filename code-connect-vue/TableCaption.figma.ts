// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=41-315
// source=packages/ui-vue/src/components/table/TableCaption.vue
// component=TableCaption
import figma from 'figma'
const instance = figma.selectedInstance

const caption = instance.getString('caption')

export default {
  example: figma.code`<TableCaption>${caption}</TableCaption>`,
  imports: ['import { TableCaption } from "@workspace/ui-vue/components/table"'],
  id: 'table-caption',
  metadata: { nestable: true },
}
