// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=77-620
// source=packages/ui/src/components/progress.tsx
// component=Progress
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')
// The value text is drawn in Figma; in code ProgressValue formats the `value` prop.
const valueText = instance.getString('value')
const value = parseInt(valueText, 10)

export default {
  example: figma.code`<Progress value={${isNaN(value) ? 0 : value}}>
  <ProgressLabel>${label}</ProgressLabel>
  <ProgressValue />
</Progress>`,
  imports: ['import { Progress, ProgressLabel, ProgressValue } from "@workspace/ui/components/progress"'],
  id: 'progress',
  metadata: { nestable: true },
}
