// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=102-1080
// source=packages/ui/src/components/hover-card.tsx
// component=HoverCardContent
import figma from 'figma'
const instance = figma.selectedInstance

const children = instance.getSlot('children')

export default {
  example: figma.code`<HoverCard>
  <HoverCardTrigger href="#">Ana Santos</HoverCardTrigger>
  <HoverCardContent>${children || ''}
  </HoverCardContent>
</HoverCard>`,
  imports: ['import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card"'],
  id: 'hover-card-content',
  metadata: { nestable: false },
}
