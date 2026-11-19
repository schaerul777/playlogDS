// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=121-1148
// source=packages/ui/src/components/trace.tsx
// component=TraceLine
import figma from 'figma'
const instance = figma.selectedInstance

// status="default" is a finished step: no `status` prop in code. The icon is TraceStatusIcon (running: Spinner,
// error: alert-circle, pending: time); for a finished step pass the glyph of the step through the `icon` swap.
const status = instance.getEnum('status', { default: '', running: 'running', error: 'error', pending: 'pending' })
const title = instance.getString('title')
const showChevron = instance.getBoolean('show chevron')
let iconCode
if (!status) {
  const icon = instance.getInstanceSwap('icon')
  if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example
  }
}
const statusAttr = status ? figma.code` status="${status}"` : ''
const iconLine = status
  ? figma.code`<TraceStatusIcon status="${status}" />`
  : iconCode
    ? figma.code`<TraceIcon>${iconCode}</TraceIcon>`
    : ''
const line = figma.code`<TraceLine${statusAttr}>
  ${iconLine}
  <TraceTitle>${title}</TraceTitle>
</TraceLine>`

export default {
  example: showChevron
    ? figma.code`<TraceCollapsible>
  <TraceCollapsibleTrigger>
    ${line}
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>{/* details */}</TraceCollapsibleContent>
</TraceCollapsible>`
    : line,
  imports: [
    'import { TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceIcon, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui/components/trace"',
  ],
  id: 'trace-line',
  metadata: { nestable: true },
}
