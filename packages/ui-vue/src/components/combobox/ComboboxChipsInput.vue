<script setup lang="ts">
import type { ComboboxInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { inject, ref, watch } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxInput } from "reka-ui"
import { comboboxChipsKey } from "./context"

defineOptions({ inheritAttrs: false })
const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes["class"] }>()
const chips = inject(comboboxChipsKey, undefined)
const input = ref<{ $el: HTMLInputElement } | null>(null)

// Playlog: clear the typed text after a pick, as React does in multiple mode.
if (chips) {
  watch(chips.picks, () => {
    if (input.value?.$el) input.value.$el.value = ""
  })
}

// Playlog: Backspace in an empty input removes the last chip (as in React).
function onBackspace(event: KeyboardEvent) {
  if ((event.target as HTMLInputElement).value === "") chips?.removeLast()
}
</script>

<template>
  <ComboboxInput
    ref="input"
    data-slot="combobox-chip-input"
    v-bind="$attrs"
    @keydown.backspace="onBackspace"
    :display-value="props.displayValue"
    :class="cn('min-w-16 flex-1 bg-transparent text-body-sm text-foreground outline-none placeholder:text-muted-foreground', props.class)"
  />
</template>
