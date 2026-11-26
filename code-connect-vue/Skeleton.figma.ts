// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=63-480
// source=packages/ui-vue/src/components/skeleton/Skeleton.vue
// component=Skeleton
import figma from 'figma'

// Size the skeleton to the shape it stands in for (the Figma drawing is 144x20).
export default {
  example: figma.code`<Skeleton class="h-5 w-36" />`,
  imports: ['import { Skeleton } from "@workspace/ui-vue/components/skeleton"'],
  id: 'skeleton',
  metadata: { nestable: true },
}
