import type { ComputedRef, InjectionKey, Ref } from "vue"

// Playlog: whether the combobox has a selected value (the clear button shows only then, as in React).
export const comboboxHasValueKey: InjectionKey<ComputedRef<boolean>> = Symbol("comboboxHasValue")

// Playlog: multiple selection helpers for chips (remove one value, remove the last on Backspace in an empty input).
export type ComboboxChipsContext = { remove: (value: unknown) => void; removeLast: () => void; values: ComputedRef<unknown[]>; picks: Ref<number> }
export const comboboxChipsKey: InjectionKey<ComboboxChipsContext> = Symbol("comboboxChips")
