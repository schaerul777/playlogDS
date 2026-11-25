import { createContext } from "reka-ui"

// Shared by InputOTP and its slots. `nextIndex` hands each slot its position (its order inside the field), as Base UI does.
export const [injectInputOTPContext, provideInputOTPContext] = createContext<{
  invalid?: boolean
  describedBy?: string
  id?: string
  length?: number
  validationType: "numeric" | "alpha" | "alphanumeric" | "none"
  nextIndex: () => number
}>("InputOTP")
