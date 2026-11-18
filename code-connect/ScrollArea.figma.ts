// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=102-1227
// source=packages/ui/src/components/scroll-area.tsx
// component=ScrollArea
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only (hover, scrolling and focus come from Base UI and the browser).
const orientation = instance.getEnum('orientation', { vertical: 'vertical', horizontal: 'horizontal' })
const children = instance.getSlot('scroll-area-viewport')

export default {
  example: orientation === 'horizontal'
    ? figma.code`<ScrollArea className="w-full" aria-label="">${children || ''}
  <ScrollBar orientation="horizontal" />
</ScrollArea>`
    : figma.code`<ScrollArea className="h-72" aria-label="">${children || ''}
</ScrollArea>`,
  imports: [
    orientation === 'horizontal'
      ? 'import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"'
      : 'import { ScrollArea } from "@workspace/ui/components/scroll-area"',
  ],
  id: 'scroll-area',
  metadata: { nestable: false },
}
