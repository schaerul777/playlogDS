// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=102-1080
// source=packages/ui-vue/src/components/hover-card/HoverCardContent.vue
// component=HoverCardContent
import figma from 'figma'
const instance = figma.selectedInstance

const children = instance.getSlot('children')

export default {
  example: figma.code`<HoverCard>
  <HoverCardTrigger as-child>
    <a href="#">Ana Santos</a>
  </HoverCardTrigger>
  <HoverCardContent>${children || ''}
  </HoverCardContent>
</HoverCard>`,
  imports: ['import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui-vue/components/hover-card"'],
  id: 'hover-card-content',
  metadata: { nestable: false },
}
