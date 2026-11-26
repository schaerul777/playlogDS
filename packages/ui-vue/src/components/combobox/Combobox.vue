<script setup lang="ts">
import type { AcceptableValue, ComboboxRootEmits, ComboboxRootProps } from "reka-ui"
import { computed, provide, ref } from "vue"
import { ComboboxRoot, useForwardPropsEmits } from "reka-ui"
import { comboboxChipsKey, comboboxHasValueKey } from "./context"

const props = defineProps<ComboboxRootProps>()
const emits = defineEmits<ComboboxRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

// Playlog: the wrapper always controls the root, so it knows the value (clear button, chips) in both v-model and
// uncontrolled use, and `reset-search-term-on-select` keeps its default.
type Model = AcceptableValue | AcceptableValue[] | undefined
const local = ref<Model>(props.defaultValue as Model)
const current = computed<Model>(() => (props.modelValue !== undefined ? (props.modelValue as Model) : local.value))
// Playlog: React clears the typed text after a pick in multiple mode; own the search term so we can do the same.
const searchTerm = ref("")
const picks = ref(0)
function set(value: Model) {
  if (props.multiple) {
    searchTerm.value = ""
    picks.value++
  }
  local.value = value
  ;(emits as unknown as (event: "update:modelValue", value: Model) => void)("update:modelValue", value)
}

provide(
  comboboxHasValueKey,
  computed(() =>
    Array.isArray(current.value) ? current.value.length > 0 : current.value !== undefined && current.value !== null && current.value !== "",
  ),
)
const values = computed(() => (Array.isArray(current.value) ? current.value : []))
provide(comboboxChipsKey, {
  values,
  picks,
  remove: (value) => set(values.value.filter((v) => v !== value) as AcceptableValue[]),
  removeLast: () => set(values.value.slice(0, -1) as AcceptableValue[]),
})
</script>

<template>
  <ComboboxRoot v-slot="slotProps" data-slot="combobox" v-bind="forwarded" :model-value="current" v-model:search-term="searchTerm" @update:model-value="set">
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
