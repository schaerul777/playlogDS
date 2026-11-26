import type { InjectionKey, Ref } from "vue"

// Playlog: true while an arrow key is moving focus inside a RadioGroup.
export const radioArrowNavKey: InjectionKey<Ref<boolean>> = Symbol("radioArrowNav")
