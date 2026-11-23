import type { ComputedRef, InjectionKey } from "vue"
import type { ToggleVariants } from "@workspace/ui-vue/components/toggle"

export type ToggleGroupContext = { variant?: ToggleVariants["variant"]; size?: ToggleVariants["size"]; spacing: number }
export const toggleGroupKey: InjectionKey<ComputedRef<ToggleGroupContext>> = Symbol("toggleGroup")
