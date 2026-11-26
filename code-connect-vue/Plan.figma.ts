// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=158-2694
// source=packages/ui-vue/src/components/ai-elements/Plan.vue
// component=Plan
import figma from 'figma'
const instance = figma.selectedInstance

// `open` is Figma-only (the plan opens and closes). The title and steps are data: pass `title` and `steps`
// (each step's `state` is done, running, pending, error or skipped). Place it inside a <Trace>.
const open = instance.getEnum('open', { false: 'false', true: 'true' })
const defaultOpen = open === 'false' ? ' :default-open="false"' : ''

export default {
  example: figma.code`<Trace>
  <Plan title="Plan: migrate to Reka UI" :steps="steps"${defaultOpen} />
</Trace>`,
  imports: [
    'import { Plan } from "@workspace/ui-vue/components/ai-elements"',
    'import { Trace } from "@workspace/ui-vue/components/trace"',
  ],
  id: 'plan',
  metadata: { nestable: true },
}
