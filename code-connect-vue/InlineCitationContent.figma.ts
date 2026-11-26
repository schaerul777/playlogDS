// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=124-1283
// source=packages/ui-vue/src/components/ai-elements/InlineCitation.vue
// component=InlineCitation
import figma from 'figma'
const instance = figma.selectedInstance

// The Hover Card content of an Inline Citation: title, description and link come from the source.
const title = instance.getString('title')
const description = instance.getString('description')
const link = instance.getString('link')

export default {
  example: figma.code`<InlineCitation
  :source="{
    url: 'https://${link}',
    title: '${title}',
    description: '${description}',
  }"
/>`,
  imports: ['import { InlineCitation } from "@workspace/ui-vue/components/ai-elements"'],
  id: 'inline-citation-content',
  metadata: { nestable: false },
}
