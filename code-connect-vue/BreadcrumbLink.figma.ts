// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-716
// source=packages/ui-vue/src/components/breadcrumb/BreadcrumbLink.vue
// component=BreadcrumbLink
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only (hover, focus).
const label = instance.getString('label')

export default {
  example: figma.code`<BreadcrumbItem>
  <BreadcrumbLink href="#">${label}</BreadcrumbLink>
</BreadcrumbItem>`,
  imports: ['import { BreadcrumbItem, BreadcrumbLink } from "@workspace/ui-vue/components/breadcrumb"'],
  id: 'breadcrumb-link',
  metadata: { nestable: true },
}
