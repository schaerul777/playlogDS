// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=122-1210
// source=packages/ui/src/components/ai-elements/tool.tsx
// component=Tool
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is the code prop. `open` is Figma-only (defaultOpen; a failed call opens by default). The output is the
// code of the nested Code Block (tool-output), present when the call is open.
const state = instance.getEnum('state', {
  running: 'running',
  pending: 'pending',
  denied: 'denied',
  done: 'done',
  error: 'error',
})
const open = instance.getEnum('open', { true: true, false: false })
const command = instance.getString('command')
const out = instance.findInstance('tool-output')
const outputAttr =
  out && out.type === 'INSTANCE'
    ? figma.code` output={${JSON.stringify(out.getString('code'))}}`
    : ''
const openAttr = open && state !== 'error' ? ' defaultOpen' : ''

export default {
  example: figma.code`<Trace>
  <Tool state="${state}" command="${command}"${outputAttr}${openAttr} />
</Trace>`,
  imports: [
    'import { Trace } from "@workspace/ui/components/trace"',
    'import { Tool } from "@workspace/ui/components/ai-elements/tool"',
  ],
  id: 'tool',
  metadata: { nestable: true },
}
