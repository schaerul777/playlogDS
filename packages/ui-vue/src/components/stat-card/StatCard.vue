<script setup lang="ts">
// Playlog: hand built (no shadcn-vue source). Same props as the React StatCard; the `icon` node is the `icon` slot,
// and `label`, `value`, `delta` and `footer` can also be given as slots when they need markup.
import type { HTMLAttributes } from "vue"
import type { StatCardDeltaVariants } from "."
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { computed, useSlots } from "vue"
import { statCardDeltaVariants } from "."

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Metric name, for example "Impressions". */
  label?: string | number
  /** The figure. Rendered with tabular numbers. */
  value?: string | number
  /** Change versus the comparison period, for example "+8,2%". Coloured by `trend`. */
  delta?: string | number
  trend?: StatCardDeltaVariants["trend"]
  /** Unit, period and source, for example "Q1–Q3 2025 · 25 cities". */
  footer?: string | number
}>()

const slots = useSlots()
const hasDelta = computed(() => props.delta != null || !!slots.delta)
const hasFooter = computed(() => hasDelta.value || props.footer != null || !!slots.footer)
</script>

<template>
  <div
    data-slot="stat-card"
    :class="cn(
      // Playlog: COMPONENT-SPECS StatCard. Card fill, 1px border, 8px radius, padding 16 24, gap 8.
      'flex flex-col gap-2 rounded-lg border-(length:--pl-border-width) border-border bg-card px-6 py-4 text-card-foreground',
      props.class,
    )"
  >
    <div data-slot="stat-card-header" class="flex items-center justify-between gap-2">
      <span data-slot="stat-card-label" class="text-label text-muted-foreground">
        <slot name="label">{{ label }}</slot>
      </span>
      <span
        v-if="$slots.icon"
        data-slot="stat-card-icon"
        aria-hidden="true"
        class="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-ink-heading [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--pl-icon-size)"
      >
        <!-- Playlog: 32px tile, 4px radius, surface-hover fill, ink-heading icon at 20px. -->
        <slot name="icon" />
      </span>
    </div>
    <!-- Playlog: kpi 36/40 extra-bold with -1% tracking (from the kpi token), tabular numbers. -->
    <div data-slot="stat-card-value" class="text-kpi text-ink-heading tabular-nums">
      <slot name="value">{{ value }}</slot>
    </div>
    <div
      v-if="hasFooter"
      data-slot="stat-card-footer"
      class="flex flex-wrap items-baseline gap-x-2 text-caption text-muted-foreground"
    >
      <span
        v-if="hasDelta"
        data-slot="stat-card-delta"
        :data-trend="trend ?? 'neutral'"
        :class="statCardDeltaVariants({ trend })"
      >
        <slot name="delta">{{ delta }}</slot>
      </span>
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>
