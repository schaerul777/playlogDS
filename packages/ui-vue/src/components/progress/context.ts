import type { ComputedRef, Ref } from "vue"
import { createContext } from "reka-ui"

// Shares the value with ProgressValue and the label id with the root (aria-labelledby), as Base UI's Progress does.
export const [injectProgressContext, provideProgressContext] = createContext<{
  percent: ComputedRef<number | null>
  labelId: Ref<string | undefined>
}>("Progress")
