// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=120-1119
// source=packages/ui-vue/src/components/ai-elements/Suggestion.vue
// component=Suggestion
import figma from 'figma'
const instance = figma.selectedInstance

// The prompt is the label of the nested Button (suggestion-button).
const button = instance.findInstance('suggestion-button')
let label = 'Suggestion'
if (button && button.type === 'INSTANCE') {
  label = button.getString('label')
}

export default {
  example: figma.code`<Suggestion suggestion="${label}" @suggestion-click="send" />`,
  imports: ['import { Suggestion } from "@workspace/ui-vue/components/ai-elements"'],
  id: 'suggestion',
  metadata: { nestable: true },
}
