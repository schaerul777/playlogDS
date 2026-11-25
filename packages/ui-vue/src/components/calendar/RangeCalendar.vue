<script setup lang="ts">
import type { DateValue, RangeCalendarRootEmits, RangeCalendarRootProps } from "reka-ui"
import type { HTMLAttributes, Ref } from "vue"
import { getLocalTimeZone, today as todayDate } from "@internationalized/date"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
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
  calendarTodayClass,
  calendarWeekClass,
  calendarWeekdayClass,
  clampPlaceholder,
  focusInitialDay,
  isHiddenDay,
  isTodayValue,
  shortWeekday,
} from "./shared"

// Playlog: the range Calendar (React `Calendar mode="range"`). Value is `{ start, end }` of `@internationalized/date` DateValues.
const props = withDefaults(
  defineProps<
    RangeCalendarRootProps & {
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
const emits = defineEmits<RangeCalendarRootEmits>()

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
const inner = ref(clampPlaceholder((
  props.placeholder ??
    props.defaultPlaceholder ??
    (props.modelValue?.start as DateValue | undefined) ??
    (props.defaultValue?.start as DateValue | undefined) ??
    props.today ??
    todayDate(getLocalTimeZone())
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
  <RangeCalendarRoot
    ref="rootRef"
    v-slot="{ grid, weekDays }"
    v-bind="forwarded"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="cn(calendarRootClass, props.class)"
  >
    <div :class="calendarMonthsClass">
      <nav :class="calendarNavClass">
        <RangeCalendarPrev :class="calendarNavButtonClass" :aria-label="labels?.previous ?? 'Go to the Previous Month'">
          <Icon name="chevron-left" class="size-4 rtl:rotate-180" />
        </RangeCalendarPrev>
        <RangeCalendarNext :class="calendarNavButtonClass" :aria-label="labels?.next ?? 'Go to the Next Month'">
          <Icon name="chevron-right" class="size-4 rtl:rotate-180" />
        </RangeCalendarNext>
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
        <RangeCalendarGrid :class="calendarGridClass">
          <RangeCalendarGridHead>
            <RangeCalendarGridRow class="flex">
              <RangeCalendarHeadCell v-for="day in weekDays" :key="day" :class="calendarWeekdayClass">{{ shortWeekday(day, locale) }}</RangeCalendarHeadCell>
            </RangeCalendarGridRow>
          </RangeCalendarGridHead>
          <RangeCalendarGridBody>
            <RangeCalendarGridRow v-for="(weekDates, index) in month.rows" :key="`week-${index}`" :class="calendarWeekClass">
              <RangeCalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" :class="calendarCellClass">
                <RangeCalendarCellTrigger
                  v-if="!isHiddenDay(weekDate, minValue as DateValue | undefined, maxValue as DateValue | undefined)"
                  :data-pl-today="isTodayValue(weekDate, today) ? '' : undefined"
                  :day="weekDate"
                  :month="month.value"
                  as="button"
                  data-slot="calendar-day"
                  :class="
                    cn(
                      calendarDayClass,
                      // Playlog: range ends are primary (outer side radius 4, inner side square); the middle is pl-surface-selected
                      // with pl-ink-heading and no radius so the band is continuous.
                      'data-[selection-start]:rounded-l-(--cell-radius) data-[selection-start]:rounded-r-none data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary-hover data-[selection-start]:hover:text-primary-foreground',
                      'data-[selection-end]:rounded-l-none data-[selection-end]:rounded-r-(--cell-radius) data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary-hover data-[selection-end]:hover:text-primary-foreground',
                      'not-data-[selection-start]:not-data-[selection-end]:data-[selected]:rounded-none not-data-[selection-start]:not-data-[selection-end]:data-[selected]:bg-surface-selected not-data-[selection-start]:not-data-[selection-end]:data-[selected]:text-ink-heading not-data-[selection-start]:not-data-[selection-end]:data-[selected]:hover:bg-surface-selected not-data-[selection-start]:not-data-[selection-end]:data-[selected]:hover:text-ink-heading',
                      isTodayValue(weekDate, today) && calendarTodayClass,
                    )
                  "
                />
              </RangeCalendarCell>
            </RangeCalendarGridRow>
          </RangeCalendarGridBody>
        </RangeCalendarGrid>
      </div>
    </div>
  </RangeCalendarRoot>
</template>
