<script setup lang="ts">
import type { DateValue } from "reka-ui"
import type { DateMatcher, DateRange, DateRangePreset } from "./utils"
import { computed, ref, toRef, useAttrs } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { Popover, PopoverContent } from "@workspace/ui-vue/components/popover"
import { RangeCalendar } from "@workspace/ui-vue/components/calendar"
import { useIsMobile } from "../sidebar/utils"
import DatePickerTrigger from "./DatePickerTrigger.vue"
import { fromCalendarDate, matchesDate, toCalendarDate, useDateFormat } from "./utils"

defineOptions({ inheritAttrs: false })

// Playlog: COMPONENT-SPECS Date Range Picker. The same trigger and Popover, two months from md, optional presets on the left.
const props = withDefaults(
  defineProps<{
    modelValue?: DateRange
    defaultValue?: DateRange
    id?: string
    placeholder?: string
    locale?: string
    formatDate?: (date: Date) => string
    minDate?: Date
    maxDate?: Date
    disabledDates?: DateMatcher
    disabled?: boolean
    invalid?: boolean
    clearable?: boolean
    size?: "default" | "sm"
    class?: string
    calendarProps?: Record<string, unknown>
    /** Optional shortcuts in a column on the left, for example `getDefaultDateRangePresets()`. */
    presets?: DateRangePreset[]
  }>(),
  { modelValue: undefined, defaultValue: undefined, placeholder: "Select dates", disabled: undefined, invalid: undefined, clearable: undefined, size: "default", presets: undefined },
)
const emit = defineEmits<{ "update:modelValue": [range: DateRange | undefined] }>()
const attrs = useAttrs()

const inner = ref<DateRange | undefined>(props.defaultValue)
const range = computed(() => (props.modelValue !== undefined ? props.modelValue : inner.value))
function setRange(next: DateRange | undefined) {
  if (props.modelValue === undefined) inner.value = next
  emit("update:modelValue", next)
}
const open = ref(false)
const format = useDateFormat(toRef(() => props.locale), toRef(() => props.formatDate))
const isMobile = useIsMobile()

const label = computed(() => {
  const r = range.value
  if (!r?.from) return undefined
  return r.to ? `${format.value(r.from)} – ${format.value(r.to)}` : format.value(r.from)
})

// The calendar holds a partly picked range (start only) while the popover is open; the value changes when it is complete.
const model = computed(() => ({
  start: range.value?.from ? toCalendarDate(range.value.from) : undefined,
  end: range.value?.to ? toCalendarDate(range.value.to) : undefined,
}))
function onSelect(value: { start?: DateValue; end?: DateValue }) {
  const next = { from: value.start ? fromCalendarDate(value.start) : undefined, to: value.end ? fromCalendarDate(value.end) : undefined }
  setRange(next.from || next.to ? next : undefined)
  if (next.from && next.to) open.value = false
}
function isDisabled(day: DateValue) {
  return matchesDate(props.disabledDates, fromCalendarDate(day))
}
</script>

<template>
  <Popover v-model:open="open">
    <DatePickerTrigger
      v-bind="attrs"
      :id="id"
      :label="label"
      :placeholder="placeholder"
      :size="size"
      :invalid="invalid"
      :clearable="clearable"
      :disabled="disabled"
      :class="props.class"
      @clear="setRange(undefined)"
    />
    <PopoverContent class="flex w-auto flex-row gap-0 p-0" align="start">
      <!-- Playlog: presets in a column on the left, ghost sm Buttons, a 1px border between them and the calendar. -->
      <div
        v-if="presets?.length"
        data-slot="date-range-presets"
        class="flex w-40 shrink-0 flex-col gap-1 border-r-(length:--pl-border-width) border-border p-2 max-md:hidden"
      >
        <Button
          v-for="preset in presets"
          :key="preset.label"
          variant="ghost"
          size="sm"
          class="justify-start"
          @click="
            () => {
              setRange(preset.range())
              open = false
            }
          "
        >
          {{ preset.label }}
        </Button>
      </div>
      <RangeCalendar
        :model-value="model"
        :default-placeholder="model.start"
        :number-of-months="isMobile ? 1 : 2"
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
