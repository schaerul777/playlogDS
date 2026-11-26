<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref, useId } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui-vue/components/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@workspace/ui-vue/components/empty"
import { Skeleton } from "@workspace/ui-vue/components/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui-vue/components/table"
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui-vue/components/toggle-group"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

export type ChartPanelState = "ready" | "loading" | "empty" | "error"
export type ChartPanelColumn = {
  key: string
  label: string
  /** Format the cell, for example with `idNumber`. Numbers are right-aligned. */
  format?: (value: number) => string
}

// Playlog: COMPONENT-SPECS Charts, frame and states. Our Card around a chart: title, description, optional actions and a
// "Chart | Table" toggle (the accessible table of the same data) in the header. `summary` is one sentence for screen readers,
// linked to the plot. States replace the plot: loading (Skeleton blocks, `aria-busy`), empty (Empty) and error (Empty with
// "Try again", emitted as `retry`); the toggle stays available when there is data.
const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    /** One sentence describing the chart for screen readers. */
    summary: string
    state?: ChartPanelState
    /** The data for the Table view. Without them there is no toggle. */
    columns?: ChartPanelColumn[]
    rows?: Record<string, string | number>[]
    /** Shows "Try again" in the error state. Pass `@retry` to handle it. */
    retryable?: boolean
    emptyMessage?: string
    errorMessage?: string
    class?: HTMLAttributes["class"]
  }>(),
  { state: "ready", emptyMessage: "No data for this period", errorMessage: "The chart could not be loaded" },
)
defineEmits<{ retry: [] }>()

const view = ref<"chart" | "table">("chart")
const summaryId = useId()
const hasTable = computed(() => Boolean(props.columns?.length && props.rows?.length))
const heights = ["h-24", "h-40", "h-32", "h-48", "h-36", "h-44"]
function onView(next: unknown) {
  if (next === "chart" || next === "table") view.value = next
}
</script>

<template>
  <Card :class="$props.class">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription v-if="description">{{ description }}</CardDescription>
      <CardAction v-if="$slots.actions || hasTable">
        <slot name="actions" />
        <ToggleGroup v-if="hasTable" variant="outline" size="sm" type="single" :model-value="view" :aria-label="`${title}: view`" @update:model-value="onView">
          <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
        </ToggleGroup>
      </CardAction>
    </CardHeader>
    <CardContent :aria-busy="state === 'loading' || undefined">
      <!-- A few Skeleton bars standing in for a chart (decorative; the region carries aria-busy). -->
      <div v-if="state === 'loading'" class="flex h-64 items-end gap-4" aria-hidden="true">
        <Skeleton v-for="(h, i) in heights" :key="i" :class="cn('flex-1', h)" />
      </div>
      <Empty v-else-if="state === 'empty'" class="min-h-64">
        <EmptyHeader>
          <EmptyTitle>{{ emptyMessage }}</EmptyTitle>
        </EmptyHeader>
      </Empty>
      <Empty v-else-if="state === 'error'" class="min-h-64">
        <EmptyHeader>
          <EmptyTitle class="text-danger-text">{{ errorMessage }}</EmptyTitle>
          <EmptyDescription>Check your connection and try again.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent v-if="retryable">
          <Button variant="outline" size="sm" @click="$emit('retry')">Try again</Button>
        </EmptyContent>
      </Empty>
      <div v-else-if="view === 'table' && hasTable" class="overflow-hidden rounded-lg border-(length:--pl-border-width) border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead v-for="(column, i) in columns" :key="column.key" :class="cn(i > 0 && 'text-right')">{{ column.label }}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(row, ri) in rows" :key="ri">
              <TableCell v-for="(column, i) in columns" :key="column.key" :class="cn(i > 0 && 'text-right tabular-nums')">
                {{ typeof row[column.key] === "number" && column.format ? column.format(row[column.key] as number) : String(row[column.key] ?? "") }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div v-else role="group" :aria-label="title" :aria-describedby="summaryId">
        <p :id="summaryId" class="sr-only">{{ summary }}</p>
        <slot />
      </div>
    </CardContent>
  </Card>
</template>
