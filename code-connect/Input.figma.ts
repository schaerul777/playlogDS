// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=12-121
// source=packages/ui/src/components/input.tsx
// component=Input
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('placeholder')
// `state` is Figma-only (CSS :hover / :focus-visible / :disabled), except invalid -> aria-invalid.
const invalid = instance.getEnum('state', {
  default: false,
  hover: false,
  focus: false,
  disabled: false,
  invalid: true,
})

export default {
  example: figma.code`<Input placeholder="${placeholder}"${invalid ? ' aria-invalid' : ''} />`,
  imports: ['import { Input } from "@workspace/ui/components/input"'],
  id: 'input',
  metadata: { nestable: true },
}
