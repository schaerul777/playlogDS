// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=120-1103
// source=packages/ui/src/components/bubble.tsx
// component=Bubble
import figma from 'figma'
const instance = figma.selectedInstance

// The person uses variant="secondary", the assistant uses "ghost" (no bubble). `align` is a layout concern of
// Message (align="end" right-aligns the person's turn), so it is not drawn on the Bubble itself.
const variant = instance.getEnum('variant', {
  default: 'default',
  secondary: 'secondary',
  muted: 'muted',
  tinted: 'tinted',
  outline: 'outline',
  ghost: 'ghost',
  destructive: 'destructive',
})
const text = instance.getString('text')
const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''

export default {
  example: figma.code`<Bubble${variantAttr}>
  <BubbleContent>${text}</BubbleContent>
</Bubble>`,
  imports: ['import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"'],
  id: 'bubble',
  metadata: { nestable: true },
}
