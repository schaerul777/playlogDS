// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=124-1195
// source=packages/ui-vue/src/components/ai-elements/Confirmation.vue
// component=Confirmation
import figma from 'figma'
const instance = figma.selectedInstance

// Title and description are the props of the nested Item (confirmation-item); the glyph is its media.
const disabled = instance.getEnum('disabled', { true: true, false: false })
let title = 'Run pnpm build?'
let description = ''
const item = instance.findInstance('confirmation-item')
if (item && item.type === 'INSTANCE') {
  title = item.getString('title')
  description = item.getString('description')
}

export default {
  example: figma.code`<Confirmation
  title="${title}"${description ? figma.code`
  description="${description}"` : ''}${disabled ? '\n  disabled' : ''}
  @approve="approve"
  @deny="deny"
/>`,
  imports: ['import { Confirmation } from "@workspace/ui-vue/components/ai-elements"'],
  id: 'confirmation',
  metadata: { nestable: true },
}
