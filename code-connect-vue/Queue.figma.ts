// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=158-2997
// source=packages/ui-vue/src/components/ai-elements/Queue.vue
// component=Queue
import figma from 'figma'
const instance = figma.selectedInstance

// Read-only todo list. The completed section opening is Figma-only. Pass `todos`, each with a status of pending,
// in-progress or completed. Place it inside a <Trace>.
export default {
  example: figma.code`<Trace>
  <Queue :todos="todos" />
</Trace>`,
  imports: [
    'import { Queue } from "@workspace/ui-vue/components/ai-elements"',
    'import { Trace } from "@workspace/ui-vue/components/trace"',
  ],
  id: 'queue',
  metadata: { nestable: true },
}
