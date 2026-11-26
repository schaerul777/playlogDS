import { createContext } from "reka-ui"
import type { ComputedRef } from "vue"

export type ChartContext = {
  config: ComputedRef<Record<string, { label?: string; color: string }>>
}
export const [injectChartContext, provideChartContext] = createContext<ChartContext>("ChartContainer")
