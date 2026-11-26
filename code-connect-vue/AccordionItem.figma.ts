// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-802
// source=packages/ui-vue/src/components/accordion/AccordionItem.vue
// component=AccordionItem
import figma from 'figma'
const instance = figma.selectedInstance

// `open` and `state` are Figma-only, except disabled -> disabled. Which items are open comes from the Accordion value.
const title = instance.getString('title')
const content = instance.getString('content')
const disabled = instance.getEnum('state', { default: false, hover: false, focus: false, disabled: true })

export default {
  example: figma.code`<AccordionItem value="${title}"${disabled ? ' disabled' : ''}>
  <AccordionTrigger>${title}</AccordionTrigger>
  <AccordionContent>${content}</AccordionContent>
</AccordionItem>`,
  imports: ['import { AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui-vue/components/accordion"'],
  id: 'accordion-item',
  metadata: { nestable: true },
}
