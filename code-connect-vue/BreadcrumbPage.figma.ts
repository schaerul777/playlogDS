// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-717
// source=packages/ui-vue/src/components/breadcrumb/BreadcrumbPage.vue
// component=BreadcrumbPage
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

export default {
  example: figma.code`<BreadcrumbItem>
  <BreadcrumbPage>${label}</BreadcrumbPage>
</BreadcrumbItem>`,
  imports: ['import { BreadcrumbItem, BreadcrumbPage } from "@workspace/ui-vue/components/breadcrumb"'],
  id: 'breadcrumb-page',
  metadata: { nestable: true },
}
