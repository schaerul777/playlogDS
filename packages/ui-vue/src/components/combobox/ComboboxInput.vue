<script setup lang="ts">
import type { ComboboxInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { InputGroup, InputGroupAddon, InputGroupButton } from "@workspace/ui-vue/components/input-group"
import { inputClass } from "../input/classes"
import { inputGroupControl } from "@workspace/ui-vue/components/input-group"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxAnchor, ComboboxCancel, ComboboxInput, ComboboxTrigger } from "reka-ui"
import { comboboxHasValueKey } from "./context"

defineOptions({ inheritAttrs: false })

// Playlog: an Input Group with the input, a clear button (only while there is a value) and a chevron trigger.
const props = withDefaults(
  defineProps<ComboboxInputProps & { class?: HTMLAttributes["class"]; disabled?: boolean; showTrigger?: boolean; showClear?: boolean }>(),
  { disabled: false, showTrigger: true, showClear: true },
)

const hasValue = inject(comboboxHasValueKey, undefined)
const inputProps = computed(() => ({ displayValue: props.displayValue, autoFocus: props.autoFocus, as: props.as, asChild: props.asChild }))
</script>

<template>
  <ComboboxAnchor as-child>
    <InputGroup :class="cn('w-auto', props.class)">
      <ComboboxInput
        v-bind="{ ...$attrs, ...inputProps }"
        :disabled="disabled"
        data-slot="input-group-control"
        :class="cn(inputClass, inputGroupControl, 'h-full')"
      />
      <InputGroupAddon align="inline-end">
        <ComboboxCancel v-if="showClear && hasValue" as-child :disabled="disabled">
          <InputGroupButton variant="ghost" size="icon-xs" aria-label="Clear selection" data-slot="combobox-clear">
            <Icon name="close" class="pointer-events-none" />
          </InputGroupButton>
        </ComboboxCancel>
        <ComboboxTrigger v-if="showTrigger" as-child :disabled="disabled">
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            aria-label="Show options"
            data-slot="combobox-trigger"
            class="data-[state=open]:bg-transparent"
          >
            <Icon name="chevron-down" class="pointer-events-none size-4 text-muted-foreground" />
          </InputGroupButton>
        </ComboboxTrigger>
      </InputGroupAddon>
      <slot />
    </InputGroup>
  </ComboboxAnchor>
</template>
