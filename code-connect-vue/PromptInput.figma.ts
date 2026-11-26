// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=125-1421
// source=packages/ui-vue/src/components/ai-elements/PromptInput.vue
// component=PromptInput
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only; it maps to the code `status` (empty and filled are "ready"). The text of a filled or streaming
// field is default-text. Attachments are added by the person; a Model Selector goes in the default slot (toolbar).
const state = instance.getEnum('state', {
  empty: 'ready',
  filled: 'ready',
  streaming: 'streaming',
  disabled: 'disabled',
})
const textLayer = instance.findText('prompt-input-text')
const text = textLayer && 'textContent' in textLayer ? textLayer.textContent : ''
const statusAttr = state !== 'ready' ? figma.code` status="${state}"` : ''
const isPlaceholder = state === 'disabled' || text === 'Message the assistant'
const textAttr = text && !isPlaceholder ? figma.code` :default-text='${JSON.stringify(text)}'` : ''

export default {
  example: figma.code`<PromptInput${statusAttr}${textAttr} @submit="send" @stop="stop" />`,
  imports: ['import { PromptInput } from "@workspace/ui-vue/components/ai-elements"'],
  id: 'prompt-input',
  metadata: { nestable: false },
}
