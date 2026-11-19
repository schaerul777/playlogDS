// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=124-1274
// source=packages/ui/src/components/ai-elements/inline-citation.tsx
// component=InlineCitation
import figma from 'figma'
const instance = figma.selectedInstance

// The hostname is the label of the nested Button (citation-button). The Hover Card is InlineCitationContent.
const button = instance.findInstance('citation-button')
let host = 'docs.example.com'
if (button && button.type === 'INSTANCE') {
  host = button.getString('label')
}

export default {
  example: figma.code`<InlineCitation source={{ url: "https://${host}", title: "Source title" }} />`,
  imports: ['import { InlineCitation } from "@workspace/ui/components/ai-elements/inline-citation"'],
  id: 'inline-citation',
  metadata: { nestable: true },
}
