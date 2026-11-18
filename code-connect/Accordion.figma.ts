// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-803
// source=packages/ui/src/components/accordion.tsx
// component=Accordion
import figma from 'figma'
const instance = figma.selectedInstance

// One item open at a time by default; add `multiple` to allow more.
const items = instance.getSlot('accordion')

export default {
  example: figma.code`<Accordion>${items || ''}</Accordion>`,
  imports: ['import { Accordion } from "@workspace/ui/components/accordion"'],
  id: 'accordion',
  metadata: { nestable: false },
}
