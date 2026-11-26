// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=159-2561
// source=packages/ui-vue/src/components/ai-elements/Context.vue
// component=Context
import figma from 'figma'
const instance = figma.selectedInstance

// `level` is Figma-only: the code derives it from `used` and `limit` (low under 75%, medium 75 to 89%, near-full
// 90% and above). The snippet shows a typical value for each level.
const level = instance.getEnum('level', { low: 'low', medium: 'medium', 'near-full': 'near-full' })
const used = level === 'low' ? 9660 : level === 'medium' ? 102400 : 121600

export default {
  example: figma.code`<Context :used="${used}" :limit="128000" />`,
  imports: ['import { Context } from "@workspace/ui-vue/components/ai-elements"'],
  id: 'context',
  metadata: { nestable: true },
}
