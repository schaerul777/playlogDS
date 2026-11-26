// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=122-1133
// source=packages/ui-vue/src/components/ai-elements/Reasoning.vue
// component=Reasoning
import figma from 'figma'
const instance = figma.selectedInstance

// `running` is the code prop. `open` is Figma-only: in code Reasoning is open while running and closed when done;
// default-open only starts it open. `duration` ("Thought for 5s") is passed in seconds and is not drawn as a prop.
const running = instance.getEnum('running', { true: true, false: false })
const open = instance.getEnum('open', { true: true, false: false })
const thinking = instance.getString('thinking')
const runningAttr = running ? ' running' : ' :duration="5"'
const openAttr = open && !running ? ' default-open' : ''

export default {
  example: figma.code`<Trace>
  <Reasoning${runningAttr}${openAttr}>${thinking}</Reasoning>
</Trace>`,
  imports: [
    'import { Trace } from "@workspace/ui-vue/components/trace"',
    'import { Reasoning } from "@workspace/ui-vue/components/ai-elements"',
  ],
  id: 'reasoning',
  metadata: { nestable: true },
}
