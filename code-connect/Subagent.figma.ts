// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=159-2705
// source=packages/ui/src/components/ai-elements/subagent.tsx
// component=Subagent
import figma from 'figma'
const instance = figma.selectedInstance

// `state` matches the code prop (running, done, error). `open` is Figma-only. The subagent's tool lines are the
// children (the Tool component); `result` and `error` hold the text. Place it inside a <Trace>.
const state = instance.getEnum('state', { running: 'running', done: 'done', error: 'error' })
const open = instance.getEnum('open', { false: 'false', true: 'true' })
const extra = state === 'done' && open === 'true' ? ' defaultOpen result={<p>The cache is keyed on the commit SHA.</p>}' : state === 'error' ? ' error="Error: the agent stopped after 3 tool calls."' : ''

export default {
  example: figma.code`<Trace><Subagent name="research agent" state="${state}"${extra}><Tool state="done" command="grep -rn cacheKey scripts" /></Subagent></Trace>`,
  imports: ['import { Subagent } from "@workspace/ui/components/ai-elements/subagent"', 'import { Tool } from "@workspace/ui/components/ai-elements/tool"', 'import { Trace } from "@workspace/ui/components/trace"'],
  id: 'subagent',
  metadata: { nestable: true },
}
