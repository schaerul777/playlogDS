// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-725
// source=packages/ui/src/components/breadcrumb.tsx
// component=Breadcrumb
import figma from 'figma'
const instance = figma.selectedInstance

// The breadcrumb-list slot holds BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis and BreadcrumbPage.
const items = instance.getSlot('breadcrumb-list')

export default {
  example: figma.code`<Breadcrumb>
  <BreadcrumbList>${items || ''}</BreadcrumbList>
</Breadcrumb>`,
  imports: ['import { Breadcrumb, BreadcrumbList } from "@workspace/ui/components/breadcrumb"'],
  id: 'breadcrumb',
  metadata: { nestable: false },
}
