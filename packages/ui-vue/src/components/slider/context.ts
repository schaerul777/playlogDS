import type { ComputedRef, InjectionKey } from "vue"

export const sliderValuesKey: InjectionKey<ComputedRef<number[]>> = Symbol("sliderValues")
