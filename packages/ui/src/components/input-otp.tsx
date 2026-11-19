import * as React from "react"
import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Input OTP. Built on the Base UI OTP Field (stable in @base-ui/react 1.9.0), not the `input-otp`
// package, so there is no new dependency. The export names stay shadcn's; the props follow Base UI:
//   <Field><FieldLabel>Verification code</FieldLabel>
//     <InputOTP length={6} onValueComplete={...}>
//       <InputOTPGroup><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
//       <InputOTPSeparator />
//       <InputOTPGroup><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
//     </InputOTP></Field>
// `length` (required) replaces maxLength, `validationType` replaces pattern, `onValueComplete` replaces onComplete, and
// InputOTPSlot takes no `index`: a slot's position is its order inside the field.
// The field's label names the first slot, so a label (Field or <label>) is required. Numeric, one-time-code autofill, paste,
// Backspace and arrow navigation are Base UI behaviour; there is one tab stop.
// Playlog: our Field is a plain wrapper, so the invalid state and the id of the error text are props here and reach every slot.
const InputOTPContext = React.createContext<{ invalid?: boolean; describedBy?: string }>({})

function InputOTP({
  className,
  children,
  invalid,
  "aria-describedby": describedBy,
  ...props
}: OTPFieldPrimitive.Root.Props & {
  /** Marks every slot invalid (border `pl-danger-text`). Pair it with a FieldError and `aria-describedby`. */
  invalid?: boolean
}) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="input-otp"
      // Playlog: groups and separators sit 8 apart; a disabled field dims as a whole.
      className={cn("flex w-fit items-center gap-2", className)}
      {...props}
    >
      <InputOTPContext.Provider value={{ invalid, describedBy }}>
        {children}
      </InputOTPContext.Provider>
    </OTPFieldPrimitive.Root>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function InputOTPSlot({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  const { invalid, describedBy } = React.useContext(InputOTPContext)

  return (
    <OTPFieldPrimitive.Input
      data-slot="input-otp-slot"
      aria-invalid={invalid ? true : undefined}
      data-invalid={invalid ? "" : undefined}
      aria-describedby={describedBy}
      className={cn(
        // Playlog: each slot looks like an Input: 40x40, radius 4, card fill, 1px --input border, 14/20 foreground, centred.
        "size-10 min-w-0 rounded-md border-(length:--pl-border-width) border-input bg-card p-0 text-center text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out",
        // Playlog: hover darkens the border to ink; the active slot takes the 2px ring, 2px offset.
        "hover:border-foreground outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
        // Playlog: disabled is 40%; invalid is pl-danger-text (the same token as Input), the ring stays --ring.
        "disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled) aria-invalid:border-danger-text data-invalid:border-danger-text",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSeparator({
  className,
  ...props
}: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      data-slot="input-otp-separator"
      // Playlog: a 12x1px --input line between groups, no glyph.
      className={cn("h-(--pl-border-width) w-3 shrink-0 bg-input", className)}
      {...props}
    />
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
