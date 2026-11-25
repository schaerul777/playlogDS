<script setup lang="ts">
// Playlog: COMPONENT-SPECS Input OTP. Built on Reka's PinInput (real inputs, one per slot), with the Base UI API of the
// React component. Export names stay shadcn's. Props follow Base UI:
//   <InputOTP :length="6" v-model="code" @value-complete="...">
//     <InputOTPGroup><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
//     <InputOTPSeparator />
//     <InputOTPGroup><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
//   </InputOTP>
// `length` replaces maxLength, `validation-type` replaces pattern, `@value-complete` replaces onComplete, the value is a
// string, and InputOTPSlot takes no `index`: a slot's position is its order inside the field.
// `id` goes on the first slot, so a <label for="..."> names the field. `invalid` and `aria-describedby` reach every slot.
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { PinInputRoot } from "reka-ui"
import { provideInputOTPContext } from "./context"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  /** Number of slots. Informational: the slots you render set the real count. */
  length?: number
  modelValue?: string
  defaultValue?: string
  /** `numeric` (default), `alpha`, `alphanumeric` or `none`. */
  validationType?: "numeric" | "alpha" | "alphanumeric" | "none"
  /** Hides the characters (password style). */
  mask?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  /** Marks every slot invalid (border `pl-danger-text`). Pair it with a FieldError and `aria-describedby`. */
  invalid?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  validationType: "numeric",
  modelValue: undefined,
  defaultValue: undefined,
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
  valueComplete: [value: string]
}>()

const attrs = useAttrs()
const numeric = computed(() => props.validationType === "numeric")

function toArray(value: string | undefined) {
  if (value === undefined) return undefined
  return numeric.value ? [...value].map((c) => Number(c)).filter((n) => !Number.isNaN(n)) : [...value]
}
// PinInputRoot is generic on `type`; in number mode it holds numbers, which its text typing does not show.
const arrayModel = computed(() => toArray(props.modelValue) as string[] | undefined)
const arrayDefault = computed(() => toArray(props.defaultValue) as string[] | undefined)

function onUpdate(value: (string | number | undefined)[] | undefined) {
  emit("update:modelValue", (value ?? []).join(""))
}
function onComplete(value: (string | number | undefined)[]) {
  emit("valueComplete", value.join(""))
}

let counter = 0
provideInputOTPContext({
  get invalid() { return props.invalid },
  get describedBy() { return attrs["aria-describedby"] as string | undefined },
  get id() { return props.id },
  get length() { return props.length },
  get validationType() { return props.validationType },
  nextIndex: () => counter++,
})

const rootAttrs = computed(() => {
  const { "aria-describedby": _d, ...rest } = attrs
  return rest
})
</script>

<template>
  <PinInputRoot
    data-slot="input-otp"
    :model-value="arrayModel"
    :default-value="arrayDefault"
    :type="numeric ? 'number' : 'text'"
    :mask="mask"
    :disabled="disabled"
    :required="required"
    :name="name"
    otp
    v-bind="rootAttrs"
    :class="cn(
      // Playlog: groups and separators sit 8 apart; a disabled field dims as a whole.
      'flex w-fit items-center gap-2',
      props.class,
    )"
    @update:model-value="onUpdate"
    @complete="onComplete"
  >
    <slot />
  </PinInputRoot>
</template>
