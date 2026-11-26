// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=159-2907
// source=packages/ui-vue/src/components/ai-elements/ModelSelector.vue
// component=ModelSelector
import figma from 'figma'
const instance = figma.selectedInstance

// `open` is Figma-only (none, the model menu or the effort menu). The component renders both menus; pass the
// provider list and bind the current model and effort with v-model:model and v-model:effort. It goes in the
// default slot (the toolbar) of PromptInput.
export default {
  example: figma.code`<PromptInput>
  <ModelSelector :providers="providers" v-model:model="model" v-model:effort="effort" />
</PromptInput>`,
  imports: ['import { ModelSelector, PromptInput } from "@workspace/ui-vue/components/ai-elements"'],
  id: 'model-selector',
  metadata: { nestable: true },
}
