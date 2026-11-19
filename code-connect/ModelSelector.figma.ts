// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=159-2907
// source=packages/ui/src/components/ai-elements/model-selector.tsx
// component=ModelSelector
import figma from 'figma'
const instance = figma.selectedInstance

// `open` is Figma-only (none, the model menu or the effort menu). The component renders both menus; pass the
// provider list and the current model and effort. It goes in the PromptInput toolbar slot.
export default {
  example: figma.code`<PromptInput><ModelSelector providers={providers} model={model} onModelChange={setModel} effort={effort} onEffortChange={setEffort} /></PromptInput>`,
  imports: ['import { ModelSelector } from "@workspace/ui/components/ai-elements/model-selector"', 'import { PromptInput } from "@workspace/ui/components/ai-elements/prompt-input"'],
  id: 'model-selector',
  metadata: { nestable: true },
}
