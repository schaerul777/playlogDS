// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=76-587
// source=packages/ui/src/components/label.tsx
// component=Label
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
const required = instance.getBoolean('required')

export default {
  example: figma.code`<Label${required ? ' required' : ''}>${label}</Label>`,
  imports: ['import { Label } from "@workspace/ui/components/label"'],
  id: 'label',
  metadata: { nestable: true, props: { label, required } },
}
