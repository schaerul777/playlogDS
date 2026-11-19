// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=159-2561
// source=packages/ui/src/components/ai-elements/context.tsx
// component=Context
import figma from 'figma'
const instance = figma.selectedInstance

// `level` is Figma-only: the code derives it from `used` and `limit` (low under 75%, medium 75 to 89%, near-full
// 90% and above). The snippet shows a typical value for each level.
const level = instance.getEnum('level', { low: 'low', medium: 'medium', 'near-full': 'near-full' })
const used = level === 'low' ? 9660 : level === 'medium' ? 102400 : 121600

export default {
  example: figma.code`<Context used={${used}} limit={128000} />`,
  imports: ['import { Context } from "@workspace/ui/components/ai-elements/context"'],
  id: 'context',
  metadata: { nestable: true },
}
