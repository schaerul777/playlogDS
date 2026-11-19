// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=142-1432
// source=packages/ui/src/components/input-otp.tsx
// component=InputOTP
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only: invalid and disabled are props, focus comes from the browser. The digits are the text of the slots.
// Built on the Base UI OTP Field: `length` replaces maxLength and slots take no index. Put it in a Field with a label.
const state = instance.getEnum('state', { default: 'default', focus: 'focus', filled: 'filled', invalid: 'invalid', disabled: 'disabled' })
const digits = instance
  .findLayers((layer) => layer.name === 'input-otp-slot-text')
  .map((layer) => (layer as { textContent: string }).textContent)
  .join('')
const valueAttr = digits ? figma.code` defaultValue="${digits}"` : ''
const invalidAttr = state === 'invalid' ? ' invalid' : ''
const disabledAttr = state === 'disabled' ? ' disabled' : ''
const group = (n: number) => '\n  <InputOTPGroup>' + '<InputOTPSlot />'.repeat(n) + '</InputOTPGroup>'

export default {
  example: figma.code`<Field>
  <FieldLabel htmlFor="code">Verification code</FieldLabel>
  <InputOTP id="code" length={6}${valueAttr}${invalidAttr}${disabledAttr}>${group(3)}
    <InputOTPSeparator />${group(3)}
  </InputOTP>
</Field>`,
  imports: [
    'import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@workspace/ui/components/input-otp"',
    'import { Field, FieldLabel } from "@workspace/ui/components/field"',
  ],
  id: 'input-otp',
  metadata: { nestable: false },
}
