// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=158-2792
// source=packages/ui/src/components/ai-elements/task.tsx
// component=Task
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only: running and error are the code `status` prop, done has none. `open` is Figma-only.
// Steps are TaskStep children. Place it inside a <Trace>.
const state = instance.getEnum('state', { running: 'running', error: 'error', done: 'done' })
const open = instance.getEnum('open', { false: 'false', true: 'true' })
const status = state === 'done' ? '' : ` status="${state}"`
const defaultOpen = state === 'done' && open === 'true' ? ' defaultOpen' : ''

export default {
  example: figma.code`<Trace><Task title="Updating the page metadata"${status}${defaultOpen}><TaskStep title="Searched for app/page.tsx" /></Task></Trace>`,
  imports: ['import { Task, TaskStep } from "@workspace/ui/components/ai-elements/task"', 'import { Trace } from "@workspace/ui/components/trace"'],
  id: 'task',
  metadata: { nestable: true },
}
