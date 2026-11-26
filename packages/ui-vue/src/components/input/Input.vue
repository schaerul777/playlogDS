<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { inputClass } from "./classes"

const props = defineProps<{
  defaultValue?: string | number
  class?: HTMLAttributes["class"]
}>()

// Playlog: native defineModel instead of @vueuse/core useVModel (no extra dependency).
// Works controlled (v-model) and uncontrolled (defaultValue).
const modelValue = defineModel<string | number>()
if (modelValue.value === undefined && props.defaultValue !== undefined) {
  modelValue.value = props.defaultValue
}
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="
      cn(inputClass, props.class)
    "
  />
</template>
