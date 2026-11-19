// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=159-2616
// source=packages/ui/src/components/ai-elements/checkpoint.tsx
// component=Checkpoint
import figma from 'figma'
const instance = figma.selectedInstance

// `confirm` is Figma-only (the Alert Dialog that opens when Restore is pressed). Edit the label on the layer.
const labelLayer = instance.findText('checkpoint-label')
const label = labelLayer && 'textContent' in labelLayer ? labelLayer.textContent : 'Button renamed'

export default {
  example: figma.code`<Checkpoint label="${label}" onRestore={restore} />`,
  imports: ['import { Checkpoint } from "@workspace/ui/components/ai-elements/checkpoint"'],
  id: 'checkpoint',
  metadata: { nestable: true },
}
