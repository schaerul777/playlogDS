<script setup lang="ts">
import type { DateValue } from "reka-ui"
import type { DateMatcher } from "./utils"
import { computed, ref, toRef, useAttrs } from "vue"
import { Calendar } from "@workspace/ui-vue/components/calendar"
import { Popover, PopoverContent } from "@workspace/ui-vue/components/popover"
import DatePickerTrigger from "./DatePickerTrigger.vue"
import { fromCalendarDate, matchesDate, toCalendarDate, useDateFormat } from "./utils"

defineOptions({ inheritAttrs: false })

// Playlog: COMPONENT-SPECS Date Picker. An Input-look trigger, a Popover and the Calendar. Dates are plain `Date`s.
const props = withDefaults(
  defineProps<{
    modelValue?: Date
    defaultValue?: Date
    id?: string
    placeholder?: string
    /** BCP 47 tag, for example `id-ID`. Month and day names, and the value format. */
    locale?: string
    /** Overrides the default `19 Nov 2026` format. */
    formatDate?: (date: Date) => string
    minDate?: Date
    maxDate?: Date
    /** Days that cannot be picked: a list of dates, or a function (booked dates, weekends). */
    disabledDates?: DateMatcher
    disabled?: boolean
    /** Invalid state: the border becomes `pl-danger-text`. Pair it with a FieldError and `aria-describedby`. */
    invalid?: boolean
    /** Adds a clear button while a value is set. */
    clearable?: boolean
    size?: "default" | "sm"
    class?: string
    /** Passed to the Calendar (for example `today`, `isDateUnavailable`, `labels`). */
    calendarProps?: Record<string, unknown>
  }>(),
  { modelValue: undefined, defaultValue: undefined, placeholder: "Select date", disabled: undefined, invalid: undefined, clearable: undefined, size: "default" },
)
const emit = defineEmits<{ "update:modelValue": [date: Date | undefined] }>()
const attrs = useAttrs()

const inner = ref<Date | undefined>(props.defaultValue)
const date = computed(() => (props.modelValue !== undefined ? props.modelValue : inner.value))
function setDate(next: Date | undefined) {
  if (props.modelValue === undefined) inner.value = next
  emit("update:modelValue", next)
}
const open = ref(false)
const format = useDateFormat(toRef(() => props.locale), toRef(() => props.formatDate))

const model = computed(() => (date.value ? toCalendarDate(date.value) : undefined))
function onSelect(value: DateValue | undefined) {
  const next = value ? fromCalendarDate(value) : undefined
  setDate(next)
  if (next) open.value = false
}
function isDisabled(day: DateValue) {
  const d = fromCalendarDate(day)
  return matchesDate(props.disabledDates, d)
}
</script>

<template>
  <Popover v-model:open="open">
    <DatePickerTrigger
      v-bind="attrs"
      :id="id"
      :label="date ? format(date) : undefined"
      :placeholder="placeholder"
      :size="size"
      :invalid="invalid"
      :clearable="clearable"
      :disabled="disabled"
      :class="props.class"
      @clear="setDate(undefined)"
    />
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        :model-value="model"
        :default-placeholder="model"
        :locale="locale"
        :min-value="minDate ? toCalendarDate(minDate) : undefined"
        :max-value="maxDate ? toCalendarDate(maxDate) : undefined"
        :is-date-disabled="isDisabled"
        initial-focus
        v-bind="calendarProps"
        @update:model-value="onSelect"
      />
    </PopoverContent>
  </Popover>
</template>
