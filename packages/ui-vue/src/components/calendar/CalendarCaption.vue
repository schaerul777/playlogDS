<script setup lang="ts">
import type { DateValue } from "reka-ui"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { createYear, createYearRange, toDate } from "reka-ui/date"
import { useDateFormatter } from "reka-ui"

// Playlog: one month's caption. `label` is the text "November 2026" (14/20 semibold); the dropdown layouts show Select-sm looking
// month and year controls (32 high, 1px --input border, radius 4, 14/20 medium) over native selects.
const props = defineProps<{
  month: DateValue
  placeholder: DateValue
  layout: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  locale: string
  minValue?: DateValue
  maxValue?: DateValue
}>()
const emit = defineEmits<{ "update:placeholder": [value: DateValue] }>()

const formatter = useDateFormatter(props.locale)
const label = computed(() => formatter.custom(toDate(props.month), { month: "long", year: "numeric", calendar: props.month.calendar.identifier }))

const years = computed(() =>
  createYearRange({
    start: props.minValue ?? props.placeholder.cycle("year", -10),
    end: props.maxValue ?? props.placeholder.cycle("year", 10),
  }),
)
const months = computed(() => createYear({ dateObj: props.month }))
const showMonths = computed(() => props.layout === "dropdown" || props.layout === "dropdown-months")
const showYears = computed(() => props.layout === "dropdown" || props.layout === "dropdown-years")

function set(part: { month?: number; year?: number }) {
  emit("update:placeholder", props.placeholder.set(part))
}
const rootClass =
  "relative rounded-md border-(length:--pl-border-width) border-input bg-card has-focus-visible:outline-(length:--pl-focus-ring-width) has-focus-visible:outline-offset-(--pl-focus-ring-offset) has-focus-visible:outline-solid has-focus-visible:outline-ring"
const labelClass = "flex h-8 items-center gap-1 rounded-md px-2 text-body-sm font-medium text-foreground select-none [&>svg]:size-4 [&>svg]:text-muted-foreground"
</script>

<template>
  <div v-if="layout === 'label'" data-slot="calendar-caption" class="flex h-10 w-full items-center justify-center px-10">
    <span data-slot="calendar-caption-label" class="text-label text-foreground select-none" aria-live="polite">{{ label }}</span>
  </div>
  <div v-else data-slot="calendar-caption" class="flex h-10 w-full items-center justify-center px-10">
    <div class="flex h-10 w-full items-center justify-center gap-2">
    <span v-if="showMonths" :class="rootClass">
      <select
        class="absolute inset-0 cursor-pointer bg-popover opacity-0"
        aria-label="Choose the Month"
        :value="month.month"
        @change="set({ month: Number(($event.target as HTMLSelectElement).value) })"
      >
        <option v-for="m in months" :key="m.month" :value="m.month" :selected="m.month === month.month">
          {{ formatter.custom(toDate(m), { month: "short", calendar: m.calendar.identifier }) }}
        </option>
      </select>
      <span :class="cn(labelClass)" aria-hidden="true">
        {{ formatter.custom(toDate(month), { month: "short", calendar: month.calendar.identifier }) }}
        <Icon name="chevron-down" />
      </span>
    </span>
    <span v-else class="text-label text-foreground select-none">{{ formatter.custom(toDate(month), { month: "long", calendar: month.calendar.identifier }) }}</span>
    <span v-if="showYears" :class="rootClass">
      <select
        class="absolute inset-0 cursor-pointer bg-popover opacity-0"
        aria-label="Choose the Year"
        :value="month.year"
        @change="set({ year: Number(($event.target as HTMLSelectElement).value) })"
      >
        <option v-for="y in years" :key="y.year" :value="y.year" :selected="y.year === month.year">{{ y.year }}</option>
      </select>
      <span :class="cn(labelClass)" aria-hidden="true">
        {{ month.year }}
        <Icon name="chevron-down" />
      </span>
    </span>
    <span v-else class="text-label text-foreground select-none">{{ month.year }}</span>
    </div>
    <span class="sr-only" aria-live="polite">{{ label }}</span>
  </div>
</template>
