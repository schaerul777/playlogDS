// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=159-2705
// source=packages/ui-vue/src/components/ai-elements/Subagent.vue
// component=Subagent
import figma from 'figma'
const instance = figma.selectedInstance

// `state` matches the code prop (running, done, error). `open` is Figma-only. The subagent's tool lines are the
// default slot (the Tool component); the text is slot `result` (done) or the `error` prop (error). Place it inside a <Trace>.
const state = instance.getEnum('state', { running: 'running', done: 'done', error: 'error' })
const open = instance.getEnum('open', { false: 'false', true: 'true' })
const done = state === 'done' && open === 'true'
const errorAttr = state === 'error' ? ' error="Error: the agent stopped after 3 tool calls."' : ''
const openAttr = done ? ' default-open' : ''
const result = done ? figma.code`
    <template #result><p>The cache is keyed on the commit SHA.</p></template>` : ''

export default {
  example: figma.code`<Trace>
  <Subagent name="research agent" state="${state}"${openAttr}${errorAttr}>
    <Tool state="done" command="grep -rn cacheKey scripts" />${result}
  </Subagent>
</Trace>`,
  imports: ['import { Subagent, Tool } from "@workspace/ui-vue/components/ai-elements"', 'import { Trace } from "@workspace/ui-vue/components/trace"'],
  id: 'subagent',
  metadata: { nestable: true },
}
