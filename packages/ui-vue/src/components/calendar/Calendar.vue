<script setup lang="ts">
import type { CalendarRootEmits, CalendarRootProps, DateValue } from "reka-ui"
import type { HTMLAttributes, Ref } from "vue"
import { getLocalTimeZone, today as todayDate } from "@internationalized/date"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  useForwardPropsEmits,
  useLocale,
} from "reka-ui"
import { computed, nextTick, onMounted, ref, toRef } from "vue"
import CalendarCaption from "./CalendarCaption.vue"
import {
  calendarCellClass,
  calendarDayClass,
  calendarGridClass,
  calendarMonthClass,
  calendarMonthsClass,
  calendarNavButtonClass,
  calendarNavClass,
  calendarRootClass,
  calendarSelectedClass,
  calendarTodayClass,
  calendarWeekClass,
  calendarWeekdayClass,
  clampPlaceholder,
  focusInitialDay,
  isHiddenDay,
  isTodayValue,
  shortWeekday,
} from "./shared"

// Playlog: the single-date Calendar (React `Calendar mode="single"`). Values are `@internationalized/date` DateValues (CalendarDate).
const props = withDefaults(
  defineProps<
    CalendarRootProps & {
      class?: HTMLAttributes["class"]
      captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
      /** Fixes the day that is marked as today (Reka always uses the real date). */
      today?: DateValue
      /** Accessible names of the month arrows. */
      labels?: { previous?: string; next?: string }
    }
  >(),
  {
    modelValue: undefined,
    weekStartsOn: 1, // Playlog: Monday (agreed).
    weekdayFormat: "short",
    captionLayout: "label",
    numberOfMonths: 1,
    fixedWeeks: undefined,
  },
)
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, captionLayout: _layout, today: _today, labels: _labels, placeholder: _placeholder, initialFocus: _focus, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const locale = useLocale(toRef(() => props.locale))
const rootRef = ref<{ $el: HTMLElement } | null>(null)
onMounted(() => {
  if (props.initialFocus) void nextTick(() => focusInitialDay(rootRef.value?.$el))
})
// The visible month: controlled by `v-model:placeholder`, else ours (starts at `defaultPlaceholder`, the selected day or today).
const inner = ref(clampPlaceholder((
  props.placeholder ?? props.defaultPlaceholder ?? (props.modelValue as DateValue | undefined) ?? (props.defaultValue as DateValue | undefined) ?? props.today ?? todayDate(getLocalTimeZone())
) as DateValue, props.numberOfMonths ?? 1, props.minValue as DateValue | undefined, props.maxValue as DateValue | undefined)) as Ref<DateValue>
const placeholder = computed<DateValue>({
  get: () => ((props.placeholder as DateValue | undefined) ?? inner.value) as DateValue,
  set: (value: DateValue) => {
    inner.value = value
    emits("update:placeholder", value)
  },
})
</script>

<template>
  <CalendarRoot
    ref="rootRef"
    v-slot="{ grid, weekDays }"
    v-bind="forwarded"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="cn(calendarRootClass, props.class)"
  >
    <div :class="calendarMonthsClass">
      <nav :class="calendarNavClass">
        <CalendarPrev :class="calendarNavButtonClass" :aria-label="labels?.previous ?? 'Go to the Previous Month'">
          <Icon name="chevron-left" class="size-4 rtl:rotate-180" />
        </CalendarPrev>
        <CalendarNext :class="calendarNavButtonClass" :aria-label="labels?.next ?? 'Go to the Next Month'">
          <Icon name="chevron-right" class="size-4 rtl:rotate-180" />
        </CalendarNext>
      </nav>
      <div v-for="month in grid" :key="month.value.toString()" :class="calendarMonthClass">
        <CalendarCaption
          v-model:placeholder="placeholder"
          :month="month.value"
          :layout="grid.length === 1 ? captionLayout : 'label'"
          :locale="locale"
          :min-value="minValue"
          :max-value="maxValue"
        />
        <CalendarGrid :class="calendarGridClass">
          <CalendarGridHead>
            <CalendarGridRow class="flex">
              <CalendarHeadCell v-for="day in weekDays" :key="day" :class="calendarWeekdayClass">{{ shortWeekday(day, locale) }}</CalendarHeadCell>
            </CalendarGridRow>
          </CalendarGridHead>
          <CalendarGridBody>
            <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`week-${index}`" :class="calendarWeekClass">
              <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" :class="calendarCellClass">
                <CalendarCellTrigger
                  v-if="!isHiddenDay(weekDate, minValue as DateValue | undefined, maxValue as DateValue | undefined)"
                  :data-pl-today="isTodayValue(weekDate, today) ? '' : undefined"
                  :day="weekDate"
                  :month="month.value"
                  as="button"
                  data-slot="calendar-day"
                  :class="cn(calendarDayClass, calendarSelectedClass, isTodayValue(weekDate, today) && calendarTodayClass)"
                />
              </CalendarCell>
            </CalendarGridRow>
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </div>
  </CalendarRoot>
</template>
