// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=158-2894
// source=packages/ui/src/components/ai-elements/chain-of-thought.tsx
// component=ChainOfThought
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only: running is the `running` prop and failed is the `failed` count. `open` is Figma-only
// (it opens while running by itself). Steps are ChainOfThoughtStep children. Place it inside a <Trace>.
const state = instance.getEnum('state', { running: 'running', done: 'done', failed: 'failed' })
const attrs = state === 'running' ? ' running' : state === 'failed' ? ' failed={1}' : ''

export default {
  example: figma.code`<Trace><ChainOfThought${attrs}><ChainOfThoughtStep title="Read the build log" icon="terminal" /></ChainOfThought></Trace>`,
  imports: ['import { ChainOfThought, ChainOfThoughtStep } from "@workspace/ui/components/ai-elements/chain-of-thought"', 'import { Trace } from "@workspace/ui/components/trace"'],
  id: 'chain-of-thought',
  metadata: { nestable: true },
}
