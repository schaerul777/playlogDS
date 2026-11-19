// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=122-1133
// source=packages/ui/src/components/ai-elements/reasoning.tsx
// component=Reasoning
import figma from 'figma'
const instance = figma.selectedInstance

// `running` is the code prop. `open` is Figma-only: in code Reasoning is open while running and closed when done;
// defaultOpen only starts it open. `duration` ("Thought for 5s") is passed in seconds and is not drawn as a prop.
const running = instance.getEnum('running', { true: true, false: false })
const open = instance.getEnum('open', { true: true, false: false })
const thinking = instance.getString('thinking')
const runningAttr = running ? ' running' : ' duration={5}'
const openAttr = open && !running ? ' defaultOpen' : ''

export default {
  example: figma.code`<Trace>
  <Reasoning${runningAttr}${openAttr}>${thinking}</Reasoning>
</Trace>`,
  imports: [
    'import { Trace } from "@workspace/ui/components/trace"',
    'import { Reasoning } from "@workspace/ui/components/ai-elements/reasoning"',
  ],
  id: 'reasoning',
  metadata: { nestable: true },
}
