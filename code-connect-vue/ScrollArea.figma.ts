// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=102-1227
// source=packages/ui-vue/src/components/scroll-area/ScrollArea.vue
// component=ScrollArea
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only (hover, scrolling and focus come from Base UI and the browser).
const orientation = instance.getEnum('orientation', { vertical: 'vertical', horizontal: 'horizontal' })
const children = instance.getSlot('scroll-area-viewport')

export default {
  example: orientation === 'horizontal'
    ? figma.code`<ScrollArea class="w-full" aria-label="">${children || ''}
  <ScrollBar orientation="horizontal" />
</ScrollArea>`
    : figma.code`<ScrollArea class="h-72" aria-label="">${children || ''}
</ScrollArea>`,
  imports: [
    orientation === 'horizontal'
      ? 'import { ScrollArea, ScrollBar } from "@workspace/ui-vue/components/scroll-area"'
      : 'import { ScrollArea } from "@workspace/ui-vue/components/scroll-area"',
  ],
  id: 'scroll-area',
  metadata: { nestable: false },
}
